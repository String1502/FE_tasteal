import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ingredients, occasions } from "../../types/sampleData";
import { useEffect, useMemo, useState } from "react";
import { IngredientAutocomplete } from "./IngredientAutocomplete";
import { IngredientEntity } from "../../types/type";

const timeFilterItems = [
  {
    value: 15,
    label: "Dưới 15 phút",
  },
  {
    value: 30,
    label: "Dưới 30 phút",
  },
  {
    value: 60,
    label: "Dưới 60 phút",
  },
];

const calorieFilterItems = [
  {
    min: 0,
    max: 200,
  },
  {
    min: 200,
    max: 400,
  },
  {
    min: 400,
    max: 600,
  },
  {
    min: 600,
    max: 800,
  },
];

const CustomAccordion = ({
  label,
  children,
  expanded,
}: {
  expanded?: boolean;
  label: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <Accordion
        defaultExpanded={expanded}
        square
        sx={{
          boxShadow: 0,
          borderBottom: 1,
          borderColor: "grey.300",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {label}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </>
  );
};

export function SearchFilter() {
  //#region filter Nguyên liệu
  const ingredientsData = useMemo(() => {
    return ingredients;
  }, []);

  useEffect(() => {
    setSelectedIngredientsOptions(ingredientsData);
    setExceptedIngredientsOptions(ingredientsData);
  }, [ingredientsData]);

  // Selected ingredients
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientEntity[]
  >([]);

  const [selectedIngredientsOptions, setSelectedIngredientsOptions] = useState<
    IngredientEntity[]
  >([]);

  const handleChangeSelectedIngredients = async (
    ingredients: IngredientEntity[]
  ) => {
    setSelectedIngredients(ingredients);

    const exceptedIngredientsOptions = ingredientsData.filter(
      (ingredient) => !ingredients.includes(ingredient)
    );

    setExceptedIngredientsOptions(exceptedIngredientsOptions);
  };

  // Excepted ingredients

  const [exceptedIngredients, setExceptedIngredients] = useState<
    IngredientEntity[]
  >([]);

  const [exceptedIngredientsOptions, setExceptedIngredientsOptions] = useState<
    IngredientEntity[]
  >([]);

  const handleChangeExceptedIngredients = async (
    ingredients: IngredientEntity[]
  ) => {
    setExceptedIngredients(ingredients);

    const selectedIngredientsOptions = ingredientsData.filter(
      (ingredient) => !ingredients.includes(ingredient)
    );
    setSelectedIngredientsOptions(selectedIngredientsOptions);
  };
  //#endregion

  //#region filter Thời gian
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleChangeTime = (event: any) => {
    const newValue = event.target.value;

    if (newValue === selectedTime) {
      // Nếu người dùng nhấn vào nút radio đã được chọn, hủy chọn nó
      setSelectedTime(null);
    } else {
      setSelectedTime(newValue);
    }
  };
  //#endregion

  //#region filter Calorie

  const [selectedCalorie, setSelectedCalorie] = useState<string | null>(null);

  const handleChangeCalorie = (event: any) => {
    const newValue = event.target.value;

    if (newValue === selectedCalorie) {
      setSelectedCalorie(null);
    } else {
      setSelectedCalorie(newValue);
    }
  };

  //#endregion

  //#region filter Dịp
  const [selectedDip, setSelectedDip] = useState<string[]>([]);

  const handleChangeDip = (event: any) => {
    const newValue = event.target.value;

    if (selectedDip.includes(newValue)) {
      setSelectedDip([...selectedDip.filter((dip) => dip !== newValue)]);
    } else {
      setSelectedDip([...selectedDip, newValue]);
    }
  };

  //#endregion

  return (
    <>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Grid item xs={12}>
          <CustomAccordion expanded label="Nguyên liệu">
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                }}
              >
                Bao gồm:
              </Typography>
            </Box>
            <IngredientAutocomplete
              ingredients={selectedIngredientsOptions}
              handleChange={handleChangeSelectedIngredients}
            />

            <Box sx={{ mt: 4, mb: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                }}
              >
                Không bao gồm:
              </Typography>
            </Box>
            <IngredientAutocomplete
              ingredients={exceptedIngredientsOptions}
              handleChange={handleChangeExceptedIngredients}
            />
          </CustomAccordion>
        </Grid>

        <Grid item xs={12}>
          <CustomAccordion label="Thời gian chuẩn bị">
            <RadioGroup value={selectedTime} onChange={handleChangeTime}>
              {timeFilterItems.map((item) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={<Typography variant="body2">{item.label}</Typography>}
                  onClick={handleChangeTime}
                />
              ))}
            </RadioGroup>
          </CustomAccordion>
        </Grid>

        <Grid item xs={12}>
          <CustomAccordion label="Dịp">
            <FormGroup>
              {occasions.map((item) => (
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  onChange={handleChangeDip}
                  control={<Checkbox size="small" />}
                  label={<Typography variant="body2">{item.name}</Typography>}
                  onClick={handleChangeTime}
                />
              ))}
            </FormGroup>
          </CustomAccordion>
        </Grid>

        <Grid item xs={12}>
          <CustomAccordion label="Calorie/phần">
            <RadioGroup value={selectedCalorie} onChange={handleChangeCalorie}>
              {calorieFilterItems.map((item) => (
                <FormControlLabel
                  key={JSON.stringify(item)}
                  value={JSON.stringify(item)}
                  control={<Radio size="small" />}
                  label={
                    <Typography variant="body2">
                      {item.min > 0 ? item.min + " - " : "Dưới "}
                      {item.max} Cal
                    </Typography>
                  }
                  onClick={handleChangeCalorie}
                />
              ))}
            </RadioGroup>
          </CustomAccordion>
        </Grid>
      </Grid>
    </>
  );
}
