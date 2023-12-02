import useFirebaseImage from '@/lib/hooks/useFirebaseImage';
import { MeasurementUnitResolver } from '@/lib/resolvers/measurement';
import { Box, Grid, Link, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import IngredientDisplayerItemProps from '../types/IngredientDisplayerItemProps';

const IngredientDisplayerItem: FC<IngredientDisplayerItemProps> = ({
    value,
    servingSize,
}) => {
    const imageUrl = useFirebaseImage(value.image);

    const ingredientAmount = useMemo(() => {
        return value.amount * (servingSize ?? 1);
    }, [value.amount, servingSize]);

    return (
        <Grid
            container
            alignItems={'center'}
        >
            <Grid
                item
                xs={2}
            >
                <Box
                    component={'img'}
                    src={imageUrl}
                    width={40}
                    height={40}
                    sx={{
                        objectFit: 'contain',
                        border: '1px solid',
                        borderColor: 'grey.300',
                        borderRadius: '50%',
                    }}
                ></Box>
            </Grid>
            <Grid
                item
                xs={2}
            >
                <Typography
                    fontSize={12}
                    color="primary.main"
                >
                    {`${ingredientAmount} ${MeasurementUnitResolver(
                        value?.isLiquid
                    )}`}
                </Typography>
            </Grid>
            <Grid
                item
                xs={8}
            >
                <Link
                    href=""
                    typography={'body1'}
                    fontWeight={'bold'}
                    textAlign={'left'}
                >
                    {value?.name ?? 'N/A'}
                </Link>
            </Grid>
        </Grid>
    );
};

export default IngredientDisplayerItem;
