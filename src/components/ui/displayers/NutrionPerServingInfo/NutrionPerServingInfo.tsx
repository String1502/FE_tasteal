import SectionHeading from '@/components/common/typos/SectionHeading';
import { Nutrition_InfoEntity } from '@/lib/models/entities/Nutrition_InfoEntity/Nutrition_InfoEntity';
import { Button, Grid, Stack } from '@mui/material';
import { FC } from 'react';
import NutrionInfo, { NutrionType } from './NutrionInfo/NutrionInfo';

export type NutrionPerServingInfoProps = {
  nutritionInfo: Nutrition_InfoEntity;
  onClick: () => void;
};

const NutrionPerServingInfo: FC<NutrionPerServingInfoProps> = ({
  nutritionInfo,
  onClick,
}) => {
  return (
    <Stack gap={1}>
      <Grid container>
        <Grid item sm={8} xs={12}>
          <SectionHeading>
            Hàm lượng dinh dưỡng trên khẩu phần ăn
          </SectionHeading>
        </Grid>
        <Grid
          item
          sm={4}
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: 'flex-end',
            },
          }}
        >
          <Button
            onClick={onClick}
            sx={{
              color: 'primary.main',
              fontSize: '14px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
          >
            Xem tất cả
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <NutrionInfo
            type={NutrionType.calories}
            value={nutritionInfo.calories}
          />
        </Grid>
        <Grid item xs>
          <NutrionInfo
            type={NutrionType.fat}
            value={nutritionInfo.fat}
            withGrams
          />
        </Grid>
        <Grid item xs>
          <NutrionInfo
            type={NutrionType.protein}
            value={nutritionInfo.protein}
            withGrams
          />
        </Grid>
        <Grid item xs>
          <NutrionInfo
            type={NutrionType.carbs}
            value={nutritionInfo.carbohydrates}
            withGrams
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default NutrionPerServingInfo;
