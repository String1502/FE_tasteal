import FormTitle from '@/components/common/typos/FormTitle';
import TabCode from '@/lib/enums/AdminTabCode';
import useAdminPageContext from '@/lib/hooks/useAdminPageContext';
import useIngredients from '@/lib/hooks/useIngredients';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Divider, Stack } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { FC, useMemo } from 'react';

//#region Datagrid config

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
        onClick={() => alert(`edit ${params.row.id}`)}
      />,
      <GridActionsCellItem
        icon={<Delete />}
        label="Xóa"
        onClick={() => alert(`delete ${params.row.id}`)}
      />,
    ],
    // renderCell: () => (
    //   <Stack direction="row" spacing={1}>
    //     <Button variant="contained">Sửa</Button>
    //     <Button variant="contained" color="error" onClick={() => alert(`delete $`)}>
    //       Xóa
    //     </Button>
    //   </Stack>
    // ),
  },
];

const CustomGridToolbar: FC = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

//#endregion

export const AdminIngredientsIndex: FC = () => {
  const { navigateTo } = useAdminPageContext();

  const [ingredients, isIngredientsFetching] = useIngredients();
  const paginatedIngredients = useMemo(
    () => ingredients.slice(0, 10),
    [ingredients]
  );

  return (
    <Box p={4} display="flex" flexDirection={'column'} gap={1}>
      <Stack direction="row" justifyContent={'space-between'}>
        <FormTitle>Nguyên liệu</FormTitle>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigateTo(TabCode.IngredientCreate)}
          sx={{ width: 120 }}
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
    </Box>
  );
};
