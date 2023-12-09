import { CookBook } from '@/pages/CookBook';
import { useMySavedRecipes } from '@/pages/MySavedRecipes';
import { MySavedRecipesContent } from '@/components/ui/mySaveRecipe/MySavedRecipesContent';
import { Box, Grid } from '@mui/material';
import CustomCardMealPlan from './CustomCard';
import { CustomModal } from './CustomModal';
import { AddYourFirstRecipe } from '../mySaveRecipe/AddYourFirstRecipe';

export function ModalThemTuBoSuuTap({
    open,
    handleClose,
    title,
}: {
    open: boolean;
    handleClose: () => void;
    title: string;
}) {
    const { cookbookData, choosing, handleChoosing } = useMySavedRecipes('1');

    return (
        <>
            <CustomModal
                open={open}
                handleClose={handleClose}
                title={title}
            >
                <MySavedRecipesContent>
                    <Box sx={{ width: '100%' }}>
                        <Grid
                            container
                            spacing={2}
                            alignItems={'center'}
                            justifyContent={'flex-start'}
                        >
                            {cookbookData.map((item, i) => (
                                <Grid
                                    item
                                    xs={3.6}
                                    md={2}
                                    key={i}
                                >
                                    <CookBook
                                        cookbook={item}
                                        choosing={choosing}
                                        handleChoosing={handleChoosing}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                        }}
                    >
                        <Grid
                            container
                            spacing={2}
                            alignItems={'flex-start'}
                            justifyContent={'flex-start'}
                        >
                            {choosing?.CookbookRecipes.length > 0 &&
                                choosing?.CookbookRecipes.map((item, i) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={i}
                                    >
                                        <CustomCardMealPlan
                                            recipe={item.RecipeEntity}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>

                    {choosing?.CookbookRecipes.length == 0 && (
                        <AddYourFirstRecipe />
                    )}
                </MySavedRecipesContent>
            </CustomModal>
        </>
    );
}
