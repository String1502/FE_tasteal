import { PrimaryCard } from './PrimaryCard';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export function IngredientsCarousel({ array }: { array: IngredientEntity[] }) {
    const [ingredients, setIngredients] = useState<IngredientEntity[]>([]);

    useEffect(() => {
      // Update the local state when the array prop changes
      setIngredients(array);
    }, [array]);
    return (
        <>
            {ingredients && ingredients.length > 0 ? (
                <Grid
                    container
                    spacing={2}
                >
                    {ingredients.map((ingredient) => (
                        <Grid
                            key={ingredient.id}
                            item
                            xs={12}
                            sm={6}
                            md={3}
                        >
                            <PrimaryCard ingredient={ingredient} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        height: '200px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        color={'gray.main'}
                        variant="h2"
                        fontWeight={'bold'}
                        fontFamily={'Dancing Script'}
                    >
                        Chưa có nguyên liệu nào :(
                    </Typography>
                </Box>
            )}
        </>
    );
}
