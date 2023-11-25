import CollectionItemAddButton from "@/components/common/buttons/CollectionItemAddButton";
import { Stack } from "@mui/material";
import { useCallback } from "react";
import IngredientItem from "./IngredientItem";
import { IngredientItemData } from "./types";

export const IngredientSelector: React.FunctionComponent<{
  ingredients: IngredientItemData[];
  onChange: (ingredients: IngredientItemData[]) => void;
  onOpen: () => void;
  disabled: boolean;
}> = ({ ingredients, onChange, onOpen, disabled = false }) => {
  const handleDelete = useCallback(
    (id: string) => {
      onChange(ingredients.filter((ingredient) => ingredient.id !== id));
    },
    [ ingredients, onChange ]
  );

  const handleNewClick = useCallback(() => {
    onOpen();
  }, [ onOpen ]);

  return (
    <>
      <Stack gap={2}>
        {ingredients.length > 0 &&
          ingredients.map((ingredient, index) => (
            <IngredientItem
              disabled={disabled}
              key={index}
              item={ingredient}
              onDelete={handleDelete}
            />
          ))}
      </Stack>

      <CollectionItemAddButton disabled={disabled} label={'Thêm nguyên liệu'} onClick={handleNewClick} />
    </>
  );
};
