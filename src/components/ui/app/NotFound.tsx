import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Typography,
    useTheme,
} from '@mui/material';
import { useMemo } from 'react';
import SpaceDecor from './SpaceDecor';
import Layout from '@/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '@/lib/constants/common';

function NotFound() {
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
                    <Grid
                        item
                        xs={12}
                        md={5}
                    >
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
                                404
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight={900}
                                sx={{
                                    color: 'black',
                                    textAlign: { md: 'left', xs: 'center' },
                                }}
                            >
                                Lost in Tasteal
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
                                Trang bạn đang tìm kiếm đã bị xóa, thay đổi tên
                                hoặc tạm thời không có sẵn.
                                <br />
                                Đừng lo lắng hãy quay lại trang trước đó.
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

export default NotFound;
