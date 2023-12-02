import { AlertColor } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { SnackbarService } from '../contexts/snackbarContext';

export type UseSnackbarProps = {
    open: boolean;
    autoHideDuration: number;
    onClose: () => void;
};

export type UseSnackbarOpenAction = (
    message: string,
    severity?: AlertColor,
    duration?: number
) => void;

export const useSnackbar = (): [
    UseSnackbarProps,
    string,
    AlertColor,
    UseSnackbarOpenAction
] => {
    const [open, setOpen] = useState(false);
    const [autoHideDuration, setAutoHideDuration] = useState(6000);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('success');

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpenSnackbar = useCallback(
        (
            message: string,
            severity: AlertColor = 'success',
            duration: number = 6000
        ) => {
            setOpen(true);
            setAutoHideDuration(duration);
            setMessage(message);
            setSeverity(severity);
        },
        []
    );

    return [
        {
            open,
            autoHideDuration,
            onClose: handleClose,
        },
        message,
        severity,
        handleOpenSnackbar,
    ];
};

/**
 * Get the function to open snackbar
 *
 * @returns [handleOpenSnackbar]
 */
export const useSnackbarService = () => useContext(SnackbarService);
