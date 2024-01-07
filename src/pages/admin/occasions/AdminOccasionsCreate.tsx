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
import { ArrowBack, DesignServices } from '@mui/icons-material';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Switch,
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

class OccasionReqCreator implements OccasionReq {
  name: string;
  description: string;
  image?: string;
  start_at: string;
  end_at: string;
  is_lunar_date: boolean;

  private _start_at_date: Date;
  private _end_at_date: Date;

  get start_at_date() {
    if (!this._start_at_date) {
      this._start_at_date = new Date(this.start_at);
    }
    return this._start_at_date;
  }
  set start_at_date(date: Date) {
    this._start_at_date = new Date(date);
    this.start_at = this._start_at_date.toISOString();
  }
  get end_at_date() {
    if (!this._end_at_date) {
      this._end_at_date = new Date(this.end_at);
    }
    return this._end_at_date;
  }
  set end_at_date(date: Date) {
    this._end_at_date = new Date(date);
    this.end_at = this._end_at_date.toISOString();
  }

  constructor(
    name: string = '',
    description: string = '',
    image: string = '',
    start_at: string = '',
    end_at: string = '',
    is_lunar_date: boolean = false
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.start_at = start_at || new Date().toISOString();
    this.end_at = end_at || new Date().toISOString();
    this.is_lunar_date = is_lunar_date;

    this.start_at_date = new Date(this.start_at);
    this.end_at_date = new Date(this.end_at);
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
      start_at: this.start_at,
      end_at: this.end_at,
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
      this.is_lunar_date
    );
  }
  static fromEntity(entity: OccasionEntity): OccasionReqPutCreator {
    return new OccasionReqPutCreator(
      entity.id,
      entity.name,
      entity.description,
      entity.image,
      entity.start_at.toISOString(),
      entity.end_at.toISOString()
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
    is_lunar_date: boolean = false
  ) {
    super(name, description, image, start_at, end_at, is_lunar_date);
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
      start_at: this.start_at,
      end_at: this.end_at,
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
      this.is_lunar_date
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

  //#endregion
  //#region Navigation

  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigateBack = () => {
    navigate(PageRoute.Admin.Occasions.Index);
  };

  //#endregion
  //#region Form

  const [createOccasion, setCreateOccasion] = useState<OccasionReqCreator>(
    DEFAULT_CREATE_OCCASION
  );
  const [updateOccasion, setUpdateOccasion] = useState<OccasionReqPutCreator>();
  const [viewOccasion, setViewOccasion] = useState<OccasionEntity>();

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
        console.log('run');
        const occasion = await OccasionService.GetOccasionById(parseInt(id));
        if (!active) return;
        setViewOccasion(occasion);
        setUpdateOccasion(OccasionReqPutCreator.fromEntity(occasion));
      } catch {
        setViewOccasion(undefined);
        setUpdateOccasion;
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
    try {
      const reqBody = await createOccasion.getReq(imageFile);
      const occasion = await OccasionService.AddOccasion(reqBody);
      switchModeToView(occasion.id);
      snackbarAlert('Dịp thêm thành công!', 'success');
    } catch (err) {
      snackbarAlert('Dịp mới đã không được thêm!', 'warning');
      return;
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const reqBody = await updateOccasion.getReq(imageFile);
      console.log(reqBody);
      const occasion = await OccasionService.UpdateOccasion(reqBody);
      console.log(occasion);

      switchModeToView();
      snackbarAlert('Dịp cập nhật thành công!', 'success');
    } catch (err) {
      console.log(err);
      snackbarAlert('Dịp đã không được cập nhật', 'warning');
    }
  };

  //#endregion

  const [form, setForm] = useMemo(() => {
    return mode === 'create'
      ? [createOccasion, setCreateOccasion]
      : mode === 'view'
      ? [viewOccasion, setViewOccasion]
      : [updateOccasion, setUpdateOccasion];
  }, [createOccasion, mode, updateOccasion, viewOccasion]);

  const disabled = mode === 'view';

  const switchModeToEdit = () => {
    if (!form || !('id' in form)) return;

    setMode('edit');
    let path: string = PageRoute.Admin.Occasions.Edit;
    path = path.replace(':id', form?.id?.toString() || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };
  const switchModeToView = (id?: number) => {
    if (!id) return;

    setMode('view');
    let path: string = PageRoute.Admin.Occasions.View;
    path = path.replace(':id', id.toString() || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };

  console.log(updateOccasion);

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
                disabled={disabled}
              />
            </Stack>
          </Grid>
          <Grid item xs={9}>
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
              onClick={() =>
                switchModeToView(
                  form instanceof OccasionReqPutCreator ? form?.id : undefined
                )
              }
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
  value: OccasionReqCreator | OccasionEntity;
  setValue:
    | Dispatch<SetStateAction<OccasionReqCreator>>
    | Dispatch<SetStateAction<OccasionEntity>>;
  disabled?: boolean;
};
const Form: FC<FormProps> = ({ value, setValue, disabled = false }) => {
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
          disabled={disabled}
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
          disabled={disabled}
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
                value instanceof OccasionReqCreator
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
              disabled={disabled}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Kết thúc vào</FormLabel>
            <DatePicker
              value={dayjs(
                value instanceof OccasionReqCreator
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
              disabled={disabled}
              sx={{ width: '100%' }}
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
          disabled={disabled}
        />
      </Stack>
    </Stack>
  );
};

export default AdminOccasionsCreate;
