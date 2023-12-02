import AddYourOwnItem from '@/components/ui/grocery/AddYourOwnItem';
import CartItemCheckBox from '@/components/ui/grocery/CartItemCheckBox';
import CartItemContent from '@/components/ui/grocery/CartItemContent';
import CartItemFrame from '@/components/ui/grocery/CartItemFrame';
import { PopoverRecipes } from '@/components/ui/grocery/PopoverRecipes';
import { RecipesServingSizeCarousel } from '@/components/ui/grocery/RecipesServingSizeCarousel';
import Layout from '@/layout/Layout';
import { accounts } from '@/lib/constants/sampleData';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { CartEntity } from '@/lib/models/entities/CartEntity/CartEntity';
import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import CartItemService from '@/lib/services/CartItemService';
import CartService from '@/lib/services/cartService';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Grocery() {
    const [cartData, setCartData] = useState<CartEntity[]>([]);

    const [accountData, setAccountData] = useState<AccountEntity | undefined>(
        accounts.find((account) => account.uid === '1')
    );

    const [cartItemData, setCartItemData] = useState<Cart_ItemEntity[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const finalCartData = await CartService.GetCartByAccountId(
                accountData?.uid
            );

            setCartData(finalCartData);

            if (finalCartData.length > 0) {
                const ids = finalCartData
                    .map((cart) => cart.id)
                    .filter((id) => id > 0);

                setCartItemData(
                    await CartItemService.GetCartItemsByCartIds(ids)
                );
            }
        };
        fetchData();
    }, [accountData]);

    function handleChangeCartItemData(cartId: number, ingredientId: number) {
        setCartItemData((prev) => {
            return prev.map((item) => {
                if (
                    item.cartId === cartId &&
                    item.ingredientId === ingredientId
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

    function handleServingSizeChange(cartId: number, newValue: number) {
        let oldValue = cartData.find(
            (item) => item.id === cartId
        )?.serving_size;
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
                            <Typography
                                variant="subtitle2"
                                fontWeight={'light'}
                            >
                                {cartData.length} Công thức |{' '}
                                {
                                    cartItemData
                                        .map((item) => {
                                            return item.ingredient?.id;
                                        })
                                        .filter(function (item, pos, self) {
                                            return self.indexOf(item) == pos;
                                        }).length
                                }{' '}
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
                        backgroundColor: 'secondary.main',
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
                            <Grid
                                item
                                xs={12}
                                lg={8}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight={'bold'}
                                    color={'primary'}
                                >
                                    Danh sách cần mua
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                lg={8}
                            >
                                <AddYourOwnItem />
                            </Grid>

                            <CartItemContent
                                cartItemData={cartItemData}
                                handleChangeCartItemData={
                                    handleChangeCartItemData
                                }
                            />

                            <Grid
                                item
                                xs={12}
                                lg={8}
                            >
                                <CartItemFrame label="Đã mua">
                                    {cartItemData.map((item, index) => {
                                        if (item.isBought) {
                                            return (
                                                <CartItemCheckBox
                                                    key={index}
                                                    item={item}
                                                    total={() => {
                                                        let total = 0;
                                                        cartItemData.forEach(
                                                            (x) => {
                                                                if (
                                                                    x.ingredientId ==
                                                                    item.ingredientId
                                                                ) {
                                                                    total +=
                                                                        x.amount;
                                                                }
                                                            }
                                                        );
                                                        return total;
                                                    }}
                                                    handleChangeCartItemData={
                                                        handleChangeCartItemData
                                                    }
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
