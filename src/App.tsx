import RecipeDetail from '@/pages/RecipeDetail';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useMemo } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TastealHashLoader from './components/common/progress/TastealHashLoader';
import CheckSignIn from './components/ui/app/CheckSignIn';
import NotFound from './components/ui/app/NotFound';
import ScrollToTop from './components/ui/app/ScrollToTop';
import { PageRoute } from './lib/constants/common';
import AppContext from './lib/contexts/AppContext';
import ColorModeContext from './lib/contexts/ColorModeContext';
import SnackbarProvider from './lib/contexts/snackbarContext';
import { auth } from './lib/firebase/config';
import useTastealTheme from './lib/hooks/useTastealTheme';
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
import { Provider } from 'react-redux';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignUpEmail from './pages/SignUpEmail';
import AdminPage from './pages/admin/AdminPage';

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
        <ColorModeContext.Provider value={colorMode}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <TastealHashLoader spinner={spinner} />
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
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
      {
        path: PageRoute.Admin,
        element: <AdminPage />,
        needSignIn: PageRoute.Admin,
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
