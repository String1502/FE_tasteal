import { RecipeRes } from '@/lib/models/dtos/Response/RecipeRes/RecipeRes';
import {
  RecommendMealPlanRes,
  getLabelResult,
} from '@/lib/models/dtos/Response/RecommendMealPlanRes/RecommendMealPlanRes';
import { DateDisplay } from '@/pages/MealPlanner';
import { Box, CardActionArea, Grid, Stack, Typography } from '@mui/material';
import { DataStep2 } from './RecommendCalorieStep2';
import CustomCard from '@/components/common/card/CustomCard';
import ImageRecipe from '@/components/common/card/ImageRecipe';
import TotalTimeRecipe from '@/components/common/card/TotalTimeRecipe';

const imgHeight = '84px';
const padding = 1.4;

function ResultRecommendCalorie({
  result,
  displayData,
  step2Value,
  recipeAdd,
  recipeRemove,
}: {
  result: RecommendMealPlanRes;
  displayData: DateDisplay;
  step2Value: DataStep2;
  recipeAdd:
    | (RecipeRes & {
        amount: number;
      })[]
    | undefined;
  recipeRemove:
    | (RecipeRes & {
        amount: number;
      })[]
    | undefined;
}) {
  return (
    <Stack gap={2} sx={{ width: '100%' }} direction={'column'}>
      <Typography
        variant="body1"
        fontWeight={'bold'}
        sx={{
          width: '100%',
          textAlign: 'center',
          mt: 2,
          p: 1,
          bgcolor:
            result.state === 'equal'
              ? 'primary.main'
              : result.state === 'smaller'
              ? 'warning.main'
              : 'error.main',
          color: 'white',
          borderRadius: '24px',
        }}
      >
        {getLabelResult(result.state)}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={'400'}
        sx={{
          width: '100%',
          textAlign: 'center',
          color: 'primary.main',
        }}
      >
        {displayData.label +
          ' • ' +
          displayData.date.toLocaleDateString('vi-VN') +
          ' • ' +
          displayData.planItems.length +
          ' công thức'}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={'400'}
        sx={{
          flex: 1,
          textAlign: 'center',
          borderRadius: '24px',
          color: 'primary.main',
        }}
      >
        {getLabelInfor(step2Value)}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={'400'}
        sx={{
          flex: 1,
          textAlign: 'center',
          borderRadius: '24px',
          color: 'primary.main',
        }}
      >
        {`Thói quen sinh hoạt: ${step2Value.rate.label}`}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={'400'}
        sx={{
          flex: 1,
          textAlign: 'center',
          borderRadius: '24px',
          color: 'primary.main',
        }}
      >
        Mức calo tiêu chuẩn cho mục tiêu: {Math.round(result.standard_calories)}
        {' • '}Mức calo thực sự bạn tiêu thụ:{' '}
        {getRealCalorie(result, recipeAdd, recipeRemove)}
      </Typography>

      {!recipeAdd && !recipeRemove && (
        <Typography
          sx={{
            width: '100%',
            textAlign: 'center',
            p: 1,
            bgcolor: 'grey.600',
            color: 'white',
            borderRadius: '24px',
          }}
        >
          Chờ chút xíu...
        </Typography>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {recipeAdd && recipeAdd.length > 0 && (
            <>
              <Typography
                variant="body2"
                fontWeight={'900'}
                sx={{
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  bgcolor: 'grey.600',
                  borderRadius: '24px',
                  p: 1,
                }}
              >
                Gợi ý bổ sung
              </Typography>

              <Stack
                gap={2}
                direction={'row'}
                flexWrap={'wrap'}
                sx={{
                  width: '100%',
                }}
              >
                {recipeAdd.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      width: { xs: 'calc(100%/4)', md: 'calc(100%/2)' },
                      p: 1,
                    }}
                  >
                    <CalorieCard item={item} />
                  </Box>
                ))}
              </Stack>
            </>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {recipeRemove && recipeRemove.length > 0 && (
            <>
              <Typography
                variant="body2"
                fontWeight={'900'}
                sx={{
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  bgcolor: 'grey.600',
                  borderRadius: '24px',
                  p: 1,
                }}
              >
                Gợi ý loại bỏ
              </Typography>

              <Stack
                gap={2}
                direction={'row'}
                flexWrap={'wrap'}
                sx={{
                  width: '100%',
                }}
              >
                {recipeRemove.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      width: { xs: 'calc(100%/4)', md: 'calc(100%/2)' },
                      p: 1,
                    }}
                  >
                    <CalorieCard item={item} />
                  </Box>
                ))}
              </Stack>
            </>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ResultRecommendCalorie;

function getRealCalorie(
  result: RecommendMealPlanRes,
  recipeAdd: (RecipeRes & { amount: number })[],
  recipeRemove: (RecipeRes & { amount: number })[]
) {
  if (!result || !recipeAdd || !recipeRemove) {
    return '--';
  }
  let realCalorie: number = result.real_calories;

  let recipeAddCalorie: number = recipeAdd
    .map(
      (item) => (item.nutrition_info.calories * item.amount) / item.serving_size
    )
    .reduce((a, b) => a + b, 0);
  let recipeRemoveCalorie: number = recipeRemove
    .map(
      (item) => (item.nutrition_info.calories * item.amount) / item.serving_size
    )
    .reduce((a, b) => a + b, 0);

  return Math.round(realCalorie - recipeAddCalorie + recipeRemoveCalorie);
}

export function CalorieCard({
  item,
}: {
  item: RecipeRes & {
    amount: number;
  };
}) {
  return (
    <CustomCard>
      <CardActionArea>
        <ImageRecipe
          imgHeight={imgHeight}
          src={item.image}
          alt={item.name}
          quality={1}
        />

        <TotalTimeRecipe
          imgHeight={imgHeight}
          padding={padding}
          totalTime={item.totalTime}
        />
      </CardActionArea>

      <Box
        sx={{
          p: padding,
        }}
      >
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="body2">Tên</Typography>
          <Typography variant="body2" fontWeight={'bold'}>
            {item.name}
          </Typography>
        </Stack>

        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="body2">Số lượng</Typography>
          <Typography variant="body2" fontWeight={'bold'}>
            {item.amount}
          </Typography>
        </Stack>

        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="body2">Calorie</Typography>
          <Typography variant="body2" fontWeight={'bold'}>
            {Math.round(item.nutrition_info.calories / item.serving_size)}
          </Typography>
        </Stack>
      </Box>
    </CustomCard>
  );
}

function getLabelInfor(value: DataStep2) {
  if (!value) {
    return '--';
  }
  return `${value.gender.value ? 'Nam giới' : 'Nữ giới'} • Nặng ${
    value.weight
  }kg • Cao ${value.height}cm • ${value.age} tuổi • Mong muốn ${
    value.intend.label
  }`;
}
