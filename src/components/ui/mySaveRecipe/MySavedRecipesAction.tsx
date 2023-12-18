import { Button, Stack, Typography } from '@mui/material';
import { AddCircleOutlineRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '@/lib/constants/common';

export function MySavedRecipesAction() {
  const navigate = useNavigate();
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ width: '100%' }}
        gap={2}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: '900',
            textTransform: 'uppercase',
            flexGrow: 1,
          }}
        >
          Bộ sưu tập
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleOutlineRounded />}
          color="primary"
          sx={{ pr: 4, pl: 3, boxShadow: 'none' }}
          onClick={() => {
            navigate(PageRoute.Recipe.Create);
          }}
        >
          <Typography variant="caption" fontWeight={'bold'} color={'white'}>
            Tạo công thức
          </Typography>
        </Button>
      </Stack>
    </>
  );
}
