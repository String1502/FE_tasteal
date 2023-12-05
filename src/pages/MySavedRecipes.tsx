import Layout from '@/layout/Layout';
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    PaperProps,
    Stack,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import AccountService from '@/lib/services/accountService';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import { CookBook_RecipeEntity } from '@/lib/models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity';
import CookbookService from '@/lib/services/cookbookService';
import CookbookRecipeService from '@/lib/services/cookbookRecipeService';
import {
    AddCircleOutlineRounded,
    BookmarkBorderRounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BoxImage from '@/components/common/image/BoxImage';
import { CookBook } from './CookBook';
import { CustomCard } from './CustomCard';
import { PageRoute } from '@/lib/constants/common';

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

function MySavedRecipes() {
    const [accountData, setAccountData] = React.useState<
        AccountEntity | undefined
    >(undefined);

    const navigate = useNavigate();

    const [cookbookData, setCookbookData] = useState<CookBookEntity[]>([]);

    const [choosing, setChoosing] = useState<CookbookChoosingType | undefined>(
        undefined
    );

    async function handleChoosing(cookbook: CookBookEntity) {
        const recipes =
            await CookbookRecipeService.GetCookbookRecipesByCookbookId(
                cookbook.id
            );
        setChoosing({
            Cookbook: cookbook,
            CookbookRecipes: recipes,
        });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const account = await AccountService.GetByUid('1');

                setAccountData(account);

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

    return (
        <Layout withFooter={false}>
            <Container>
                <Stack
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={3}
                    sx={{
                        width: '100%',
                        py: 3,
                    }}
                >
                    <Stack
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{ width: '100%' }}
                        gap={2}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                flexGrow: 1,
                            }}
                        >
                            Bộ sưu tập
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<AddCircleOutlineRounded />}
                            color="primary"
                            sx={{ pr: 4, pl: 3, boxShadow: 'none' }}
                            onClick={() => {
                                navigate(PageRoute.Recipe.Create);
                            }}
                        >
                            <Typography
                                variant="caption"
                                fontWeight={'bold'}
                                color={'white'}
                            >
                                Tạo công thức
                            </Typography>
                        </Button>
                    </Stack>

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
                        <Stack
                            direction={'column'}
                            gap={3}
                            alignItems={'center'}
                            justifyContent={'center'}
                            sx={{
                                width: '40%',
                            }}
                        >
                            <BoxImage
                                src="https://www.sidechef.com/static/images/3feb6c9a2065479a6792.png"
                                alt="Empty"
                                quality={30}
                                sx={{
                                    objectFit: 'contain',
                                }}
                            />
                            <Typography
                                variant="body1"
                                fontWeight={'bold'}
                                sx={{
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                            >
                                Lưu ngay công thức đầu tiên!
                            </Typography>

                            <Typography
                                variant="body1"
                                fontWeight={'light'}
                                sx={{
                                    width: '100%',
                                    color: 'grey.600',
                                    textAlign: 'center',
                                }}
                            >
                                Nhấn vào icon
                                <IconButton
                                    size="small"
                                    sx={{
                                        border: 1,
                                        mx: 1,
                                        pointerEvents: 'none',
                                        color: 'black',
                                    }}
                                >
                                    <BookmarkBorderRounded fontSize="small" />
                                </IconButton>
                                trên mỗi thẻ công thức để lưu!
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: '80%',
                                }}
                                onClick={() => {
                                    navigate(PageRoute.Search);
                                }}
                            >
                                Tìm công thức
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Container>
        </Layout>
    );
}

export default MySavedRecipes;
