import { useAppDispatch, useAppSelector } from '@/app/hook';
import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormLabel from '@/components/common/typos/FormLabel';
import FormTitle from '@/components/common/typos/FormTitle';
import { navigateTo } from '@/features/admin/adminSlice';
import TabCode from '@/lib/enums/AdminTabCode';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { IngredientRes } from '@/lib/models/dtos/Response/IngredientRes/IngredientRes';
import { ArrowBack } from '@mui/icons-material';
import { Autocomplete, Button, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useCallback, useState } from 'react';

const options: { id: number; name: string }[] = [
  {
    id: 1,
    name: 'test 01',
  },
  {
    id: 2,
    name: 'test 02',
  },
  {
    id: 3,
    name: 'test 03',
  },
];

type IngredientCreateFormData = {
  name: string;
  type_id: number | null;
};

const AdminIngredientCreate: FC = () => {
  const [snackbarAlert] = useSnackbarService();
  const params: IngredientRes = useAppSelector((state) => state.admin.params);
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<'view' | 'create' | 'edit'>(
    params ? 'edit' : 'create'
  );

  const [formData, setFormData] = useState<IngredientCreateFormData>(
    params
      ? {
          name: params.name,
          type_id: 1,
          // TODO: this somehow don't has type_id
          // type_id: params.type_id,
        }
      : {
          name: '',
          type_id: null,
        }
  );

  const handleSubmit = useCallback(() => {
    console.log(formData);
    snackbarAlert('Đã thêm nguyên liệu thành công');
    dispatch(navigateTo({ tab: TabCode.IngredientIndex, params: null }));
  }, [dispatch, formData, snackbarAlert]);

  return (
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
          onClick={() =>
            dispatch(navigateTo({ tab: TabCode.IngredientIndex, params: null }))
          }
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
            options={options}
            getOptionLabel={(o) => o.name}
            title="Chọn loại nguyên liệu"
            placeholder="Chọn loại cho nguyên liệu"
            noOptionsText="Không tìm thấy loại nguyên liệu nào"
            renderInput={(params) => (
              <TastealTextField {...params} label="Chọn dịp" />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={options.find((o) => o.id === formData.type_id)}
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
  );
};

export default AdminIngredientCreate;
