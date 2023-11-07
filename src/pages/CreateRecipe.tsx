import RoundedButton from "@/components/common/buttons/RoundedButton";
import ChipsDisplayer, {
  ChipValue,
} from "@/components/common/collections/ChipsDisplayer";
import ImagePicker from "@/components/common/files/ImagePicker";
import TastealTextField from "@/components/common/textFields/TastealTextField";
import FormLabel from "@/components/common/typos/FormLabel";
import FormTitle from "@/components/common/typos/FormTitle";
import DirectionEditor from "@/components/ui/collections/DirectionEditor";
import { DirectionEditorItemValue } from "@/components/ui/collections/DirectionEditor/DirectionEditorItem/DirectionEditorItem";
import IngredientSelector from "@/components/ui/collections/IngredientSelector";
import { IngredientItemData } from "@/components/ui/collections/IngredientSelector/types";
import NewIngredientModal from "@/components/ui/modals/NewIngredientModal";
import ServingSizeSelect from "@/components/ui/selects/ServingSizeSelect";
import Layout from "@/layout/Layout";
import { SERVING_SIZES } from "@/lib/constants/options";
import { STORAGE_PATH } from "@/lib/constants/storage";
import { uploadImage } from "@/lib/firebase/image";
import { RecipeReq } from "@/lib/models/dtos/Request/RecipeReq/RecipeReq";
import { Direction } from "@/lib/models/dtos/common";
import RecipeService from "@/lib/services/recipeService";
import { createDebugStringFormatter } from "@/utils/debug/formatter";
import { getFileExtension } from "@/utils/file";
import { minuteToTimeString } from "@/utils/format";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Create debug string
 */
const createDebugString = createDebugStringFormatter("CreateRecipe");

/**
 * Because api resopnse is a whole object, so I'll mock occasion instead of create
 * a whole new service for it.
 */
const mockOccasions = [
  {
    id: 1,
    name: "Lunar New Year",
  },
  {
    id: 2,
    name: "Chrismas",
  },
  {
    id: 3,
    name: "Halloween",
  },
  {
    id: 4,
    name: "Birthday",
  },
  {
    id: 5,
    name: "Wedding",
  },
  {
    id: 6,
    name: "Thanksgiving",
  },
];

/**
 * Represents a new recipe.
 */
type NewRecipe = {
  /** The name of the recipe. */
  name: string;
  /** The introduction for the recipe. */
  introduction: string;
  /** The image URL of the recipe. */
  image: string;
  /** The serving size of the recipe. */
  servingSize: number;
  /** The list of ingredients for the recipe. */
  ingredients: IngredientItemData[];
  /** The list of directions for the recipe. */
  directions: DirectionEditorItemValue[];
  /** Any additional notes from the author. */
  authorNote: string;
  /** Indicates if the recipe is private. */
  isPrivate: boolean;
};

const DEFAULT_NEW_RECIPE: NewRecipe = {
  name: "",
  image: "",
  servingSize: 1,
  ingredients: [],
  directions: [],
  introduction: "",
  authorNote: "",
  isPrivate: true,
};

const resolveDirectionImage = async (
  direction: DirectionEditorItemValue,
  imageId: string,
  step: number
): Promise<Omit<Direction, "recipe_id">> => {
  const { imageFile, ...others } = direction;

  if (imageFile) {
    try {
      const path = await uploadImage(
        imageFile,
        `${STORAGE_PATH.DIRECTION}/${imageId}[${step}].${getFileExtension(
          imageFile.name
        )}`
      );

      return {
        ...others,
        image: path,
      };
    } catch (e) {
      throw new Error("Failed to upload a blob or file!");
    }
  }

  return Promise.resolve({
    ...others,
    image: "",
  });
};

const resolveDirectionsImage = (
  directions: DirectionEditorItemValue[],
  imageId: string
): Promise<Omit<Direction, "recipe_id">[]> => {
  return Promise.all(
    directions.map((dir, index) =>
      resolveDirectionImage(dir, imageId, index + 1)
    )
  );
};

const CreateRecipe: React.FunctionComponent = () => {
  //#region UseStates

  const [ingredientSelectModalOpen, setIngredientSelectModalOpen] =
    useState(false);
  const [recipeThumbnailFile, setRecipeThumbnailFile] = useState<File | null>(
    null
  );
  const [newRecipe, setNewRecipe] = useState<NewRecipe>(DEFAULT_NEW_RECIPE);

  const [selectedOccasions, setSelectedOccasions] = useState<ChipValue[]>([]);

  //#endregion

  //#region Methods

  const filterOccasions = useCallback(
    (occasions: ChipValue[]) => {
      return occasions.filter((occasion) => {
        return !selectedOccasions.some(
          (selectedOccasion) => selectedOccasion.id === occasion.id
        );
      });
    },
    [selectedOccasions]
  );

  //#endregion

  //#region UseMemos

  const canCreateRecipe = useMemo(
    () => newRecipe.name && newRecipe.ingredients.length > 0,
    [newRecipe]
  );

  const filteredOccasions = useMemo(() => {
    return filterOccasions(mockOccasions);
  }, [filterOccasions]);

  //#endregion

  //#region Methods

  const createPostData = useCallback(async (): Promise<RecipeReq> => {
    const IMAGE_ID = uuidv4();

    let path = `${STORAGE_PATH.RECIPE}/${IMAGE_ID}.${getFileExtension(
      recipeThumbnailFile.name
    )}`;

    path = await uploadImage(recipeThumbnailFile, path);

    const directionsWithImage = await resolveDirectionsImage(
      newRecipe.directions,
      IMAGE_ID
    );

    const postData: RecipeReq = {
      name: newRecipe.name,
      introduction: newRecipe.introduction,
      image: path,
      totalTime: minuteToTimeString(15),
      active_time: minuteToTimeString(5),
      serving_size: newRecipe.servingSize,
      ingredients: newRecipe.ingredients.map((ingredient) => ({
        id: ingredient.ingredientId,
        name: ingredient.name,
        amount: ingredient.amount,
        isLiquid: ingredient.isLiquid,
      })),
      direction: directionsWithImage,
      author_note: newRecipe.authorNote,
      author: "uid",
      is_private: newRecipe.isPrivate,
      rating: 0,
    };

    return postData;
  }, [
    newRecipe.authorNote,
    newRecipe.directions,
    newRecipe.ingredients,
    newRecipe.introduction,
    newRecipe.isPrivate,
    newRecipe.name,
    newRecipe.servingSize,
    recipeThumbnailFile,
  ]);

  //#endregion

  //#region Handlers

  const handleNewRecipeFieldChange = useCallback(
    <T extends keyof NewRecipe>(field: T, value: NewRecipe[T]) => {
      setNewRecipe((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleIngredientSelectModalOpen = useCallback(() => {
    setIngredientSelectModalOpen(true);
  }, []);

  const handleIngredientSelectModalClose = useCallback(() => {
    setIngredientSelectModalOpen(false);
  }, []);

  const handleAddIngredient = useCallback(
    (newIngredient: IngredientItemData) => {
      setIngredientSelectModalOpen(false);
      handleNewRecipeFieldChange("ingredients", [
        ...newRecipe.ingredients,
        newIngredient,
      ]);
    },
    [handleNewRecipeFieldChange, newRecipe.ingredients]
  );

  const handleIngredientsChange = useCallback(
    (ingredients: IngredientItemData[]) => {
      handleNewRecipeFieldChange("ingredients", ingredients);
    },
    [handleNewRecipeFieldChange]
  );

  const handleRecipeThumbnailChange = useCallback((file: File | null) => {
    setRecipeThumbnailFile(file);
  }, []);

  const handleSelectedOccasionsChange = useCallback((value: ChipValue[]) => {
    setSelectedOccasions(value);
  }, []);

  const handleSelectOccasion = useCallback((value: ChipValue | null) => {
    if (value) {
      setSelectedOccasions((prev) => [...prev, value]);
    }
  }, []);

  const handleDirectionsChange = useCallback(
    (directions: DirectionEditorItemValue[]) => {
      setNewRecipe((prev) => ({
        ...prev,
        directions: directions,
      }));
    },
    []
  );

  const handleCreateRecipe = useCallback(async () => {
    try {
      const postData = await createPostData();
      console.log(postData);
      RecipeService.CreateRecipe(postData)
        .then((response) => {
          console.log(response);
        })
        .catch((msg) => {
          console.log(createDebugString(msg));
        });
    } catch (e) {
      console.log(createDebugString(e));
    }
  }, [createPostData]);

  //#endregion

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#F0F0F0",
          py: 4,
        }}
      >
        <Card
          sx={{ width: "52%", borderRadius: 12, p: 4, bgcolor: "##FFFAF9" }}
        >
          <CardContent>
            <Stack gap={4}>
              <FormTitle>Create Your Own Recipe</FormTitle>
              <Stack>
                <FormLabel>Recipe Title</FormLabel>
                <TastealTextField
                  value={newRecipe.name}
                  onChange={(e) =>
                    handleNewRecipeFieldChange("name", e.target.value)
                  }
                  placeholder="Type your recipe name here"
                />
              </Stack>
              <Stack>
                <FormLabel>Introduction (Optional)</FormLabel>
                <TastealTextField
                  value={newRecipe.introduction}
                  onChange={(e) =>
                    handleNewRecipeFieldChange("introduction", e.target.value)
                  }
                  multiline
                  rows={2}
                  placeholder={`Add introduction (e.g "transfer to a small bowl")`}
                />
              </Stack>
              <Stack gap={1}>
                <FormLabel>Occasions</FormLabel>
                <Autocomplete
                  options={filteredOccasions}
                  getOptionLabel={(o) => o.name}
                  title="Select occasions"
                  placeholder="Select occasions"
                  noOptionsText="No occasions found"
                  renderInput={(params) => (
                    <TastealTextField {...params} label="Select occasions" />
                  )}
                  onChange={(_, value) => handleSelectOccasion(value)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
                <ChipsDisplayer
                  chips={selectedOccasions}
                  onChange={handleSelectedOccasionsChange}
                />
              </Stack>
              <Stack>
                <FormLabel>Add Cover Image (Optional)</FormLabel>
                <ImagePicker
                  file={recipeThumbnailFile}
                  onChange={handleRecipeThumbnailChange}
                />
              </Stack>
              <Stack>
                <FormLabel>Serving Size</FormLabel>
                <ServingSizeSelect
                  servingSize={newRecipe.servingSize}
                  sizes={SERVING_SIZES}
                  onServingSizeChange={(size) =>
                    handleNewRecipeFieldChange("servingSize", size)
                  }
                />
              </Stack>
              <Stack>
                <FormLabel>Ingredients</FormLabel>
                <IngredientSelector
                  ingredients={newRecipe.ingredients}
                  onChange={handleIngredientsChange}
                  onOpen={handleIngredientSelectModalOpen}
                />
              </Stack>
              <Stack>
                <FormLabel>Directions</FormLabel>
                <DirectionEditor
                  directions={newRecipe.directions}
                  onChange={handleDirectionsChange}
                />
              </Stack>
              <Stack>
                <FormLabel>Author's Notes (Optional)</FormLabel>
                <TastealTextField
                  value={newRecipe.authorNote}
                  onChange={(e) =>
                    handleNewRecipeFieldChange("authorNote", e.target.value)
                  }
                  multiline
                  rows={2}
                  placeholder={`Add tips or tricks for this recipe`}
                />
              </Stack>
              <Stack>
                <RadioGroup
                  value={newRecipe.isPrivate}
                  onChange={(e) =>
                    handleNewRecipeFieldChange(
                      "isPrivate",
                      e.target.value === "true"
                    )
                  }
                  defaultValue={true}
                  name="isRecipePrivate"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Not Visible to others"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Generates a shareable link"
                  />
                </RadioGroup>
              </Stack>
              <Stack>
                <RoundedButton
                  variant="contained"
                  disabled={!canCreateRecipe}
                  onClick={handleCreateRecipe}
                >
                  DONE
                </RoundedButton>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <NewIngredientModal
        open={ingredientSelectModalOpen}
        onClose={handleIngredientSelectModalClose}
        onAddIngredient={handleAddIngredient}
      />
    </Layout>
  );
};

export default CreateRecipe;
