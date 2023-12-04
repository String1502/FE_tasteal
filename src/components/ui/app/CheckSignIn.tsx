import AppContext from "@/lib/contexts/AppContext";
import React, { useContext, useEffect } from "react";
import SignInFirst from "./SignInFirst";
import TastealHashLoader from "@/components/common/progress/TastealHashLoader";
import { Box } from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import { PAGE_ROUTE } from "@/lib/constants/common";
import useSnackbarService from "@/lib/hooks/useSnackbar";

function CheckSignIn({
  children,
  checkAlready,
  needSignIn,
}: {
  children: React.ReactNode;
  checkAlready?: boolean;
  needSignIn?: boolean;
}) {
  const { login } = useContext(AppContext);
  const [snackbarAlert] = useSnackbarService();
  const navigate = useNavigate();

  useEffect(() => {
    if (login.isUserSignedIn && checkAlready) {
      snackbarAlert("Bạn đã đăng nhập rồi!", "warning");
      navigate(PAGE_ROUTE.HOME);
    }
  }, [login.isUserSignedIn, checkAlready]);

  return (
    <>
      {login.isUserSignedIn && <>{!checkAlready && <>{children}</>}</>}

      {login.isUserSignedIn == false && (
        <>
          {needSignIn && (
            <>
              <SignInFirst />
            </>
          )}
          {!needSignIn && <>{children}</>}
        </>
      )}
      {login.isUserSignedIn == undefined && (
        <Box sx={{ height: "100dvh", width: "100%", background: "white" }}>
          <TastealHashLoader spinner={true} />
        </Box>
      )}
    </>
  );
}

export default CheckSignIn;
