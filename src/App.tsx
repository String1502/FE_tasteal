import RecipeDetail from '@/pages/RecipeDetail';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TastealHashLoader from './components/common/progress/TastealHashLoader';
import AppContext from './lib/contexts/AppContext';
import ColorModeContext from './lib/contexts/ColorModeContext';
import SnackbarProvider from './lib/contexts/snackbarContext';
import useTastealTheme from './lib/hooks/useTastealTheme';
import CreateRecipe from './pages/CreateRecipe';
import ForgotPass from './pages/ForgotPass';
import Grocery from './pages/Grocery';
import Home from './pages/Home';
import MealPlanner from './pages/MealPlanner';
import MySavedRecipes from './pages/MySavedRecipes';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignUpEmail from './pages/SignUpEmail';

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
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/search"
                        element={<Search />}
                    />
                    <Route
                        path="/signin"
                        element={<SignIn />}
                    />
                    <Route
                        path="/signup"
                        element={<SignUp />}
                    />
                    <Route
                        path="/signupemail"
                        element={<SignUpEmail />}
                    />
                    <Route
                        path="/forgotpass"
                        element={<ForgotPass />}
                    />
                    <Route
                        path="/recipe/create"
                        element={<CreateRecipe />}
                    />
                    <Route
                        path="/recipe/:id"
                        element={<RecipeDetail />}
                    />
                    <Route
                        path="/grocery"
                        element={<Grocery />}
                    />
                    <Route
                        path="/mealplanner"
                        element={<MealPlanner />}
                    />
                    <Route
                        path="/mysavedrecipes"
                        element={<MySavedRecipes />}
                    />
                    {/* Thêm các tuyến đường khác */}
                </Routes>
            </Router>
        </AppWrapper>
    );
}

export default App;
