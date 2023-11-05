import CollectionItemAddButton from "@/components/common/buttons/CollectionItemAddButton";
import { Stack } from "@mui/material";
import { useCallback } from "react";
import IngredientItem from "./IngredientItem";
import { IngredientItemData } from "./types";

export const IngredientSelector: React.FunctionComponent<{
  ingredients: IngredientItemData[];
  onChange: (ingredients: IngredientItemData[]) => void;
  onOpen: () => void;
}> = ({ ingredients, onChange, onOpen }) => {
  const handleDelete = useCallback(
    (id: string) => {
      onChange(ingredients.filter((ingredient) => ingredient.id !== id));
    },
    [ingredients, onChange]
  );

  const handleNewClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Stack gap={2}>
        {ingredients.length > 0 &&
          ingredients.map((ingredient, index) => (
            <IngredientItem
              key={index}
              item={ingredient}
              onDelete={handleDelete}
            />
          ))}
      </Stack>

      <CollectionItemAddButton label={'Thêm nguyên liệu'} onClick={handleNewClick} />
    </>
  );
};
