import { PrimaryCard } from './PrimaryCard';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { Box, Grid, Typography } from '@mui/material';

export function IngredientsCarousel({ array }: { array: IngredientEntity[] }) {

    return (
        <>
            {array && array.length > 0 ? (
          
                    <Grid container spacing={2}>
                        {array.map((ingredient) => (
                            <Grid key={ingredient.id} item xs={12} sm={6} md={3}>
                                <PrimaryCard recipe={ingredient}/>
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
                        Chưa có công thức nào :(
                    </Typography>
                </Box>
            )}
        </>
    );
}
