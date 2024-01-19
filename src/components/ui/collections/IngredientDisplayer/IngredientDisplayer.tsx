import SectionHeading from '@/components/common/typos/SectionHeading';
import { IngredientRes } from '@/lib/models/dtos/Response/IngredientRes/IngredientRes';
import { Grid, Stack, Typography } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import ServingSizeSelect from '../../selects/ServingSizeSelect';
import IngredientDisplayerItemList from '../IngredientDisplayerItemList';

export type IngredientDisplayerProps = {
  ingredients: IngredientRes[];
};

const IngredientDisplayer: FC<IngredientDisplayerProps> = ({ ingredients }) => {
  const [servingSize, setServingSize] = useState(1);

  const handleServingSizeChange = useCallback((value: number) => {
    setServingSize(value);
  }, []);

  return (
    <Stack gap={2}>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <SectionHeading>Nguyên liệu</SectionHeading>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            gap={2}
            justifyContent={{
              xs: 'space-between',
              md: 'flex-end',
            }}
          >
            <Typography color="primary.main">Khẩu phần</Typography>
            <ServingSizeSelect
              servingSize={servingSize}
              onServingSizeChange={handleServingSizeChange}
              size="small"
              sx={{
                backgroundColor: 'background.default',
              }}
            />
          </Stack>
        </Grid>
      </Grid>
      <IngredientDisplayerItemList
        ingredients={ingredients}
        servingSize={servingSize}
      />
    </Stack>
  );
};

export default IngredientDisplayer;
