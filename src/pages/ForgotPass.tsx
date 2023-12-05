import { signInImagePath } from '@/assets/exportImage';
import { PageRoute } from '@/lib/constants/common';
import { auth } from '@/lib/firebase/config';
import useFirebaseImage from '@/lib/hooks/useFirebaseImage';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import {
    Box,
    Button,
    Container,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPass() {
    const navigate = useNavigate();
    const signInImage = useFirebaseImage(signInImagePath);
    const [snackbarAlert] = useSnackbarService();

    const emailRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState('');

    const handleSendEmail = useCallback(() => {
        if (!email) {
            snackbarAlert('Vui lòng điền email', 'warning');
            emailRef.current.focus();
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                snackbarAlert(
                    'Đã gửi xác nhận reset mật khẩu tới email của bạn!',
                    'success'
                );
            })
            .catch(() => {
                snackbarAlert('Đã có lỗi xảy ra! Thử lại sau!', 'warning');
            });
    }, [email, snackbarAlert]);

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
                                    Bạn chưa có tài khoản?
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        ml: 2,
                                    }}
                                    onClick={() => {
                                        navigate(PageRoute.SignUp);
                                    }}
                                >
                                    <Typography
                                        variant="button"
                                        fontWeight={'bold'}
                                    >
                                        Đăng ký
                                    </Typography>
                                </Button>
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
                                Quên mật khẩu?
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={'light'}
                                sx={{
                                    width: '100%',
                                    textAlign: 'center',
                                    mb: 3,
                                    mt: 1,
                                }}
                            >
                                Nhập Email SideChef của bạn. <br />
                                Chúng tôi sẽ gửi bạn đường dẫn để đặt lại mật
                                khẩu.
                            </Typography>

                            {/*Cái ô nhập mail*/}
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ref={emailRef}
                                placeholder="Email"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    mt: 2,
                                    width: '100%',
                                }}
                                InputProps={{
                                    sx: {
                                        borderRadius: '40px',
                                        backgroundColor: '#f7f7f7',
                                        fontSize: 'body2.fontSize',
                                        px: 1.5,
                                    },
                                }}
                            />

                            <Button
                                onClick={handleSendEmail}
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: '100%',
                                    mt: 3,
                                    py: 1,
                                }}
                            >
                                Gửi đường dẫn
                            </Button>
                        </Stack>
                    </Container>
                </Grid>
            </Grid>
        </>
    );
}
