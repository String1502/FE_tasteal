import { Primary_Smaller_Card } from './Primary_Smaller_Card';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export function Ingredient_Smaller_Carousel({ array }: { array: IngredientEntity[] }) {
    const [ingredients, setIngredients] = useState<IngredientEntity[]>([]);

    useEffect(() => {
      // Update the local state when the array prop changes
      setIngredients(array);
    }, [array]);
    return (
        <>
            {ingredients && ingredients.length > 0 ? (
                
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        height: '100px',
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
                        Chưa có công thức nào :(
                    </Typography>
                </Box>
            )}
        </>
    );
}
