import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormLabel from '@/components/common/typos/FormLabel';
import FormTitle from '@/components/common/typos/FormTitle';
import NotManager from '@/components/ui/app/NotManager';
import AdminLayout from '@/components/ui/layout/AdminLayout';
import { PageRoute } from '@/lib/constants/common';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import useTastealTheme from '@/lib/hooks/useTastealTheme';
import {
  CreateIngredientTypeReq,
  UpdateIngredientTypeReq,
} from '@/lib/models/dtos/Request/Recipe_IngredientTypeReq/Recipe_IngredientTypeReq';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import IngredientTypeService from '@/lib/services/ingredientTypeService';
import { ArrowBack, Close } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
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
    setLoading(true);

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
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [id, location.pathname]);

  const [form, setForm] = useMemo(() => {
    return mode === 'create'
      ? [createForm, setCreateForm]
      : mode === 'view'
      ? [viewForm, setViewForm]
      : [updateForm, setUpdateForm];
  }, [createForm, mode, updateForm, viewForm]);

  const validate = () => {
    if (!form.name) {
      snackbarAlert('Vui lý điền đầy đủ thông tin!', 'warning');
      return false;
    }
    return true;
  };
  const handleCreateSubmit = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const reqBody = { ...createForm };
      const addedRow = await IngredientTypeService.AddIngredientType(reqBody);
      switchModeToView(addedRow.id);
      snackbarAlert('Loại nguyên liệu mới thêm thành công!', 'success');
    } catch (err) {
      snackbarAlert('Loại nguyên liệu mới đã không được thêm!', 'warning');
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const reqBody = { ...updateForm };
      await IngredientTypeService.UpdateIngredientType(reqBody);

      switchModeToView(parseInt(id));
      snackbarAlert('Loại nguyên liệu cập nhật thành công!', 'success');
    } catch (err) {
      console.log(err);
      snackbarAlert('Loại nguyên liệu đã không được cập nhật', 'warning');
    } finally {
      setLoading(false);
    }
  };

  //#endregion
  //#region State

  const disabled = mode === 'view';
  const [loading, setLoading] = useState<boolean>(false);

  //#endregion
  //#region Deletion

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };
  const handleDelete = async () => {
    if (!id) {
      snackbarAlert('Nguyên liệu đã không được xóa', 'warning');
      return;
    }

    setLoading(true);

    try {
      await IngredientTypeService.DeleteIngredientType(Number(id));
      snackbarAlert('Nguyên liệu đã được xóa thành công', 'success');
      navigate(PageRoute.Admin.IngredientTypes.Index);
    } catch (err) {
      console.log(err);
      snackbarAlert('Nguyên liệu đã không được xóa', 'warning');
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
    <>
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
              disabled={loading}
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
              <Form
                value={form}
                setValue={setForm}
                disabled={disabled}
                loading={loading}
              />
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
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Thêm'
                )}
              </Button>
            )}
            {mode === 'view' && (
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteDialogOpen}
                sx={{ width: 240 }}
                disabled={loading}
              >
                Xóa
              </Button>
            )}
            {mode === 'view' && (
              <Button
                variant="contained"
                onClick={() => switchModeToEdit()}
                sx={{ width: 240 }}
                disabled={loading}
              >
                Cập nhật
              </Button>
            )}
            {mode === 'edit' && (
              <Button
                variant="contained"
                onClick={() => handleUpdateSubmit()}
                sx={{ width: 240 }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Cập nhật'
                )}
              </Button>
            )}
            {mode === 'edit' && (
              <Button
                variant="outlined"
                sx={{
                  width: 240,
                }}
                onClick={() => switchModeToView(parseInt(id))}
                disabled={loading}
              >
                Hủy
              </Button>
            )}
          </Stack>
        </Stack>
      </AdminLayout>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
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
            <Typography typography={'h6'}>Xóa nguyên liệu</Typography>
            <IconButton onClick={handleDeleteDialogClose} disabled={loading}>
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
          <DialogContentText>{`Nguyên liệu "${viewForm?.id || 'loading'} - ${
            viewForm?.name
          }" sẽ bị xóa!`}</DialogContentText>
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
            onClick={handleDelete}
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
            onClick={handleDeleteDialogClose}
            disabled={loading}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
  loading?: boolean;
};
const Form: FC<FormProps> = ({
  value,
  setValue,
  disabled = false,
  loading = false,
}) => {
  return (
    <Stack gap={2}>
      <Stack>
        <FormLabel>Tên loại nguyên liệu</FormLabel>
        {loading && !disabled ? (
          <Skeleton variant="rounded" animation="wave" width="100%">
            <TastealTextField fullWidth />
          </Skeleton>
        ) : (
          <TastealTextField
            placeholder={loading ? 'loading...' : 'Tên loại nguyên này'}
            value={value?.name || ''}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            disabled={disabled}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default AdminIngredientTypesCreate;
