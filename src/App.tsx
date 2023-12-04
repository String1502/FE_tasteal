import RecipeDetail from "@/pages/RecipeDetail";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import React, { useContext, useEffect, useMemo } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import TastealHashLoader from "./components/common/progress/TastealHashLoader";
import AppContext from "./lib/contexts/AppContext";
import ColorModeContext from "./lib/contexts/ColorModeContext";
import SnackbarProvider from "./lib/contexts/snackbarContext";
import useTastealTheme from "./lib/hooks/useTastealTheme";
import CreateRecipe from "./pages/CreateRecipe";
import ForgotPass from "./pages/ForgotPass";
import Grocery from "./pages/Grocery";
import Home from "./pages/Home";
import MealPlanner from "./pages/MealPlanner";
import MySavedRecipes from "./pages/MySavedRecipes";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpEmail from "./pages/SignUpEmail";
import { PAGE_ROUTE } from "./lib/constants/common";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase/config";
import NotFound from "./components/ui/app/NotFound";
import CheckSignIn from "./components/ui/app/CheckSignIn";

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
};

function AppWrapper({
  children,
  colorMode,
  theme,
  spinner,
  ...contextProps
}: React.PropsWithChildren & AppWrapperProps) {
  return (
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
  );
}

//#endregion

//#region AllRoutes
function AllRoutes() {
  const { login, handleSpinner } = useContext(AppContext);

  // Check if login ?
  useEffect(() => {
    if (login.isUserSignedIn == undefined) {
      handleSpinner(true);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && login.handleLogin) {
          login.handleLogin(true, user);
        } else {
          login.handleLogin(false);
        }
      });
      handleSpinner(false);
      return () => unsubscribe();
    }
  }, []);

  const MapRoutes = useMemo(() => {
    return [
      {
        path: PAGE_ROUTE.HOME,
        element: <Home />,
      },
      {
        path: PAGE_ROUTE.SEARCH,
        element: <Search />,
      },
      // Chưa đăng nhập
      {
        path: PAGE_ROUTE.SIGN_IN,
        element: <SignIn />,
        checkAlready: true,
      },
      {
        path: PAGE_ROUTE.SIGN_UP,
        element: <SignUp />,
        checkAlready: true,
      },
      {
        path: PAGE_ROUTE.SIGN_UP_EMAIL,
        element: <SignUpEmail />,
        checkAlready: true,
      },
      {
        path: PAGE_ROUTE.FORGOT_PASS,
        element: <ForgotPass />,
        checkAlready: true,
      },
      // Đã đăng nhập
      {
        path: PAGE_ROUTE.RECIPE.CREATE,
        element: <CreateRecipe />,
        needSignIn: true,
      },
      {
        path: PAGE_ROUTE.RECIPE.DETAIL,
        element: <RecipeDetail />,
        needSignIn: true,
      },
      {
        path: PAGE_ROUTE.GROCERY,
        element: <Grocery />,
        needSignIn: true,
      },
      {
        path: PAGE_ROUTE.MEALPLANNER,
        element: <MealPlanner />,
        needSignIn: true,
      },
      {
        path: PAGE_ROUTE.MY_SAVED_RECIPES,
        element: <MySavedRecipes />,
        needSignIn: true,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ];
  }, []);

  return (
    <>
      <Router>
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
