import { defaultAvtPath, signInImagePath } from '@/assets/exportImage';
import BoxImage from '@/components/common/image/BoxImage';
import { PageRoute } from '@/lib/constants/common';
import { createEmailUser } from '@/lib/firebase/auth';
import useFirebaseImage from '@/lib/hooks/useFirebaseImage';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import AccountService from '@/lib/services/accountService';
import { createDebugStringFormatter } from '@/utils/debug/formatter';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Stack,
    TextField,
    TextFieldProps,
    Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEBUG_IDENTIFIER = '[SignUpEmail]';
const createDebugString = createDebugStringFormatter(DEBUG_IDENTIFIER);

export default function SignUpEmail() {
    //#region Hooks

    const navigate = useNavigate();
    const signInImage = useFirebaseImage(signInImagePath);
    const [openSnackbar] = useSnackbarService();

    //#endregion

    //#region States

    const [signUpInfo, setSignUpInfo] = useState<{
        name: string;
        email: string;
        password: string;
    }>({ name: '', email: '', password: '' });

    const [isLoading, setIsLoading] = useState(false);

    //#endregion

    //#region Handlers

    //#region SignupInfo Change Handler

    const handleNameChange = useCallback((name: string) => {
        setSignUpInfo((prev) => ({ ...prev, name: name }));
    }, []);

    const handleEmailChange = useCallback((email: string) => {
        setSignUpInfo((prev) => ({ ...prev, email: email }));
    }, []);

    const handlePasswordChange = useCallback((password: string) => {
        setSignUpInfo((prev) => ({ ...prev, password: password }));
    }, []);

    //#endregion

    const handleSignUp = useCallback(() => {
        setIsLoading(true);

        createEmailUser(signUpInfo.email, signUpInfo.password)
            .then((userCredential) => {
                const uid = userCredential.user.uid;

                const accountReq = {
                    uid: uid,
                    name: signUpInfo.name,
                };

                AccountService.SignUpAccount(accountReq)
                    .then((isSuccess) => {
                        if (isSuccess) {
                            console.log(
                                createDebugString('Sign up successfully')
                            );
                            openSnackbar('Đăng ký thành công!');
                            navigate(PageRoute.SignIn);
                        } else {
                            console.log(createDebugString('Sign up failed'));
                            openSnackbar('Đăng ký thất bại!', 'warning');
                        }
                    })
                    .catch((error) => {
                        console.log(createDebugString('Sign up failed'), error);
                        openSnackbar('Đăng ký thất bại!', 'warning');
                    });
            })
            .catch((error) => {
                console.log(createDebugString('Sign up failed'), error);
                openSnackbar('Đăng ký thất bại!', 'warning');
            })
            .finally(() => setIsLoading(false));
    }, [openSnackbar, signUpInfo.email, signUpInfo.name, signUpInfo.password]);

    //#endregion

    console.log(signUpInfo);

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                maxHeight={'100vh'}
                sx={{
                    overflow: 'auto',
                    scrollSnapType: 'y mandatory',
                    '& > *': {
                        scrollSnapAlign: 'center',
                    },
                    '::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Grid
                    item
                    xs={0}
                    md={5}
                    lg={6}
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'block',
                        },
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: `url(${signInImage})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '100%',
                            minHeight: '100vh',
                            width: '100%',
                        }}
                    ></Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={7}
                    lg={6}
                >
                    <Container
                        sx={{
                            width: '100%',
                            height: '100%',
                            minHeight: '100vh',
                            px: { sm: 12 },
                            py: 2,
                        }}
                    >
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent={'center'}
                            sx={{
                                height: '100%',
                                position: 'relative',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: {
                                        xs: 'space-between',
                                        md: 'flex-end',
                                    },
                                    alignItems: 'center',
                                    width: '100%',
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    color="gray.500"
                                >
                                    Bạn đã là thành viên?
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        ml: 2,
                                    }}
                                    onClick={() => {
                                        navigate(PageRoute.SignIn);
                                    }}
                                >
                                    <Typography
                                        variant="button"
                                        fontWeight={'bold'}
                                    >
                                        Đăng nhập
                                    </Typography>
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    mt: 6,
                                }}
                            >
                                <BoxImage
                                    src={defaultAvtPath}
                                    alt="Tasteal"
                                    quality={20}
                                    sx={{
                                        aspectRatio: '1/1',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        mr: 1,
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    color="primary"
                                >
                                    Tasteal
                                </Typography>
                            </Box>

                            <Typography
                                variant="h4"
                                fontWeight={'bold'}
                                color="primary"
                                sx={{
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                            >
                                Đăng ký với Email
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    width: '100%',
                                    textAlign: 'center',
                                    fontWeight: 'light',
                                }}
                            >
                                Lưu công thức, lên lịch ăn và chuẩn bị nguyên
                                liệu
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 3,
                                    my: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <TextField
                                    {...typoProps}
                                    placeholder="Chúng tôi có thể gọi bạn là?"
                                    type="name"
                                    value={signUpInfo.name}
                                    onChange={(e) => {
                                        handleNameChange(e.target.value);
                                    }}
                                    disabled={isLoading}
                                />
                                <TextField
                                    {...typoProps}
                                    placeholder="Email"
                                    type="email"
                                    value={signUpInfo.email}
                                    onChange={(e) => {
                                        handleEmailChange(e.target.value);
                                    }}
                                    disabled={isLoading}
                                />
                                <TextField
                                    {...typoProps}
                                    placeholder="Password"
                                    type="password"
                                    value={signUpInfo.password}
                                    onChange={(e) =>
                                        handlePasswordChange(e.target.value)
                                    }
                                    disabled={isLoading}
                                />

                                <Button
                                    variant="contained"
                                    sx={{
                                        gap: 1,
                                        width: '100%',
                                        py: 1.2,
                                        backgroundColor: 'primary',
                                        opacity: 1,
                                        '&:hover': {
                                            opacity: 0.9,
                                            backgroundColor: 'primary',
                                        },
                                        fontSize: 'caption.fontSize',
                                        fontWeight: 'bold',
                                    }}
                                    onClick={handleSignUp}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            ĐĂNG KÝ
                                            <CircularProgress size={16} />
                                        </>
                                    ) : (
                                        'ĐĂNG KÝ'
                                    )}
                                </Button>
                            </Box>
                        </Stack>
                    </Container>
                </Grid>
            </Grid>
        </>
    );
}

const typoProps: TextFieldProps = {
    variant: 'outlined',
    fullWidth: true,
    InputProps: {
        sx: {
            borderRadius: '40px',
            backgroundColor: 'grey.100',
            fontSize: 'body2.fontSize',
            px: 1.5,
        },
    },
};
