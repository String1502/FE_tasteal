import AddYourOwnItem from '@/components/ui/grocery/AddYourOwnItem';
import CartItemCheckBox from '@/components/ui/grocery/CartItemCheckBox';
import CartItemContent from '@/components/ui/grocery/CartItemContent';
import CartItemFrame from '@/components/ui/grocery/CartItemFrame';
import { PopoverRecipes } from '@/components/ui/grocery/PopoverRecipes';
import { RecipesServingSizeCarousel } from '@/components/ui/grocery/RecipesServingSizeCarousel';
import Layout from '@/layout/Layout';
import AppContext from '@/lib/contexts/AppContext';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { CartEntity } from '@/lib/models/entities/CartEntity/CartEntity';
import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import {
  PersonalCartItemEntity,
  convertPersonalCartItemToCartItem,
} from '@/lib/models/entities/PersonalCartItemEntity/PersonalCartItemEntity';

import CartItemService from '@/lib/services/CartItemService';
import CartService from '@/lib/services/cartService';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState, useContext, useCallback } from 'react';

export default function Grocery() {
  const [snackbarAlert] = useSnackbarService();
  const { login } = useContext(AppContext);

  //#region Data
  const [cartData, setCartData] = useState<CartEntity[]>([]);

  const [personalCartItemData, setPersonalCartItemData] = useState<
    PersonalCartItemEntity[]
  >([]);

  const [cartItemData, setCartItemData] = useState<Cart_ItemEntity[]>([]);
  //#endregion

  useEffect(() => {
    const fetchData = async () => {
      if (!login.user?.uid) {
        return;
      }
      try {
        const personalCartItemData = await CartService.GetPersonalCartsByUserId(
          login.user.uid
        );
        setPersonalCartItemData(personalCartItemData);

        const finalCartData = await CartService.GetCartByAccountId(
          login.user.uid
        );

        setCartData(finalCartData);

        if (finalCartData && finalCartData.length > 0) {
          const ids = finalCartData
            .map((cart) => cart.id)
            .filter((id) => id > 0);

          setCartItemData(await CartItemService.GetCartItemsByCartIds(ids));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [login.user?.uid]);

  function handleChangeCartItemData(cartId: number, ingredientId: number) {
    // Cập nhật UI
    setCartItemData((prev) => {
      return prev.map((item) => {
        if (item.cartId === cartId && item.ingredientId === ingredientId) {
          return {
            ...item,
            isBought: !item.isBought,
          };
        } else {
          return item;
        }
      });
    });
  }

  function handleServingSizeChange(cartId: number, newValue: number) {
    // Cập nhật UI
    setCartData((prev) => {
      return prev.map((item) => {
        if (item.id === cartId) {
          return {
            ...item,
            serving_size: newValue,
          };
        } else {
          return item;
        }
      });
    });

    let oldValue = cartData.find((item) => item.id === cartId)?.serving_size;
    if (!oldValue || oldValue === 0) {
      oldValue = 1;
    }
    let rate = newValue / oldValue;

    setCartItemData((prev) => {
      return prev.map((item) => {
        if (item.cartId === cartId) {
          return {
            ...item,
            amount: item.amount * rate,
          };
        } else {
          return item;
        }
      });
    });
  }

  async function handleChangePersonalCartItemData(
    id: PersonalCartItemEntity['id']
  ) {
    let updated = false;
    const item = personalCartItemData.find((item) => item.id === id);
    // Cập nhật DB
    try {
      updated = await CartService.UpdatePersonalCart({
        id: item.id,
        name: item.name,
        amount: item.amount,
        is_bought: !item.is_bought,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
    if (!updated) {
      snackbarAlert('Cập nhật không thành công', 'error');
      return;
    }

    // Cập nhật UIs
    setPersonalCartItemData((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            is_bought: !item.is_bought,
          };
        } else {
          return item;
        }
      });
    });
  }

  const getTotalIngredient = useCallback(() => {
    const cartItemDataAmount = cartItemData
      .map((item) => {
        return item.ingredient?.id;
      })
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      }).length;

    const personalCartItemDataAmount = personalCartItemData.length;
    return cartItemDataAmount + personalCartItemDataAmount;
  }, [cartItemData, personalCartItemData]);

  return (
    <>
      <Layout>
        <Container>
          <Box
            sx={{
              mt: 4,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={900}
              textTransform={'capitalize'}
              sx={{
                width: '100%',
              }}
            >
              Giỏ đi chợ
            </Typography>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="subtitle2" fontWeight={'light'}>
                {cartData.length} Công thức | {getTotalIngredient()} Nguyên liệu
              </Typography>

              <PopoverRecipes accountId={login.user?.uid} />
            </Box>
          </Box>
          <RecipesServingSizeCarousel
            array={cartData}
            handleServingSizeChange={handleServingSizeChange}
          />
        </Container>

        <Box
          sx={{
            backgroundColor: 'secondary.main',
            flexGrow: 1,
          }}
        >
          <Container
            sx={{
              py: 4,
            }}
          >
            <Grid
              container
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              spacing={2}
            >
              <Grid item xs={12} lg={8}>
                <Typography variant="h6" fontWeight={'bold'} color={'primary'}>
                  Danh sách cần mua
                </Typography>
              </Grid>

              <Grid item xs={12} lg={8}>
                <AddYourOwnItem />
              </Grid>

              <Grid item xs={12} lg={8}>
                <CartItemFrame label="Đồ cá nhân">
                  {personalCartItemData.map((item, index) => {
                    if (!item.is_bought) {
                      return (
                        <CartItemCheckBox
                          key={index}
                          item={convertPersonalCartItemToCartItem(item)}
                          total={() => {
                            let total = 0;
                            cartItemData.forEach((x) => {
                              if (x.ingredientId == item.ingredient_id) {
                                total += x.amount;
                              }
                            });
                            personalCartItemData.forEach((x) => {
                              if (
                                item.ingredient_id &&
                                x.ingredient_id == item.ingredient_id
                              ) {
                                total += x.amount;
                              }
                            });
                            return total;
                          }}
                          type="personal"
                          handleChangePersonalCartItemData={
                            handleChangePersonalCartItemData
                          }
                        />
                      );
                    }
                  })}
                </CartItemFrame>
              </Grid>

              <CartItemContent
                cartItemData={cartItemData}
                handleChangeCartItemData={handleChangeCartItemData}
              />

              <Grid item xs={12} lg={8}>
                <CartItemFrame label="Đã mua">
                  {personalCartItemData.map((item, index) => {
                    if (item.is_bought) {
                      return (
                        <CartItemCheckBox
                          key={index}
                          item={convertPersonalCartItemToCartItem(item)}
                          total={() => {
                            let total = 0;
                            cartItemData.forEach((x) => {
                              if (x.ingredientId == item.ingredient_id) {
                                total += x.amount;
                              }
                            });
                            personalCartItemData.forEach((x) => {
                              if (
                                item.ingredient_id &&
                                x.ingredient_id == item.ingredient_id
                              ) {
                                total += x.amount;
                              }
                            });
                            return total;
                          }}
                          type="personal"
                          handleChangePersonalCartItemData={
                            handleChangePersonalCartItemData
                          }
                        />
                      );
                    }
                  })}

                  {cartItemData.map((item, index) => {
                    if (item.isBought) {
                      return (
                        <CartItemCheckBox
                          key={index}
                          item={item}
                          total={() => {
                            let total = 0;
                            cartItemData.forEach((x) => {
                              if (x.ingredientId == item.ingredientId) {
                                total += x.amount;
                              }
                            });
                            return total;
                          }}
                          handleChangeCartItemData={handleChangeCartItemData}
                        />
                      );
                    }
                  })}
                </CartItemFrame>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
