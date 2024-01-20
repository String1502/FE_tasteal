import useSnackbarService from '@/lib/hooks/useSnackbar';
import { RecommendMealPlanReq } from '@/lib/models/dtos/Request/RecommendMealPlanReq/RecommendMealPlanReq';
import { DateDisplay } from '@/pages/MealPlanner';
import { Button, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';

export type DataStep2 = {
  weight?: number;
  height?: number;
  age?: number;
  gender?: CalorieGender;
  rate?: CalorieRate;
  intend?: CalorieIntend;
};

type CalorieRate = {
  rate: 1.2 | 1.375 | 1.55 | 1.725 | 1.9;
  label: string;
};

type CalorieIntend = {
  label: string;
  value: boolean | null;
};

type CalorieGender = {
  label: string;
  value: boolean;
};

const calorieRates: CalorieRate[] = [
  {
    rate: 1.2,
    label: 'Ít vận động (Người chỉ ăn, ngủ, làm việc văn phòng)',
  },
  {
    rate: 1.375,
    label: 'Vận động nhẹ (Người tập luyện thể dục 1 – 3 lần/tuần)',
  },
  {
    rate: 1.55,
    label: 'Vận động vừa (Người vận động hàng ngày, tập luyện 3 – 5 lần/tuần)',
  },
  {
    rate: 1.725,
    label:
      'Vận động nặng (Người vận động thường xuyên, chơi thể dục thể thao và tập luyện từ 6 – 7 lần/ tuần)',
  },
  {
    rate: 1.9,
    label:
      'Vận động rất nặng (Người lao động phổ thông, tập luyện thể dục 2 lần/ngày)',
  },
];

const calorieIntends: CalorieIntend[] = [
  {
    value: false,
    label: 'Giảm cân',
  },
  {
    value: true,
    label: 'Tăng cân',
  },
  {
    value: null,
    label: 'Giữ cân',
  },
];

const calorieGenders: CalorieGender[] = [
  {
    label: 'Nam',
    value: true,
  },
  {
    label: 'Nữ',
    value: false,
  },
];

function RecommendCalorieStep2({
  step2Value,
  handleChangeStep2Value,
  handleBack,
  handleResult,
  displayData,
}: {
  step2Value: DataStep2;
  handleChangeStep2Value: (value: DataStep2) => void;
  handleBack: () => void;
  handleResult: (req: RecommendMealPlanReq) => Promise<void>;
  displayData: DateDisplay;
}) {
  const [snackbarAlert] = useSnackbarService();

  return (
    <Stack direction={'column'} gap={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12 / 5}>
          <TextField
            label={'Cân nặng'}
            value={step2Value.weight}
            onChange={(e) => {
              handleChangeStep2Value({
                ...step2Value,
                weight: Number(e.target.value),
              });
            }}
            InputProps={{
              endAdornment: '(kg)',
              inputComponent: NumberFormat,
            }}
          />
        </Grid>
        <Grid item xs={12} md={12 / 5}>
          <TextField
            label={'Chiều cao'}
            value={step2Value.height}
            onChange={(e) => {
              handleChangeStep2Value({
                ...step2Value,
                height: Number(e.target.value),
              });
            }}
            InputProps={{
              endAdornment: '(cm)',
              inputComponent: NumberFormat,
            }}
          />
        </Grid>

        <Grid item xs={12} md={12 / 5}>
          <TextField
            label={'Độ tuổi'}
            value={step2Value.age}
            onChange={(e) => {
              handleChangeStep2Value({
                ...step2Value,
                age: Number(e.target.value),
              });
            }}
            InputProps={{
              inputComponent: NumberFormat,
            }}
          />
        </Grid>

        <Grid item xs={12} md={12 / 5}>
          <TextField
            label={'Giới tính'}
            select
            sx={{ width: '100%' }}
            value={JSON.stringify(step2Value.gender)}
            onChange={(e) => {
              handleChangeStep2Value({
                ...step2Value,
                gender: JSON.parse(e.target.value),
              });
            }}
          >
            {calorieGenders.map((item, index) => (
              <MenuItem key={index} value={JSON.stringify(item)}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={12 / 5}>
          <TextField
            label={'Mục đích'}
            select
            sx={{ width: '100%' }}
            value={JSON.stringify(step2Value.intend)}
            onChange={(e) => {
              handleChangeStep2Value({
                ...step2Value,
                intend: JSON.parse(e.target.value),
              });
            }}
          >
            {calorieIntends.map((item, index) => (
              <MenuItem key={index} value={JSON.stringify(item)}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label={'Cường độ vận động'}
            select
            sx={{ width: '100%' }}
            value={JSON.stringify(step2Value.rate)}
            onChange={(e) => {
              handleChangeStep2Value({
                ...step2Value,
                rate: JSON.parse(e.target.value),
              });
            }}
          >
            {calorieRates.map((item, index) => (
              <MenuItem key={index} value={JSON.stringify(item)}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Stack direction={'row'}>
        <Button
          variant="contained"
          onClick={async () => {
            if (
              step2Value.weight &&
              step2Value.height &&
              step2Value.age &&
              step2Value.gender &&
              step2Value.intend &&
              step2Value.rate &&
              displayData
            ) {
              const req: RecommendMealPlanReq = {
                recipe_ids: displayData.planItems.map((item) => item.recipe_id),
                weight: step2Value.weight,
                height: step2Value.height,
                age: step2Value.age,
                gender: step2Value.gender.value,
                intend: step2Value.intend.value,
                rate: step2Value.rate.rate,
              };

              await handleResult(req);
            } else {
              snackbarAlert('Vui lòng nhập đủ thông tin', 'error');
            }
          }}
          sx={{
            mt: 1,
            mr: 1,
            fontSize: 'body2.fontSize',
            fontWeight: 'bold',
            boxShadow: 0,
          }}
        >
          Đánh giá
        </Button>
        <Button
          onClick={handleBack}
          sx={{
            mt: 1,
            mr: 1,
            fontSize: 'body2.fontSize',
            fontWeight: 'bold',
            px: 2,
          }}
        >
          Trở về
        </Button>
      </Stack>
    </Stack>
  );
}

export default RecommendCalorieStep2;

function NumberFormat(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}
