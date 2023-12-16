import OccasionService from '@/lib/services/occasionService';
import {
    Box,
    Button,
    Container,
    Skeleton,
    Typography,
    useTheme,
} from '@mui/material';
import React, { Suspense } from 'react';
import { SearchTextField } from '../search/SearchTextField';
import useFirebaseImage from '@/lib/hooks/useFirebaseImage';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';

const height = '480px';

export function Banner() {
    const theme = useTheme();

    const [occasion, setOccasion] = React.useState<OccasionEntity | undefined>(
        undefined
    );

    const image = useFirebaseImage(occasion?.image);

    React.useEffect(() => {
        const fetchData = async () => {
            setOccasion(await OccasionService.GetCurrentOccassions());
        };
        fetchData();
    }, []);

    const [textSearch, setTextSearch] = React.useState<string>('');
    const handleChangeTextSearch = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => setTextSearch(event.target.value);

    return (
        <>
            <Suspense
                fallback={
                    <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={height}
                    />
                }
            >
                <Box
                    sx={{
                        width: '100%',
                        height: height,
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            background:
                                'linear-gradient(to top, rgba(255, 255, 255, 0.15),rgba(0, 0, 0, 0))',
                        }}
                    >
                        <Container>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: height,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-start',
                                    py: 4,
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    color="white"
                                    sx={{
                                        fontFamily: 'Dancing Script',
                                        textShadow: `0px 0px 15px ${theme.palette.primary.light}, 0 0 15px ${theme.palette.primary.light},0 0 15px ${theme.palette.common.black}`,
                                        textTransform: 'uppercase',
                                        fontWeight: '300',
                                    }}
                                >
                                    {occasion?.name ?? 'Tasteal'}
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        mt: 2,
                                        mb: 8,
                                        backgroundColor: 'primary.light',
                                        px: 4,
                                        py: 1.5,
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        fontWeight={'bold'}
                                        color="white"
                                    >
                                        Xem công thức ngay!
                                    </Typography>
                                </Button>

                                <SearchTextField
                                    textSearch={textSearch}
                                    handleChangeTextSearch={
                                        handleChangeTextSearch
                                    }
                                />
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </Suspense>
        </>
    );
}
