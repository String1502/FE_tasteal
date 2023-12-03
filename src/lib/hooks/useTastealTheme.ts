import { getMode } from "@/theme/muiTheme";
import { PaletteMode, createTheme } from "@mui/material";
import { User } from "firebase/auth";
import { useCallback, useMemo, useState } from "react";

function useTastealTheme(): {
  colorMode: { toggleColorMode: () => void };
  spinner: boolean;
  theme: any;
  //
  handleSpinner: (value: boolean) => void;
  login: {
    isUserSignedIn?: boolean;
    user?: User;
    handleLogin: (isUserSignedIn?: boolean, user?: User) => void;
  };
} {
  //#region Theme
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
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

  const [login, setLogin] = useState<{
    isUserSignedIn?: boolean;
    user?: User;
  }>({});

  const handleLogin = useCallback((isUserSignedIn?: boolean, user?: User) => {
    setLogin({ isUserSignedIn: isUserSignedIn, user: user });
  }, []);

  //#endregion
  return {
    colorMode,
    spinner,
    theme,
    //
    handleSpinner,
    login: {
      isUserSignedIn: login.isUserSignedIn,
      user: login.user,
      handleLogin: handleLogin,
    },
  };
}

export default useTastealTheme;
