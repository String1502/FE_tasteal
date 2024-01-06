import RecipeDetail from '@/pages/RecipeDetail';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { User } from 'firebase/auth';
import React, { useMemo } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TastealHashLoader from './components/common/progress/TastealHashLoader';
import CheckSignIn from './components/ui/app/CheckSignIn';
import NotFound from './components/ui/app/NotFound';
import ScrollToTop from './components/ui/app/ScrollToTop';
import { PageRoute } from './lib/constants/common';
import AppContext from './lib/contexts/AppContext';
import ColorModeContext from './lib/contexts/ColorModeContext';
import SnackbarProvider from './lib/contexts/snackbarContext';
import useTastealTheme, { ScrollApp } from './lib/hooks/useTastealTheme';
import { OccasionEntity } from './lib/models/entities/OccasionEntity/OccasionEntity';
import { AllPartner } from './pages/AllPartner';
import CreateRecipe from './pages/CreateRecipe';
import ForgotPass from './pages/ForgotPass';
import Grocery from './pages/Grocery';
import Home from './pages/Home';
import MealPlanner from './pages/MealPlanner';
import MyPantry from './pages/MyPantry';
import MySavedRecipes from './pages/MySavedRecipes';
import Partner from './pages/Partner';

import store from '@/app/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import { PopoverContentProps } from './components/ui/header/PopoverContent';
import { ChatContext, initChatContext } from './lib/contexts/ChatContext';
import Reference from './pages/Reference';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignUpEmail from './pages/SignUpEmail';
import AdminIngredientCreate from './pages/admin/ingredients/AdminIngredientsCreate';
import { AdminIngredientsIndex } from './pages/admin/ingredients/AdminIngredientsIndex';
import AdminOccasionsCreate from './pages/admin/occasions/AdminOccasionsCreate';
import { AdminOccasionsIndex } from './pages/admin/occasions/AdminOccasionsIndex';

//#region AppWrapper

type AppWrapperProps = {
  colorMode: {
    toggleColorMode: () => void;
  };
  theme: Theme;
  spinner: boolean;
  //
  handleSpinner: (value: boolean) => void;
  login: {
    isUserSignedIn?: boolean;
    user?: User;
    handleLogin: (isUserSignedIn?: boolean, user?: User) => void;
  };
  currentOccasion?: OccasionEntity;
  popOverHeader?: PopoverContentProps;
  scroll?: ScrollApp;
};

function AppWrapper({
  children,
  colorMode,
  theme,
  spinner,
  ...contextProps
}: React.PropsWithChildren & AppWrapperProps) {
  return (
    <Provider store={store}>
      <AppContext.Provider value={{ ...contextProps }}>
        <ChatContext.Provider value={initChatContext()}>
          <ColorModeContext.Provider value={colorMode}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              // vietnam
              // this doesn't seem to work
              adapterLocale="vi"
            >
              <CssBaseline />
              <ThemeProvider theme={theme}>
                <SnackbarProvider>
                  <TastealHashLoader spinner={spinner} />
                  {children}
                </SnackbarProvider>
              </ThemeProvider>
            </LocalizationProvider>
          </ColorModeContext.Provider>
        </ChatContext.Provider>
      </AppContext.Provider>
    </Provider>
  );
}

//#endregion

//#region AllRoutes
function AllRoutes() {
  const MapRoutes = useMemo(() => {
    return [
      {
        path: PageRoute.Home,
        element: <Home />,
      },
      {
        path: PageRoute.Search,
        element: <Search />,
      },
      {
        path: PageRoute.Recipe.Detail(),
        element: <RecipeDetail />,
      },
      {
        path: PageRoute.Partner(),
        element: <Partner />,
      },
      {
        path: PageRoute.AllPartner,
        element: <AllPartner />,
      },
      {
        path: PageRoute.Reference(),
        element: <Reference />,
      },
      {
        path: PageRoute.ReferenceIngredient(),
        element: <Reference />,
      },

      // Chưa đăng nhập
      {
        path: PageRoute.SignIn,
        element: <SignIn />,
        checkAlready: true,
      },
      {
        path: PageRoute.SignUp,
        element: <SignUp />,
        checkAlready: true,
      },
      {
        path: PageRoute.SignUpEmail,
        element: <SignUpEmail />,
        checkAlready: true,
      },
      {
        path: PageRoute.ForgotPass,
        element: <ForgotPass />,
        checkAlready: true,
      },
      // Đã đăng nhập
      {
        path: PageRoute.Recipe.Create,
        element: <CreateRecipe />,
        needSignIn: PageRoute.Recipe.Create,
      },
      {
        path: PageRoute.Recipe.Edit(),
        element: <CreateRecipe edit />,
        needSignIn: PageRoute.Recipe.Edit(),
      },
      {
        path: PageRoute.Grocery,
        element: <Grocery />,
        needSignIn: PageRoute.Grocery,
      },
      {
        path: PageRoute.MealPlanner,
        element: <MealPlanner />,
        needSignIn: PageRoute.MealPlanner,
      },
      {
        path: PageRoute.MyPantry,
        element: <MyPantry />,
        needSignIn: PageRoute.MyPantry,
      },
      {
        path: PageRoute.MySavedRecipes,
        element: <MySavedRecipes />,
        needSignIn: PageRoute.MySavedRecipes,
      },
      // {
      //   path: PageRoute.Admin.Index,
      //   element: <AdminPage />,
      //   needSignIn: PageRoute.Admin.Index,
      // },
      {
        path: PageRoute.Admin.Ingredients.Index,
        element: <AdminIngredientsIndex />,
        needSignIn: PageRoute.Admin.Ingredients.Index,
      },
      {
        path: PageRoute.Admin.Ingredients.Create,
        element: <AdminIngredientCreate />,
        needSignIn: PageRoute.Admin.Ingredients.Create,
      },
      {
        path: PageRoute.Admin.Ingredients.View,
        element: <AdminIngredientCreate />,
        needSignIn: PageRoute.Admin.Ingredients.View,
      },
      {
        path: PageRoute.Admin.Occasions.Index,
        element: <AdminOccasionsIndex />,
        needSignIn: PageRoute.Admin.Occasions.Index,
      },
      {
        path: PageRoute.Admin.Occasions.Create,
        element: <AdminOccasionsCreate />,
        needSignIn: PageRoute.Admin.Occasions.Create,
      },
      {
        path: PageRoute.Admin.Occasions.View,
        element: <AdminOccasionsCreate />,
        needSignIn: PageRoute.Admin.Occasions.View,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ];
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {MapRoutes.map(({ path, element, checkAlready, needSignIn }) => (
            <Route
              key={path}
              path={path}
              element={
                <CheckSignIn
                  checkAlready={checkAlready}
                  needSignIn={needSignIn}
                >
                  <>{element}</>
                </CheckSignIn>
              }
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}
//#endregion

function App() {
  const themeProps = useTastealTheme();

  return (
    <AppWrapper {...themeProps}>
      <AllRoutes />
    </AppWrapper>
  );
}

export default App;
