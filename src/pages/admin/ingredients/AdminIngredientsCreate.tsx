import { useAppSelector } from '@/app/hook';
import ImagePicker from '@/components/common/files/ImagePicker';
import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormLabel from '@/components/common/typos/FormLabel';
import FormTitle from '@/components/common/typos/FormTitle';
import AdminLayout from '@/components/ui/layout/AdminLayout';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
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
import { useNavigate } from 'react-router-dom';

const AdminIngredientCreate: FC = () => {
  //#region Hooks

  const [snackbarAlert] = useSnackbarService();
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState<IngredientEntity>(
    editIngredient ? editIngredient : ({} as IngredientEntity)
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  function imageFileChange(file: File) {
    setImageFile(file);
  }

  const handleSubmit = useCallback(() => {
    console.log(formData);
    snackbarAlert('Đã thêm nguyên liệu thành công');
  }, [formData, snackbarAlert]);

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
  console.log(ingredientTypes);

  //#endregion

  function handleNavigateBack() {
    navigate('/admin/ingredients');
  }

  console.log(formData);

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
          <FormTitle>Thêm nguyên liệu</FormTitle>
        </Stack>

        <Grid container>
          <Grid item xs={3}>
            <Stack>
              <FormLabel>Hình ảnh</FormLabel>
              <ImagePicker
                file={imageFile}
                imagePath={formData.image}
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
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
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
                    <TastealTextField {...params} label="Chọn dịp" />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  value={[].find((o) => o.id === formData.type_id)}
                  onChange={(_, value) =>
                    setFormData((prev) => ({ ...prev, type_id: value?.id }))
                  }
                />
              </Stack>
              <Divider flexItem sx={{ opacity: 0.5 }} />
              <Stack>
                <FormLabel>Thành phần dinh dưỡng</FormLabel>
                <Stack gap={1}>
                  <NutritionInfoTextField label="Calories" />
                  <NutritionInfoTextField label="Chất béo (Fat)" unit="g" />
                  <NutritionInfoTextField
                    label="Chất béo bão hóa (Saturated fat)"
                    unit="g"
                  />
                  <NutritionInfoTextField
                    label="Chất béo trans (Trans fat)"
                    unit="g"
                  />
                  <NutritionInfoTextField label="Cholesterol" unit="mg" />
                  <NutritionInfoTextField label="Carbonhydrate" unit="g" />
                  <NutritionInfoTextField label="Chất xơ (Fiber)" unit="g" />
                  <NutritionInfoTextField label="Đường (Sugars)" unit="g" />
                  <NutritionInfoTextField label="Chất đạm (Protein)" unit="g" />
                  <NutritionInfoTextField label="Natri (Sodium)" unit="mg" />
                  <NutritionInfoTextField label="Vitamin D" unit="mcg" />
                  <NutritionInfoTextField label="Canxi (Calcium)" unit="mcg" />
                  <NutritionInfoTextField label="Sắt (Iron)" unit="mg" />
                  <NutritionInfoTextField label="Kali (Potassium)" unit="mg" />
                </Stack>
              </Stack>
              <Divider flexItem sx={{ opacity: 0.5 }} />
              <Grid container columnSpacing={1}>
                <Grid item xs={6}>
                  <Stack>
                    <FormLabel>Tỉ lệ quy đổi</FormLabel>
                    <TastealTextField placeholder="0.5" />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <FormLabel>Là chất lỏng</FormLabel>
                    <Switch />
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
