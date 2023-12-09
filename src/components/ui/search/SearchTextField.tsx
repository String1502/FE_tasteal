import { SearchRounded } from '@mui/icons-material';
import {
    Button,
    InputAdornment,
    TextField,
    TextFieldProps,
} from '@mui/material';
import { useState } from 'react';

export function SearchTextField({
    props,
    searchButtonClick,
}: {
    props?: TextFieldProps;
    searchButtonClick?: (value: string) => void;
}) {
    const [value, setValue] = useState('');
    return (
        <>
            <TextField
                {...props}
                sx={{
                    '& fieldset': { border: 'none' },
                }}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                placeholder={props?.placeholder ?? 'Hôm nay nấu gì?'}
                variant="outlined"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRounded />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="contained"
                                size={props?.size ?? props?.size}
                                onClick={() => {
                                    if (searchButtonClick) {
                                        searchButtonClick(value);
                                    }
                                }}
                                sx={{
                                    borderRadius: '40px',
                                }}
                            >
                                Tìm kiếm
                            </Button>
                        </InputAdornment>
                    ),
                    sx: {
                        borderRadius: '40px',
                        pl: 3,
                        pr: 2,
                        py: 0.5,
                        boxShadow: 2,
                        border: 0,
                        backgroundColor: 'white',
                    },
                }}
            />
        </>
    );
}
