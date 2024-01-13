import AppContext from '@/lib/contexts/AppContext';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { CustomAccodion } from './CustomAccodion';
import SlideInDialog from '@/components/common/dialog/SlideInDialog';
import IngredientService from '@/lib/services/ingredientService';

export type DisplayIngredientType = {
  ingredientType: Ingredient_TypeEntity;
  ingredients: IngredientEntity[];
};

function IngredientTypeContent({
  watchingId,
}: {
  watchingId: Ingredient_TypeEntity['id'];
}) {
  const { popOverHeader } = useContext(AppContext);

  const [data, setData] = React.useState<DisplayIngredientType[]>([]);

  const [ingredients, setIngredients] = React.useState<IngredientEntity[]>([]);

  useEffect(() => {
    async function fetch() {
      try {
        const ingres = await IngredientService.GetAll();
        setIngredients(ingres);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    if (
      popOverHeader &&
      popOverHeader.ingredientTypes.length > 0 &&
      ingredients.length > 0
    ) {
      setData(
        popOverHeader.ingredientTypes.map((item) => {
          return {
            ingredientType: item,
            ingredients: ingredients.filter((i) => i.type_id == item.id),
          };
        })
      );
    }
  }, [popOverHeader?.ingredientTypes, ingredients]);

  // Dialog
  const [ingredient, setIngredient] = useState<IngredientEntity | undefined>(
    undefined
  );

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = (item: IngredientEntity) => {
    setIngredient(item);
    setOpenDialog(true);
  };
  const handleCloseRenameDialog = () => setOpenDialog(false);

  return (
    <Stack direction={'column'} spacing={2}>
      {data.length > 0 ? (
        <>
          {data.map((item) => {
            return (
              <CustomAccodion
                key={item.ingredientType.id}
                item={item}
                watchingId={watchingId}
                handleOpenDialog={handleOpenDialog}
              />
            );
          })}
        </>
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{
            height: '500px',
            width: '100%',
          }}
        />
      )}

      <SlideInDialog
        open={openDialog}
        handleClose={handleCloseRenameDialog}
        title={ingredient?.name ?? 'Dinh dưỡng'}
        content={
          <>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
              }}
            >
              Hàm lượng dinh dưỡng trên 100g/ml thực phẩm
            </Typography>
            {ingredient && (
              <Stack
                direction={'column'}
                spacing={1}
                divider={
                  <Divider
                    flexItem
                    orientation="horizontal"
                    sx={{ borderColor: 'grey.300' }}
                  />
                }
              >
                {Object.entries(ingredient.nutrition_info)
                  .slice(1)
                  .map((item, index) => {
                    const special = [2, 3, 6, 7].includes(index);
                    return (
                      <Stack
                        key={index}
                        direction={'row'}
                        justifyContent={'space-between'}
                        sx={{
                          pl: special ? 3 : 0,
                        }}
                      >
                        <Typography fontWeight={special ? 'light' : 'bold'}>
                          {item[0]}
                        </Typography>
                        <Typography fontWeight={special ? 'light' : 'bold'}>
                          {item[1] + (0 == index ? ' kcal' : ' g')}
                        </Typography>
                      </Stack>
                    );
                  })}
              </Stack>
            )}
          </>
        }
      />
    </Stack>
  );
}

export default IngredientTypeContent;
