import { Box, CircularProgress } from '@mui/material';

export function BoxIngredientTypeSkeleton() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '500px',
        bgcolor: 'grey.300',
        borderRadius: '32px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
