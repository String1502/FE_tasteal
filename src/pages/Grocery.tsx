import { PopoverRecipes } from "@/components/ui/grocery/PopoverRecipes";
import { RecipesServingSizeCarousel } from "@/components/ui/grocery/RecipesServingSizeCarousel";
import Layout from "@/layout/Layout";
import CartItemService from "@/lib/services/CartItemService";
import CartService from "@/lib/services/cartService";
import { accounts } from "@/types/sampleData";
import {
  AccountEntity,
  CartEntity,
  Cart_ItemEntity,
  Ingredient_TypeEntity,
} from "@/types/type";
import {
  AddCircleRounded,
  CheckCircleRounded,
  RadioButtonUncheckedRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useEffect, useState } from "react";

export function Grocery() {
  const [cartData, setCartData] = useState<CartEntity[]>([]);

  const [accountData, setAccountData] = useState<AccountEntity | undefined>(
    accounts.find((account) => account.id === 1)
  );

  const [cartItemData, setCartItemData] = useState<Cart_ItemEntity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const finalCartData = await CartService.GetCartByAccountId(
        accountData?.id
      );

      setCartData(finalCartData);

      if (finalCartData.length > 0) {
        const ids = finalCartData.map((cart) => cart.id).filter((id) => id > 0);

        setCartItemData(await CartItemService.GetCartItemsByCartIds(ids));
      }
    };
    fetchData();
  }, []);

  function handleChangeCartItemData(id: number) {
    setCartItemData((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
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
    let oldValue = cartData.find((item) => item.id === cartId)?.serving_size;
    if (!oldValue || oldValue === 0) {
      oldValue = 1;
    }
    let rate = newValue / oldValue;

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

    setCartItemData((prev) => {
      return prev.map((item) => {
        if (item.cart_id === cartId) {
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

  return (
    <>
      <Layout>
        <Container>
          <Box
            sx={{
              mt: 8,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={900}
              sx={{
                width: "100%",
              }}
            >
              Giỏ đi chợ
            </Typography>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle2" fontWeight={"light"}>
                {cartData.length} Công thức |{" "}
                {
                  cartItemData
                    .map((item) => {
                      return item.Ingredient?.id;
                    })
                    .filter(function (item, pos, self) {
                      return self.indexOf(item) == pos;
                    }).length
                }{" "}
                Nguyên liệu
              </Typography>
              <PopoverRecipes />
            </Box>
          </Box>
          <RecipesServingSizeCarousel
            array={cartData}
            handleServingSizeChange={handleServingSizeChange}
          />
        </Container>

        <Box
          sx={{
            backgroundColor: "secondary.main",
          }}
        >
          <Container
            sx={{
              py: 4,
            }}
          >
            <Grid
              container
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              spacing={2}
            >
              <Grid item xs={12} lg={8}>
                <Typography variant="h6" fontWeight={"bold"} color={"primary"}>
                  Danh sách cần mua
                </Typography>
              </Grid>

              {/* <Grid item xs={12} lg={8}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "primary.main",
                    },
                    px: 3,
                    py: 1.2,
                    boxShadow: "none",
                  }}
                  startIcon={<AddCircleRounded fontSize="large" />}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    fontWeight={"bold"}
                  >
                    Thêm nguyên liệu
                  </Typography>
                </Button>
              </Grid> */}

              <CartItemContent
                cartItemData={cartItemData}
                handleChangeCartItemData={handleChangeCartItemData}
              />

              <Grid item xs={12} lg={8}>
                <CartItemFrame label="Đã mua">
                  {cartItemData.map((item) => {
                    if (item.isBought) {
                      return (
                        <CartItemCheckBox
                          key={item.id}
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

function CartItemContent({
  cartItemData,
  handleChangeCartItemData,
}: {
  cartItemData: Cart_ItemEntity[];
  handleChangeCartItemData: (id: number) => void;
}) {
  const [ingredientTypeData, setIngredientTypeData] = useState<
    Ingredient_TypeEntity[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      let ingredientTypes: Ingredient_TypeEntity[] = [];
      if (cartItemData.length > 0) {
        cartItemData.forEach((item) => {
          if (item.Ingredient?.Ingredient_Type) {
            ingredientTypes.push(item.Ingredient.Ingredient_Type);
          }
        });
        ingredientTypes = ingredientTypes.filter(function (item, pos) {
          return ingredientTypes.indexOf(item) == pos;
        });
      }

      setIngredientTypeData(ingredientTypes);
    };
    fetchData();
  }, [cartItemData]);

  return (
    <>
      {ingredientTypeData.map((type) => {
        return (
          <Grid key={type.id} item xs={12} lg={8}>
            <CartItemFrame label={type.name}>
              {cartItemData.map((item) => {
                if (item.Ingredient?.type_id == type.id && !item.isBought) {
                  return (
                    <CartItemCheckBox
                      key={item.id}
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
        );
      })}
    </>
  );
}

function CartItemFrame({
  children,
  label,
}: {
  children?: React.ReactNode;
  label: string;
}) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: "white",
          borderRadius: 4,
          px: 3,
          pt: 2,
          pb: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            width: "100%",
            textAlign: "left",
            mb: 1,
            color: "grey.600",
          }}
          fontWeight={900}
        >
          {label}
        </Typography>
        {children}
      </Box>
    </>
  );
}

function CartItemCheckBox({
  item,
  total,
  handleChangeCartItemData,
}: {
  item: Cart_ItemEntity;
  total?: () => number;
  handleChangeCartItemData: (id: number) => void;
}) {
  const typoProps: TypographyProps = {
    variant: "body2",
    fontWeight: "light",
    sx: {
      width: "100%",
    },
  };

  const [isBought, setIsBought] = useState(item.isBought);

  useEffect(() => {
    handleChangeCartItemData(item.id);
  }, [isBought]);

  return (
    <FormControlLabel
      sx={{
        width: "100%",
        py: 1,
        borderTop: 1,
        borderColor: "grey.300",
        ".MuiFormControlLabel-label": {
          width: "100%",
        },
        mx: 0,
      }}
      labelPlacement="start"
      control={
        <Checkbox
          checked={isBought}
          onChange={() => {
            setIsBought(!isBought);
          }}
          icon={<RadioButtonUncheckedRounded />}
          checkedIcon={<CheckCircleRounded />}
        />
      }
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            opacity: isBought ? 0.65 : 1,
          }}
        >
          <Box
            component={"img"}
            src={item.Ingredient?.image}
            sx={{
              height: "60px",
              aspectRatio: "1/1",
              objectFit: "contain",
              borderRadius: "50%",
              objectPosition: "center",
              mr: 2,
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              height: "fit-content",
            }}
          >
            <Typography {...typoProps}>{item.Cart?.Recipe?.name}</Typography>
            <Typography {...typoProps} fontWeight={900}>
              {item.Ingredient?.name}
            </Typography>
            <Typography {...typoProps}>
              {Math.ceil(item.amount)}
              {total ? (
                <span style={{ color: "grey" }}> /{Math.ceil(total())}</span>
              ) : (
                ""
              )}
            </Typography>
          </Box>
        </Box>
      }
    />
  );
}
