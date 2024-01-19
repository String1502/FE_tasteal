import FormTitle from '@/components/common/typos/FormTitle';
import { Add, Close, Delete, RemoveRedEye } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';

export type CommonIndexPageProps<RowType> = {
  title: string;
  rows: RowType[];
  paginationModel: { page: number; pageSize: number };
  rowCount: number;
  columns: GridColDef[];
  loading: boolean;
  dialogProps: {
    title: string;
    content: string;
  };
  onPaginationModelChange?: (model: { page: number; pageSize: number }) => void;
  onCreateClick?: () => void;
  onViewClick?: (id: number) => void;
  onDeleteClick?: (id: number) => Promise<void>;
};

export default function CommonIndexPage<RowType>({
  title,
  rows,
  rowCount,
  paginationModel,
  loading,
  columns: paramColumn,
  dialogProps,
  onPaginationModelChange,
  onCreateClick,
  onViewClick,
  onDeleteClick,
}: CommonIndexPageProps<RowType>) {
  //#region Hooks

  // const [snackbarAlert] = useSnackbarService();

  //#endregion
  //#region Delete Operation

  // Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteClose = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  // Delete states and functions
  const [toDeleteRowId, setToDeleteRowId] = useState<number | null>(null);
  const handleDeleteRow = useCallback(async () => {
    if (toDeleteRowId === null) {
      return;
    }
    await onDeleteClick(toDeleteRowId);
    setDeleteDialogOpen(false);
  }, [onDeleteClick, toDeleteRowId]);

  //#endregion
  //#region Datagrid Columns

  const handleCreate = useCallback(() => {
    onCreateClick && onCreateClick();
  }, [onCreateClick]);
  const handleView = useCallback(
    (id: number) => {
      onViewClick && onViewClick(id);
    },
    [onViewClick]
  );
  const columns: GridColDef[] = useMemo(
    () => [
      ...paramColumn,
      {
        field: 'action',
        type: 'actions',
        headerName: 'Hành động',
        flex: 1,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<RemoveRedEye />}
            label="Mở"
            onClick={() => handleView(params.row.id)}
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Xóa"
            onClick={() => {
              setToDeleteRowId(params.row.id);
              setDeleteDialogOpen(true);
            }}
          />,
        ],
      },
    ],
    [handleView, paramColumn]
  );

  //#endregion

  return (
    <Box p={4} display="flex" flexDirection={'column'} gap={1}>
      <Stack direction="row" justifyContent={'space-between'}>
        <FormTitle>{title}</FormTitle>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={handleCreate}
          sx={{ width: 100, borderRadius: 4 }}
        >
          Thêm
        </Button>
      </Stack>

      <Divider />

      <Box height={720}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          paginationMode="server"
          rowCount={rowCount}
          paginationModel={paginationModel}
          pageSizeOptions={[10]}
          onPaginationModelChange={onPaginationModelChange}
          sx={{ minHeight: '100%' }}
        />
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
        TransitionComponent={Slide}
        PaperProps={{
          sx: {
            borderRadius: 4,
            width: '50%',
          },
        }}
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography typography={'h6'}>{dialogProps.title}</Typography>
            <IconButton onClick={handleDeleteClose} disabled={loading}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider
          sx={{
            opacity: 0.5,
          }}
        />
        <DialogContent>
          <DialogContentText>{dialogProps.content}</DialogContentText>
        </DialogContent>
        <Divider
          sx={{
            opacity: 0.5,
          }}
        />
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteRow}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Xóa'
            )}
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteClose}
            disabled={loading}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
