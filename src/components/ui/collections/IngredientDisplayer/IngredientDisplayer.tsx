import SectionHeading from "@/components/common/typos/SectionHeading";
import { SimpleIngredient } from "@/lib/models/dtos/common";
import { Stack, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import ServingSizeSelect from "../../selects/ServingSizeSelect";
import IngredientDisplayerItemList from "../IngredientDisplayerItemList";

export type IngredientDisplayerProps = {
  ingredients: SimpleIngredient[];
};

const IngredientDisplayer: FC<IngredientDisplayerProps> = ({ ingredients }) => {
  const [servingSize, setServingSize] = useState(1);

  const handleServingSizeChange = useCallback((value: number) => {
    setServingSize(value);
  }, []);

  return (
    <Stack gap={2}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <SectionHeading>Ingredients</SectionHeading>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Typography color="primary.main">Servings</Typography>
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
      <IngredientDisplayerItemList
        ingredients={ingredients}
        servingSize={servingSize}
      />
    </Stack>
  );
};

export default IngredientDisplayer;
