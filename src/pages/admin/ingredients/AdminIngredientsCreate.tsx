import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormLabel from '@/components/common/typos/FormLabel';
import FormTitle from '@/components/common/typos/FormTitle';
import TabCode from '@/lib/enums/AdminTabCode';
import useAdminPageContext from '@/lib/hooks/useAdminPageContext';
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
  const { navigateTo } = useAdminPageContext();
  const [formData, setFormData] = useState<IngredientCreateFormData>({
    name: '',
    type_id: null,
  });

  const handleSubmit = useCallback(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Stack alignItems={'start'} p={4} gap={4}>
      <Stack direction="row" gap={1}>
        <IconButton
          sx={{
            borderRadius: 4,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
          }}
          onClick={() => navigateTo(TabCode.IngredientIndex)}
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
            onChange={(_, value) =>
              setFormData((prev) => ({ ...prev, type_id: value?.id }))
            }
          />
        </Stack>
      </Stack>

      <Button variant="contained" onClick={handleSubmit} sx={{ width: 240 }}>
        Thêm
      </Button>
    </Stack>
  );
};

export default AdminIngredientCreate;
