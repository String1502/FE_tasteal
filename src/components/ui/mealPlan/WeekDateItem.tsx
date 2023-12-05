import { DateDisplay } from '@/pages/MealPlanner';
import { dateToDDMMYYYY } from '@/utils/format';
import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { MealPlanCard } from '../cards/MealPlan/MealPlanCard';
import { AddRecipeButton } from './AddRecipeButton';
import { HighlightAltRounded } from '@mui/icons-material';
import { Droppable } from 'react-beautiful-dnd';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';

const NoteTextField = () => {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <>
            <TextField
                onFocus={() => {
                    setIsFocus(true);
                }}
                onBlur={() => {
                    setIsFocus(false);
                }}
                variant="outlined"
                rows={isFocus ? 5 : 2}
                multiline
                color="primary"
                size="small"
                placeholder="Ghi chú"
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                }}
                InputProps={{
                    sx: {
                        fontWeight: 'regular',
                        fontSize: 'body2.fontSize',
                        borderRadius: 3,
                    },
                }}
                inputProps={{
                    sx: {
                        transition: 'all 0.3s ease',
                    },
                }}
            />
        </>
    );
};

function WeekDateItem({
    isDragging,
    weekDates,
    handleRemovePlanItem,
}: {
    isDragging: boolean;
    weekDates: DateDisplay;
    handleRemovePlanItem: (id: number) => void;
}) {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 1,
                    borderRight: weekDates.borderRight ? 1 : 0,
                    borderBottom: weekDates.borderBottom ? 1 : 0,
                    borderColor: 'grey.300',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                color: 'grey.600',
                                lineHeight: 1,
                            }}
                            variant="body1"
                            fontWeight={'bold'}
                        >
                            {weekDates.label}
                        </Typography>
                        <Typography
                            variant="caption"
                            fontWeight={'medium'}
                            sx={{
                                color: 'grey.500',
                                lineHeight: 0.5,
                            }}
                        >
                            {dateToDDMMYYYY(weekDates.date)}
                        </Typography>
                    </Box>

                    <AddRecipeButton />
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        p: 2,
                    }}
                >
                    <NoteTextField />
                </Box>

                {weekDates.date && (
                    <Droppable
                        droppableId={weekDates.date}
                        type="group"
                        key={weekDates.date}
                    >
                        {(provided, snapshot) => (
                            <Box
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'visible',
                                    borderRadius: 2,
                                    p: 2,
                                    gap: 4,
                                    backgroundColor: isDragging
                                        ? 'grey.200'
                                        : '',
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display:
                                            weekDates.planItems.length === 0
                                                ? 'flex'
                                                : 'none',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '200px',
                                        transition: 'all 0.3s ease-in-out',
                                    }}
                                >
                                    <HighlightAltRounded
                                        sx={{
                                            color: 'grey.500',
                                            fontSize: 80,
                                        }}
                                    />
                                </Box>
                                {weekDates.planItems.map(
                                    (item, index) =>
                                        item && (
                                            <MealPlanCard
                                                index={index}
                                                planItem={item}
                                                key={index}
                                                recipe={
                                                    item.recipe as RecipeEntity
                                                }
                                                handleRemovePlanItem={
                                                    handleRemovePlanItem
                                                }
                                            />
                                        )
                                )}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                )}
            </Box>
        </>
    );
}

export default WeekDateItem;
