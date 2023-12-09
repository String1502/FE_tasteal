import TastealHashLoader from '@/components/common/progress/TastealHashLoader';
import { PageRoute } from '@/lib/constants/common';
import AppContext from '@/lib/contexts/AppContext';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { Box } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

function CheckSignIn({
    children,
    checkAlready,
    needSignIn,
}: {
    children: React.ReactNode;
    checkAlready?: boolean;
    needSignIn?: string;
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

    useEffect(() => {
        if (login.isUserSignedIn == false && needSignIn) {
            if (
                localStorage.getItem('needSignIn') &&
                localStorage.getItem('needSignIn') == needSignIn
            ) {
                localStorage.removeItem('needSignIn');
                navigate(PageRoute.Home);
            } else {
                snackbarAlert(
                    'Bạn cần đăng nhập để sử dụng chức năng!',
                    'warning'
                );
                localStorage.setItem('needSignIn', needSignIn);
                navigate(PageRoute.SignIn);
            }
        }
    }, [login.isUserSignedIn, needSignIn]);

    return (
        <>
            {login.isUserSignedIn && <>{!checkAlready && <>{children}</>}</>}

            {login.isUserSignedIn == false && (
                <>{!needSignIn && <>{children}</>}</>
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
