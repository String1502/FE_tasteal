import { Box, Typography, styled, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

const BoxSpinner = styled(Box)(({ theme }) => ({
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
    backdropFilter: 'blur(2px)',
}));

function TastealHashLoader({ spinner }: { spinner: boolean }) {
    const theme = useTheme();
    const loadingText = 'Loading...';
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        if (spinner) {
            const interval = setInterval(() => {
                setDisplayText((prev) => {
                    if (prev.length < loadingText.length) {
                        return prev + loadingText[prev.length];
                    } else {
                        return '';
                    }
                });
            }, 120);

            return () => {
                clearInterval(interval);
            };
        } else {
            setDisplayText('');
        }
    }, [spinner]);
    return (
        <BoxSpinner
            sx={{
                display: spinner ? 'flex' : 'none',
            }}
        >
            <Box
                sx={{
                    borderRadius: 10,
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 4,
                    borderColor: 'primary.main',
                    pt: 8,
                    pb: 4,
                }}
            >
                <HashLoader
                    color={theme.palette.primary.light}
                    cssOverride={{}}
                    size={100}
                    loading={spinner}
                />
                <Typography
                    mt={3}
                    variant="h6"
                    fontWeight={'bold'}
                    color={'primary.light'}
                    textAlign="center"
                    sx={{
                        width: '280px',
                        height: '40px',
                        fontFamily: 'Dance Script, cursive',
                    }}
                >
                    {displayText}
                </Typography>
            </Box>
        </BoxSpinner>
    );
}

export default TastealHashLoader;
