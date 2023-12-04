import RoundedButton from '@/components/common/buttons/RoundedButton';
import ChipsDisplayer, {
    ChipValue,
} from '@/components/common/collections/ChipsDisplayer';
import ImagePicker from '@/components/common/files/ImagePicker';
import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormLabel from '@/components/common/typos/FormLabel';
import FormTitle from '@/components/common/typos/FormTitle';
import DirectionEditor from '@/components/ui/collections/DirectionEditor';
import { DirectionEditorItemValue } from '@/components/ui/collections/DirectionEditor/DirectionEditorItem/DirectionEditorItem';
import IngredientSelector from '@/components/ui/collections/IngredientSelector';
import { IngredientItemData } from '@/components/ui/collections/IngredientSelector/types';
import NewIngredientModal from '@/components/ui/modals/NewIngredientModal';
import ServingSizeSelect from '@/components/ui/selects/ServingSizeSelect';
import Layout from '@/layout/Layout';
import { SERVING_SIZES } from '@/lib/constants/options';
import { STORAGE_PATH } from '@/lib/constants/storage';
import { uploadImage } from '@/lib/firebase/image';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { RecipeReq } from '@/lib/models/dtos/Request/RecipeReq/RecipeReq';
import { Direction } from '@/lib/models/dtos/common';
import OccasionService from '@/lib/services/occasionService';
import RecipeService from '@/lib/services/recipeService';
import { createDebugStringFormatter } from '@/utils/debug/formatter';
import { getFileExtension } from '@/utils/file';
import { minuteToTimeString } from '@/utils/format';
import {
    Autocomplete,
    Box,
    Card,
    CardContent,
    CircularProgress,
    FormControlLabel,
    Grid,
    InputAdornment,
    Radio,
    RadioGroup,
    Stack,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Create debug string
 */
const createDebugString = createDebugStringFormatter('CreateRecipe');

/**
 * Represents a new recipe.
 */
type NewRecipe = {
    /** The name of the recipe. */
    name: string;
    /** The introduction for the recipe. */
    introduction: string;
    /** The image URL of the recipe. */
    image: string;
    /** The serving size of the recipe. */
    servingSize: number;
    /** The list of ingredients for the recipe. */
    ingredients: IngredientItemData[];
    /** The list of directions for the recipe. */
    directions: DirectionEditorItemValue[];
    /** Any additional notes from the author. */
    authorNote: string;
    /** The total time of the recipe.  */
    totalTime: number;
    /** The active time of the recipe. */
    activeTime: number;
    /** Indicates if the recipe is private. */
    isPrivate: boolean;
};

const DEFAULT_NEW_RECIPE: NewRecipe = {
    name: '',
    image: '',
    servingSize: 1,
    ingredients: [],
    directions: [],
    introduction: '',
    totalTime: 0,
    activeTime: 0,
    authorNote: '',
    isPrivate: true,
};

const resolveDirectionImage = async (
    direction: DirectionEditorItemValue,
    imageId: string,
    step: number
): Promise<Omit<Direction, 'recipe_id'>> => {
    const { imageFile, ...others } = direction;

    if (imageFile) {
        try {
            const path = await uploadImage(
                imageFile,
                `${
                    STORAGE_PATH.DIRECTION
                }/${imageId}[${step}].${getFileExtension(imageFile.name)}`
            );

            return {
                ...others,
                image: path,
            };
        } catch (e) {
            throw new Error('Failed to upload a blob or file!');
        }
    }

    return Promise.resolve({
        ...others,
        image: '',
    });
};

const resolveDirectionsImage = (
    directions: DirectionEditorItemValue[],
    imageId: string
): Promise<Omit<Direction, 'recipe_id'>[]> => {
    return Promise.all(
        directions.map((dir, index) =>
            resolveDirectionImage(dir, imageId, index + 1)
        )
    );
};

/**
 * Local message constants
 */
const MESSAGE_CONSTANTS = {
    VALIDATION: {
        INVALID_DATA: 'Dữ liệu không hợp lệ!',
        NAME_REQUIRED: 'Tên không được để trống!!',
        INTRODUCTION_REQUIRED: 'Giới thiệu không được để trống!',
        INGREDIENT_REQUIRED: 'Vui lòng thêm nguyên liệu!',
        DIRECTION_REQUIRED: 'Vui lòng thêm bước thực hiện!',
        TOTAL_TIME_REQUIRED: 'Tổng thời gian không được để trống!',
        INVALID_ACTIVE_TIME: 'Thời gian thực phải nhỏ hơn tổng thời gian!',
        IMAGE_REQUIRED: 'Vui lòng tải ảnh đại diện!',
    } as const,
} as const;

const CreateRecipe: React.FunctionComponent = () => {
    //#region Hooks

    const [snackbarAlert] = useSnackbarService();

    //#endregion
    //#region General Recipe

    const [recipeThumbnailFile, setRecipeThumbnailFile] = useState<File | null>(
        null
    );
    const [newRecipe, setNewRecipe] = useState<NewRecipe>(DEFAULT_NEW_RECIPE);
    const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);

    const handleNewRecipeFieldChange = useCallback(
        <T extends keyof NewRecipe>(field: T, value: NewRecipe[T]) => {
            setNewRecipe((prev) => ({ ...prev, [field]: value }));
        },
        []
    );

    const handleRecipeThumbnailChange = useCallback((file: File | null) => {
        setRecipeThumbnailFile(file);
    }, []);

    //#endregion
    //#region Data Actions

    const validateNewRecipe = useCallback((): {
        isValid: boolean;
        msg: string;
    } => {
        function setInvalid(message: string) {
            isValid = false;
            msg = message;
        }

        let isValid = true;
        let msg = '';

        if (!newRecipe) {
            setInvalid(MESSAGE_CONSTANTS.VALIDATION.INVALID_DATA);
        } else if (!newRecipe.name) {
            setInvalid(MESSAGE_CONSTANTS.VALIDATION.NAME_REQUIRED);
        } else if (!newRecipe.introduction) {
            setInvalid(MESSAGE_CONSTANTS.VALIDATION.INTRODUCTION_REQUIRED);
        } else if (!recipeThumbnailFile) {
            setInvalid(MESSAGE_CONSTANTS.VALIDATION.IMAGE_REQUIRED);
        } else if (
            !newRecipe.ingredients ||
            newRecipe.ingredients.length === 0
        ) {
            setInvalid(MESSAGE_CONSTANTS.VALIDATION.INGREDIENT_REQUIRED);
        } else if (!newRecipe.directions || newRecipe.directions.length === 0) {
            setInvalid(MESSAGE_CONSTANTS.VALIDATION.DIRECTION_REQUIRED);
        } else if (newRecipe.totalTime <= 0) {
            setInvalid(MESSAGE_CONSTANTS.VALIDATION.TOTAL_TIME_REQUIRED);
        } else if (
            newRecipe.activeTime > 0 &&
            newRecipe.activeTime > newRecipe.totalTime
        ) {
            setInvalid(MESSAGE_CONSTANTS.VALIDATION.INVALID_ACTIVE_TIME);
        }

        return { isValid, msg };
    }, [newRecipe, recipeThumbnailFile]);

    /**
     * Creates a new recipe request.
     * Data must have been validated before calling this method.
     */
    const createPostData = useCallback(async (): Promise<RecipeReq> => {
        const IMAGE_ID = uuidv4();

        let path = `${STORAGE_PATH.RECIPE}/${IMAGE_ID}.${getFileExtension(
            recipeThumbnailFile.name
        )}`;

        // TODO: handle delete uploaded image incase create recipe fail.
        path = await uploadImage(recipeThumbnailFile, path);

        const directionsWithImage = await resolveDirectionsImage(
            newRecipe.directions,
            IMAGE_ID
        );

        const postData: RecipeReq = {
            name: newRecipe.name,
            introduction: newRecipe.introduction,
            image: path,
            totalTime: minuteToTimeString(15),
            active_time: minuteToTimeString(5),
            serving_size: newRecipe.servingSize,
            ingredients: newRecipe.ingredients.map((ingredient) => ({
                id: ingredient.ingredientId,
                name: ingredient.name,
                amount: ingredient.amount,
                isLiquid: ingredient.isLiquid,
            })),
            direction: directionsWithImage,
            author_note: newRecipe.authorNote,
            author: '13b865f7-d6a6-4204-a349-7f379b232f0c',
            is_private: newRecipe.isPrivate,
            rating: 0,
        };

        return postData;
    }, [
        newRecipe.authorNote,
        newRecipe.directions,
        newRecipe.ingredients,
        newRecipe.introduction,
        newRecipe.isPrivate,
        newRecipe.name,
        newRecipe.servingSize,
        recipeThumbnailFile,
    ]);

    const clearForm = useCallback(() => {
        setNewRecipe(DEFAULT_NEW_RECIPE);
        setRecipeThumbnailFile(null);
        setSelectedOccasions([]);
    }, []);

    const handleCreateRecipe = useCallback(async () => {
        setIsCreatingRecipe(true);

        try {
            const { isValid: isLocalValid, msg: localMsg } =
                validateNewRecipe();

            console.log('isLocalValid', isLocalValid, localMsg);

            if (!isLocalValid) {
                console.log(createDebugString(localMsg));
                snackbarAlert(localMsg, 'warning');
                setIsCreatingRecipe(false);
                return;
            }

            const postData = await createPostData();

            RecipeService.CreateRecipe(postData)
                .then((response) => {
                    console.log(response);
                    clearForm();
                    snackbarAlert('Công thức tạo thành công!', 'success');
                })
                .catch((msg) => {
                    console.log(createDebugString(msg));
                });
        } catch (e) {
            console.log(createDebugString(e));
        } finally {
            setIsCreatingRecipe(false);
        }
    }, [clearForm, createPostData, snackbarAlert, validateNewRecipe]);
    //#endregion
    //#region Ingredients

    const [ingredientSelectModalOpen, setIngredientSelectModalOpen] =
        useState(false);

    const handleIngredientSelectModalOpen = useCallback(() => {
        setIngredientSelectModalOpen(true);
    }, []);

    const handleIngredientSelectModalClose = useCallback(() => {
        setIngredientSelectModalOpen(false);
    }, []);

    const handleAddIngredient = useCallback(
        (newIngredient: IngredientItemData) => {
            setIngredientSelectModalOpen(false);
            handleNewRecipeFieldChange('ingredients', [
                ...newRecipe.ingredients,
                newIngredient,
            ]);
        },
        [handleNewRecipeFieldChange, newRecipe.ingredients]
    );

    const handleIngredientsChange = useCallback(
        (ingredients: IngredientItemData[]) => {
            handleNewRecipeFieldChange('ingredients', ingredients);
        },
        [handleNewRecipeFieldChange]
    );

    //#endregion
    //#region Directions

    const handleDirectionsChange = useCallback(
        (directions: DirectionEditorItemValue[]) => {
            setNewRecipe((prev) => ({
                ...prev,
                directions: directions,
            }));
        },
        []
    );
    //#endregion
    //#region Occasions

    const [occasions, setOccasions] = useState([]);
    const [selectedOccasions, setSelectedOccasions] = useState<ChipValue[]>([]);

    const filterOccasions = useCallback(
        (occasions: ChipValue[]) => {
            return occasions.filter((occasion) => {
                return !selectedOccasions.some(
                    (selectedOccasion) => selectedOccasion.id === occasion.id
                );
            });
        },
        [selectedOccasions]
    );

    const filteredOccasions = useMemo(() => {
        return filterOccasions(occasions);
    }, [filterOccasions, occasions]);

    const handleSelectedOccasionsChange = useCallback((value: ChipValue[]) => {
        setSelectedOccasions(value);
    }, []);

    const handleSelectOccasion = useCallback((value: ChipValue | null) => {
        if (value) {
            setSelectedOccasions((prev) => [...prev, value]);
        }
    }, []);

    useEffect(() => {
        OccasionService.GetAll()
            .then((occasions) => setOccasions(occasions))
            .catch(() => setOccasions([]));
    }, []);

    //#endregion

    return (
        <Layout withFooter={false}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#F0F0F0',
                    py: 4,
                }}
            >
                <Card
                    sx={{
                        width: '52%',
                        borderRadius: 12,
                        p: 4,
                        bgcolor: '##FFFAF9',
                    }}
                >
                    <CardContent>
                        <Stack gap={4}>
                            <FormTitle>Viết công thức cho chính bạn</FormTitle>
                            <Stack>
                                <FormLabel>Tên công thức</FormLabel>
                                <TastealTextField
                                    value={newRecipe.name}
                                    disabled={isCreatingRecipe}
                                    onChange={(e) =>
                                        handleNewRecipeFieldChange(
                                            'name',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Nhập tên công thức"
                                />
                            </Stack>
                            <Stack>
                                <FormLabel>
                                    Giới thiệu (Không bắt buộc)
                                </FormLabel>
                                <TastealTextField
                                    value={newRecipe.introduction}
                                    disabled={isCreatingRecipe}
                                    onChange={(e) =>
                                        handleNewRecipeFieldChange(
                                            'introduction',
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    rows={2}
                                    placeholder={`Viết những dòng giới thiệu cho công thức của bạn`}
                                />
                            </Stack>
                            <Stack gap={1}>
                                <FormLabel>Dịp</FormLabel>
                                <Autocomplete
                                    disabled={isCreatingRecipe}
                                    options={filteredOccasions}
                                    getOptionLabel={(o) => o.name}
                                    title="Chọn dịp"
                                    placeholder="Chọn dịp cho công thức"
                                    noOptionsText="Không tìm thấy dịp lễ nào"
                                    renderInput={(params) => (
                                        <TastealTextField
                                            {...params}
                                            label="Chọn dịp"
                                        />
                                    )}
                                    onChange={(_, value) =>
                                        handleSelectOccasion(value)
                                    }
                                    isOptionEqualToValue={(option, value) =>
                                        option.id === value.id
                                    }
                                />
                                <ChipsDisplayer
                                    chips={selectedOccasions}
                                    onChange={handleSelectedOccasionsChange}
                                />
                            </Stack>
                            <Stack>
                                <FormLabel>
                                    Thêm hình bìa (Không bắt buộc)
                                </FormLabel>
                                <ImagePicker
                                    file={recipeThumbnailFile}
                                    onChange={handleRecipeThumbnailChange}
                                    disabled={isCreatingRecipe}
                                />
                            </Stack>
                            <Stack>
                                <FormLabel>Khẩu phần ăn</FormLabel>
                                <ServingSizeSelect
                                    disabled={isCreatingRecipe}
                                    servingSize={newRecipe.servingSize}
                                    sizes={SERVING_SIZES}
                                    onServingSizeChange={(size) =>
                                        handleNewRecipeFieldChange(
                                            'servingSize',
                                            size
                                        )
                                    }
                                />
                            </Stack>
                            <Stack>
                                <FormLabel>Nguyên liệu</FormLabel>
                                <IngredientSelector
                                    disabled={isCreatingRecipe}
                                    ingredients={newRecipe.ingredients}
                                    onChange={handleIngredientsChange}
                                    onOpen={handleIngredientSelectModalOpen}
                                />
                            </Stack>
                            <Stack>
                                <FormLabel>Hướng dẫn</FormLabel>
                                <DirectionEditor
                                    disabled={isCreatingRecipe}
                                    directions={newRecipe.directions}
                                    onChange={handleDirectionsChange}
                                />
                            </Stack>
                            <Stack>
                                <FormLabel>Thời gian</FormLabel>
                                <Grid
                                    container
                                    gap={1}
                                >
                                    <Grid
                                        item
                                        xs
                                    >
                                        <TastealTextField
                                            value={newRecipe.totalTime}
                                            onChange={(e) =>
                                                handleNewRecipeFieldChange(
                                                    'totalTime',
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            placeholder="Tổng thời gian"
                                            helperText="Tổng thời gian"
                                            type="number"
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        phút
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs
                                    >
                                        <TastealTextField
                                            value={newRecipe.activeTime}
                                            onChange={(e) =>
                                                handleNewRecipeFieldChange(
                                                    'activeTime',
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            placeholder="Thời gian thực"
                                            helperText="Thời gian thực"
                                            type="number"
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        phút
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack>
                                <FormLabel>
                                    Ghi chú của tác giả (Không bắt buộc)
                                </FormLabel>
                                <TastealTextField
                                    value={newRecipe.authorNote}
                                    disabled={isCreatingRecipe}
                                    onChange={(e) =>
                                        handleNewRecipeFieldChange(
                                            'authorNote',
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    rows={2}
                                    placeholder={`Thêm mẹo / lưu ý cho công thức này`}
                                />
                            </Stack>
                            <Stack>
                                <RadioGroup
                                    value={newRecipe.isPrivate}
                                    onChange={(e) =>
                                        handleNewRecipeFieldChange(
                                            'isPrivate',
                                            e.target.value === 'true'
                                        )
                                    }
                                    defaultValue={true}
                                    name="isRecipePrivate"
                                >
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        label="Người khác không thể xem"
                                        disabled={isCreatingRecipe}
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio />}
                                        label="Chia sẻ công thức thông qua link"
                                        disabled={isCreatingRecipe}
                                    />
                                </RadioGroup>
                            </Stack>
                            <Stack>
                                <RoundedButton
                                    variant="contained"
                                    disabled={isCreatingRecipe}
                                    onClick={handleCreateRecipe}
                                    sx={{
                                        height: 40,
                                    }}
                                >
                                    {isCreatingRecipe ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        'Hoàn thành'
                                    )}
                                </RoundedButton>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>

            <NewIngredientModal
                open={ingredientSelectModalOpen}
                onClose={handleIngredientSelectModalClose}
                onAddIngredient={handleAddIngredient}
            />
        </Layout>
    );
};

export default CreateRecipe;
