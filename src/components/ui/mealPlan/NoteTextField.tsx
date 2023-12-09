import { TextField } from '@mui/material';
import { useState } from 'react';

export const NoteTextField = () => {
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
