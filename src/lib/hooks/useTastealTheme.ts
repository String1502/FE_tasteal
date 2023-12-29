import { getMode } from '@/theme/muiTheme';
import { PaletteMode, createTheme } from '@mui/material';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { OccasionEntity } from '../models/entities/OccasionEntity/OccasionEntity';
import OccasionService from '../services/occasionService';
import { auth } from '../firebase/config';
import { CookBookEntity } from '../models/entities/CookBookEntity/CookBookEntity';
import CookbookService from '../services/cookbookService';

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
  currentOccasion?: OccasionEntity;
  cookbooks?: CookBookEntity[];
} {
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

  const [spinner, setSpinner] = useState<boolean>(false);

  const handleSpinner = useCallback(function (value: boolean) {
    setSpinner(value);
  }, []);

  //#endregion

  const [login, setLogin] = useState<{
    isUserSignedIn?: boolean;
    user?: User;
  }>({});

  const handleLogin = useCallback((isUserSignedIn?: boolean, user?: User) => {
    setLogin({ isUserSignedIn: isUserSignedIn, user: user });
  }, []);

  const [currentOccasion, setCurrentOccasion] = useState<
    OccasionEntity | undefined
  >(undefined);

  const [cookbooks, setCookbooks] = useState<CookBookEntity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await OccasionService.GetCurrentOccassions();
      setCurrentOccasion(data);
    };
    fetchData();

    if (login.isUserSignedIn == undefined) {
      handleSpinner(true);
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setLogin({ isUserSignedIn: true, user: user });
          const cookbooks = await CookbookService.GetAllCookBookByAccountId(
            user.uid
          );
          setCookbooks(cookbooks);
        } else {
          setCookbooks([]);

          setLogin({ isUserSignedIn: false, user: undefined });
        }
      });
      handleSpinner(false);
      return () => unsubscribe();
    }
  }, []);

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
    currentOccasion,
    cookbooks,
  };
}

export default useTastealTheme;
