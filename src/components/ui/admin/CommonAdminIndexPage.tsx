import { useAppDispatch } from '@/app/hook';
import CustomGridToolbar from '@/components/common/datagrid/CustomGridToolbar';
import { CustomDialog } from '@/components/common/dialog/CustomDialog';
import FormTitle from '@/components/common/typos/FormTitle';
import { navigateTo } from '@/features/admin/adminSlice';
import TabCode from '@/lib/enums/AdminTabCode';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';

export type CommonIndexPageProps<RowType> = {
  title: string;
  rows: RowType[];
  columns: GridColDef[];
  isFetching: boolean;
  dialogProps: {
    title: string;
    content: string;
  };
};

export default function CommonIndexPage<RowType>({
  title,
  rows,
  isFetching,
  columns: paramColumn,
  dialogProps,
}: CommonIndexPageProps<RowType>) {
  const dispatch = useAppDispatch();
  const [snackbarAlert] = useSnackbarService();

  //#region Delete Operation

  // Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteClose = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  // Delete states and functions
  const [toDeleteRowId, setToDeleteRowId] = useState<number | null>(null);
  const handleDeleteRow = useCallback(() => {
    if (toDeleteRowId === null) {
      snackbarAlert('Xóa thất bại (mock)', 'warning');
      return;
    }
    snackbarAlert(`Xóa thành công ${toDeleteRowId} (mock)`);
    setDeleteDialogOpen(false);
  }, [snackbarAlert, toDeleteRowId]);

  //#endregion
  //#region Datagrid Columns

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
            icon={<Edit />}
            label="Sửa"
            onClick={() =>
              dispatch(
                navigateTo({
                  tab: TabCode.IngredientCreate,
                  params: params.row,
                })
              )
            }
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
    [dispatch, paramColumn]
  );

  //#endregion
  return (
    <Box p={4} display="flex" flexDirection={'column'} gap={1}>
      <Stack direction="row" justifyContent={'space-between'}>
        <FormTitle>{title}</FormTitle>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() =>
            dispatch(navigateTo({ tab: TabCode.IngredientCreate }))
          }
          sx={{ width: 100, borderRadius: 4 }}
        >
          Thêm
        </Button>
      </Stack>

      <Divider />

      <Box height={720}>
        <DataGrid
          loading={isFetching}
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          slots={{
            toolbar: CustomGridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{ minHeight: '100%' }}
        />
      </Box>

      <CustomDialog
        open={deleteDialogOpen}
        handleClose={handleDeleteClose}
        title={dialogProps.title}
        childrenContainerSx={{
          height: 160,
        }}
      >
        <Stack justifyContent={'space-between'} height={'100%'}>
          <Box
            height={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Typography typography={'body1'} fontSize={20}>
              {dialogProps.content}
            </Typography>
          </Box>

          <Stack
            direction={'row'}
            justifyContent={'end'}
            gap={1}
            sx={{
              borderTop: 1.4,
              borderColor: 'secondary.main',
              pt: 1,
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ width: 100, borderRadius: 4 }}
              onClick={handleDeleteRow}
            >
              Xóa
            </Button>
            <Button
              variant="contained"
              sx={{ width: 100, borderRadius: 4 }}
              onClick={handleDeleteClose}
            >
              Đóng
            </Button>
          </Stack>
        </Stack>
      </CustomDialog>
    </Box>
  );
}
