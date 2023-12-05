import { User } from 'firebase/auth';
import React from 'react';

export type AppContextState = {
    handleSpinner: (value: boolean) => void;
    login: {
        isUserSignedIn?: boolean;
        user?: User;
        handleLogin: (isUserSignedIn?: boolean, user?: User) => void;
    };
};
const AppContext = React.createContext<AppContextState>({
    handleSpinner: () => {},
    login: {
        isUserSignedIn: undefined,
        user: undefined,
        handleLogin: () => {},
    },
});

export default AppContext;
