import CommonIndexPage from '@/components/ui/admin/CommonAdminIndexPage';
import NotManager from '@/components/ui/app/NotManager';
import AdminLayout from '@/components/ui/layout/AdminLayout';
import { PageRoute } from '@/lib/constants/common';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import useTastealTheme from '@/lib/hooks/useTastealTheme';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import IngredientTypeService from '@/lib/services/ingredientTypeService';
import { GridColDef } from '@mui/x-data-grid';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminIngredientTypesIndex: FC = () => {
  //#region Hooks

  const [snackbarAlert] = useSnackbarService();

  //#endregion
  //#region Datagrid columns

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
    },
  ];

  //#endregion
  //#region Pagination

  const [rows, setRows] = useState<Ingredient_TypeEntity[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      (async () => {
        let rows: Ingredient_TypeEntity[];
        try {
          rows = await IngredientTypeService.GetAllIngredientTypes();
        } catch (err) {
          console.log(err);
          rows = [];
        }
        if (!active) return;

        setRows(rows);
        setRowCount(rows.length);
        setLoading(false);
      })();
    })();

    return () => {
      active = false;
    };
  }, [paginationModel, paginationModel.page, paginationModel.pageSize]);

  //#endregion
  //#region Navigation

  const navigate = useNavigate();

  //#endregion
  //#region Operation

  const handleCreateClick = () => {
    navigate(PageRoute.Admin.IngredientTypes.Create);
  };
  const handleViewClick = (id: number) => {
    navigate(
      PageRoute.Admin.IngredientTypes.View.replace(':id', id.toString())
    );
  };
  const handleDeleteClick = async (id: number) => {
    setLoading(true);
    try {
      const deletedRow = await IngredientTypeService.DeleteIngredientType(id);
      if (deletedRow) {
        snackbarAlert(`Dịp ${deletedRow.name} đã xóa thành công!`, 'success');
      }
      setRows(rows.filter((row) => row.id !== id));
    } catch (err) {
      console.log(err);
      snackbarAlert('Dịp đã không được xóa!', 'warning');
    } finally {
      setLoading(false);
    }
  };

  //#endregion
  //#region Authorization

  const {
    login: { user },
  } = useTastealTheme();

  if (!user) {
    return '';
  }

  if (!(user.uid === 'Ah3AvtwmXrfuvGFo8sjSO2IOpCg1')) {
    return <NotManager />;
  }

  //#endregion

  return (
    <AdminLayout>
      <CommonIndexPage
        title={'Loại nguyên liệu'}
        rows={rows}
        columns={columns}
        loading={loading}
        dialogProps={{
          title: 'Xóa loại nguyên liệu',
          content: 'Bạn có chắc muốn xóa loại nguyên liệu này?',
        }}
        paginationModel={paginationModel}
        rowCount={rowCount}
        onPaginationModelChange={setPaginationModel}
        onCreateClick={handleCreateClick}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteClick}
      />
    </AdminLayout>
  );
};
