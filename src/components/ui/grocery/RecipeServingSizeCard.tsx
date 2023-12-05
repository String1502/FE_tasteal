import CustomCard from '@/components/common/card/CustomCard';
import ImageRecipe from '@/components/common/card/ImageRecipe';
import NameRecipe from '@/components/common/card/NameRecipe';
import { ServingSizes } from '@/lib/constants/options';
import { CartEntity } from '@/lib/models/entities/CartEntity/CartEntity';
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
import { useEffect, useState } from 'react';

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
    const [servingSize, setServingSize] = useState(cart.serving_size);

    useEffect(() => {
        if (cart.serving_size) {
            setServingSize(cart.serving_size);
        }
    }, [cart.serving_size]);

    useEffect(() => {
        handleServingSizeChange(cart.id, servingSize);
    }, [servingSize]);

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
                    onChange={(e) => setServingSize(parseInt(e.target.value))}
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
