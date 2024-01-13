import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { dateTimeToMinutes } from '@/utils/format';
import { Box, Typography } from '@mui/material';

function TotalTimeRecipe({
  imgHeight,
  padding,
  totalTime,
}: {
  imgHeight: string | number;
  padding: number;
  totalTime: RecipeEntity['totalTime'];
}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        width: '100%',
        top: imgHeight,
        zIndex: 1,
        px: padding,
        pb: 1,
        pt: 2,
        transform: 'translateY(-99%)',
        background:
          'linear-gradient(to top, rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0))',
      }}
    >
      <Typography
        variant="body2"
        color="common.white"
        sx={{ fontWeight: 'bold' }}
      >
        {dateTimeToMinutes(totalTime)} phút
      </Typography>
    </Box>
  );
}

export default TotalTimeRecipe;
