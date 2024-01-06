import { useAppSelector } from '@/app/hook';
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
import { OccasionReq } from '@/lib/models/dtos/Request/OccasionReq/OccasionReq';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import OccasionService from '@/lib/services/occasionService';
import { convertToSnakeCase } from '@/utils/format';
import { ArrowBack } from '@mui/icons-material';
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
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  static fromEntity(entity: OccasionEntity): OccasionReqCreator {
    return new OccasionReqCreator(
      entity.name,
      entity.description,
      entity.image,
      entity.start_at.toISOString(),
      entity.end_at.toISOString()
    );
  }
}

const DEFAULT_CREATE_OCCASION = new OccasionReqCreator();

const AdminOccasionsCreate: FC = () => {
  //#region Hooks

  const [snackbarAlert] = useSnackbarService();
  const { id } = useParams();

  //#endregion
  //#region Redux

  const loadedOccasion = useAppSelector(
    (state) => state.admin.occasion.editValue
  );

  //#endregion
  //#region Mode

  const [mode, setMode] = useState<FormMode>('create');

  //#endregion
  //#region Navigation

  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(PageRoute.Admin.Occasions.Index);
  };

  //#endregion
  //#region Form

  const [createOccasion, setCreateOccasion] = useState<OccasionReqCreator>(
    DEFAULT_CREATE_OCCASION
  );
  const [updateOccasion, setUpdateOccasion] = useState<OccasionReqCreator>();
  const [viewOccasion, setViewOccasion] =
    useState<OccasionEntity>(loadedOccasion);

  useEffect(() => {
    if (!id) return;
    setMode('edit');

    OccasionService.GetById(parseInt(id))
      .then((occasion) => setViewOccasion(occasion))
      .catch(() => setViewOccasion(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const imageFileChange = (file: File) => {
    setImageFile(file);
  };

  const handleSubmit = async () => {
    try {
      const reqBody = await createOccasion.getReq(imageFile);
      const occasion = await OccasionService.CreateOccasion(reqBody);
      console.log(occasion);
    } catch (err) {
      snackbarAlert('Dịp mới đã không được thêm!', 'warning');
      return;
    }
  };

  //#endregion

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
          <FormTitle>{mode === 'create' ? 'Thêm dịp' : 'Sửa dịp'}</FormTitle>
        </Stack>
        <Grid container columnSpacing={12}>
          <Grid item xs={3}>
            <Stack>
              <FormLabel>Hình ảnh</FormLabel>
              <ImagePicker
                file={imageFile}
                imagePath={createOccasion?.image || ''}
                onChange={imageFileChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack gap={2}>
              <Stack>
                <FormLabel>Tên dịp lễ</FormLabel>
                <TastealTextField
                  placeholder="Tết"
                  value={createOccasion.name}
                  onChange={(e) =>
                    setCreateOccasion((prev) => {
                      const clone = prev.clone();
                      clone.name = e.target.value;
                      return clone;
                    })
                  }
                />
              </Stack>
              <Stack>
                <FormLabel>Mô tả</FormLabel>
                <TastealTextField
                  value={createOccasion.description}
                  onChange={(e) =>
                    setCreateOccasion((prev) => {
                      const clone = prev.clone();
                      clone.description = e.target.value;
                      return clone;
                    })
                  }
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
                      value={dayjs(createOccasion.start_at_date)}
                      onChange={(value) =>
                        setCreateOccasion((prev) => {
                          const clone = prev.clone();
                          clone.start_at_date = value.toDate();
                          return clone;
                        })
                      }
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormLabel>Kết thúc vào</FormLabel>
                    <DatePicker
                      value={dayjs(createOccasion.end_at_date)}
                      onChange={(value) =>
                        setCreateOccasion((prev) => {
                          const clone = prev.clone();
                          clone.end_at_date = value.toDate();
                          return clone;
                        })
                      }
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack>
                <FormLabel>Dùng ngày âm</FormLabel>
                <Switch
                  value={createOccasion.is_lunar_date}
                  onChange={(_, checked) =>
                    setCreateOccasion((prev) => {
                      const clone = prev.clone();
                      clone.is_lunar_date = checked;
                      return clone;
                    })
                  }
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider flexItem sx={{ opacity: 0.5 }} />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: 240, alignSelf: 'end' }}
        >
          {mode === 'create' ? 'Thêm' : mode === 'edit' ? 'Sửa' : 'Lỗi'}
        </Button>
      </Stack>
    </AdminLayout>
  );
};

type FormMode = 'create' | 'edit' | 'view';

export default AdminOccasionsCreate;
