import CustomCard from '@/components/common/card/CustomCard';
import ImageRecipe from '@/components/common/card/ImageRecipe';
import NameRecipe from '@/components/common/card/NameRecipe';
import { ServingSizes } from '@/lib/constants/options';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { CartEntity } from '@/lib/models/entities/CartEntity/CartEntity';
import CartService from '@/lib/services/cartService';
import { CloseRounded, PeopleRounded } from '@mui/icons-material';
import {
    CardContent,
    CardProps,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

export const RecipeServingSizeCard = ({
    cart,
    handleServingSizeChange,
    ...props
}: {
    cart: CartEntity;
    handleServingSizeChange: (cartId: number, newValue: number) => void;
    props?: CardProps;
}) => {
    const imgHeight = '132px';
    const padding = 2;
    const [servingSize, setServingSize] = useState<CartEntity['serving_size']>(
        cart.serving_size
    );

    useEffect(() => {
        if (cart.serving_size) {
            setServingSize(cart.serving_size);
        }
    }, [cart.serving_size]);

    useEffect(() => {
        handleServingSizeChange(cart.id, servingSize);
    }, [servingSize]);

    const [snackbarAlert] = useSnackbarService();

    const updateCart = useCallback(
        async (
            CardId: CartEntity['id'],
            servingSize: CartEntity['serving_size']
        ) => {
            try {
                const result = await CartService.UpdateCart(
                    CardId,
                    servingSize
                );
                if (result) {
                    snackbarAlert('Cập nhật thành công', 'success');
                } else {
                    snackbarAlert('Cập nhật không thành công', 'error');
                }
            } catch (error) {
                console.log(error);
            }
        },
        [cart.id, servingSize]
    );

    const DeleteCartById = useCallback(
        async (CardId: CartEntity['id']) => {
            try {
                const result = await CartService.DeleteCartById(CardId);
                if (result) {
                    snackbarAlert(
                        'Xóa công thức khỏi giỏ đi chợ thành công.',
                        'success'
                    );
                } else {
                    snackbarAlert('Thao tác không thành công', 'error');
                }
            } catch (error) {
                console.log(error);
            }
        },
        [cart.id]
    );

    return (
        <>
            <CustomCard {...props}>
                <ImageRecipe
                    src={
                        'https://www.sidechef.com/recipe/d49b0c1d-e63e-4aac-afcc-b337b0cd1bff.jpg?d=1408x1120'
                    }
                    alt={cart.recipe?.name}
                    imgHeight={imgHeight}
                    quality={80}
                />
                <IconButton
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: padding * 4,
                        right: padding * 4,
                        zIndex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: '#fff',
                        transition: 'all 0.1s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: '#fff',
                            transform: 'scale(1.05)',
                        },
                    }}
                    onClick={async () => {
                        await DeleteCartById(cart.id);
                    }}
                >
                    <CloseRounded
                        sx={{ color: '#fff' }}
                        fontSize="inherit"
                    />
                </IconButton>

                <TextField
                    sx={{
                        position: 'absolute',
                        top: padding * 4,
                        left: padding * 8,
                        zIndex: 1,
                        '& fieldset': { border: 'none' },
                        '.MuiSelect-select': {
                            px: 0,
                            py: 0.2,
                        },
                        '.MuiSvgIcon-root': {
                            color: 'white',
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PeopleRounded
                                    sx={{
                                        color: 'white',
                                        fontSize: '16px',
                                    }}
                                />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: '16px',
                            px: 1,
                            py: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                        },
                    }}
                    select
                    value={servingSize}
                    onChange={async (e) => {
                        setServingSize(parseInt(e.target.value));
                        await updateCart(cart.id, parseInt(e.target.value));
                    }}
                >
                    {ServingSizes.map((item) => (
                        <MenuItem
                            key={item}
                            value={item}
                            color="primary"
                        >
                            <Typography
                                variant="caption"
                                color={'inherit'}
                            >
                                {item}
                            </Typography>
                        </MenuItem>
                    ))}
                </TextField>

                <CardContent
                    sx={{
                        p: padding,
                    }}
                >
                    <NameRecipe name={cart.recipe?.name} />
                </CardContent>
            </CustomCard>
        </>
    );
};
