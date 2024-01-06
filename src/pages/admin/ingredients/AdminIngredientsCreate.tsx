import { useAppSelector } from '@/app/hook';
import ImagePicker from '@/components/common/files/ImagePicker';
import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormLabel from '@/components/common/typos/FormLabel';
import FormTitle from '@/components/common/typos/FormTitle';
import AdminLayout from '@/components/ui/layout/AdminLayout';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import IngredientService from '@/lib/services/ingredientService';
import IngredientTypeService from '@/lib/services/ingredientTypeService';
import { ArrowBack } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  TextFieldProps,
} from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminIngredientCreate: FC = () => {
  //#region Hooks

  const [snackbarAlert] = useSnackbarService();
  const navigate = useNavigate();
  const { id } = useParams();

  //#endregion
  //#region Redux

  const editIngredient = useAppSelector(
    (state) => state.admin.ingredient.editValue
  );

  //#endregion
  //#region Mode

  const mode = useMemo(() => {
    return editIngredient ? 'edit' : 'create';
  }, [editIngredient]);

  //#endregion
  //#region Form

  const [ingredient, setIngredient] = useState<IngredientEntity | null>(
    editIngredient ? editIngredient : null
  );

  useEffect(() => {
    if (mode === 'edit' || !id) return;

    IngredientService.GetById(parseInt(id))
      .then((ingredient) => setIngredient(ingredient))
      .catch(() => setIngredient(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [imageFile, setImageFile] = useState<File | null>(null);
  function imageFileChange(file: File) {
    setImageFile(file);
  }

  const handleSubmit = useCallback(() => {
    console.log(ingredient);
    snackbarAlert('Đã thêm nguyên liệu thành công');
  }, [ingredient, snackbarAlert]);

  //#endregion
  //#region Ingredient Types

  const [ingredientTypes, setIngredientTypes] = useState<
    Ingredient_TypeEntity[]
  >([]);
  useEffect(() => {
    IngredientTypeService.Get()
      .then(setIngredientTypes)
      .catch((err) => console.log(err));
  }, []);
  const selectedIngredientType = useMemo(() => {
    return ingredientTypes.find((i) => i.id === ingredient?.type_id);
  }, [ingredient?.type_id, ingredientTypes]);

  //#endregion
  //#region Navigation

  function handleNavigateBack() {
    navigate('/admin/ingredients');
  }

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
                imagePath={ingredient?.image || ''}
                onChange={imageFileChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack gap={2}>
              <Stack>
                <FormLabel>Tên nguyên liệu</FormLabel>
                <TastealTextField
                  placeholder="Táo đen"
                  value={ingredient?.name || ''}
                  onChange={(e) =>
                    setIngredient((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </Stack>
              <Stack>
                <FormLabel>Loại nguyên liệu</FormLabel>
                <Autocomplete
                  options={ingredientTypes}
                  getOptionLabel={(o) => o.name}
                  title="Chọn loại nguyên liệu"
                  placeholder="Chọn loại cho nguyên liệu"
                  noOptionsText="Không tìm thấy loại nguyên liệu nào"
                  renderInput={(params) => (
                    <TastealTextField {...params} label="Chọn loại" />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  value={selectedIngredientType}
                  onChange={(_, value) =>
                    setIngredient((prev) => ({
                      ...prev,
                      type_id: value ? prev.type_id : value.id,
                    }))
                  }
                />
              </Stack>
              <Divider flexItem sx={{ opacity: 0.5 }} />
              <Stack>
                <FormLabel>Thành phần dinh dưỡng</FormLabel>
                <Stack gap={2}>
                  <NutritionInfoTextField
                    label="Calories"
                    value={ingredient?.nutrition_info.calories || 0}
                  />
                  <NutritionInfoTextField
                    label="Chất béo (Fat)"
                    unit="g"
                    value={ingredient?.nutrition_info.fat || 0}
                  />
                  <NutritionInfoTextField
                    label="Chất béo bão hóa (Saturated fat)"
                    unit="g"
                    value={ingredient?.nutrition_info.saturated_fat || 0}
                  />
                  <NutritionInfoTextField
                    label="Chất béo trans (Trans fat)"
                    unit="g"
                    value={ingredient?.nutrition_info.trans_fat || 0}
                  />
                  <NutritionInfoTextField
                    label="Cholesterol"
                    unit="mg"
                    value={ingredient?.nutrition_info.cholesterol || 0}
                  />
                  <NutritionInfoTextField
                    label="Carbohydrates"
                    unit="g"
                    value={ingredient?.nutrition_info.carbohydrates || 0}
                  />
                  <NutritionInfoTextField
                    label="Chất xơ (Fiber)"
                    unit="g"
                    value={ingredient?.nutrition_info.fiber || 0}
                  />
                  <NutritionInfoTextField
                    label="Đường (Sugars)"
                    unit="g"
                    value={ingredient?.nutrition_info.sugars || 0}
                  />
                  <NutritionInfoTextField
                    label="Chất đạm (Protein)"
                    unit="g"
                    value={ingredient?.nutrition_info.protein || 0}
                  />
                  <NutritionInfoTextField
                    label="Natri (Sodium)"
                    unit="mg"
                    value={ingredient?.nutrition_info.sodium || 0}
                  />
                  <NutritionInfoTextField
                    label="Vitamin D"
                    unit="mcg"
                    value={ingredient?.nutrition_info.vitaminD || 0}
                  />
                  <NutritionInfoTextField
                    label="Canxi (Calcium)"
                    unit="mcg"
                    value={ingredient?.nutrition_info.calcium || 0}
                  />
                  <NutritionInfoTextField
                    label="Sắt (Iron)"
                    unit="mg"
                    value={ingredient?.nutrition_info.iron || 0}
                  />
                  <NutritionInfoTextField
                    label="Kali (Potassium)"
                    unit="mg"
                    value={ingredient?.nutrition_info.potassium || 0}
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
                      value={ingredient?.ratio || 0}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <FormLabel>Là chất lỏng</FormLabel>
                    <Switch value={ingredient?.isLiquid || false} />
                  </Stack>
                </Grid>
              </Grid>
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
    />
  );
}

export default AdminIngredientCreate;
