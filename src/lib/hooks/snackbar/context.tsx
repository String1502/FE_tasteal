import { Alert, Snackbar } from "@mui/material";
import { FC, PropsWithChildren, createContext } from "react";
import { UseSnackbarOpenAction, useSnackbar } from "./hook";

export type SnackbarServiceState = [UseSnackbarOpenAction];

export const SnackbarService = createContext<SnackbarServiceState>([
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (message: string) => {},
]);

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [snackbarProps, message, severity, handleOpenSnackbar] = useSnackbar();

  return (
    <SnackbarService.Provider value={[handleOpenSnackbar]}>
      {children}
      <Snackbar {...snackbarProps}>
        <Alert
          onClose={snackbarProps.onClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarService.Provider>
  );
};
