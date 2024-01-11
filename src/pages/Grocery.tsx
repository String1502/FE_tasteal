import AddYourOwnItem from '@/components/ui/grocery/AddYourOwnItem';
import CartItemCheckBox from '@/components/ui/grocery/CartItemCheckBox';
import CartItemContent from '@/components/ui/grocery/CartItemContent';
import CartItemFrame from '@/components/ui/grocery/CartItemFrame';
import { PopoverRecipes } from '@/components/ui/grocery/PopoverRecipes';
import { RecipesServingSizeCarousel } from '@/components/ui/grocery/RecipesServingSizeCarousel';
import Layout from '@/layout/Layout';
import AppContext from '@/lib/contexts/AppContext';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { CreatePantryItemReq } from '@/lib/models/dtos/Request/CreatePantryItemReq/CreatePantryItemReq';
import { GetAllPantryItemReq } from '@/lib/models/dtos/Request/GetAllPantryItemReq/GetAllPantryItemReq';
import { CartEntity } from '@/lib/models/entities/CartEntity/CartEntity';
import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import {
  PersonalCartItemEntity,
  convertPersonalCartItemToCartItem,
} from '@/lib/models/entities/PersonalCartItemEntity/PersonalCartItemEntity';

import CartItemService from '@/lib/services/CartItemService';
import CartService from '@/lib/services/cartService';
import PantryItemService from '@/lib/services/pantryItemService';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState, useContext, useCallback } from 'react';

export default function Grocery() {
  const [snackbarAlert] = useSnackbarService();
  const { login, handleSpinner } = useContext(AppContext);

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
        handleSpinner(true);
        const finalCartData = await CartService.GetCartByAccountId(
          login.user.uid
        );

        setCartData(finalCartData);

        const personalCartItemData = await CartService.GetPersonalCartsByUserId(
          login.user.uid
        );
        setPersonalCartItemData(personalCartItemData);

        if (finalCartData && finalCartData.length > 0) {
          const ids = finalCartData.map((cart) => cart.id);
          const cartitem = await CartItemService.GetCartItemsByCartIds(ids);

          setCartItemData(
            cartitem.map((item) => {
              return {
                ...item,
                cart: finalCartData.find((cart) => cart.id === item.cartId),
              };
            })
          );
        }

        // lấy pantryItems
        const final = await PantryItemService.GetAllPantryItemsByAccountId({
          account_id: login.user.uid,
          pageSize: 2147483647,
          page: 1,
        } as GetAllPantryItemReq);

        setPantryItems(final);
        handleSpinner(false);
      } catch (error) {
        console.log(error);
        handleSpinner(false);
      }
    };
    fetchData();
  }, [login.user]);

  function handleChangeCartItemData(cartId: number, ingredientId: number) {
    // Cập nhật UI
    setCartItemData((prev) => {
      return prev.map((item) => {
        if (item.cartId === cartId && item.ingredient_id === ingredientId) {
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

  function handleChangeCartItemsData(cartIds: number[], ingredientId: number) {
    setCartItemData((prev) => {
      return prev.map((item) => {
        if (
          cartIds.includes(item.cartId) &&
          item.ingredient_id === ingredientId
        ) {
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

  async function handleServingSizeChange(cartId: number, newValue: number) {
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

    try {
      const result = await CartService.UpdateCart(cartId, newValue);
      if (result) {
        snackbarAlert('Cập nhật thành công', 'success');
      } else {
        snackbarAlert('Cập nhật không thành công', 'error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangePersonalCartItemData(
    id: PersonalCartItemEntity['id']
  ) {
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
      snackbarAlert('Cập nhật thành công', 'success');
    } catch (error) {
      console.log(error);
      snackbarAlert('Cập nhật không thành công', 'error');
    }
    if (!updated) {
      snackbarAlert('Cập nhật không thành công', 'error');
      return;
    }
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

  const DeleteCartById = async (CardId: CartEntity['id']) => {
    try {
      handleSpinner(true);
      const result = await CartService.DeleteCartById(CardId);
      if (result) {
        snackbarAlert('Xóa công thức khỏi giỏ đi chợ thành công.', 'success');
        setCartData((prev) => prev.filter((item) => item.id !== CardId));
        setCartItemData((prev) =>
          prev.filter((item) => item.cartId !== CardId)
        );
      } else {
        snackbarAlert('Thao tác không thành công', 'error');
      }
      handleSpinner(false);
    } catch (error) {
      console.log(error);
      snackbarAlert('Thao tác không thành công', 'error');
      handleSpinner(false);
    }
  };

  const DeleteAllCartByAccountId = async () => {
    if (!login.user || !login.user?.uid || login.user.uid == '') return;
    const accountId = login.user.uid;
    if (cartData.length == 0 && personalCartItemData.length == 0) {
      snackbarAlert('Giỏ đi chợ trống', 'error');
      return;
    }
    try {
      handleSpinner(true);
      const result = await CartService.DeleteCartByAccountId(accountId);
      if (result) {
        snackbarAlert('Dọn giỏ đi chợ thành công.', 'success');
        setCartData([]);
        setPersonalCartItemData([]);
        setCartItemData([]);
      } else snackbarAlert('Thao tác không thành công.', 'error');
      handleSpinner(false);
    } catch (error) {
      console.log(error);
      handleSpinner(false);
    }
  };

  const handlePersonalCartItemData = (newValue: PersonalCartItemEntity) => {
    setPersonalCartItemData((prev) => [...prev, newValue]);
  };

  //#region So với tủ lạnh
  const [pantryItems, setPantryItems] = useState<Pantry_ItemEntity[]>([]);
  //#endregion

  const addToPantry = async (cartItemAdd: CreatePantryItemReq[]) => {
    if (!login.user || !login.user?.uid || login.user.uid == '') return;
    const accountId = login.user.uid;
    if (cartItemAdd.length == 0 && personalCartItemData.length == 0) {
      snackbarAlert('Giỏ đi chợ trống', 'error');
      return;
    }

    try {
      handleSpinner(true);
      await Promise.all([
        ...cartItemAdd.map(
          async (item) =>
            await PantryItemService.AddPantryItem({
              account_id: accountId,
              ingredient_id: item.ingredient_id,
              number: item.number,
            })
        ),
        ...personalCartItemData
          .filter((item) => item.is_bought && item.ingredient)
          .map(
            async (item) =>
              await PantryItemService.AddPantryItem({
                account_id: accountId,
                ingredient_id: item.ingredient_id,
                number: item.amount,
              })
          ),
        await DeleteAllCartByAccountId(),
      ]);
      handleSpinner(false);
      snackbarAlert(
        'Thêm vào tủ lạnh và dọn giỏ đi chợ thành công!',
        'success'
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout
        withFooter={false}
        headerPosition="static"
        isDynamicHeader={false}
      >
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

              <PopoverRecipes
                cartItemData={cartItemData}
                DeleteAllCartByAccountId={DeleteAllCartByAccountId}
                addToPantry={addToPantry}
                pantryItems={pantryItems}
              />
            </Box>
          </Box>
          <RecipesServingSizeCarousel
            array={cartData}
            handleServingSizeChange={handleServingSizeChange}
            DeleteCartById={DeleteCartById}
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
                <AddYourOwnItem
                  handlePersonalCartItemData={handlePersonalCartItemData}
                />
              </Grid>

              <Grid item xs={12} lg={8}>
                {personalCartItemData && personalCartItemData.length > 0 && (
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
                                if (x.ingredient_id == item.ingredient_id) {
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
                )}
              </Grid>

              <CartItemContent
                cartItemData={cartItemData}
                handleChangeCartItemData={handleChangeCartItemData}
                handleChangeCartItemsData={handleChangeCartItemsData}
                pantryItems={pantryItems}
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
                              if (x.ingredient_id == item.ingredient_id) {
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

                  {cartItemData
                    .sort((a, b) => a.ingredient_id - b.ingredient_id)
                    .map((item, index) => {
                      if (item.isBought) {
                        return (
                          <CartItemCheckBox
                            key={index}
                            item={item}
                            total={() => {
                              let total = 0;
                              cartItemData.forEach((x) => {
                                if (x.ingredient_id == item.ingredient_id) {
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
