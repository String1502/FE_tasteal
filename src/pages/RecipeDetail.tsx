import { defaultAvtPath } from "@/assets/exportImage";
import TastealIconButton from "@/components/common/buttons/TastealIconButton";
import TastealTextField from "@/components/common/textFields/TastealTextField";
import BigSectionHeading from "@/components/common/typos/BigSectionHeading/BigSectionHeading";
import SectionHeading from "@/components/common/typos/SectionHeading";
import RecipeTimeInfo from "@/components/ui/cards/RecipeTimeInfo";
import DirectionItem from "@/components/ui/collections/DirectionItem";
import IngredientDisplayer from "@/components/ui/collections/IngredientDisplayer";
import SimpleContainer from "@/components/ui/container/SimpleContainer";
import NutrionPerServingInfo from "@/components/ui/displayers/NutrionPerServingInfo";
import SameAuthorRecipesCarousel from "@/components/ui/displayers/SameAuthorRecipesCarousel/SameAuthorRecipesCarousel";
import NutrionPerServingModal from "@/components/ui/modals/NutrionPerServingModal";
import Layout from "@/layout/Layout";
import { N_A_VALUE } from "@/lib/constants/common";
import { DEFAULT_NUTRITION_VALUE } from "@/lib/constants/defaultValue";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";
import { AccountEntity } from "@/lib/models/entities/AccountEntity/AccountEntity";
import { Nutrition_InfoEntity } from "@/lib/models/entities/Nutrition_InfoEntity/Nutrition_InfoEntity";
import { Recipe_DirectionEntity } from "@/lib/models/entities/Recipe_DirectionEntity/Recipe_DirectionEntity";
import { Recipe_IngredientEntity } from "@/lib/models/entities/Recipe_IngredientEntity/Recipe_IngredientEntity";
import { RecipeEntity } from "@/lib/models/entities/RecipeEntity/RecipeEntity";
import AccountService from "@/lib/services/accountService";
import IngredientService from "@/lib/services/ingredientService";
import NutritionService from "@/lib/services/NutrionInfoService";
import RecipeDirectionService from "@/lib/services/RecipeDirectionService";
import RecipeIngredientService from "@/lib/services/RecipeIngredientService";
import RecipeService from "@/lib/services/recipeService";
import { createDebugStringFormatter } from "@/utils/debug/formatter";
import {
  Add,
  Bookmark,
  BookmarkOutlined,
  Facebook,
  Mail,
  Pinterest,
  PrintOutlined,
  StarRateRounded,
  Twitter,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Page id for debug purpose.
 * @constant {string} PAGE_ID
 */
const PAGE_ID = "RecipeDetail";

/**
 * Constants for recipe detail page
 */
const RecipeDetailStringConstants = {
  DEFAULT_NAME: N_A_VALUE,
  DEFAULT_INSTRUCTION: N_A_VALUE,
} as const;

/**
 * Formatter help attach page identifier to message log.
 */
const debugStringFormatter = createDebugStringFormatter(PAGE_ID);

const RecipeDetail: FC = () => {
  //#region UseHooks

  const { id } = useParams();
  const authorImage = useFirebaseImage(defaultAvtPath);

  //#endregion

  //#region UseStates

  const [recipe, setRecipe] = useState<RecipeEntity | null>(null);
  const [directions, setDirections] = useState<Recipe_DirectionEntity[]>([]);
  const [recipeIngredients, setRecipeIngredients] = useState<
    Recipe_IngredientEntity[]
  >([]);
  const [author, setAuthor] = useState<AccountEntity | null>(null);
  const [sameAccountRecipes, setSameAccountRecipes] = useState<RecipeEntity[]>(
    []
  );
  const [nutritionInfo, setNutrionInfo] = useState<Nutrition_InfoEntity | null>(
    null
  );

  const [rating, setRating] = useState(0);

  const [nutrionPerServingModalOpen, setNutrionPerServingModalOpen] =
    useState(false);

  //#endregion

  //#region Functions

  /**
   * Fetch recipe with id params from url then update state.
   */
  const getRecipe = useCallback((): Promise<string> => {
    if (!id) {
      return Promise.reject("Invalid recipe id.");
    }

    return RecipeService.GetById(parseInt(id))
      .then((recipe) => {
        if (recipe) {
          setRecipe(recipe);
          return Promise.resolve("successful!");
        } else {
          setRecipe(null);
          return Promise.reject("Recipe not found.");
        }
      })
      .catch((err) => {
        return Promise.reject(`Fail to fetch recipe from service: ${err}.`);
      });
  }, [id]);

  /**
   * Fetch recipe's directions then update state.
   */
  const getDirections = useCallback((): Promise<string> => {
    if (!recipe) {
      return Promise.reject("Current recipe has null value.");
    }

    return RecipeDirectionService.GetByRecipeId(recipe.id).then(
      (directions) => {
        setDirections(directions);
        return Promise.resolve("successful!");
      }
    );
  }, [recipe]);

  /**
   * Fetch recipe's ingredients then update state.
   */
  const getIngredients = useCallback((): Promise<string> => {
    if (!recipe) {
      return Promise.reject("Current recipe has null value.");
    }

    return RecipeIngredientService.GetByRecipeId(recipe.id).then(
      (recipeIngredients) => {
        IngredientService.GetByIds(
          recipeIngredients.map((r) => r.ingredient_id)
        ).then((ingredients) => {
          // Asign references
          for (const recipeIngredient of recipeIngredients) {
            recipeIngredient.recipe = recipe;
            recipeIngredient.ingredient =
              ingredients.filter(
                (i) => i.id === recipeIngredient.ingredient_id
              )[0] ?? null;
          }
          setRecipeIngredients(recipeIngredients);
        });

        return Promise.resolve("successful!");
      }
    );
  }, [recipe]);

  const getAuthor = useCallback(() => {
    if (!recipe) {
      return Promise.reject("Current recipe has null value.");
    }

    if (!recipe.author) {
      return Promise.reject("Recipe's author id is invalid");
    }

    return AccountService.GetByUid(recipe.author).then((author) => {
      setAuthor(author ?? null);
      return Promise.resolve(author);
    });
  }, [recipe]);

  const getSameAccountRecipes = useCallback(() => {
    if (!recipe) {
      return Promise.reject("Current recipe has null value.");
    }

    if (!recipe.author) {
      return Promise.reject("Recipe's author id is invalid");
    }

    return RecipeService.GetByAccountId(recipe.author).then((recipes) => {
      setSameAccountRecipes(recipes);
    });
  }, [recipe]);

  const getNutritionInfo = useCallback(() => {
    if (!recipe) {
      return Promise.reject("Current recipe has null value.");
    }

    if (!recipe.nutrition_info_id) {
      return Promise.reject("Recipe's nutrition info id is invalid");
    }

    return NutritionService.GetById(recipe.nutrition_info_id).then(
      (nutrition) => {
        setNutrionInfo(nutrition ?? null);
        return Promise.resolve(nutrition);
      }
    );
  }, [recipe]);

  //#endregion

  //region Callbacks

  const handleNutrionPerServingModalClose = useCallback(() => {
    setNutrionPerServingModalOpen(false);
  }, [setNutrionPerServingModalOpen]);

  //#endregion

  //#region UseEffects

  useEffect(() => {
    getRecipe()
      .then(() => {
        getDirections().catch((msg) => console.log(debugStringFormatter(msg)));
        getIngredients().catch((msg) => console.log(debugStringFormatter(msg)));
        getAuthor()
          .then(() =>
            getSameAccountRecipes().catch((msg) =>
              console.log(debugStringFormatter(msg))
            )
          )
          .catch((msg) => console.log(debugStringFormatter(msg)));
        getNutritionInfo().catch((msg) =>
          console.log(debugStringFormatter(msg))
        );
      })
      .catch((msg) => console.log(debugStringFormatter(msg)));
  }, [
    getAuthor,
    getDirections,
    getIngredients,
    getNutritionInfo,
    getRecipe,
    getSameAccountRecipes,
    id,
  ]);

  //#endregion

  //#region UseMemos

  const recipeBrief = useMemo(() => {
    const ingredientCount = recipeIngredients.length;
    const directionCount = directions.length;
    const totalTime = recipe?.totalTime ?? 0;

    return `${ingredientCount} INGREDIENTS • ${directionCount} STEPS • ${totalTime} MIN`;
  }, [directions.length, recipe?.totalTime, recipeIngredients.length]);

  //#endregion

  return (
    <Layout>
      <Container>
        <Grid
          container
          sx={{ backgroundColor: "background.default", py: 2 }}
          spacing={2}
        >
          <Grid item xs={12}>
            <Breadcrumbs>
              <Link>Tasteal</Link>
              <Link>Recipes</Link>
              // TODO: change this to recipe type
              <Link>Keto</Link>
            </Breadcrumbs>
          </Grid>

          <Grid item xs={12}>
            <Grid container columnSpacing={4}>
              <Grid item xs={8}>
                {/* TODO: Please make a placeholder for null image */}
                {/* TODO: Replace with real image */}
                {recipe?.image ? (
                  <Box
                    component={"img"}
                    src={
                      "https://www.sidechef.com/recipe/a1fbb0d7-7257-4b0a-bd35-8f5cc4b803d9.jpg?d=1408x1120"
                    }
                    sx={{
                      width: "100%",
                      height: 520,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  ></Box>
                ) : (
                  <>
                    <Typography>Image not found</Typography>
                  </>
                )}
              </Grid>

              <Grid item xs={4}>
                <Stack justifyContent={"center"} height={"100%"} gap={1}>
                  <Chip
                    label="Recipe"
                    sx={{
                      borderRadius: 1,
                      width: "fit-content",
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      typography: "body2",
                      fontWeight: "bold",
                    }}
                  />
                  <Typography
                    fontStyle={"italic"}
                    color={"primary.main"}
                    sx={{ bgColor: "secondary.main", borderRadius: 4, mt: 1 }}
                  >
                    {recipeBrief}
                  </Typography>
                  <Typography
                    typography={"h3"}
                    color={"primary.main"}
                    fontWeight={"bold"}
                  >
                    {recipe?.name ?? RecipeDetailStringConstants.DEFAULT_NAME}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            <Stack gap={8}>
              <Typography color="primary.main" typography={"body1"}>
                {recipe?.introduction ??
                  RecipeDetailStringConstants.DEFAULT_INSTRUCTION}
              </Typography>

              <RecipeTimeInfo totalTime={recipe?.totalTime.toString() ?? ""} />

              <IngredientDisplayer ingredients={recipeIngredients} />

              <NutrionPerServingInfo
                onClick={() => setNutrionPerServingModalOpen(true)}
                nutritionInfo={nutritionInfo ?? DEFAULT_NUTRITION_VALUE}
              />

              <Stack>
                <SectionHeading>Author's Notes</SectionHeading>
                <Typography color="primary.main" typography={"body1"}>
                  {recipe?.author_note}
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <SimpleContainer>
              <Box display="flex" flexDirection={"column"} gap={1}>
                <Box display="flex" gap={1}>
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
                <Button variant="contained" startIcon={<Bookmark />}>
                  SAVE RECIPE
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    color: "primary.main",
                    backgroundColor: "background.default",
                    "&:hover": {
                      backgroundColor: "background.default",
                    },
                  }}
                >
                  ADD TO PLAN
                </Button>
              </Box>
            </SimpleContainer>

            <SimpleContainer sx={{ mt: 2 }}>
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Stack direction="row" alignItems={"center"} gap={2}>
                  <Avatar src={authorImage} />
                  <Link>
                    <Typography fontWeight={"bold"}>{author?.name}</Typography>
                  </Link>
                </Stack>
                <Typography color="gray">{`Hello this is my {not implemented yet} introduction.`}</Typography>
                <Link color="primary.main" fontWeight={"bold"}>
                  https://www.sidechef.com/(not implemented)
                </Link>
              </Box>
            </SimpleContainer>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          backgroundColor: "secondary.main",
        }}
      >
        <Container sx={{ py: 8, width: "100%" }}>
          <Stack width={"60%"} gap={1}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <SectionHeading>Cooking Instructions</SectionHeading>
              <Link href="#">HIDE IMAGES</Link>
            </Stack>

            <Stack gap={2}>
              {directions.map((direction, index) => (
                <DirectionItem key={index} value={direction} />
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box>
        <Container
          sx={{
            py: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Box width="60%">
            <Stack
              direction="row"
              alignItems={"end"}
              justifyContent={"space-between"}
            >
              <BigSectionHeading>Rate & Review</BigSectionHeading>
              <Stack direction="row" alignItems={"center"}>
                <Typography color="primary" fontSize={20} fontWeight={"bold"}>
                  Tap to rate:
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
              placeholder="Leave a comment"
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

          <Divider sx={{ width: "60%" }} />

          <Box display={"flex"} justifyContent={"space-between"} width="60%">
            <Box display="flex" alignItems={"center"} gap={1}>
              <TastealIconButton>
                <BookmarkOutlined color="primary" />
              </TastealIconButton>
              <Typography color="primary.main" fontSize={16}>
                {122} Saved (not implemented yet)
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
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
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <BigSectionHeading>
                More from {author?.name ?? "{AuthorName}"} at SideChef
              </BigSectionHeading>
              <Button
                sx={{
                  color: "primary.main",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                VIEW ALL
              </Button>
            </Box>
            <Box>
              <SameAuthorRecipesCarousel recipes={sameAccountRecipes} />
            </Box>
          </Box>

          <Box>
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <BigSectionHeading>Recommended Recipes</BigSectionHeading>
            </Box>
            <Box>{"Not yet implemented"}</Box>
          </Box>
        </Container>
      </Box>

      <NutrionPerServingModal
        open={nutrionPerServingModalOpen}
        onClose={handleNutrionPerServingModalClose}
        nutritionInfo={nutritionInfo ?? DEFAULT_NUTRITION_VALUE}
      />
    </Layout>
  );
};

export default RecipeDetail;
