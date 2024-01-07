import ImagePicker from '@/components/common/files/ImagePicker';
import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormLabel from '@/components/common/typos/FormLabel';
import FormTitle from '@/components/common/typos/FormTitle';
import NotManager from '@/components/ui/app/NotManager';
import AdminLayout from '@/components/ui/layout/AdminLayout';
import { PageRoute } from '@/lib/constants/common';
import { StoragePath } from '@/lib/constants/storage';
import { storage } from '@/lib/firebase/config';
import { uploadImage } from '@/lib/firebase/image';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import useTastealTheme from '@/lib/hooks/useTastealTheme';
import {
  CreateIngredientReq,
  UpdateIngredientReq,
} from '@/lib/models/dtos/Request/IngredientReq/IngredientReq';
import { Nutrition_InfoReq } from '@/lib/models/dtos/Request/Nutrition_InfoReq/Nutrition_InfoReq';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import IngredientService from '@/lib/services/ingredientService';
import IngredientTypeService from '@/lib/services/ingredientTypeService';
import { convertToSnakeCase } from '@/utils/format';
import { ArrowBack, Close } from '@mui/icons-material';
import {
  Autocomplete,
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
  InputAdornment,
  Slide,
  Switch,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
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

class IngredientReqCreator implements CreateIngredientReq {
  name: string;
  image: string;
  isLiquid: boolean;
  ratio: number;
  ingredient_type: { id: number };
  nutrition_info: Nutrition_InfoReq;

  constructor(
    name: string = '',
    image: string = '',
    isLiquid: boolean = false,
    ratio: number = 0,
    ingredient_type: { id: number } = { id: 0 },
    nutrition_info: Nutrition_InfoReq = {
      calories: 0,
      fat: 0,
      saturated_fat: 0,
      trans_fat: 0,
      cholesterol: 0,
      carbohydrates: 0,
      fiber: 0,
      sugars: 0,
      protein: 0,
      sodium: 0,
      vitaminD: 0,
      calcium: 0,
      iron: 0,
      potassium: 0,
    }
  ) {
    this.name = name;
    this.image = image;
    this.isLiquid = isLiquid;
    this.ratio = ratio;
    this.ingredient_type = { ...ingredient_type };
    this.nutrition_info = { ...nutrition_info };
  }

  async getReq(imageFile?: File): Promise<CreateIngredientReq> {
    if (!imageFile) {
      throw new Error('image is required');
    }
    let imagePath = `${StoragePath.INGREDIENT}/${convertToSnakeCase(
      this.name
    )}`;

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
    const req: CreateIngredientReq = {
      name: this.name,
      image: this.image,
      ingredient_type: this.ingredient_type,
      isLiquid: this.isLiquid,
      nutrition_info: this.nutrition_info,
      ratio: this.ratio / 100,
    };
    return req;
  }
  clone(): IngredientReqCreator {
    const cloned = new IngredientReqCreator(
      this.name,
      this.image,
      this.isLiquid,
      this.ratio,
      this.ingredient_type,
      this.nutrition_info
    );
    return cloned;
  }
  static fromEntity(entity: IngredientEntity): IngredientReqCreator {
    const entityClone = { ...entity };
    delete entityClone.nutrition_info.id;
    return new IngredientReqCreator(
      entity.name,
      entity.image,
      entity.isLiquid,
      entity.ratio,
      entity.ingredient_type,
      entity.nutrition_info as Nutrition_InfoReq
    );
  }
}
class IngredientReqPutCreator extends IngredientReqCreator {
  id: number;

  constructor(
    id,
    name: string = '',
    image: string = '',
    isLiquid: boolean = false,
    ratio: number = 0,
    ingredient_type: { id: number } = { id: 0 },
    nutrition_info: Nutrition_InfoReq = {
      calories: 0,
      fat: 0,
      saturated_fat: 0,
      trans_fat: 0,
      cholesterol: 0,
      carbohydrates: 0,
      fiber: 0,
      sugars: 0,
      protein: 0,
      sodium: 0,
      vitaminD: 0,
      calcium: 0,
      iron: 0,
      potassium: 0,
    }
  ) {
    super(name, image, isLiquid, ratio, ingredient_type, nutrition_info);
    this.id = id;
  }

  async getReq(imageFile?: File): Promise<UpdateIngredientReq> {
    if (imageFile) {
      let imagePath = this.image;
      if (imagePath) {
        this.image = await uploadImage(imageFile, imagePath);
      } else {
        imagePath = `${StoragePath.INGREDIENT}/${convertToSnakeCase(
          this.name
        )}`;
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
    const req: UpdateIngredientReq = {
      id: this.id,
      name: this.name,
      image: this.image,
      ingredient_type: this.ingredient_type,
      isLiquid: this.isLiquid,
      nutrition_info: this.nutrition_info,
      ratio: this.ratio / 100,
    };
    return req;
  }
  clone(): IngredientReqPutCreator {
    return new IngredientReqPutCreator(
      this.id,
      this.name,
      this.image,
      this.isLiquid,
      this.ratio,
      this.ingredient_type,
      this.nutrition_info
    );
  }
  static fromEntity(entity: IngredientEntity): IngredientReqPutCreator {
    const entityClone = { ...entity };
    delete entityClone.nutrition_info.id;
    const creator = new IngredientReqPutCreator(
      entity.id,
      entity.name,
      entity.image,
      entity.isLiquid,
      entity.ratio,
      entity.ingredient_type,
      entity.nutrition_info as Nutrition_InfoReq
    );
    return creator;
  }
}

const DEFAULT_CREATE_FORM = new IngredientReqCreator('');

const AdminIngredientCreate: FC = () => {
  //#region Hooks

  const [snackbarAlert] = useSnackbarService();
  const { id } = useParams();

  //#endregion
  //#region Mode

  const [mode, setMode] = useState<FormMode>('create');
  const switchModeToEdit = () => {
    if (!form || !('id' in form)) return;

    setMode('edit');
    let path: string = PageRoute.Admin.Ingredients.Edit;
    path = path.replace(':id', form?.id?.toString() || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };
  const switchModeToView = (id?: number) => {
    if (!id) return;

    setMode('view');
    let path: string = PageRoute.Admin.Ingredients.View;
    path = path.replace(':id', id.toString() || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };

  //#endregion
  //#region Navigation

  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigateBack = () => {
    navigate(PageRoute.Admin.Ingredients.Index);
  };

  //#endregion
  //#region Form

  const [createForm, setCreateForm] =
    useState<IngredientReqCreator>(DEFAULT_CREATE_FORM);
  const [updateForm, setUpdateForm] = useState<IngredientReqPutCreator>();
  const [viewForm, setViewForm] = useState<IngredientEntity>();

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
        const row = await IngredientService.GetById(parseInt(id));
        if (!active) return;
        setViewForm(row);
        setUpdateForm(IngredientReqPutCreator.fromEntity(row));
      } catch {
        setViewForm(undefined);
        setUpdateForm(undefined);
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

  const validate = () => {
    if (!form.name) {
      snackbarAlert('Vui lòng nhập tên nguyên liệu!', 'warning');
      return false;
    }
    if (
      (form instanceof IngredientReqCreator ||
        form instanceof IngredientReqPutCreator) &&
      !form.ingredient_type.id
    ) {
      snackbarAlert('Vui lòng chọn loại nguyên liệu!', 'warning');
      return false;
    }
    return true;
  };

  const handleCreateSubmit = async () => {
    if (!validate()) return;

    if (!imageFile) {
      snackbarAlert('Vui không tải ảnh nguyên liệu!', 'warning');
      return;
    }

    setLoading(true);

    try {
      const reqBody = await createForm.getReq(imageFile);
      console.log(reqBody);
      const createdRow = await IngredientService.Add(reqBody);
      switchModeToView(createdRow.id);
      snackbarAlert('Nguyên liệu mới đã thêm thành công!', 'success');
    } catch (err) {
      snackbarAlert('Nguyên liệu mới đã không được thêm!', 'warning');
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!validate()) return;

    if (!form.image && !imageFile) {
      snackbarAlert('Vui lòng tải ảnh nguyên này!', 'warning');
      return;
    }

    setLoading(true);

    try {
      const reqBody = await updateForm.getReq(imageFile);
      console.log(reqBody);
      const updatedRow = await IngredientService.Update(reqBody);
      console.log(updatedRow);

      switchModeToView(parseInt(id));
      snackbarAlert('Nguyên liệu cập nhật thành công!', 'success');
    } catch (err) {
      console.log(err);
      snackbarAlert('Nguyên liệu đã không được cập nhật', 'warning');
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
      snackbarAlert('Nguyên liệu đã không được xóa', 'warning');
      return;
    }

    setLoading(true);

    try {
      await IngredientService.DeleteIngredient(Number(id));
      snackbarAlert('Nguyên liệu đã được xóa thành công', 'success');
      navigate(PageRoute.Admin.Ingredients.Index);
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
            >
              <ArrowBack />
            </IconButton>
            <FormTitle>
              {mode === 'create' ? 'Thêm nguyên liệu' : 'Sửa nguyên liệu'}
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

function NutritionInfoTextField(props: TextFieldProps & { unit?: string }) {
  return (
    <TastealTextField
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: props.unit ? (
          <InputAdornment position="end">{props.unit}</InputAdornment>
        ) : undefined,
      }}
      size="small"
      type="number"
    />
  );
}

type FormProps = {
  value: IngredientReqCreator | IngredientReqPutCreator | IngredientEntity;
  setValue:
    | Dispatch<SetStateAction<IngredientReqCreator>>
    | Dispatch<SetStateAction<IngredientReqPutCreator>>
    | Dispatch<SetStateAction<IngredientEntity>>;
  disabled?: boolean;
};

const Form: FC<FormProps> = ({ value, setValue, disabled = false }) => {
  const [types, setTypes] = useState<Ingredient_TypeEntity[]>([]);
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const types = await IngredientTypeService.GetAllIngredientTypes();

        if (!active) return;

        setTypes(types);
      } catch (err) {
        console.log(err);
        setTypes([]);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const selectedType: Ingredient_TypeEntity | undefined = useMemo(() => {
    if (
      value instanceof IngredientReqCreator ||
      value instanceof IngredientReqPutCreator
    ) {
      return (
        types.find((type) => type.id === value?.ingredient_type.id) || null
      );
    } else {
      return types.find((type) => type.id === value?.type_id) || null;
    }
  }, [types, value]);

  return (
    <Stack gap={2}>
      <Stack>
        <FormLabel>Tên nguyên liệu</FormLabel>
        <TastealTextField
          placeholder="Táo đen"
          value={value?.name || ''}
          onChange={(e) =>
            setValue((prev) => {
              if (
                prev instanceof IngredientReqCreator ||
                prev instanceof IngredientReqPutCreator
              ) {
                console.log('run');
                const clone = prev.clone();
                clone.name = e.target.value;
                return clone;
              }
              console.log('run');
              return { ...prev, name: e.target.value };
            })
          }
          disabled={disabled}
        />
      </Stack>
      <Stack>
        <FormLabel>Loại nguyên liệu</FormLabel>
        <Autocomplete
          options={types}
          getOptionLabel={(o) => o.name}
          title="Chọn loại nguyên liệu"
          placeholder="Chọn loại cho nguyên liệu"
          noOptionsText="Không tìm thấy loại nguyên liệu nào"
          renderInput={(params) => (
            <TastealTextField {...params} label="Chọn loại" />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={selectedType}
          onChange={(_, value) =>
            setValue((prev) => {
              if (
                prev instanceof IngredientReqCreator ||
                prev instanceof IngredientReqPutCreator
              ) {
                const clone = prev.clone();
                console.log(clone);
                console.log(value);
                clone.ingredient_type.id = value
                  ? value.id
                  : prev.ingredient_type.id;
                return clone;
              }
              return {
                ...prev,
                type_id: value ? prev.type_id : value.id,
              };
            })
          }
          disabled={disabled}
        />
      </Stack>
      <Divider flexItem sx={{ opacity: 0.5 }} />
      <Stack>
        <FormLabel>Thành phần dinh dưỡng</FormLabel>
        <Stack gap={2}>
          <NutritionInfoTextField
            label="Calories"
            value={value?.nutrition_info.calories || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.calories = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    calories: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Chất béo (Fat)"
            unit="g"
            value={value?.nutrition_info.fat || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.fat = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    fat: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Chất béo bão hóa (Saturated fat)"
            unit="g"
            value={value?.nutrition_info.saturated_fat || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.saturated_fat = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    saturated_fat: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Chất béo trans (Trans fat)"
            unit="g"
            value={value?.nutrition_info.trans_fat || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.trans_fat = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    trans_fat: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Cholesterol"
            unit="mg"
            value={value?.nutrition_info.cholesterol || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.cholesterol = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    cholesterol: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Carbohydrates"
            unit="g"
            value={value?.nutrition_info.carbohydrates || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.carbohydrates = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    carbohydrates: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Chất xơ (Fiber)"
            unit="g"
            value={value?.nutrition_info.fiber || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.fiber = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    fiber: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Đường (Sugars)"
            unit="g"
            value={value?.nutrition_info.sugars || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.sugars = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    sugars: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Chất đạm (Protein)"
            unit="g"
            value={value?.nutrition_info.protein || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.protein = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    protein: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Natri (Sodium)"
            unit="mg"
            value={value?.nutrition_info.sodium || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.sodium = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    sodium: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Vitamin D"
            unit="mcg"
            value={value?.nutrition_info.vitaminD || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.vitaminD = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    vitaminD: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Canxi (Calcium)"
            unit="mcg"
            value={value?.nutrition_info.calcium || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.calcium = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    calcium: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Sắt (Iron)"
            unit="mg"
            value={value?.nutrition_info.iron || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.iron = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    iron: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Kali (Potassium)"
            unit="mg"
            value={value?.nutrition_info.potassium || 0}
            onChange={(e) =>
              setValue((prev) => {
                if (
                  value instanceof IngredientReqCreator ||
                  value instanceof IngredientReqPutCreator
                ) {
                  const clone = value.clone();
                  clone.nutrition_info.potassium = Number(e.target.value);
                  return clone;
                }
                return {
                  ...prev,
                  nutrition_info: {
                    ...prev.nutrition_info,
                    potassium: Number(e.target.value),
                  },
                };
              })
            }
            disabled={disabled}
          />
        </Stack>
      </Stack>
      <Divider flexItem sx={{ opacity: 0.5 }} />
      <Grid container columnSpacing={1}>
        <Grid item xs={6}>
          <Stack>
            <FormLabel>Tỉ lệ quy đổi</FormLabel>
            <TastealTextField
              placeholder="0.5"
              value={value?.ratio || 0}
              onChange={(e) =>
                setValue((prev) => {
                  if (
                    prev instanceof IngredientReqCreator ||
                    prev instanceof IngredientReqPutCreator
                  ) {
                    const clone = prev.clone();
                    clone.ratio = Number(e.target.value);
                    return clone;
                  }
                  return {
                    ...prev,
                    ratio: Number(e.target.value),
                  };
                })
              }
              disabled={disabled}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack>
            <FormLabel>Là chất lỏng</FormLabel>
            <Switch
              value={value?.isLiquid || false}
              onChange={(_, checked) =>
                setValue((prev) => {
                  if (
                    prev instanceof IngredientReqCreator ||
                    prev instanceof IngredientReqPutCreator
                  ) {
                    const clone = prev.clone();
                    clone.isLiquid = checked;
                    return clone;
                  }
                  return {
                    ...prev,
                    isLiquid: checked,
                  };
                })
              }
              disabled={disabled}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AdminIngredientCreate;
