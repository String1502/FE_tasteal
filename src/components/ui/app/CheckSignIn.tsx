import AppContext from "@/lib/contexts/AppContext";
import React, { useContext, useEffect } from "react";
import SignInFirst from "./SignInFirst";
import TastealHashLoader from "@/components/common/progress/TastealHashLoader";
import { Box } from "@mui/material";

function CheckSignIn({ children }: { children: React.ReactNode }) {
  const { login } = useContext(AppContext);

  return (
    <>
      {login.isUserSignedIn && <>{children}</>}
      {login.isUserSignedIn == false && <SignInFirst />}
      {login.isUserSignedIn == undefined && (
        <Box sx={{ height: "100dvh", width: "100%", background: "white" }}>
          <TastealHashLoader spinner={true} />
        </Box>
      )}
    </>
  );
}

export default CheckSignIn;
