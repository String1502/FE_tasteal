import Layout from '@/layout/Layout';
import { PageRoute } from '@/lib/constants/common';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SpaceDecor from './SpaceDecor';

function NotManager() {
  const navigate = useNavigate();
  return (
    <Layout withFooter={false}>
      <Container sx={{ minHeight: 'inherit' }}>
        <Grid
          container
          justifyContent={'center'}
          alignItems={'stretch'}
          sx={{
            minHeight: 'inherit',
          }}
          spacing={2}
        >
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: { md: 'flex-start', xs: 'center' },
                gap: 1,
              }}
            >
              <Typography
                variant="h3"
                fontWeight={'light'}
                sx={{
                  color: 'black',
                  textAlign: { md: 'left', xs: 'center' },
                }}
              >
                403
              </Typography>
              <Typography
                variant="h3"
                fontWeight={900}
                sx={{
                  color: 'black',
                  textAlign: { md: 'left', xs: 'center' },
                }}
              >
                Not authorized in Tasteal
              </Typography>
              <Divider
                sx={{
                  width: '25%',
                  border: 2,
                  mb: 4,
                }}
              />

              <Typography
                variant="body2"
                fontWeight={'regular'}
                sx={{
                  color: 'black',
                  width: '70%',
                  textAlign: { md: 'left', xs: 'center' },
                }}
              >
                Trang bạn muốn truy cập cần được cấp quyền.
                <br />
                Đừng lo lắng hãy liên hệ quản trị viên để được cấp quyền
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: {
                    md: 'flex-start',
                    xs: 'center',
                  },
                  alignItems: 'center',
                  gap: 2,
                  mt: 6,
                }}
              >
                <Button
                  variant="contained"
                  sx={{ px: 3, boxShadow: 'none' }}
                  onClick={() => navigate(PageRoute.Home)}
                >
                  Trang chủ
                </Button>
                <Button
                  variant="outlined"
                  sx={{ px: 3 }}
                  onClick={() => {
                    history.back();
                  }}
                >
                  Trở về
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={7}
            sx={{
              display: { md: 'flex', xs: 'none' },
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: '90%',
                height: '100%',
              }}
            >
              <SpaceDecor />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default NotManager;
