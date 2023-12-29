import { User } from 'firebase/auth';
import React from 'react';
import { OccasionEntity } from '../models/entities/OccasionEntity/OccasionEntity';
import { CookBookEntity } from '../models/entities/CookBookEntity/CookBookEntity';

export type AppContextState = {
  handleSpinner: (value: boolean) => void;
  login: {
    isUserSignedIn?: boolean;
    user?: User;
    handleLogin: (isUserSignedIn?: boolean, user?: User) => void;
  };
  currentOccasion?: OccasionEntity;
  cookbooks?: CookBookEntity[];
};
const AppContext = React.createContext<AppContextState>({
  handleSpinner: () => {},
  login: {
    isUserSignedIn: undefined,
    user: undefined,
    handleLogin: () => {},
  },
  currentOccasion: undefined,
  cookbooks: undefined,
});

export default AppContext;
