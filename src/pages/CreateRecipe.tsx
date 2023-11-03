import RoundedButton from "@/components/common/buttons/RoundedButton";
import ChipsDisplayer, {
  ChipValue,
} from "@/components/common/collections/ChipsDisplayer";
import ImagePicker from "@/components/common/files/ImagePicker";
import TastealTextField from "@/components/common/textFields/TastealTextField";
import FormLabel from "@/components/common/typos/FormLabel";
import FormTitle from "@/components/common/typos/FormTitle";
import IngredientSelector from "@/components/ui/collections/IngredientSelector";
import { IngredientItemData } from "@/components/ui/collections/IngredientSelector/types";
import NewIngredientModal from "@/components/ui/modals/NewIngredientModal";
import ServingSizeSelect from "@/components/ui/selects/ServingSizeSelect";
import Layout from "@/layout/Layout";
import { SERVING_SIZES } from "@/lib/constants/options";
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
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";

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
  /** The title of the recipe. */
  title: string;
  /** The image URL of the recipe. */
  image: string;
  /** The serving size of the recipe. */
  servingSize: number;
  /** The list of ingredients for the recipe. */
  ingredients: IngredientItemData[];
  /** The cooking instructions for the recipe. */
  cookingInstruction: string;
  /** Any additional notes from the author. */
  authorNote: string;
  /** Indicates if the recipe is private. */
  isPrivate: boolean;
};

const DEFAULT_NEW_RECIPE: NewRecipe = {
  title: "",
  image: "",
  servingSize: 1,
  ingredients: [],
  cookingInstruction: "",
  authorNote: "",
  isPrivate: true,
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
    () => newRecipe.title && newRecipe.ingredients.length > 0,
    [newRecipe]
  );

  const filteredOccasions = useMemo(() => {
    return filterOccasions(mockOccasions);
  }, [filterOccasions]);

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

  //#endregion

  console.log(newRecipe);

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
                  value={newRecipe.title}
                  onChange={(e) =>
                    handleNewRecipeFieldChange("title", e.target.value)
                  }
                  placeholder="Type your recipe name here"
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
                />
                <ChipsDisplayer
                  chips={selectedOccasions}
                  onChange={handleSelectedOccasionsChange}
                />
              </Stack>
              <Stack>
                <FormLabel>Cooking Instructions (Optional)</FormLabel>
                <TastealTextField
                  value={newRecipe.cookingInstruction}
                  onChange={(e) =>
                    handleNewRecipeFieldChange(
                      "cookingInstruction",
                      e.target.value
                    )
                  }
                  multiline
                  rows={2}
                  placeholder={`Add one or multiple steps (e.g "transfer to a small bowl")`}
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
                <RoundedButton variant="contained" disabled={!canCreateRecipe}>
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
