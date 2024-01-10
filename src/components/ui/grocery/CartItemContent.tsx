import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Grid,
  Stack,
  Typography,
  TypographyProps,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CartItemFrame from './CartItemFrame';
import CartItemCheckBox from './CartItemCheckBox';
import IngredientTypeService from '@/lib/services/ingredientTypeService';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import {
  CheckCircleRounded,
  ExpandMore,
  RadioButtonUncheckedRounded,
} from '@mui/icons-material';
import BoxImage from '@/components/common/image/BoxImage';

function CartItemContent({
  cartItemData,
  handleChangeCartItemData,
  pantryItems,
}: {
  cartItemData: Cart_ItemEntity[];
  handleChangeCartItemData: (cartId: number, ingredientId: number) => void;
  pantryItems: Pantry_ItemEntity[];
}) {
  const typoProps: TypographyProps = {
    variant: 'body2',
    fontWeight: 'light',
    sx: {
      width: '100%',
    },
  };

  const [ingredientTypes, setIngredientTypes] = useState<
    Ingredient_TypeEntity[]
  >([]);
  const [ingredientTypeData, setIngredientTypeData] = useState<
    (Ingredient_TypeEntity | null)[]
  >([]);

  useEffect(() => {
    const type_ids: Ingredient_TypeEntity['id'][] = cartItemData.map(
      (item) => item.ingredient?.type_id
    );
    const types = ingredientTypes.filter((x) => type_ids.includes(x.id));
    if (type_ids.includes(null)) {
      types.push(null);
    }

    setIngredientTypeData(types);
  }, [cartItemData, ingredientTypes]);

  useEffect(() => {
    async function fetch() {
      try {
        const types = await IngredientTypeService.GetAllIngredientTypes();
        setIngredientTypes(types);
      } catch (error) {
        setIngredientTypes([]);
      }
    }
    fetch();
  }, []);

  return (
    <>
      {ingredientTypeData.map((type, i) => {
        return (
          <Grid key={i} item xs={12} lg={8}>
            <CartItemFrame label={type ? type.name : 'Khác'}>
              {cartItemData
                .reduce((result: Cart_ItemEntity[][], element) => {
                  const foundItem = result.find(
                    (item) => item[0].ingredient_id === element.ingredient_id
                  );
                  if (foundItem) {
                    foundItem.push(element);
                  } else {
                    result.push([element]);
                  }

                  return result;
                }, [])
                .sort((a, b) => b.length - a.length)
                .map((array: Cart_ItemEntity[], x) => {
                  if (
                    (!type && !array[0].ingredient.type_id) ||
                    (type &&
                      array[0].ingredient.type_id &&
                      array[0].ingredient.type_id == type.id &&
                      array.some((x) => !x.isBought))
                  ) {
                    const total: number = cartItemData
                      .filter((x) => x.ingredient_id == array[0].ingredient_id)
                      .reduce((a, b) => a + b.amount, 0);

                    const mightHave = checkMightHave(
                      pantryItems.find(
                        (p) => p.ingredient_id === array[0].ingredient_id
                      ),
                      array[0],
                      total
                    );

                    return (
                      <Accordion
                        key={x}
                        disableGutters
                        elevation={0}
                        TransitionProps={{ unmountOnExit: true }}
                        sx={{
                          boxShadow: 'none',
                          bgcolor: 'transparent',
                          '&:before': {
                            display: 'none',
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          sx={{
                            bgcolor: 'grey.100',
                          }}
                        >
                          <Stack
                            direction={'row'}
                            alignItems={'center'}
                            sx={{
                              width: '100%',
                            }}
                          >
                            <BoxImage
                              src={array[0].ingredient?.image}
                              quality={1}
                              sx={{
                                height: '60px',
                                width: '60px',
                                objectFit: 'contain',
                                borderRadius: '50%',
                                mr: 2,
                              }}
                            />

                            <Box
                              sx={{
                                flexGrow: 1,
                                height: 'fit-content',
                              }}
                            >
                              <Typography {...typoProps} fontWeight={900}>
                                {array[0].ingredient?.name}
                              </Typography>

                              <Typography {...typoProps}>
                                Tổng: {Math.ceil(total)}
                                {array[0]?.ingredient.isLiquid
                                  ? ' (ml)'
                                  : ' (g)'}
                                {pantryItems && mightHave?.state ? (
                                  <Typography
                                    component={'span'}
                                    variant="caption"
                                    sx={{
                                      color: 'white',
                                      bgcolor: 'primary.main',
                                      px: 0.8,
                                      py: 0.4,
                                      ml: 1,
                                      borderRadius: '6px',
                                    }}
                                  >
                                    Tủ lạnh có đủ
                                  </Typography>
                                ) : mightHave?.state == false ? (
                                  <Typography
                                    component={'span'}
                                    variant="caption"
                                    sx={{
                                      color: 'white',
                                      bgcolor: 'primary.light',
                                      px: 0.8,
                                      py: 0.4,
                                      ml: 1,
                                      borderRadius: '6px',
                                    }}
                                  >
                                    Tủ lạnh có nhưng thiếu {mightHave?.amount}
                                    {array[0]?.ingredient.isLiquid ? 'ml' : 'g'}
                                  </Typography>
                                ) : (
                                  ''
                                )}
                              </Typography>
                            </Box>

                            <Checkbox
                              icon={<RadioButtonUncheckedRounded />}
                              checkedIcon={<CheckCircleRounded />}
                              onChange={async () => {
                                const updateCartItem = array.filter(
                                  (item) =>
                                    ((!type && !item.ingredient.type_id) ||
                                      (type &&
                                        item.ingredient.type_id &&
                                        item.ingredient.type_id == type.id)) &&
                                    !item.isBought
                                );

                                console.log(updateCartItem);

                                // handleChangeCartItemData(
                                //   item.cartId,
                                //   item.ingredient_id
                                // );
                                // await updateCartItem(
                                //   item.cartId,
                                //   item.ingredient_id,
                                //   !isBought
                                // );
                              }}
                            />
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box>
                            {array.map((item, index) => {
                              if (
                                ((!type && !item.ingredient.type_id) ||
                                  (type &&
                                    item.ingredient.type_id &&
                                    item.ingredient.type_id == type.id)) &&
                                !item.isBought
                              ) {
                                return (
                                  <CartItemCheckBox
                                    key={index}
                                    item={item}
                                    total={() => {
                                      let total = 0;
                                      cartItemData.forEach((x) => {
                                        if (
                                          x.ingredient_id == item.ingredient_id
                                        ) {
                                          total += x.amount;
                                        }
                                      });
                                      return total;
                                    }}
                                    handleChangeCartItemData={
                                      handleChangeCartItemData
                                    }
                                    shorten={true}
                                  />
                                );
                              }
                            })}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                })}
            </CartItemFrame>
          </Grid>
        );
      })}
    </>
  );
}

export default CartItemContent;

function checkMightHave(
  pantryItem: Pantry_ItemEntity | undefined,
  cartItem: Cart_ItemEntity,
  total: number
) {
  if (!pantryItem) {
    return undefined;
  }
  if (pantryItem.ingredient_id === cartItem.ingredient_id) {
    if (pantryItem.amount >= total) {
      return { state: true, amount: 0 };
    } else {
      return { state: false, amount: total - pantryItem.amount };
    }
  }

  return undefined;
}
