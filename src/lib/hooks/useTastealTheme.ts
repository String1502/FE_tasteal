import { getMode } from '@/theme/muiTheme';
import { PaletteMode, createTheme } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

function useTastealTheme() {
    //#region Theme
    const [mode, setMode] = useState<PaletteMode>('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light'
                );
            },
        }),
        []
    );

    const theme = useMemo(() => createTheme(getMode(mode)), [mode]);

    //#endregion
    //#region Spinner
    // TODO: Consider move this to a seperate hook

    const [spinner, setSpinner] = useState<boolean>(false);

    const handleSpinner = useCallback(function (value: boolean) {
        setSpinner(value);
    }, []);

    //#endregion
    return {
        colorMode,
        spinner,
        handleSpinner,
        theme,
    };
}

export default useTastealTheme;
