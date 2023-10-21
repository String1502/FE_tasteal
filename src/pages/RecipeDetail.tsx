import { defaultAvt } from "@/assets/exportImage";
import RecipeTimeInfo from "@/components/ui/cards/RecipeTimeInfo";
import IngredientDisplayer from "@/components/ui/collections/IngredientDisplayer";
import { N_A_VALUE } from "@/lib/constants/common";
import IngredientService from "@/lib/services/IngredientService";
import RecipeDirectionService from "@/lib/services/RecipeDirectionService";
import RecipeIngredientService from "@/lib/services/RecipeIngredientService";
import RecipeService from "@/lib/services/RecipeService";
import {
  RecipeEntity,
  Recipe_DirectionEntity,
  Recipe_IngredientEntity,
} from "@/types/type";
import { createDebugStringFormatter } from "@/utils/debug/formatter";
import {
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Grid,
  Link,
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
  const [recipe, setRecipe] = useState<RecipeEntity | null>(null);
  const [directions, setDirections] = useState<Recipe_DirectionEntity[]>([]);
  const [recipeIngredients, setRecipeIngredients] = useState<
    Recipe_IngredientEntity[]
  >([]);

  const { id } = useParams();

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
            recipeIngredient.Recipe = recipe;
            recipeIngredient.Ingredient =
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

  //#endregion

  //#region UseEffects

  useEffect(() => {
    getRecipe()
      .then(() => {
        getDirections().catch((msg) => console.log(debugStringFormatter(msg)));
        getIngredients().catch((msg) => console.log(debugStringFormatter(msg)));
      })
      .catch((msg) => console.log(debugStringFormatter(msg)));
  }, [getDirections, getIngredients, getRecipe, id]);

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
    <Container sx={{ backgroundColor: "background.default", py: 2 }}>
      <Grid container spacing={4}>
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
                  src={defaultAvt}
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

            <RecipeTimeInfo totalTime={recipe?.totalTime ?? 0} />

            <IngredientDisplayer ingredients={recipeIngredients} />
          </Stack>
        </Grid>

        <Grid item xs={4}></Grid>
      </Grid>
    </Container>
  );
};

export default RecipeDetail;
