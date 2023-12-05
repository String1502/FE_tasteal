import RoundedButton from '@/components/common/buttons/RoundedButton';
import TastealTextField from '@/components/common/textFields/TastealTextField';
import { DefaultIngredientItemData } from '@/lib/constants/defaultValue';
import useIngredients from '@/lib/hooks/useIngredients';
import {
    Autocomplete,
    Box,
    Button,
    Modal,
    Stack,
    Typography,
} from '@mui/material';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useState } from 'react';
import { IngredientItemData } from '../../collections/IngredientSelector/types';

const NewIngredientModal: React.FunctionComponent<{
    open: boolean;
    onClose: () => void;
    onAddIngredient: (ingredient: IngredientItemData) => void;
}> = ({ open, onClose, onAddIngredient }) => {
    //#region UseStates

    const [newIngredientItem, setNewIngredientItem] =
        useState<IngredientItemData>(DefaultIngredientItemData);

    const ingredientOptions = useIngredients();

    //#endregion
    //#region UseEffects

    // Fetch ingredients

    //#endregion
    //#region Callbacks

    const clearForm = useCallback(() => {
        setNewIngredientItem(DefaultIngredientItemData);
    }, []);

    /**
     * Returns the name of an ingredient based on its ID, or an empty string if the ID is undefined.
     * @param id - The ID of the ingredient.
     * @returns The name of the ingredient or an empty string.
     */
    const getIngredientNameOrDefault = useCallback(
        (id: number | null) => {
            // If the ID is undefined, return an empty string.
            if (!id) {
                return '';
            }

            // Find the ingredient with the matching ID.
            const ingredient = ingredientOptions.find(
                (ingredient) => ingredient.id === id
            );

            // If the ingredient is found, return its name. Otherwise, return an empty string.
            return ingredient ? ingredient.name : '';
        },
        [ingredientOptions]
    );

    //#endregion
    //#region UseMemos

    const saveable = useMemo(
        () =>
            newIngredientItem.ingredientId !== 0 &&
            newIngredientItem.amount > 0,
        [newIngredientItem]
    );

    //#endregion
    //#region Handlers

    const handleAddIngredient = useCallback(() => {
        onAddIngredient(newIngredientItem);
        clearForm();
    }, [clearForm, newIngredientItem, onAddIngredient]);

    const handleClose = useCallback(() => {
        clearForm();
        onClose();
    }, [clearForm, onClose]);

    const handleIngredientChange = useCallback(
        (ingredientId: number | null) => {
            const ingredient = ingredientOptions.find(
                (ingredient) => ingredient.id === ingredientId
            );

            if (!ingredient) {
                setNewIngredientItem(DefaultIngredientItemData);
                return;
            }

            const item: IngredientItemData = {
                ...DefaultIngredientItemData,
                id: nanoid(6),
                ingredientId: ingredient.id,
                name: ingredient.name,
                isLiquid: ingredient.isLiquid,
            };

            setNewIngredientItem(item);
        },
        [ingredientOptions]
    );

    //#endregion

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
                        >
                            Thêm nguyên liệu
                        </Typography>
                        <Button
                            onClick={handleClose}
                            sx={{ fontSize: '24px' }}
                        >
                            &times;
                        </Button>
                    </Stack>
                    <Stack gap={2}>
                        <Autocomplete
                            value={newIngredientItem.ingredientId}
                            getOptionLabel={(option) =>
                                getIngredientNameOrDefault(option)
                            }
                            onChange={(_, newValue) => {
                                handleIngredientChange(newValue);
                            }}
                            disablePortal
                            options={[0, ...ingredientOptions.map((i) => i.id)]}
                            renderInput={(params) => (
                                <TastealTextField
                                    {...params}
                                    placeholder="Nhập nguyên liệu"
                                />
                            )}
                        />

                        <TastealTextField
                            autoComplete="off"
                            InputProps={{
                                sx: {
                                    borderBottomRightRadius: 0,
                                    borderTopRightRadius: 0,
                                },
                            }}
                            onChange={(e) =>
                                setNewIngredientItem({
                                    ...newIngredientItem,
                                    amount: Number(e.target.value),
                                })
                            }
                            placeholder="Nhập số lượng"
                            sx={{
                                flex: 1,
                            }}
                            type="number"
                            value={newIngredientItem.amount || ''}
                        />

                        <RoundedButton
                            variant="contained"
                            onClick={handleAddIngredient}
                            disabled={!saveable}
                        >
                            Lưu
                        </RoundedButton>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};

export default NewIngredientModal;
