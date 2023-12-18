import { ExpandMore } from '@mui/icons-material';
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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { IngredientAutocomplete } from './IngredientAutocomplete';
import IngredientService from '@/lib/services/ingredientService';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { RecipeSearchReq } from '@/lib/models/dtos/Request/RecipeSearchReq/RecipeSearchReq';
import OccasionService from '@/lib/services/occasionService';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import { localOcacions } from '../home/OccasionsList';

const timeFilterItems = [
    {
        value: 15,
        label: 'Dưới 15 phút',
    },
    {
        value: 30,
        label: 'Dưới 30 phút',
    },
    {
        value: 60,
        label: 'Dưới 60 phút',
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
                    borderColor: 'grey.300',
                    backgroundColor: 'transparent',
                }}
            >
                <AccordionSummary
                    sx={{ px: 0 }}
                    expandIcon={<ExpandMore />}
                >
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {label}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>{children}</AccordionDetails>
            </Accordion>
        </>
    );
};

export function SearchFilter({
    handleChangeFilter,
}: {
    handleChangeFilter<T extends keyof RecipeSearchReq>(
        type: T,
        value: RecipeSearchReq[T]
    ): void;
}) {
    //#region filter Nguyên liệu
    const [ingredientsData, setIngredientsData] = useState<IngredientEntity[]>(
        []
    );

    useEffect(() => {
        async function fetchData() {
            setIngredientsData(await IngredientService.GetAll());
            setOccasionData(await OccasionService.GetAll());
        }
        fetchData();
        const localOcacions_Value = localStorage.getItem(localOcacions);
        if (localOcacions_Value && localOcacions_Value.length > 0) {
            const value = JSON.parse(localOcacions_Value) as OccasionEntity;
            if (value) {
                setSelectedDip([value.id.toString()]);
                handleChangeFilter('OccasionID', [
                    value.id,
                ] as RecipeSearchReq['OccasionID']);
            }
            localStorage.removeItem(localOcacions);
        }
    }, []);

    useEffect(() => {
        setSelectedIngredientsOptions(ingredientsData);
        setExceptedIngredientsOptions(ingredientsData);
    }, [ingredientsData]);

    // Selected ingredients

    const [selectedIngredientsOptions, setSelectedIngredientsOptions] =
        useState<IngredientEntity[]>([]);

    const handleChangeSelectedIngredients = async (
        ingredients: IngredientEntity[]
    ) => {
        const exceptedIngredientsOptions = ingredientsData.filter(
            (ingredient) => !ingredients.includes(ingredient)
        );

        setExceptedIngredientsOptions(exceptedIngredientsOptions);

        const ids: RecipeSearchReq['IngredientID'] = ingredients
            .map((ingredient) => ingredient.id)
            .filter((id) => id !== undefined);
        handleChangeFilter('IngredientID', ids.length == 0 ? null : ids);
    };

    // Excepted ingredients

    const [exceptedIngredientsOptions, setExceptedIngredientsOptions] =
        useState<IngredientEntity[]>([]);

    const handleChangeExceptedIngredients = async (
        ingredients: IngredientEntity[]
    ) => {
        const selectedIngredientsOptions = ingredientsData.filter(
            (ingredient) => !ingredients.includes(ingredient)
        );
        setSelectedIngredientsOptions(selectedIngredientsOptions);

        const ids: RecipeSearchReq['ExceptIngredientID'] = ingredients
            .map((ingredient) => ingredient.id)
            .filter((id) => id !== undefined);
        handleChangeFilter('ExceptIngredientID', ids.length == 0 ? null : ids);
    };

    //#endregion

    //#region filter Thời gian
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleChangeTime = (event: any) => {
        const newValue = event.target.value;

        if (newValue === selectedTime) {
            // Nếu người dùng nhấn vào nút radio đã được chọn, hủy chọn nó
            setSelectedTime(null);
            handleChangeFilter('TotalTime', null);
        } else {
            setSelectedTime(newValue);
            handleChangeFilter(
                'TotalTime',
                parseInt(newValue) as RecipeSearchReq['TotalTime']
            );
        }
    };

    //#endregion

    //#region filter Calorie

    const [selectedCalorie, setSelectedCalorie] = useState<string | null>(null);

    const handleChangeCalorie = (event: any) => {
        const newValue = event.target.value;

        if (newValue === selectedCalorie) {
            setSelectedCalorie(null);
            handleChangeFilter('Calories', null);
        } else {
            setSelectedCalorie(newValue);
            handleChangeFilter(
                'Calories',
                JSON.parse(newValue) as RecipeSearchReq['Calories']
            );
        }
    };

    //#endregion

    //#region filter Dịp
    const [selectedDip, setSelectedDip] = useState<string[]>([]);
    const [occasionData, setOccasionData] = useState<OccasionEntity[]>([]);

    const handleChangeDip = (event: any) => {
        const newValue = event.target.value;
        let newSelectedDip: string[] = [];
        if (selectedDip.includes(newValue)) {
            newSelectedDip = [...selectedDip.filter((dip) => dip !== newValue)];
        } else {
            newSelectedDip = [...selectedDip, newValue];
        }
        setSelectedDip(newSelectedDip);

        const updateData: RecipeSearchReq['OccasionID'] = newSelectedDip.map(
            (dip) => parseInt(dip)
        );

        handleChangeFilter(
            'OccasionID',
            updateData.length == 0 ? null : updateData
        );
    };

    //#endregion

    return (
        <>
            <Grid
                container
                sx={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    width: '100%',
                    height: 'inherit',
                    maxHeight: 'inherit',
                    overflow: 'auto',
                    '::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Grid
                    item
                    xs={12}
                >
                    <CustomAccordion
                        expanded
                        label="Nguyên liệu"
                    >
                        <Box sx={{ mb: 1 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    textDecoration: 'underline',
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
                                    textDecoration: 'underline',
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

                <Grid
                    item
                    xs={12}
                >
                    <CustomAccordion
                        label="Thời gian chuẩn bị"
                        expanded
                    >
                        <RadioGroup
                            value={selectedTime}
                            onChange={handleChangeTime}
                        >
                            {timeFilterItems.map((item) => (
                                <FormControlLabel
                                    key={item.value}
                                    value={item.value}
                                    control={<Radio size="small" />}
                                    label={
                                        <Typography variant="body2">
                                            {item.label}
                                        </Typography>
                                    }
                                    onClick={handleChangeTime}
                                />
                            ))}
                        </RadioGroup>
                    </CustomAccordion>
                </Grid>

                <Grid
                    item
                    xs={12}
                >
                    <CustomAccordion
                        label="Dịp"
                        expanded
                    >
                        <FormGroup>
                            {occasionData.map((item) => (
                                <FormControlLabel
                                    key={item.id}
                                    value={item.id}
                                    onChange={handleChangeDip}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={selectedDip.includes(
                                                item.id.toString()
                                            )}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2">
                                            {item.name}
                                        </Typography>
                                    }
                                    onClick={handleChangeDip}
                                />
                            ))}
                        </FormGroup>
                    </CustomAccordion>
                </Grid>

                <Grid
                    item
                    xs={12}
                >
                    <CustomAccordion
                        label="Calorie/phần"
                        expanded
                    >
                        <RadioGroup
                            value={selectedCalorie}
                            onChange={handleChangeCalorie}
                        >
                            {calorieFilterItems.map((item) => (
                                <FormControlLabel
                                    key={JSON.stringify(item)}
                                    value={JSON.stringify(item)}
                                    control={<Radio size="small" />}
                                    label={
                                        <Typography variant="body2">
                                            {item.min > 0
                                                ? item.min + ' - '
                                                : 'Dưới '}
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
