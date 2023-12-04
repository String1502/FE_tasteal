import AppContext from "@/lib/contexts/AppContext";
import React, { useContext } from "react";
import SignInFirst from "./SignInFirst";

function CheckSignIn({ children }: { children: React.ReactNode }) {
  const { login } = useContext(AppContext);
  return (
    <>
      {login.isUserSignedIn && <>{children}</>}
      {login.isUserSignedIn == false && <SignInFirst />}
      {login.isUserSignedIn == undefined && <h1>loading</h1>}
    </>
  );
}

export default CheckSignIn;
