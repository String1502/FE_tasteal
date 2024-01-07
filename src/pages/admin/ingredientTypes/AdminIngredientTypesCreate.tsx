import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormLabel from '@/components/common/typos/FormLabel';
import FormTitle from '@/components/common/typos/FormTitle';
import AdminLayout from '@/components/ui/layout/AdminLayout';
import { PageRoute } from '@/lib/constants/common';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import {
  CreateIngredientTypeReq,
  UpdateIngredientTypeReq,
} from '@/lib/models/dtos/Request/Recipe_IngredientTypeReq/Recipe_IngredientTypeReq';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import IngredientTypeService from '@/lib/services/ingredientTypeService';
import { ArrowBack } from '@mui/icons-material';
import { Button, Divider, Grid, IconButton, Stack } from '@mui/material';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const DEFAULT_CREATE_OCCASION: CreateIngredientTypeReq = {
  name: '',
};

const AdminIngredientTypesCreate: FC = () => {
  //#region Hooks

  const [snackbarAlert] = useSnackbarService();
  const { id } = useParams();

  //#endregion
  //#region Mode

  const [mode, setMode] = useState<FormMode>('create');

  //#endregion
  //#region Navigation

  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigateBack = () => {
    navigate(PageRoute.Admin.IngredientTypes.Index);
  };

  //#endregion
  //#region Form

  const [createForm, setCreateForm] = useState<CreateIngredientTypeReq>(
    DEFAULT_CREATE_OCCASION
  );
  const [updateForm, setUpdateForm] = useState<UpdateIngredientTypeReq>();
  const [viewForm, setViewForm] = useState<Ingredient_TypeEntity>();

  useEffect(() => {
    if (!id) return;

    let active = true;

    (async () => {
      if (location.pathname.includes('edit')) {
        setMode('edit');
      } else {
        setMode('view');
      }
      try {
        const row = await IngredientTypeService.GetIngredientTypeById(
          parseInt(id)
        );
        if (!active) return;
        setViewForm(row);
        setUpdateForm(row);
      } catch {
        setViewForm(undefined);
        setUpdateForm(undefined);
      }
    })();

    return () => {
      active = false;
    };
  }, [id, location.pathname]);

  const handleCreateSubmit = async () => {
    try {
      const reqBody = { ...createForm };
      const addedRow = await IngredientTypeService.AddIngredientType(reqBody);
      switchModeToView(addedRow.id);
      snackbarAlert('Loại nguyên liệu mới thêm thành công!', 'success');
    } catch (err) {
      snackbarAlert('Loại nguyên liệu mới đã không được thêm!', 'warning');
      return;
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const reqBody = { ...updateForm };
      console.log(reqBody);
      const updatedRow = await IngredientTypeService.UpdateIngredientType(
        reqBody
      );
      console.log(updatedRow);

      switchModeToView(parseInt(id));
      snackbarAlert('Loại nguyên liệu cập nhật thành công!', 'success');
    } catch (err) {
      console.log(err);
      snackbarAlert('Loại nguyên liệu đã không được cập nhật', 'warning');
    }
  };

  //#endregion

  const [form, setForm] = useMemo(() => {
    return mode === 'create'
      ? [createForm, setCreateForm]
      : mode === 'view'
      ? [viewForm, setViewForm]
      : [updateForm, setUpdateForm];
  }, [createForm, mode, updateForm, viewForm]);

  const disabled = mode === 'view';

  const switchModeToEdit = () => {
    if (!form || !('id' in form)) return;

    setMode('edit');
    let path: string = PageRoute.Admin.IngredientTypes.Edit;
    path = path.replace(':id', form?.id?.toString() || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };
  const switchModeToView = (id?: number) => {
    console.log(id);
    if (!id) return;

    setMode('view');
    let path: string = PageRoute.Admin.IngredientTypes.View;
    path = path.replace(':id', id.toString() || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };

  console.log(updateForm);

  return (
    <AdminLayout>
      <Stack alignItems={'start'} p={4} gap={4}>
        <Stack direction="row" gap={1}>
          <IconButton
            sx={{
              borderRadius: 4,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              ':hover': {
                backgroundColor: 'primary.dark',
              },
            }}
            onClick={handleNavigateBack}
          >
            <ArrowBack />
          </IconButton>
          <FormTitle>
            {mode === 'create'
              ? 'Thêm loại nguyên liệu'
              : mode === 'edit'
              ? 'Sửa loại nguyên liệu'
              : 'Loại nguyên liệu'}
          </FormTitle>
        </Stack>
        <Grid container columnSpacing={12}>
          <Grid item xs={12}>
            <Form value={form} setValue={setForm} disabled={disabled} />
          </Grid>
        </Grid>

        <Divider flexItem sx={{ opacity: 0.5 }} />

        <Stack
          direction="row"
          justifyContent={'end'}
          alignItems={'center'}
          width="100%"
          gap={1}
        >
          {mode === 'create' && (
            <Button
              variant="contained"
              onClick={handleCreateSubmit}
              sx={{ width: 240 }}
            >
              Thêm
            </Button>
          )}
          {mode === 'view' && (
            <Button
              variant="contained"
              onClick={() => switchModeToEdit()}
              sx={{ width: 240 }}
            >
              Cập nhật
            </Button>
          )}
          {mode === 'edit' && (
            <Button
              variant="contained"
              onClick={() => handleUpdateSubmit()}
              sx={{ width: 240 }}
            >
              Cập nhật
            </Button>
          )}
          {mode === 'edit' && (
            <Button
              variant="outlined"
              sx={{
                width: 240,
              }}
              onClick={() => switchModeToView(parseInt(id))}
            >
              Hủy
            </Button>
          )}
        </Stack>
      </Stack>
    </AdminLayout>
  );
};

type FormMode = 'create' | 'edit' | 'view';

type FormProps = {
  value:
    | CreateIngredientTypeReq
    | UpdateIngredientTypeReq
    | Ingredient_TypeEntity;
  setValue:
    | Dispatch<SetStateAction<CreateIngredientTypeReq>>
    | Dispatch<SetStateAction<UpdateIngredientTypeReq>>
    | Dispatch<SetStateAction<Ingredient_TypeEntity>>;
  disabled?: boolean;
};
const Form: FC<FormProps> = ({ value, setValue, disabled = false }) => {
  return (
    <Stack gap={2}>
      <Stack>
        <FormLabel>Tên loại nguyên liệu</FormLabel>
        <TastealTextField
          placeholder="Rau củ"
          value={value?.name || ''}
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          disabled={disabled}
        />
      </Stack>
    </Stack>
  );
};

export default AdminIngredientTypesCreate;
