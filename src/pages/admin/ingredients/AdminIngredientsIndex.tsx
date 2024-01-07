import { useAppDispatch } from '@/app/hook';
import CommonIndexPage from '@/components/ui/admin/CommonAdminIndexPage';
import AdminLayout from '@/components/ui/layout/AdminLayout';
import { setEditIngredient } from '@/features/admin/adminSlice';
import { IngredientPagination } from '@/lib/models/dtos/Response/IngredientRes/IngredientRes';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import IngredientService from '@/lib/services/ingredientService';
import IngredientTypeService from '@/lib/services/ingredientTypeService';
import { GridColDef } from '@mui/x-data-grid';
import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CacheValue<T> = {
  time: number;
  value: T;
};
const cache: Map<string, CacheValue<IngredientPagination>> = new Map();
function createCacheKey(...args: unknown[]) {
  return JSON.stringify(args);
}
function isCacheExpire(time: number) {
  const expire = 5 * 60 * 1000;
  return Date.now() - time > expire;
}

export const AdminIngredientsIndex: FC = () => {
  //#region Hooks

  const navigate = useNavigate();

  //#endregion
  //#region Redux

  const dispatch = useAppDispatch();

  const handleCreateIngredient = useCallback(() => {
    dispatch(setEditIngredient(null));
    navigate('/admin/ingredients/create');
  }, [dispatch, navigate]);
  const handleEditIngredient = useCallback(
    (ingredient: IngredientEntity) => {
      console.log(ingredient);
      dispatch(setEditIngredient(ingredient));
      navigate(`/admin/ingredients/${ingredient.id}`);
    },
    [dispatch, navigate]
  );

  //#endregion
  //#region Datagrid columns

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
      valueFormatter: function (params) {
        return (
          ingredientTypes.find((type) => type.id === params.value)?.name ||
          'Không tìm thấy'
        );
      },
      flex: 1,
    },
  ];

  //#endregion
  //#region Pagination

  const [rows, setRows] = useState<IngredientEntity[]>([]);
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
      let pagination: IngredientPagination;

      const key = createCacheKey(
        paginationModel.page,
        paginationModel.pageSize
      );
      if (cache.has(key)) {
        const value = cache.get(key);
        if (isCacheExpire(value.time)) {
          cache.delete(key);
        } else {
          pagination = value.value;
        }
      } else {
        try {
          pagination = await IngredientService.Get(
            paginationModel.page + 1,
            paginationModel.pageSize
          );

          cache.set(
            createCacheKey(paginationModel.page, paginationModel.pageSize),
            {
              value: pagination,
              time: Date.now(),
            }
          );
        } catch (err) {
          console.log(err);
        }
      }

      if (!active) return;

      setLoading(false);
      setRows(pagination?.ingredients ?? []);
      setRowCount(
        pagination ? pagination.maxPage * paginationModel.pageSize : 0
      );
    })();

    return () => {
      active = false;
    };
  }, [paginationModel, paginationModel.page, paginationModel.pageSize]);

  //#endregion
  //#region Types

  const [ingredientTypes, setIngredientTypes] = useState([]);
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const types = await IngredientTypeService.GetAllIngredientTypes();
        setIngredientTypes(types);
      } catch (error) {
        console.log(error);
      }
    })();

    if (!active) return;

    return () => {
      active = false;
    };
  }, []);

  //#endregion

  return (
    <AdminLayout>
      <CommonIndexPage
        title={'Nguyên liệu'}
        rows={rows}
        paginationModel={paginationModel}
        rowCount={rowCount}
        columns={ingredientColumns}
        loading={loading}
        dialogProps={{
          title: 'Xóa nguyên liệu',
          content: 'Bạn có chắc muốn xóa nguyên liệu này?',
        }}
        onPaginationModelChange={setPaginationModel}
        onCreateClick={handleCreateIngredient}
        onViewClick={handleEditIngredient}
      />
    </AdminLayout>
  );
};
