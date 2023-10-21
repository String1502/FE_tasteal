import { Recipe_IngredientEntity } from "@/types/type";
import { Stack, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import ServingSizeSelect from "../../selects/ServingSizeSelect";
import IngredientDisplayerItemList from "../IngredientDisplayerItemList";

export type IngredientDisplayerProps = {
  ingredients: Recipe_IngredientEntity[];
};

const IngredientDisplayer: FC<IngredientDisplayerProps> = ({ ingredients }) => {
  const [servingSize, setServingSize] = useState(1);

  const handleServingSizeChange = useCallback((value: number) => {
    setServingSize(value);
  }, []);

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography typography={"h6"} color="primary.main" fontWeight={"bold"}>
          Ingredients
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Typography>Servings</Typography>
          <ServingSizeSelect
            servingSize={servingSize}
            onServingSizeChange={handleServingSizeChange}
            size="small"
            sx={{
              backgroundColor: "background.default",
            }}
          />
        </Stack>
      </Stack>
      <IngredientDisplayerItemList ingredients={ingredients} />
    </>
  );
};

export default IngredientDisplayer;
