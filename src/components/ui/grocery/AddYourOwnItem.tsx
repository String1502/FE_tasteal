import BoxImage from '@/components/common/image/BoxImage';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import IngredientService from '@/lib/services/ingredientService';
import { AddCircleRounded, CloseRounded } from '@mui/icons-material';
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    Zoom,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return (
        <Zoom
            ref={ref}
            {...props}
        />
    );
});

function AddYourOwnItem() {
    //#region Open_Close Dialog
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAutoCompleteValue(null);
        setInputValue('');
    };

    //#endregion

    const [ingredientData, setIngredientData] = useState<IngredientEntity[]>(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            setIngredientData(await IngredientService.GetAll());
        };
        fetchData();
    }, []);

    const [autoCompleteValue, setAutoCompleteValue] =
        useState<IngredientEntity | null>(null);
    const [inputValue, setInputValue] = useState('');

    const [unit, setUnit] = useState<'--' | 'g' | 'ml'>('--');

    useEffect(() => {
        if (autoCompleteValue) {
            setUnit(autoCompleteValue.isLiquid ? 'ml' : 'g');
        } else {
            setUnit('--');
        }
    }, [autoCompleteValue]);

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'white',
                        color: 'primary.main',
                    },
                    px: 3,
                    py: 1.2,
                    boxShadow: 'none',
                }}
                startIcon={<AddCircleRounded fontSize="large" />}
                onClick={handleClickOpen}
            >
                <Typography
                    variant="caption"
                    sx={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    fontWeight={'bold'}
                >
                    Thêm nguyên liệu
                </Typography>
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                transitionDuration={{ enter: 450, exit: 300 }}
                keepMounted
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        py: 2,
                        minWidth: 500,
                    },
                }}
            >
                <DialogTitle>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={'bold'}
                        >
                            Thêm nguyên liệu
                        </Typography>
                        <IconButton
                            onClick={handleClose}
                            size="small"
                            color="primary"
                            sx={{
                                border: 1,
                            }}
                        >
                            <CloseRounded fontSize="small" />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Autocomplete
                            freeSolo
                            value={autoCompleteValue}
                            onChange={(
                                event: any,
                                newValue: IngredientEntity | null
                            ) => {
                                setAutoCompleteValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            options={ingredientData}
                            getOptionLabel={(option) => {
                                return typeof option === 'string'
                                    ? option
                                    : option.name;
                            }}
                            renderOption={(props, option) => (
                                <Box
                                    component="li"
                                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                    {...props}
                                >
                                    <IngredientRenderOption item={option} />
                                </Box>
                            )}
                            sx={{
                                width: '100%',
                            }}
                            disableClearable
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Tìm kiếm nguyên liệu"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                        sx: {
                                            borderRadius: '40px',
                                            mt: 1,
                                        },
                                    }}
                                    size="small"
                                />
                            )}
                        />

                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'stretch',
                            }}
                        >
                            <TextField
                                sx={{ width: '100%', flexGrow: 1 }}
                                size="small"
                                type="number"
                                placeholder="Số lượng"
                                InputProps={{
                                    sx: {
                                        borderRadius: '40px 0px 0px 40px',
                                        mt: 1,
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    width: '100%',
                                    px: 1,
                                    mt: 1,
                                    backgroundColor: 'grey.200',
                                    borderRadius: '0px 40px 40px 0px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                {unit}
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        disabled={inputValue == ''}
                        sx={{
                            width: '100%',
                            mx: 2,
                        }}
                        onClick={handleClose}
                    >
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddYourOwnItem;

function IngredientRenderOption({ item }: { item: IngredientEntity }) {
    return (
        <>
            <BoxImage
                src={item?.image}
                alt={item.name}
                quality={30}
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: 1,
                    borderColor: 'grey.300',
                }}
            />
            {item.name}
        </>
    );
}
