import React from 'react';

export interface AppContextState {
    handleSpinner: (value: boolean) => void;
}
const AppContext = React.createContext<AppContextState>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSpinner: (value: boolean) => {},
});

export default AppContext;
