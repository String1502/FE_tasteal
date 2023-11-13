import RecipeDetail from "@/pages/RecipeDetail";
import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TastealHashLoader from "./components/common/progress/TastealHashLoader";
import CreateRecipe from "./pages/CreateRecipe";
import { ForgotPass } from "./pages/ForgotPass";
import { Grocery } from "./pages/Grocery";
import Home from "./pages/Home";
import MealPlanner from "./pages/MealPlanner";
import Search from "./pages/Search";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { SignUpEmail } from "./pages/SignUpEmail";
import { getMode } from "./theme/muiTheme";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

interface AppContextState {
  handleSpinner: (value: boolean) => void;
}

export const AppContext = React.createContext<AppContextState>({
  handleSpinner: (value: boolean) => {},
});

function App() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getMode(mode)), [mode]);

  const [spinner, setSpinner] = React.useState<boolean>(false);

  function handleSpinner(value: boolean) {
    setSpinner(value);
  }

  return (
    <AppContext.Provider value={{ handleSpinner }}>
      <ColorModeContext.Provider value={colorMode}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <TastealHashLoader spinner={spinner} />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signupemail" element={<SignUpEmail />} />
              <Route path="/forgotpass" element={<ForgotPass />} />
              <Route path="/recipe/create" element={<CreateRecipe />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/grocery" element={<Grocery />} />
              <Route path="/mealplanner" element={<MealPlanner />} />
              {/* Thêm các tuyến đường khác */}
            </Routes>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
