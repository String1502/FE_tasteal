import { Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import IngredientDisplayerItem from "./IngredientDisplayerDataItem/IngredientDisplayerItem";
import IngredientDisplayerItemListProps from "./types/IngredientDisplayerItemListProps";

const IngredientDisplayerItemList: FC<IngredientDisplayerItemListProps> = ({
  ingredients,
  servingSize,
}) => {
  return (
    <Stack
      divider={<Divider sx={{ borderColor: "primary.main", opacity: 0.4 }} />}
      gap={2}
    >
      {ingredients && ingredients.length > 0 ? (
        ingredients.map((ingredient, index) => (
          <IngredientDisplayerItem
            key={index}
            value={ingredient}
            servingSize={servingSize}
          />
        ))
      ) : (
        <Typography>Danh sách nguyên liệu rỗng.</Typography>
      )}
    </Stack>
  );
};

export default IngredientDisplayerItemList;
