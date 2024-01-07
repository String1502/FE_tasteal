import ImagePicker from '@/components/common/files/ImagePicker';
import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormLabel from '@/components/common/typos/FormLabel';
import FormTitle from '@/components/common/typos/FormTitle';
import AdminLayout from '@/components/ui/layout/AdminLayout';
import { PageRoute } from '@/lib/constants/common';
import { StoragePath } from '@/lib/constants/storage';
import { storage } from '@/lib/firebase/config';
import { uploadImage } from '@/lib/firebase/image';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import {
  OccasionReq,
  OccasionReqPut,
} from '@/lib/models/dtos/Request/OccasionReq/OccasionReq';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import OccasionService from '@/lib/services/occasionService';
import { convertToSnakeCase } from '@/utils/format';
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
  Slide,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getDownloadURL, ref } from 'firebase/storage';
import { nanoid } from 'nanoid';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormMode } from '../types/FormMode';

class OccasionReqCreator implements OccasionReq {
  name: string;
  description: string;
  image?: string;
  start_at: string;
  end_at: string;
  is_lunar_date: boolean;

  start_at_date: Date;
  end_at_date: Date;

  constructor(
    name: string = '',
    description: string = '',
    image: string = '',
    start_at: string = '',
    end_at: string = '',
    is_lunar_date: boolean = false,
    start_at_date?: Date,
    end_at_date?: Date
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.start_at = start_at || new Date().toISOString();
    this.end_at = end_at || new Date().toISOString();
    this.is_lunar_date = is_lunar_date;

    if (start_at_date) {
      this.start_at_date = start_at_date;
    } else {
      this.start_at_date = new Date();
    }
    if (end_at_date) {
      this.end_at_date = end_at_date;
    } else {
      this.end_at_date = new Date();
    }
  }

  async getReq(imageFile?: File): Promise<OccasionReq> {
    if (!imageFile) {
      throw new Error('image is required');
    }
    let imagePath = `${StoragePath.OCCASION}/${convertToSnakeCase(this.name)}`;

    // check if image existed
    let existed = false;
    try {
      const imageRef = ref(storage, imagePath);
      const path = await getDownloadURL(imageRef);
      if (path) existed = true;
    } catch {
      /* empty */
    }
    if (existed) {
      imagePath = `${imagePath}-${nanoid()}`;
    }

    // upload image
    this.image = await uploadImage(imageFile, imagePath);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const req: OccasionReq = {
      name: this.name,
      description: this.description,
      image: this.image,
      start_at: this.start_at_date.toISOString(),
      end_at: this.end_at_date.toISOString(),
      is_lunar_date: this.is_lunar_date,
    };
    return req;
  }
  clone(): OccasionReqCreator {
    return new OccasionReqCreator(
      this.name,
      this.description,
      this.image,
      this.start_at,
      this.end_at,
      this.is_lunar_date,
      this.start_at_date,
      this.end_at_date
    );
  }
  static fromEntity(entity: OccasionEntity): OccasionReqPutCreator {
    return new OccasionReqPutCreator(
      entity.id,
      entity.name,
      entity.description,
      entity.image,
      entity.start_at.toISOString(),
      entity.end_at.toISOString(),
      entity.is_lunar_date,
      entity.start_at,
      entity.end_at
    );
  }
}
class OccasionReqPutCreator extends OccasionReqCreator {
  id: number;

  constructor(
    id: number,
    name: string = '',
    description: string = '',
    image: string = '',
    start_at: string = '',
    end_at: string = '',
    is_lunar_date: boolean = false,
    start_at_date?: Date,
    end_at_date?: Date
  ) {
    super(
      name,
      description,
      image,
      start_at,
      end_at,
      is_lunar_date,
      start_at_date,
      end_at_date
    );
    this.id = id;
  }

  async getReq(imageFile?: File): Promise<OccasionReqPut> {
    if (imageFile) {
      let imagePath = this.image;
      if (imagePath) {
        this.image = await uploadImage(imageFile, imagePath);
      } else {
        imagePath = `${StoragePath.OCCASION}/${convertToSnakeCase(this.name)}`;
        // check if image existed
        let existed = false;
        try {
          const imageRef = ref(storage, imagePath);
          const path = await getDownloadURL(imageRef);
          if (path) existed = true;
        } catch {
          /* empty */
        }
        if (existed) {
          imagePath = `${imagePath}-${nanoid()}`;
        }

        // upload image
        this.image = await uploadImage(imageFile, imagePath);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const req: OccasionReqPut = {
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image,
      start_at: this.start_at_date.toISOString(),
      end_at: this.end_at_date.toISOString(),
      is_lunar_date: this.is_lunar_date,
    };
    return req;
  }
  clone(): OccasionReqPutCreator {
    return new OccasionReqPutCreator(
      this.id,
      this.name,
      this.description,
      this.image,
      this.start_at,
      this.end_at,
      this.is_lunar_date,
      this.start_at_date,
      this.end_at_date
    );
  }
}

const DEFAULT_CREATE_OCCASION = new OccasionReqCreator();

const AdminOccasionsCreate: FC = () => {
  //#region Hooks

  const [snackbarAlert] = useSnackbarService();
  const { id } = useParams();

  //#endregion
  //#region Mode

  const [mode, setMode] = useState<FormMode>('create');
  const switchModeToEdit = () => {
    if (!form || !('id' in form)) return;

    setMode('edit');
    let path: string = PageRoute.Admin.Occasions.Edit;
    path = path.replace(':id', form?.id?.toString() || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };
  const switchModeToView = (id?: string) => {
    if (!id) return;

    setMode('view');
    let path: string = PageRoute.Admin.Occasions.View;
    path = path.replace(':id', id || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };

  //#endregion
  //#region Navigation

  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigateBack = () => {
    navigate(PageRoute.Admin.Occasions.Index);
  };

  //#endregion
  //#region Form

  const [createForm, setCreateForm] = useState<OccasionReqCreator>(
    DEFAULT_CREATE_OCCASION
  );
  const [updateForm, setUpdateForm] = useState<OccasionReqPutCreator>();
  const [viewForm, setViewForm] = useState<OccasionEntity>();

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
        const occasion = await OccasionService.GetOccasionById(parseInt(id));
        if (!active) return;
        setViewForm(occasion);
        setUpdateForm(OccasionReqPutCreator.fromEntity(occasion));
      } catch {
        setViewForm(undefined);
        setUpdateForm;
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [id, location.pathname]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const imageFileChange = (file: File) => {
    setImageFile(file);
  };

  const handleCreateSubmit = async () => {
    setLoading(true);
    try {
      const reqBody = await createForm.getReq(imageFile);
      const occasion = await OccasionService.AddOccasion(reqBody);
      switchModeToView(occasion.id.toString());
      snackbarAlert('Dịp thêm thành công!', 'success');
    } catch (err) {
      snackbarAlert('Dịp mới đã không được thêm!', 'warning');
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async () => {
    setLoading(true);
    try {
      const reqBody = await updateForm.getReq(imageFile);
      const occasion = await OccasionService.UpdateOccasion(reqBody);

      switchModeToView(id);
      snackbarAlert('Dịp cập nhật thành công!', 'success');
    } catch (err) {
      console.log(err);
      snackbarAlert('Dịp đã không được cập nhật', 'warning');
    } finally {
      setLoading(false);
    }
  };

  const [form, setForm] = useMemo(() => {
    return mode === 'create'
      ? [createForm, setCreateForm]
      : mode === 'view'
      ? [viewForm, setViewForm]
      : [updateForm, setUpdateForm];
  }, [createForm, mode, updateForm, viewForm]);

  //#endregion
  //#region State

  const disabled = mode === 'view';
  const [loading, setLoading] = useState(false);

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
      snackbarAlert('Dịp lễ đã không được xóa', 'warning');
      return;
    }

    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deletedRow = await OccasionService.DeleteOccasion(Number(id));
      snackbarAlert('Dịp lễ đã được xóa thành công', 'success');
      navigate(PageRoute.Admin.Occasions.Index);
    } catch (err) {
      console.log(err);
      snackbarAlert('Dịp lễ đã không được xóa', 'warning');
    } finally {
      setLoading(false);
    }
  };

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
              disabled={loading || disabled}
            >
              <ArrowBack />
            </IconButton>
            <FormTitle>
              {mode === 'create'
                ? 'Thêm dịp'
                : mode === 'edit'
                ? 'Sửa dịp'
                : 'Dịp'}
            </FormTitle>
          </Stack>
          <Grid container columnSpacing={12}>
            <Grid item xs={3}>
              <Stack>
                <FormLabel>Hình ảnh</FormLabel>
                <ImagePicker
                  file={imageFile}
                  imagePath={form?.image || ''}
                  onChange={imageFileChange}
                  disabled={disabled || loading}
                />
              </Stack>
            </Grid>
            <Grid item xs={9}>
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
                onClick={() => switchModeToView(id)}
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
            <Typography typography={'h6'}>Xóa dịp lễ</Typography>
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
          <DialogContentText>{`Dịp lễ "${viewForm?.id || 'loading'} - ${
            createForm?.name
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

type FormProps = {
  value: OccasionReqCreator | OccasionEntity;
  setValue:
    | Dispatch<SetStateAction<OccasionReqCreator>>
    | Dispatch<SetStateAction<OccasionEntity>>;
  disabled?: boolean;
  loading?: boolean;
};
const Form: FC<FormProps> = ({
  value,
  setValue,
  disabled = false,
  loading,
}) => {
  return (
    <Stack gap={2}>
      <Stack>
        <FormLabel>Tên dịp lễ</FormLabel>
        <TastealTextField
          placeholder="Tết"
          value={value?.name || ''}
          onChange={(e) =>
            setValue((prev) => {
              if (
                prev instanceof OccasionReqCreator ||
                prev instanceof OccasionReqPutCreator
              ) {
                const clone = prev.clone();
                clone.name = e.target.value;
                return clone;
              }
              return {
                ...prev,
                name: e.target.value,
              };
            })
          }
          disabled={disabled || loading}
        />
      </Stack>
      <Stack>
        <FormLabel>Mô tả</FormLabel>
        <TastealTextField
          value={value?.description || ''}
          onChange={(e) =>
            setValue((prev) => {
              if (
                prev instanceof OccasionReqCreator ||
                prev instanceof OccasionReqPutCreator
              ) {
                const clone = prev.clone();
                clone.description = e.target.value;
                return clone;
              }
              return {
                ...prev,
                description: e.target.value,
              };
            })
          }
          disabled={disabled || loading}
          placeholder="Tết là một ngày lễ tuyệt vời..."
          multiline
          rows={4}
        />
      </Stack>
      <Stack>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <FormLabel>Bắt đầu vào</FormLabel>
            <DatePicker
              value={dayjs(
                value instanceof OccasionReqCreator ||
                  value instanceof OccasionReqPutCreator
                  ? value?.start_at_date || new Date()
                  : value?.start_at || new Date()
              )}
              onChange={(value) =>
                setValue((prev) => {
                  if (
                    prev instanceof OccasionReqCreator ||
                    prev instanceof OccasionReqPutCreator
                  ) {
                    const clone = prev.clone();
                    console.log(value);
                    clone.start_at_date = value.toDate();
                    return clone;
                  }
                  console.log('run');
                  return {
                    ...prev,
                    start_at: value.toISOString(),
                  };
                })
              }
              disabled={disabled || loading}
              sx={{ width: '100%' }}
              format="DD/MM/YYYY"
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Kết thúc vào</FormLabel>
            <DatePicker
              value={dayjs(
                value instanceof OccasionReqCreator ||
                  value instanceof OccasionReqPutCreator
                  ? value?.end_at_date || new Date()
                  : value?.end_at || new Date()
              )}
              onChange={(value) =>
                setValue((prev) => {
                  if (
                    prev instanceof OccasionReqCreator ||
                    prev instanceof OccasionReqPutCreator
                  ) {
                    const clone = prev.clone();
                    clone.end_at_date = value.toDate();
                    return clone;
                  }
                  return {
                    ...prev,
                    end_at: value.toISOString(),
                  };
                })
              }
              disabled={disabled || loading}
              sx={{ width: '100%' }}
              format="DD/MM/YYYY"
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack>
        <FormLabel>Dùng ngày âm</FormLabel>
        <Switch
          value={value?.is_lunar_date || false}
          onChange={(_, checked) =>
            setValue((prev) => {
              if (
                value instanceof OccasionReqCreator ||
                value instanceof OccasionReqPutCreator
              ) {
                const clone = prev.clone();
                clone.is_lunar_date = checked;
                return clone;
              }
              return {
                ...prev,
                is_lunar_date: checked,
              };
            })
          }
          disabled={disabled || loading}
        />
      </Stack>
    </Stack>
  );
};

export default AdminOccasionsCreate;
