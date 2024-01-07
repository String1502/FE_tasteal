import { Button, IconButton, Stack, Typography } from '@mui/material';
import { BookmarkBorderRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BoxImage from '@/components/common/image/BoxImage';
import { PageRoute } from '@/lib/constants/common';

export function AddYourFirstRecipe() {
  const navigate = useNavigate();
  return (
    <Stack
      direction={'column'}
      gap={3}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        width: '40%',
      }}
    >
      <BoxImage
        src="https://www.sidechef.com/static/images/3feb6c9a2065479a6792.png"
        alt="Empty"
        quality={1}
        sx={{
          objectFit: 'contain',
          width: '80%',
        }}
      />
      <Typography
        variant="body1"
        fontWeight={'bold'}
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        Lưu ngay công thức đầu tiên!
      </Typography>

      <Typography
        variant="body1"
        fontWeight={'light'}
        sx={{
          width: '100%',
          color: 'grey.600',
          textAlign: 'center',
        }}
      >
        Nhấn vào icon
        <IconButton
          size="small"
          sx={{
            border: 1,
            mx: 1,
            pointerEvents: 'none',
            color: 'black',
          }}
        >
          <BookmarkBorderRounded fontSize="small" />
        </IconButton>
        trên mỗi thẻ công thức để lưu!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{
          width: '80%',
        }}
        onClick={() => {
          navigate(PageRoute.Search);
        }}
      >
        Tìm công thức
      </Button>
    </Stack>
  );
}
