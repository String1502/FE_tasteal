import Layout from '@/layout/Layout';
import { Box, Container, Grid, PaperProps } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import AccountService from '@/lib/services/accountService';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import { CookBook_RecipeEntity } from '@/lib/models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity';
import CookbookService from '@/lib/services/cookbookService';
import CookbookRecipeService from '@/lib/services/cookbookRecipeService';
import { useNavigate } from 'react-router-dom';
import { CookBook } from './CookBook';
import { CustomCard } from '../components/ui/mySaveRecipe/CustomCard';
import { MySavedRecipesContent } from '../components/ui/mySaveRecipe/MySavedRecipesContent';
import { MySavedRecipesAction } from '../components/ui/mySaveRecipe/MySavedRecipesAction';
import { AddYourFirstRecipe } from '../components/ui/mySaveRecipe/AddYourFirstRecipe';

export type CookbookChoosingType = {
    Cookbook: CookBookEntity;
    CookbookRecipes: CookBook_RecipeEntity[];
};

export const DialogPaperProps: PaperProps = {
    sx: {
        borderRadius: 4,
        p: 2,
        pt: 1,
    },
};

export function useMySavedRecipes(uid: string) {
    const [cookbookData, setCookbookData] = useState<CookBookEntity[]>([]);

    const [choosing, setChoosing] = useState<CookbookChoosingType | undefined>(
        undefined
    );

    const handleChoosing = useCallback(async (cookbook: CookBookEntity) => {
        const recipes =
            await CookbookRecipeService.GetCookbookRecipesByCookbookId(
                cookbook.id
            );
        setChoosing({
            Cookbook: cookbook,
            CookbookRecipes: recipes,
        });
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const account = await AccountService.GetByUid(uid);

                const cookbooks = await CookbookService.GetCookbooksByAccountId(
                    account.uid
                );
                setCookbookData(cookbooks);
                if (cookbooks.length > 0) {
                    handleChoosing(cookbooks[0]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return {
        cookbookData,
        choosing,
        handleChoosing,
    };
}

function MySavedRecipes() {
    const { cookbookData, choosing, handleChoosing } = useMySavedRecipes('1');
    const navigate = useNavigate();

    return (
        <Layout withFooter={false}>
            <Container>
                <MySavedRecipesContent>
                    <MySavedRecipesAction />

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
                                    md={2.4}
                                    lg={1.2}
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
                                        lg={3}
                                        key={i}
                                    >
                                        <CustomCard
                                            cookbookRecipe={item}
                                            cookbookData={cookbookData}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>

                    {choosing?.CookbookRecipes.length == 0 && (
                        <AddYourFirstRecipe />
                    )}
                </MySavedRecipesContent>
            </Container>
        </Layout>
    );
}

export default MySavedRecipes;
