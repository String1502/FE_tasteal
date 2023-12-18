import { User } from 'firebase/auth';
import React from 'react';
import { OccasionEntity } from '../models/entities/OccasionEntity/OccasionEntity';

export type AppContextState = {
    handleSpinner: (value: boolean) => void;
    login: {
        isUserSignedIn?: boolean;
        user?: User;
        handleLogin: (isUserSignedIn?: boolean, user?: User) => void;
    };
    currentOccasion?: OccasionEntity;
};
const AppContext = React.createContext<AppContextState>({
    handleSpinner: () => {},
    login: {
        isUserSignedIn: undefined,
        user: undefined,
        handleLogin: () => {},
    },
    currentOccasion: undefined,
});

export default AppContext;
