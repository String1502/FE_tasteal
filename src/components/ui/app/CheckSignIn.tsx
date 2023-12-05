import TastealHashLoader from '@/components/common/progress/TastealHashLoader';
import { PageRoute } from '@/lib/constants/common';
import AppContext from '@/lib/contexts/AppContext';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { Box } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import SignInFirst from './SignInFirst';

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
            snackbarAlert('Bạn đã đăng nhập rồi!', 'warning');
            navigate(PageRoute.Home);
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
                <Box
                    sx={{
                        height: '100dvh',
                        width: '100%',
                        background: 'white',
                    }}
                >
                    <TastealHashLoader spinner={true} />
                </Box>
            )}
        </>
    );
}

export default CheckSignIn;
