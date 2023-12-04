import { defaultAvtPath, signInImagePath } from '@/assets/exportImage';
import { auth, googleProvider } from '@/lib/firebase/config';
import useFirebaseImage from '@/lib/hooks/useFirebaseImage';
import {
    CheckCircleRounded,
    Facebook,
    Google,
    MailOutline,
    RadioButtonUncheckedRounded,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    //#region Hooks

    const navigate = useNavigate();
    const authorImage = useFirebaseImage(defaultAvtPath);
    const signInImage = useFirebaseImage(signInImagePath);

    //#endregion
    //#region Handlers

    const handleSignInWithGoogle = useCallback(() => {
        signInWithPopup(auth, googleProvider)
            .then((userCredential) => {
                console.log(
                    '[AUTH] Sign in with Google successfully',
                    userCredential
                );
                navigate('/');
            })
            .catch((error) => {
                console.log('[AUTH] Sign in with Google failed', error);
            });
    }, [navigate]);

    //#endregion

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
                {/*Cái hình bên trái*/}
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

                {/*Cái đống bên phải*/}
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
                            {/*Cái đống mé trên bên phải*/}
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
                                        navigate('/signin');
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
                                <Box
                                    sx={{
                                        backgroundImage: `url(${authorImage})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        aspectRatio: '1/1',
                                        width: '32px',
                                        borderRadius: '50%',
                                        mr: 1,
                                    }}
                                ></Box>
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
                                Tasteal Xin Chào!
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
                                {/*Cái nút với google nè */}
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: '100%',
                                        py: 1.2,
                                        backgroundColor: '#3998f2',
                                        opacity: 1,
                                        '&:hover': {
                                            opacity: 0.9,
                                            backgroundColor: '#3998f2',
                                        },
                                        fontSize: 'caption.fontSize',
                                        fontWeight: 'bold',
                                    }}
                                    startIcon={<Google fontSize="large" />}
                                    onClick={handleSignInWithGoogle}
                                >
                                    Tiếp tục với Google
                                </Button>

                                {/*Cái nút với facebook nè*/}
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: '100%',
                                        py: 1.2,
                                        backgroundColor: '#3b5998',
                                        opacity: 1,
                                        '&:hover': {
                                            opacity: 0.9,
                                            backgroundColor: '#3b5998',
                                        },
                                        fontSize: 'caption.fontSize',
                                        fontWeight: 'bold',
                                    }}
                                    startIcon={<Facebook fontSize="large" />}
                                >
                                    Tiếp tục với Facebook
                                </Button>

                                {/*Cái nút với email nè*/}
                                <Button
                                    variant="contained"
                                    sx={{
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
                                    startIcon={<MailOutline fontSize="large" />}
                                    onClick={() => {
                                        navigate('/signupemail');
                                    }}
                                >
                                    Tiếp tục với Email
                                </Button>
                            </Box>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        icon={<RadioButtonUncheckedRounded />}
                                        checkedIcon={<CheckCircleRounded />}
                                    />
                                }
                                label={
                                    <Typography
                                        variant="body2"
                                        fontWeight={'light'}
                                        sx={{ width: '100%' }}
                                        color={'primary'}
                                    >
                                        Tôi muốn nhận cảm hứng về công thức, kế
                                        hoạch bữa ăn, cập nhật và nhiều hơn nữa!
                                    </Typography>
                                }
                            />

                            <Typography
                                variant="body2"
                                fontWeight={'light'}
                                sx={{
                                    width: '100%',
                                    textAlign: 'center',
                                    mt: 2,
                                }}
                                color={'grey.700'}
                            >
                                Bằng cách đăng ký, tôi đồng ý với{' '}
                                <Link
                                    underline="hover"
                                    href="/"
                                >
                                    Điều Khoản Dịch vụ
                                </Link>{' '}
                                và{' '}
                                <Link
                                    underline="hover"
                                    href="/"
                                >
                                    Chính Sách Bảo mật
                                </Link>
                            </Typography>
                        </Stack>
                    </Container>
                </Grid>
            </Grid>
        </>
    );
}
