import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { signInImagePath } from '@/assets/exportImage';
import { PageRoute } from '@/lib/constants/common';
import AppContext from '@/lib/contexts/AppContext';
import { signInEmailUser } from '@/lib/firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/config';
import useFirebaseImage from '@/lib/hooks/useFirebaseImage';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import AccountService from '@/lib/services/accountService';
import { createDebugStringFormatter } from '@/utils/debug/formatter';
import { Facebook, Google } from '@mui/icons-material';
import { signInWithPopup } from 'firebase/auth';
import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const createDebugString = createDebugStringFormatter('SignIn');

export default function SignIn() {
  //#region Hooks

  const navigate = useNavigate();
  const signInImage = useFirebaseImage(signInImagePath);
  const [openSnackbar] = useSnackbarService();
  const { login } = useContext(AppContext);

  //#endregion
  //#region Navigation

  const navigateSignIn = useCallback(() => {
    const needSignIn = localStorage.getItem('needSignIn');
    if (needSignIn) {
      localStorage.removeItem('needSignIn');
      navigate(needSignIn);
    } else navigate(PageRoute.Home);
  }, [navigate]);

  //#endregion
  //#region Sign In Info

  const [signInInfo, setSignInInfo] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });

  const handleEmailChange = useCallback((email) => {
    setSignInInfo((prev) => ({ ...prev, email: email }));
  }, []);

  const handlePasswordChange = useCallback((password) => {
    setSignInInfo((prev) => ({ ...prev, password: password }));
  }, []);

  //#endregion
  //#region Sign In Handlers

  const handleSignInWithEmailAndPassword = useCallback(() => {
    signInEmailUser(signInInfo.email, signInInfo.password)
      .then((userCredential) => {
        openSnackbar('Đăng nhập thành công!', 'success');
        if (login.handleLogin) {
          login.handleLogin(true, userCredential.user);
          navigateSignIn();
        }
      })
      .catch(() => {
        openSnackbar('Đăng nhập thất bại! Tài khoản không hợp lệ.', 'warning');
        if (login.handleLogin) {
          login.handleLogin(false, undefined);
        }
      });
  }, [
    login,
    navigateSignIn,
    openSnackbar,
    signInInfo.email,
    signInInfo.password,
  ]);

  const handleSignInWithGoogle = useCallback(() => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        console.log('[AUTH] Sign in with Google successfully', userCredential);
        openSnackbar('Đăng nhập thành công!', 'success');

        AccountService.GetByUid(userCredential.user.uid)
          .then(() =>
            console.log(
              createDebugString(
                'Account existed! No need to create new account!'
              )
            )
          )
          .catch(() => {
            createDebugString(
              'Account not existed! Need to create new account!'
            );

            AccountService.SignUpAccount({
              uid: userCredential.user.uid,
              name: userCredential.user.displayName,
            })
              .then((isSuccess) => {
                if (isSuccess) {
                  console.log(createDebugString('Sign up successfully'));
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
          .finally(() => {
            if (login.handleLogin) {
              login.handleLogin(true, userCredential.user);
              navigateSignIn();
            }
          });
      })
      .catch((error) => {
        console.log('[AUTH] Sign in with Google failed', error);
        openSnackbar('Đăng nhập thất bại! Hệ thống xảy ra lỗi.', 'warning');
        if (login.handleLogin) {
          login.handleLogin(false, undefined);
        }
      });
  }, [login, navigate, navigateSignIn, openSnackbar]);

  const handleSignInWithFacebook = useCallback(() => {
    openSnackbar('Chức năng chưa được hiện thực!', 'warning');
  }, [openSnackbar]);

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
        {/*// Grid của cái hình bên trái */}
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

        {/*Grid của cái đống bên phải*/}
        <Grid item xs={12} md={7} lg={6}>
          {/*Cái box của dòng chữ mé trên bên phải*/}
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
                <Typography variant="caption" color="gray.500">
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
                  <Typography variant="button" fontWeight={'bold'}>
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
                Tasteal Xin Chào!
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
                  onClick={handleSignInWithFacebook}
                >
                  Tiếp tục với Facebook
                </Button>
              </Box>

              <Divider
                flexItem
                sx={{
                  color: 'grey.600',
                  '&::before, &::after': {
                    borderColor: 'grey.600',
                  },
                }}
              >
                <Typography
                  textTransform={'uppercase'}
                  variant="body2"
                  sx={{
                    px: 1.5,
                  }}
                >
                  Hoặc dùng email của bạn
                </Typography>
              </Divider>

              {/*Cái ô nhập mail*/}
              <TextField
                placeholder="Email"
                variant="outlined"
                type="email"
                fullWidth
                sx={{
                  mt: 2,
                }}
                InputProps={{
                  sx: {
                    borderRadius: '40px',
                    backgroundColor: 'grey.100',
                    fontSize: 'body2.fontSize',
                    px: 1.5,
                  },
                }}
                value={signInInfo.email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />

              {/*Cái ô nhập password*/}
              <TextField
                placeholder="Mật khẩu"
                variant="outlined"
                type="password"
                fullWidth
                sx={{
                  mt: 2,
                }}
                InputProps={{
                  sx: {
                    borderRadius: '40px',
                    backgroundColor: 'grey.100',
                    fontSize: 'body2.fontSize',
                    px: 1.5,
                  },
                }}
                value={signInInfo.password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSignInWithEmailAndPassword();
                  }
                }}
              />

              {/*Text quên mật khẩu*/}
              <Typography
                variant="body2"
                sx={{ mt: 2, textAlign: 'right' }}
                component={'a'}
                href="./forgotpass"
                color="primary"
                width="100%"
                textTransform={'uppercase'}
                fontStyle={'italic'}
              >
                Bạn đã quên mật khẩu?
              </Typography>

              {/*Nút đăng nhập*/}
              <Button
                onClick={handleSignInWithEmailAndPassword}
                variant="contained"
                color="primary"
                sx={{
                  width: '100%',
                  mt: 3,
                  py: 1,
                }}
              >
                Đăng nhập
              </Button>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
