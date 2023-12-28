import AppContext from '@/lib/contexts/AppContext';
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Suspense, useContext, useEffect, useRef, useState } from 'react';
import { FlareRounded } from '@mui/icons-material';
import { formatNumberWithLeadingZero } from '@/utils/format';
export function CustomCountDown() {
  const { currentOccasion } = useContext(AppContext);

  const [dateCountDown, setDateCountDown] = useState<number | undefined>(
    undefined
  );

  console.log(currentOccasion);

  useEffect(() => {
    if (currentOccasion) {
      const start_at = currentOccasion.start_at;
      const getTime = new Date().getTime();

      if (getTime >= start_at.getTime()) {
        setDateCountDown(undefined);
      } else {
        setDateCountDown((start_at.getTime() - getTime) / 1000);
      }
    }
  }, [currentOccasion]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dateCountDown) {
        setDateCountDown(dateCountDown - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dateCountDown]);

  return (
    <Suspense
      fallback={
        <Skeleton
          variant="rectangular"
          sx={{
            width: '100%',
            height: '50px',
          }}
        ></Skeleton>
      }
    >
      <Box
        sx={{
          background:
            'linear-gradient(45deg, rgba(14,92,173,1) 0%, rgba(121,241,164,1) 100%)',
          width: '100%',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              py: 1,
            }}
          >
            <Box
              sx={{
                width: `calc(100% - 156px)`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <FlareRounded sx={{ color: 'white' }} fontSize="small" />
                <Typography
                  variant="body2"
                  fontWeight={900}
                  sx={{
                    color: 'white',
                    whiteSpace: 'nowrap',
                    pr: 2,
                  }}
                >
                  {currentOccasion?.name ?? 'Tasteal'}
                </Typography>
                <Box
                  sx={{
                    overflow: 'hidden',
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{
                      color: 'white',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      animation: 'moveText 25s linear infinite',
                      '@keyframes moveText': {
                        '0%': {
                          transform: 'translateX(100%)',
                        },
                        '100%': {
                          transform: 'translateX(-150%)',
                        },
                      },
                    }}
                  >
                    {currentOccasion?.description ??
                      'Tìm kiếm mọi công thức nấu ăn...'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                pl: 4,
              }}
            >
              {dateCountDown && (
                <Box sx={{}}>
                  <Stack gap={0.4} direction={'row'} divider={<>:</>}>
                    {[
                      Math.floor(dateCountDown / 3600),
                      Math.floor((dateCountDown % 3600) / 60),
                      Math.floor(dateCountDown % 60),
                    ].map((item, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          aspectRatio: '1/1',
                          borderRadius: 2,
                          backgroundColor: 'white',
                          width: '34px',
                        }}
                      >
                        <Typography
                          color="primary"
                          sx={{
                            fontWeight: 800,
                            fontSize: '12px',
                          }}
                        >
                          {formatNumberWithLeadingZero(item)}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </Suspense>
  );
}
