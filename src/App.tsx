import RecipeDetail from "@/pages/RecipeDetail";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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

//#region AppWrapper

type AppWrapperProps = {
  handleSpinner: (value: boolean) => void;
  colorMode: {
    toggleColorMode: () => void;
  };
  theme: Theme;
  spinner: boolean;
};

function AppWrapper({
  children,
  handleSpinner,
  colorMode,
  theme,
  spinner,
}: React.PropsWithChildren & AppWrapperProps) {
  return (
    <AppContext.Provider value={{ handleSpinner }}>
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

function App() {
  const themeProps = useTastealTheme();

  return (
    <AppWrapper {...themeProps}>
      <Router>
        <Routes>
          <Route path={PAGE_ROUTE.HOME} element={<Home />} />
          <Route path={PAGE_ROUTE.SEARCH} element={<Search />} />
          <Route path={PAGE_ROUTE.SIGN_IN} element={<SignIn />} />
          <Route path={PAGE_ROUTE.SIGN_UP} element={<SignUp />} />
          <Route path={PAGE_ROUTE.SIGN_UP_EMAIL} element={<SignUpEmail />} />
          <Route path={PAGE_ROUTE.FORGOT_PASS} element={<ForgotPass />} />
          <Route path={PAGE_ROUTE.RECIPE.CREATE} element={<CreateRecipe />} />
          <Route path={PAGE_ROUTE.RECIPE.DETAIL} element={<RecipeDetail />} />
          <Route path={PAGE_ROUTE.GROCERY} element={<Grocery />} />
          <Route path={PAGE_ROUTE.MEALPLANNER} element={<MealPlanner />} />
          <Route
            path={PAGE_ROUTE.MY_SAVE_RECIPES}
            element={<MySavedRecipes />}
          />
          {/* Thêm các tuyến đường khác */}
        </Routes>
      </Router>
    </AppWrapper>
  );
}

export default App;
