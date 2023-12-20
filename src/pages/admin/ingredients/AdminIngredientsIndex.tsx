import CommonIndexPage from '@/components/ui/admin/CommonAdminIndexPage';
import useIngredients from '@/lib/hooks/useIngredients';
import { GridColDef } from '@mui/x-data-grid';
import { FC, useMemo } from 'react';

export const AdminIngredientsIndex: FC = () => {
  //#region Ingredients Data

  const [ingredients, isIngredientsFetching] = useIngredients();
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
  ];

  //#endregion

  return (
    <CommonIndexPage
      title={'Nguyên liệu'}
      rows={paginatedIngredients}
      columns={ingredientColumns}
      isFetching={isIngredientsFetching}
      dialogProps={{
        title: 'Xóa nguyên liệu',
        content: 'Bạn có chắc muốn xóa nguyên liệu này?',
      }}
    />
  );
};
