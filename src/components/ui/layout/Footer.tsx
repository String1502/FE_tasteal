import { Box, Container, Grid, Typography } from '@mui/material';
import { CustomHeaderLink, CustomLink } from '../header/CustomLink';
import logo2 from '@/assets/logo2.png';
import { PageRoute } from '@/lib/constants/common';
const gap = 4;

export function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
      }}
    >
      <Container
        sx={{
          pt: 12,
          pb: gap,
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          alignSelf={'stretch'}
          spacing={gap}
        >
          <Grid
            item
            lg={1}
            sx={{
              display: { xs: 'none', lg: 'block' },
            }}
          ></Grid>

          <Grid item xs={12} md={5} lg={4}>
            <Box
              component={'img'}
              src={logo2}
              sx={{
                aspectRatio: '1/1',
                width: '100%',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2,
                maxWidth: '70vw',
                display: { xs: 'none', md: 'flex' },
              }}
            />

            <Typography
              color={'white'}
              variant="h4"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 2,
                display: { xs: 'block', md: 'none' },
              }}
            >
              Tasteal
            </Typography>
          </Grid>

          <Grid
            item
            lg={1}
            sx={{
              display: { xs: 'none', lg: 'block' },
            }}
          ></Grid>

          <Grid item xs={12} md={3} lg={2}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <CustomHeaderLink href={'#'} label="Giới thiệu" color="white" />
              <CustomLink
                href={PageRoute.Search}
                label="Công thức"
                color="white"
                my={gap}
              />
              <CustomLink
                href={PageRoute.MealPlanner}
                label="Lịch ăn"
                color="white"
                my={gap}
              />
              <CustomLink
                href={PageRoute.Search}
                label="Tìm kiếm"
                color="white"
                my={gap}
              />
            </Box>
          </Grid>

          <Grid
            item
            lg={1}
            sx={{
              display: { xs: 'none', lg: 'block' },
            }}
          ></Grid>

          <Grid item xs={12} md={4} lg={2}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <CustomHeaderLink href={'#'} label="Doanh nghiệp" color="white" />
              <CustomLink
                href={PageRoute.Home}
                label="Về Tasteal"
                color="white"
                my={gap}
              />
            </Box>
          </Grid>

          <Grid
            item
            lg={1}
            sx={{
              display: { xs: 'none', lg: 'block' },
            }}
          ></Grid>

          <Grid item xs={12} lg={10}>
            <Box
              sx={{
                borderTop: 1,
                borderColor: 'grey.600',
                width: '100%',
              }}
            ></Box>
          </Grid>

          <Grid item xs={12} lg={10}>
            <Typography
              color={'white'}
              variant="body2"
              textAlign={{ xs: 'center', md: 'right' }}
            >
              © Tasteal Inc. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
