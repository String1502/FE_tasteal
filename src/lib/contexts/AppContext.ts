import { User } from 'firebase/auth';
import React from 'react';
import { OccasionEntity } from '../models/entities/OccasionEntity/OccasionEntity';
import { CookBookEntity } from '../models/entities/CookBookEntity/CookBookEntity';
import { PopoverContentProps } from '@/components/ui/header/PopoverContent';
import { ScrollApp } from '../hooks/useTastealTheme';

export type AppContextState = {
  handleSpinner: (value: boolean) => void;
  login: {
    isUserSignedIn?: boolean;
    user?: User;
    handleLogin: (isUserSignedIn?: boolean, user?: User) => void;
  };
  currentOccasion?: OccasionEntity;
  cookbooks?: CookBookEntity[];
  popOverHeader?: PopoverContentProps;
  scroll?: ScrollApp;
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
  popOverHeader: undefined,
  scroll: undefined,
});

export default AppContext;
