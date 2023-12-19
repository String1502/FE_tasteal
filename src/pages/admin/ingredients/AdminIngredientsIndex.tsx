import { useAppDispatch } from '@/app/hook';
import { CustomDialog } from '@/components/common/dialog/CustomDialog';
import FormTitle from '@/components/common/typos/FormTitle';
import { navigateTo } from '@/features/admin/adminSlice';
import TabCode from '@/lib/enums/AdminTabCode';
import useIngredients from '@/lib/hooks/useIngredients';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { FC, useCallback, useMemo, useState } from 'react';

//#region Datagrid config

const CustomGridToolbar: FC = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

//#endregion

export const AdminIngredientsIndex: FC = () => {
  const dispatch = useAppDispatch();

  const [snackbarAlert] = useSnackbarService();

  const [ingredients, isIngredientsFetching] = useIngredients();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteClose = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  const paginatedIngredients = useMemo(
    () => ingredients.slice(0, 10),
    [ingredients]
  );

  const ingredientColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
    },
    {
      field: 'type_id',
      headerName: 'Loại',
      flex: 1,
    },
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
              navigateTo({ tab: TabCode.IngredientCreate, params: params.row })
            )
          }
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Xóa"
          onClick={() => {
            setToDeleteIngredientId(params.row.id);
            setDeleteDialogOpen(true);
          }}
        />,
      ],
    },
  ];

  const [toDeleteIngredientId, setToDeleteIngredientId] = useState<
    number | null
  >(null);

  const handleDeleteIngredient = useCallback(() => {
    if (toDeleteIngredientId === null) {
      snackbarAlert('Xóa thất bại (mock)', 'warning');
      return;
    }
    snackbarAlert(`Xóa thành công ${toDeleteIngredientId} (mock)`);
    setDeleteDialogOpen(false);
  }, [snackbarAlert, toDeleteIngredientId]);

  return (
    <Box p={4} display="flex" flexDirection={'column'} gap={1}>
      <Stack direction="row" justifyContent={'space-between'}>
        <FormTitle>Nguyên liệu</FormTitle>
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
          loading={isIngredientsFetching}
          rows={paginatedIngredients}
          columns={ingredientColumns}
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
        title={'Xóa nguyên liệu'}
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
              Bạn có chắc muốn xóa nguyên liệu này?
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
              onClick={() => handleDeleteIngredient()}
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
};
