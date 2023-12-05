import { DefaultNutritionValue } from '@/lib/constants/defaultValue';
import { Nutrition_InfoEntity } from '@/lib/models/entities/Nutrition_InfoEntity/Nutrition_InfoEntity';
import {
    Box,
    Button,
    Modal,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    styled,
} from '@mui/material';
import { FC, useMemo } from 'react';

const YOUR_DAILY_VALUE = 2000;

function calculatePercentage(value: number, total: number): number {
    return Math.ceil((value / total) * 100);
}

type NutritionPercentage = Omit<Nutrition_InfoEntity, 'id'>;

const NutrionPerServingModal: React.FunctionComponent<{
    open: boolean;
    onClose: () => void;
    nutritionInfo?: Nutrition_InfoEntity;
}> = ({
    open,
    onClose,
    nutritionInfo: nutritionInfo = DefaultNutritionValue,
}) => {
    const handleClose = () => {
        onClose();
    };

    const nutritionInfoPercentage: NutritionPercentage = useMemo(() => {
        if (!nutritionInfo)
            return {
                calories: 0,
                fat: 0,
                saturated_fat: 0,
                trans_fat: 0,
                cholesterol: 0,
                carbohydrates: 0,
                fiber: 0,
                sugars: 0,
                protein: 0,
                sodium: 0,
                vitamin_d: 0,
                calcium: 0,
                iron: 0,
                potassium: 0,
            } as NutritionPercentage;

        const result: NutritionPercentage = {
            calories: calculatePercentage(nutritionInfo.calories, 2000),
            fat: calculatePercentage(nutritionInfo.fat, 70),
            saturated_fat: calculatePercentage(nutritionInfo.saturated_fat, 20),
            trans_fat: calculatePercentage(
                nutritionInfo.trans_fat,
                YOUR_DAILY_VALUE
            ),
            cholesterol: calculatePercentage(nutritionInfo.cholesterol, 300),
            carbohydrates: calculatePercentage(
                nutritionInfo.carbohydrates,
                275
            ),
            fiber: calculatePercentage(nutritionInfo.fiber, 28),
            sugars: calculatePercentage(nutritionInfo.sugars, 50),
            protein: calculatePercentage(nutritionInfo.protein, 50),
            sodium: calculatePercentage(nutritionInfo.sodium, 2400),
            vitaminD: calculatePercentage(
                nutritionInfo.vitaminD,
                YOUR_DAILY_VALUE
            ),
            calcium: calculatePercentage(
                nutritionInfo.calcium,
                YOUR_DAILY_VALUE
            ),
            iron: calculatePercentage(nutritionInfo.iron, YOUR_DAILY_VALUE),
            potassium: calculatePercentage(
                nutritionInfo.potassium,
                YOUR_DAILY_VALUE
            ),
        };

        return result;
    }, [nutritionInfo]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-create-recipe"
            aria-describedby="modal-create-new-recipe"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 520,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    px: 4,
                    py: 2,
                    borderRadius: '24px',
                }}
            >
                <Stack gap={1}>
                    <Stack
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        direction={'row'}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={800}
                            color="primary.main"
                        >
                            Nutrion Per Serving
                        </Typography>
                        <Button
                            onClick={handleClose}
                            sx={{ fontSize: '24px' }}
                        >
                            &times;
                        </Button>
                    </Stack>
                    <Stack gap={2}>
                        <Table>
                            <TableBody>
                                <NutritionTableRow
                                    name="Calories"
                                    value={nutritionInfo.calories}
                                    percent={nutritionInfoPercentage.calories}
                                    hasPercent={false}
                                />

                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        sx={{
                                            backgroundColor: 'secondary.main',
                                        }}
                                    >
                                        <Typography
                                            color="primary.main"
                                            textAlign={'end'}
                                            fontWeight={'bold'}
                                            fontSize={16}
                                        >
                                            % Daily Value
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <NutritionTableRow
                                    name="Fat"
                                    value={nutritionInfo.fat}
                                    percent={nutritionInfoPercentage.fat}
                                />
                                <NutritionTableRow
                                    name="Cholesterol"
                                    value={nutritionInfo.cholesterol}
                                    percent={
                                        nutritionInfoPercentage.cholesterol
                                    }
                                />
                                <NutritionTableRow
                                    name="Carbonhydrates"
                                    value={nutritionInfo.carbohydrates}
                                    percent={
                                        nutritionInfoPercentage.carbohydrates
                                    }
                                />
                                <NutritionTableRow
                                    name="Protein"
                                    value={nutritionInfo.protein}
                                    percent={nutritionInfoPercentage.protein}
                                />
                                <NutritionTableRow
                                    name="Sodium"
                                    value={nutritionInfo.sodium}
                                    percent={nutritionInfoPercentage.sodium}
                                />
                                <NutritionTableRow
                                    name="Vitamin D"
                                    value={nutritionInfo.vitaminD}
                                    percent={nutritionInfoPercentage.vitaminD}
                                />
                                <NutritionTableRow
                                    name="Calcium"
                                    value={nutritionInfo.calcium}
                                    percent={nutritionInfoPercentage.calcium}
                                />
                                <NutritionTableRow
                                    name="Iron"
                                    value={nutritionInfo.iron}
                                    percent={nutritionInfoPercentage.iron}
                                />
                                <NutritionTableRow
                                    name="Potassium"
                                    value={nutritionInfo.potassium}
                                    percent={nutritionInfoPercentage.potassium}
                                />
                            </TableBody>
                        </Table>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};

export default NutrionPerServingModal;

type NutritionTableRowProps = {
    name: string;
    value: number;
    percent: number;
    hasUnit?: boolean;
    hasPercent?: boolean;
};

const NutritionTableRowTypography = styled(Typography)({
    fontWeight: 'bold',
    fontSize: 16,
});

const NutritionTableRow: FC<NutritionTableRowProps> = ({
    name,
    value,
    percent,
    hasUnit = false,
    hasPercent = true,
}) => {
    return (
        <TableRow>
            <TableCell>
                <NutritionTableRowTypography>
                    {name}
                </NutritionTableRowTypography>
            </TableCell>
            <TableCell>
                <NutritionTableRowTypography>
                    {value}
                </NutritionTableRowTypography>
            </TableCell>
            {hasPercent && (
                <TableCell>
                    <NutritionTableRowTypography>
                        {percent} %
                    </NutritionTableRowTypography>
                </TableCell>
            )}
        </TableRow>
    );
};
