import { User } from "firebase/auth";
import React from "react";

export type AppContextState = {
  handleSpinner: (value: boolean) => void;
  login: {
    isUserSignedIn?: boolean;
    user?: User;
    handleLogin: (isUserSignedIn?: boolean, user?: User) => void;
  };
};
const AppContext = React.createContext<AppContextState>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleSpinner: (value: boolean) => {},
  login: {
    isUserSignedIn: undefined,
    user: undefined,
    handleLogin: (isUserSignedIn?: boolean, user?: User) => {},
  },
});

export default AppContext;
