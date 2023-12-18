import TabCode from '@/lib/enums/AdminTabCode';
import useAdminPageContext from '@/lib/hooks/useAdminPageContext';
import useIngredients from '@/lib/hooks/useIngredients';
import { Box, Button, Divider, Stack } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { FC } from 'react';

//#region Datagrid config

const ingredientColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
  },
  {
    field: 'name',
    headerName: 'Tên',
  },
  {
    field: 'id',
    headerName: 'ID',
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

  const ingredients = useIngredients();
  const paginatedIngredients = ingredients.slice(0, 10);

  return (
    <Box p={4} display="flex" flexDirection={'column'} gap={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          onClick={() => navigateTo(TabCode.IngredientCreate)}
        >
          Thêm
        </Button>
      </Stack>

      <Divider />

      <DataGrid
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
      />
    </Box>
  );
};
