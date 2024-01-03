import {
  Box,
  Button,
  CircularProgress,
  Slide,
  Typography,
  useTheme,
} from '@mui/material';
import { ChatHeader } from './ChatHeader';
import { ChatBody } from './ChatBody';
import { ChatTextField } from './ChatTextField';
import { Suspense, useContext } from 'react';
import { ChatContext } from '@/lib/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '@/lib/constants/common';

export function ChatFrame() {
  const { state, dispatch } = useContext(ChatContext);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          right: theme.spacing(3 + 8 + 3),
          zIndex: theme.zIndex.drawer,
        }}
      >
        <Slide direction="up" in={state.open} mountOnEnter unmountOnExit>
          <Box
            component={'div'}
            sx={{
              backgroundColor: 'background.default',
              borderRadius: '16px 16px 0 0',
              boxShadow: 24,
              overflow: 'hidden',
              width: '328px',
              height: '400px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
              }}
            >
              {/* Tiêu đề */}
              <ChatHeader />

              {!state.sender || state.sender.uid === '' ? (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    Vui lòng đăng nhập trước!
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      navigate(PageRoute.SignIn);
                      dispatch({
                        type: 'setOpen',
                        payload: { ...state, open: false },
                      });
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Box>
              ) : (
                <>
                  {/* Nội dung chat */}
                  <Suspense
                    fallback={
                      <Box
                        component={'div'}
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <CircularProgress color="secondary" />
                      </Box>
                    }
                  >
                    <ChatBody />
                  </Suspense>

                  {/* Text field */}
                  <ChatTextField />
                </>
              )}
            </Box>
          </Box>
        </Slide>
      </Box>
    </>
  );
}
