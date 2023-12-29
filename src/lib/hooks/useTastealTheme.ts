import { getMode } from '@/theme/muiTheme';
import { PaletteMode, createTheme, useScrollTrigger } from '@mui/material';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { OccasionEntity } from '../models/entities/OccasionEntity/OccasionEntity';
import OccasionService from '../services/occasionService';
import { auth } from '../firebase/config';
import { CookBookEntity } from '../models/entities/CookBookEntity/CookBookEntity';
import CookbookService from '../services/cookbookService';
import { PopoverContentProps } from '@/components/ui/header/PopoverContent';
import RecipeService from '../services/recipeService';
import IngredientService from '../services/ingredientService';

export type ScrollApp = {
  isHeaderHide: boolean;
  scrollPos: number;
};

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
  popOverHeader?: PopoverContentProps;
  scroll?: ScrollApp;
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

  // #region Login
  const [login, setLogin] = useState<{
    isUserSignedIn?: boolean;
    user?: User;
  }>({});

  const handleLogin = useCallback((isUserSignedIn?: boolean, user?: User) => {
    setLogin({ isUserSignedIn: isUserSignedIn, user: user });
  }, []);
  //#endregion

  // #region Header
  const [currentOccasion, setCurrentOccasion] = useState<
    OccasionEntity | undefined
  >(undefined);

  const [cookbooks, setCookbooks] = useState<CookBookEntity[]>([]);

  const [popOverHeader, setPopOverHeader] = useState<
    PopoverContentProps | undefined
  >(undefined);

  //#endregion

  // #region Scroll
  const isHeaderHide = useScrollTrigger({
    target: window ? window : undefined,
  });

  const [scrollPos, setScrollPos] = useState(0);
  //#endregion

  console.log(isHeaderHide);

  useEffect(() => {
    const fetchData = async () => {
      const occassion = await OccasionService.GetCurrentOccassions();
      setCurrentOccasion(occassion);

      await Promise.all([
        await RecipeService.GetKeyWords(),
        await IngredientService.GetAll(),
        await OccasionService.GetAll(),
      ]).then((data) => {
        const [tuKhoas, ingredients, occasions] = data;
        setPopOverHeader({
          tuKhoas: tuKhoas.map((item) => {
            return {
              ...item,
              value: false,
            };
          }),
          ingredients,
          occasions,
        });
      });
    };
    fetchData();

    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

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
      return () => {
        window.removeEventListener('scroll', handleScroll);
        unsubscribe();
      };
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
    popOverHeader,
    scroll: { isHeaderHide: isHeaderHide, scrollPos: scrollPos },
  };
}

export default useTastealTheme;
