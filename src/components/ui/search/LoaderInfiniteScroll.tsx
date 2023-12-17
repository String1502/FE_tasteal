import { Box, CircularProgress, Typography } from '@mui/material';

function LoaderInfiniteScroll() {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                p: 2,
                py: 4,
            }}
        >
            <CircularProgress
                size={24}
                sx={{
                    color: 'grey.400',
                }}
            />
            <Typography
                variant="body1"
                fontWeight={'bold'}
                sx={{
                    color: 'grey.400',
                }}
            >
                Chờ một chút...
            </Typography>
        </Box>
    );
}

export default LoaderInfiniteScroll;
