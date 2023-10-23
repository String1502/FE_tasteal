import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateRecipe from "./pages/CreateRecipe";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import  MealPlanner  from "./pages/MealPlanner";
import { SignUpEmail } from "./pages/SignUpEmail";
import { ForgotPass } from "./pages/ForgotPass";
import { getMode } from "./theme/muiTheme";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signupemail" element={<SignUpEmail />} />
            <Route path="/forgotpass" element={<ForgotPass />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/mealplanner" element={<MealPlanner />} />
            {/* Thêm các tuyến đường khác */}
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
