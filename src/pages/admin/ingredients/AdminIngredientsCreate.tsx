import { useAppSelector } from '@/app/hook';
import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormLabel from '@/components/common/typos/FormLabel';
import FormTitle from '@/components/common/typos/FormTitle';
import AdminLayout from '@/components/ui/layout/AdminLayout';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { ArrowBack } from '@mui/icons-material';
import { Autocomplete, Button, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const DEFAULT_INGREDIENT: Omit<IngredientEntity, 'id'> = {
//   name: '',
//   isLiquid: false,
//   image: '',
//   ingredient_type: { id: 0, name: '' },
//   ingredient
// }

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

  const handleSubmit = useCallback(() => {
    console.log(formData);
    snackbarAlert('Đã thêm nguyên liệu thành công');
  }, [formData, snackbarAlert]);

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

        <Stack gap={1}>
          <Stack>
            <FormLabel>Tên nguyên liệu</FormLabel>
            <TastealTextField
              label="Tên nguyên liệu"
              placeholder="Tên nguyên liệu"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Stack>

          <Stack>
            <FormLabel>Loại nguyên liệu</FormLabel>
            <Autocomplete
              options={[]}
              getOptionLabel={(o) => o.name}
              title="Chọn loại nguyên liệu"
              placeholder="Chọn loại cho nguyên liệu"
              noOptionsText="Không tìm thấy loại nguyên liệu nào"
              renderInput={(params) => (
                <TastealTextField {...params} label="Chọn dịp" />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={[].find((o) => o.id === formData.type_id)}
              onChange={(_, value) =>
                setFormData((prev) => ({ ...prev, type_id: value?.id }))
              }
            />
          </Stack>
        </Stack>

        <Button variant="contained" onClick={handleSubmit} sx={{ width: 240 }}>
          {mode === 'create' ? 'Thêm' : mode === 'edit' ? 'Sửa' : 'Lỗi'}
        </Button>
      </Stack>
    </AdminLayout>
  );
};

export default AdminIngredientCreate;
