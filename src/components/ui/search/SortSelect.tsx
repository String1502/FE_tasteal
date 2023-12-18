import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export type SortType = {
  type: 'name' | 'rating' | 'totalTime' | 'calorie' | 'serving_size';
  sort: 'asc' | 'desc';
};

const keyArray: {
  type: SortType['type'];
  sort: SortType['sort'];
  label: string;
}[] = [
  {
    type: 'name',
    sort: 'asc',
    label: 'Tên (A-Z)',
  },
  {
    type: 'name',
    sort: 'desc',
    label: 'Tên (Z-A)',
  },
  {
    type: 'rating',
    sort: 'asc',
    label: 'Điểm đánh giá tăng dần',
  },
  {
    type: 'rating',
    sort: 'desc',
    label: 'Điểm đánh giá giảm dần',
  },
  {
    type: 'totalTime',
    sort: 'asc',
    label: 'Thời gian chuẩn bị tăng dần',
  },
  {
    type: 'totalTime',
    sort: 'desc',
    label: 'Thời gian chuẩn bị giảm dần',
  },
  {
    type: 'calorie',
    sort: 'asc',
    label: 'Calo tăng dần',
  },
  {
    type: 'calorie',
    sort: 'desc',
    label: 'Calo giảm dần',
  },
  {
    type: 'serving_size',
    sort: 'asc',
    label: 'Số người ăn tăng dần',
  },
  {
    type: 'serving_size',
    sort: 'desc',
    label: 'Số người ăn giảm dần',
  },
];
function SortSelect({
  handleSort,
  sortType,
}: {
  handleSort: ({ type, sort }: SortType) => void;
  sortType: SortType | null;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    const value = JSON.parse(event.target.value);
    handleSort(value ? { type: value.type, sort: value.sort } : null);
  };
  return (
    <FormControl sx={{ width: '180px' }}>
      <Select
        value={JSON.stringify(sortType)}
        onChange={handleChange}
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          fontSize: 'caption.fontSize',
          fontWeight: 'bold',
          py: 0,
          '.MuiSelect-iconOutlined': {
            color: 'white',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              fontSize: 'body2.fontSize',
              mt: 1,
              borderRadius: 4,
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        }}
      >
        <MenuItem
          value="null"
          sx={{
            fontSize: 'inherit',
          }}
        >
          Mặc định
        </MenuItem>
        {keyArray.map((item, i) => (
          <MenuItem
            key={i}
            value={JSON.stringify({ type: item.type, sort: item.sort })}
            sx={{
              fontSize: 'inherit',
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SortSelect;
