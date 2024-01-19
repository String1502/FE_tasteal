import { RecipeRes } from '@/lib/models/dtos/Response/RecipeRes/RecipeRes';
import {
  RecommendMealPlanRes,
  getLabelResult,
} from '@/lib/models/dtos/Response/RecommendMealPlanRes/RecommendMealPlanRes';
import RecipeService from '@/lib/services/recipeService';
import { DateDisplay } from '@/pages/MealPlanner';
import { Box, CardActionArea, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataStep2 } from './RecommendCalorieStep2';
import CustomCard from '@/components/common/card/CustomCard';
import ImageRecipe from '@/components/common/card/ImageRecipe';
import TotalTimeRecipe from '@/components/common/card/TotalTimeRecipe';
import NameRecipe from '@/components/common/card/NameRecipe';

const imgHeight = '84px';
const padding = 1.4;

function ResultRecommendCalorie({
  result,
  displayData,
  step2Value,
}: {
  result: RecommendMealPlanRes;
  displayData: DateDisplay;
  step2Value: DataStep2;
}) {
  const [recipeAdd, setRecipeAdd] = useState<RecipeRes[] | undefined>(
    undefined
  );

  const [recipeRemove, setRecipeRemove] = useState<RecipeRes[] | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetch() {
      try {
        await Promise.all(
          result.recipe_add_ids.map(
            async (id) => await RecipeService.GetById(id.id)
          )
        ).then((data) => {
          setRecipeAdd(data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetch();
  }, [result.recipe_add_ids]);

  useEffect(() => {
    async function fetch() {
      try {
        await Promise.all(
          result.recipe_remove_ids.map(
            async (id) => await RecipeService.GetById(id)
          )
        ).then((data) => {
          setRecipeRemove(data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetch();
  }, [result.recipe_remove_ids]);

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
          ' công thức' +
          ' • ' +
          'Mục tiêu: ' +
          step2Value?.intend?.label}
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
        Calo tiêu chuẩn cho mục tiêu: {Math.round(result.standard_calories)}
        {' • '}Calo thực sự bạn tiêu thụ: {Math.round(result.real_calories)}
      </Typography>

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
            Gợi ý bổ sung công thức
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
                  width: 'calc(100%/4)',
                  p: 1,
                }}
              >
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
                      <Typography variant="body2" fontWeight={'bold'}>
                        Số lượng
                      </Typography>
                      <Typography variant="body2" fontWeight={'bold'}>
                        5
                      </Typography>
                    </Stack>
                    <NameRecipe name={item.name} />
                  </Box>
                </CustomCard>
              </Box>
            ))}
          </Stack>
        </>
      )}

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
            Gợi ý bỏ công thức
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
                  width: 'calc(100%/4)',
                  p: 1,
                }}
              >
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
                      <Typography variant="body2" fontWeight={'bold'}>
                        Số lượng
                      </Typography>
                      <Typography variant="body2" fontWeight={'bold'}>
                        5
                      </Typography>
                    </Stack>
                    <NameRecipe name={item.name} />
                  </Box>
                </CustomCard>
              </Box>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default ResultRecommendCalorie;
