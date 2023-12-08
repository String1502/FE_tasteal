import TastealBreadCrumbs from '@/components/common/breadcrumbs/TastealBreadcrumbs';
import TastealIconButton from '@/components/common/buttons/TastealIconButton';
import BoxImage from '@/components/common/image/BoxImage';
import WithFallback from '@/components/common/layouts/WithFallback';
import TastealTextField from '@/components/common/textFields/TastealTextField';
import BigSectionHeading from '@/components/common/typos/BigSectionHeading/BigSectionHeading';
import SectionHeading from '@/components/common/typos/SectionHeading';
import RecipeTimeInfo from '@/components/ui/cards/RecipeTimeInfo';
import DirectionItem from '@/components/ui/collections/DirectionItem';
import IngredientDisplayer from '@/components/ui/collections/IngredientDisplayer';
import SimpleContainer from '@/components/ui/container/SimpleContainer';
import NutrionPerServingInfo from '@/components/ui/displayers/NutrionPerServingInfo';
import SameAuthorRecipesCarousel from '@/components/ui/displayers/SameAuthorRecipesCarousel/SameAuthorRecipesCarousel';
import NutrionPerServingModal from '@/components/ui/modals/NutrionPerServingModal';
import Layout from '@/layout/Layout';
import { N_AValue } from '@/lib/constants/common';
import { DefaultNutritionValue } from '@/lib/constants/defaultValue';
import AppContext from '@/lib/contexts/AppContext';
import { auth } from '@/lib/firebase/config';
import { RecipeRes } from '@/lib/models/dtos/Response/RecipeRes/RecipeRes';
import RecipeService from '@/lib/services/recipeService';
import createCacheAsyncFunction from '@/utils/cache/createCacheAsyncFunction';
import { createDebugStringFormatter } from '@/utils/debug/formatter';
import { dateTimeToMinutes } from '@/utils/format';
import {
    Add,
    Bookmark,
    BookmarkOutlined,
    Edit,
    Facebook,
    Mail,
    Pinterest,
    PrintOutlined,
    StarRateRounded,
    Twitter,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Link,
    Rating,
    Stack,
    Typography,
} from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import {
    FC,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';

// Mock bread crumbs data (will be remove later)
const breadCrumbsLinks = [
    {
        href: '/',
        label: 'Tasteal',
    },
    {
        href: '/',
        label: 'Recipes',
    },
    {
        href: '/',
        label: 'Keto',
    },
];

/**
 * Page id for debug purpose.
 * @constant {string} PAGE_ID
 */
const PAGE_ID = 'RecipeDetail';

/**
 * Constants for recipe detail page
 */
const RecipeDetailStringConstants = {
    DEFAULT_NAME: N_AValue,
    DEFAULT_INSTRUCTION: N_AValue,
} as const;

/**
 * Formatter help attach page identifier to message log.
 */
const debugStringFormatter = createDebugStringFormatter(PAGE_ID);

/**
 * Cached version of RecipeService.GetById
 */
const getRecipeById = createCacheAsyncFunction(RecipeService.GetById);

const RecipeDetail: FC = () => {
    //#region Destructuring

    const { id } = useParams();

    //#endregion
    //#region Hooks

    const { handleSpinner } = useContext(AppContext);

    //#endregion
    //#region Recipe

    const [isRecipeFound, setIsRecipeFound] = useState(true);
    const [recipe, setRecipe] = useState<RecipeRes | null>(null);

    useEffect(() => {
        handleSpinner(true);

        if (!id) {
            setRecipe(null);
            console.log(debugStringFormatter('Failed to get recipe id'));
            return;
        }

        const parsedId = parseInt(id);

        getRecipeById(parsedId)
            .then((recipe) => {
                setRecipe(recipe);
                setIsRecipeFound(true);
                console.log(
                    debugStringFormatter('Get recipe data sucessfully!')
                );
            })
            .catch(() => {
                setRecipe(null);
                setIsRecipeFound(false);
                console.log(debugStringFormatter('Failed to get recipe data!'));
            })
            .finally(() => handleSpinner(false));
    }, [handleSpinner, id]);

    //#endregion
    //#region Nutrition

    const [nutritionPerServingModalOpen, setNutritionPerServingModalOpen] =
        useState(false);

    const handleNutrionPerServingModalClose = useCallback(() => {
        setNutritionPerServingModalOpen(false);
    }, [setNutritionPerServingModalOpen]);

    //#endregion
    //#region Edit Recipe

    const [canEditRecipe, setCanEditRecipe] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) return;

            if (!recipe || !recipe.author) return;

            if (user.uid === recipe.author.uid) {
                setCanEditRecipe(true);
            } else {
                setCanEditRecipe(false);
            }
        });

        return () => unsubscribe();
    }, [recipe]);

    //#endregion
    //#region Others

    const recipeBrief = useMemo(() => {
        if (!recipe) {
            return RecipeDetailStringConstants.DEFAULT_NAME;
        }

        const ingredientCount = recipe.ingredients.length;
        const directionCount = recipe.directions.length;
        const totalTime = recipe.totalTime;

        return `${ingredientCount} NGUYÊN LIỆU • ${directionCount} BƯỚC • ${dateTimeToMinutes(
            totalTime
        )} PHÚT`;
    }, [recipe]);

    //#endregion

    console.log(recipe);

    return (
        <Layout>
            <WithFallback
                criteria={isRecipeFound}
                fallback={<RecipeNotFound />}
            >
                <Container>
                    <Grid
                        container
                        sx={{ backgroundColor: 'background.default', py: 2 }}
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <TastealBreadCrumbs links={breadCrumbsLinks} />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                        >
                            <Grid
                                container
                                columnSpacing={4}
                            >
                                <Grid
                                    item
                                    xs={8}
                                >
                                    {/* TODO: Please make a placeholder for null image */}
                                    {/* TODO: Replace with real image */}
                                    {recipe?.image ? (
                                        <>
                                            <BoxImage
                                                src={recipe.image}
                                                alt={'Không tìm thấy ảnh'}
                                                quality={80}
                                                sx={{
                                                    width: '100%',
                                                    height: 520,
                                                    objectFit: 'cover',
                                                    borderRadius: 4,
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Typography>
                                                Không tìm thấy hình ảnh
                                            </Typography>
                                        </>
                                    )}
                                </Grid>

                                <Grid
                                    item
                                    xs={4}
                                >
                                    <Stack
                                        justifyContent={'center'}
                                        height={'100%'}
                                        gap={1}
                                    >
                                        <Chip
                                            label="Công thức"
                                            sx={{
                                                borderRadius: 1,
                                                width: 'fit-content',
                                                backgroundColor: 'primary.main',
                                                color: 'primary.contrastText',
                                                typography: 'body2',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                        <Typography
                                            fontStyle={'italic'}
                                            color={'primary.main'}
                                            sx={{
                                                bgColor: 'secondary.main',
                                                borderRadius: 4,
                                                mt: 1,
                                            }}
                                        >
                                            {recipeBrief}
                                        </Typography>
                                        <Typography
                                            typography={'h3'}
                                            color={'primary.main'}
                                            fontWeight={'bold'}
                                        >
                                            {recipe?.name ??
                                                RecipeDetailStringConstants.DEFAULT_NAME}
                                        </Typography>
                                        <Button
                                            startIcon={<Edit />}
                                            variant="contained"
                                            sx={{
                                                display: canEditRecipe
                                                    ? 'block'
                                                    : 'none',
                                            }}
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={8}
                        >
                            <Stack gap={8}>
                                <Typography
                                    color="primary.main"
                                    typography={'body1'}
                                >
                                    {recipe?.introduction ??
                                        RecipeDetailStringConstants.DEFAULT_INSTRUCTION}
                                </Typography>

                                <RecipeTimeInfo
                                    totalTime={
                                        recipe?.totalTime.toString() ?? ''
                                    }
                                />

                                <IngredientDisplayer
                                    ingredients={recipe?.ingredients ?? []}
                                />

                                <NutrionPerServingInfo
                                    onClick={() =>
                                        setNutritionPerServingModalOpen(true)
                                    }
                                    nutritionInfo={
                                        recipe?.nutrition_info ??
                                        DefaultNutritionValue
                                    }
                                />

                                <Stack>
                                    <SectionHeading>
                                        Ghi chú của tác giả
                                    </SectionHeading>
                                    <Typography
                                        color="primary.main"
                                        typography={'body1'}
                                    >
                                        {recipe?.author_note}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>

                        <Grid
                            item
                            xs={4}
                        >
                            <SimpleContainer>
                                <Box
                                    display="flex"
                                    flexDirection={'column'}
                                    gap={1}
                                >
                                    <Box
                                        display="flex"
                                        gap={1}
                                    >
                                        <TastealIconButton>
                                            <PrintOutlined color="primary" />
                                        </TastealIconButton>
                                        <TastealIconButton>
                                            <Pinterest color="primary" />
                                        </TastealIconButton>
                                        <TastealIconButton>
                                            <Facebook color="primary" />
                                        </TastealIconButton>
                                        <TastealIconButton>
                                            <Twitter color="primary" />
                                        </TastealIconButton>
                                        <TastealIconButton>
                                            <Mail color="primary" />
                                        </TastealIconButton>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        startIcon={<Bookmark />}
                                    >
                                        LƯU CÔNG THỨC
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        sx={{
                                            color: 'primary.main',
                                            backgroundColor:
                                                'background.default',
                                            '&:hover': {
                                                backgroundColor:
                                                    'background.default',
                                            },
                                        }}
                                    >
                                        Thêm vào lịch ăn
                                    </Button>
                                </Box>
                            </SimpleContainer>

                            <SimpleContainer sx={{ mt: 2 }}>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    gap={1}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems={'center'}
                                        gap={2}
                                    >
                                        <Avatar src={recipe?.author.avatar} />
                                        <Link>
                                            <Typography fontWeight={'bold'}>
                                                {recipe?.author.name}
                                            </Typography>
                                        </Link>
                                    </Stack>
                                    <Typography color="gray">{`Hello this is my {not implemented yet} introduction.`}</Typography>
                                    <Link
                                        color="primary.main"
                                        fontWeight={'bold'}
                                    >
                                        https://www.sidechef.com/(not
                                        implemented)
                                    </Link>
                                </Box>
                            </SimpleContainer>
                        </Grid>
                    </Grid>
                </Container>

                <Box
                    sx={{
                        backgroundColor: 'secondary.main',
                    }}
                >
                    <Container sx={{ py: 8, width: '100%' }}>
                        <Stack
                            width={'60%'}
                            gap={1}
                        >
                            <Stack
                                direction="row"
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <SectionHeading>Hướng dẫn nấu</SectionHeading>
                                <Link href="#">Ẩn hình ảnh</Link>
                            </Stack>

                            <Stack gap={2}>
                                {recipe?.directions.map((direction, index) => (
                                    <DirectionItem
                                        key={index}
                                        value={direction}
                                        last={
                                            index ===
                                            recipe.directions.length - 1
                                        }
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    </Container>
                </Box>

                <Box>
                    <Container
                        sx={{
                            py: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                        }}
                    >
                        <Box width="60%">
                            <Stack
                                direction="row"
                                alignItems={'end'}
                                justifyContent={'space-between'}
                            >
                                <BigSectionHeading>
                                    Đánh giá & Review
                                </BigSectionHeading>
                                <Stack
                                    direction="row"
                                    alignItems={'center'}
                                >
                                    <Typography
                                        color="primary"
                                        fontSize={20}
                                        fontWeight={'bold'}
                                    >
                                        Chạm để đánh giá:
                                    </Typography>
                                    <Rating
                                        size="large"
                                        icon={<StarRateRounded />}
                                        emptyIcon={<StarRateRounded />}
                                    ></Rating>
                                </Stack>
                            </Stack>

                            <TastealTextField
                                multiline
                                rows={4}
                                placeholder="Để lại bình luận"
                                fullWidth
                                sx={{ mt: 1 }}
                            />
                        </Box>

                        {/* <Box width="60%">
            <BigSectionHeading>Tags</BigSectionHeading>
            <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => (
                <TagChip key={index} label={`Tag ${num}`} />
              ))}
            </Box>
          </Box> */}

                        <Divider sx={{ width: '60%' }} />

                        <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            width="60%"
                        >
                            <Box
                                display="flex"
                                alignItems={'center'}
                                gap={1}
                            >
                                <TastealIconButton>
                                    <BookmarkOutlined color="primary" />
                                </TastealIconButton>
                                <Typography
                                    color="primary.main"
                                    fontSize={16}
                                >
                                    Đã lưu {122} (not implemented yet)
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                gap={1}
                            >
                                <TastealIconButton>
                                    <PrintOutlined color="primary" />
                                </TastealIconButton>
                                <TastealIconButton>
                                    <Pinterest color="primary" />
                                </TastealIconButton>
                                <TastealIconButton>
                                    <Facebook color="primary" />
                                </TastealIconButton>
                                <TastealIconButton>
                                    <Twitter color="primary" />
                                </TastealIconButton>
                                <TastealIconButton>
                                    <Mail color="primary" />
                                </TastealIconButton>
                            </Box>
                        </Box>

                        <Box
                            component="img"
                            src="https://www.sidechef.com/profile/0d2c1ebb-7521-4107-9b04-0c85d6a5b4f1.png"
                            borderRadius={6}
                        ></Box>

                        <Box>
                            <Box
                                display="flex"
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <BigSectionHeading>
                                    Xem thêm của{' '}
                                    {recipe?.author.name || '{AuthorName}'} tại
                                    SideChef
                                </BigSectionHeading>
                                <Button
                                    sx={{
                                        color: 'primary.main',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                        '&:hover': {
                                            color: 'primary.main',
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Xem tất cả
                                </Button>
                            </Box>
                            <Box>
                                <SameAuthorRecipesCarousel
                                    recipes={recipe?.relatedRecipes}
                                />
                            </Box>
                        </Box>

                        <Box>
                            <Box
                                display="flex"
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <BigSectionHeading>
                                    Công thức gợi ý
                                </BigSectionHeading>
                            </Box>
                            <Box>{'Not yet implemented'}</Box>
                        </Box>
                    </Container>
                </Box>

                <NutrionPerServingModal
                    open={nutritionPerServingModalOpen}
                    onClose={handleNutrionPerServingModalClose}
                    nutritionInfo={recipe?.nutrition_info}
                />
            </WithFallback>
        </Layout>
    );
};

function RecipeNotFound() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Typography
                typography="h4"
                align="center"
            >
                Xin lỗi, công thức không tồn tại!
            </Typography>
        </Box>
    );
}

export default RecipeDetail;
