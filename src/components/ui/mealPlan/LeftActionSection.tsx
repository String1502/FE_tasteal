import {
  QuestionMarkRounded,
  HighlightAltRounded,
  MapsUgcRounded,
  RotateLeftRounded,
  RotateRightRounded,
} from '@mui/icons-material';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import { useState } from 'react';

function LeftActionSection({
  weekCounter,
  handleChangeWeekCounter,
}: {
  weekCounter: number;
  handleChangeWeekCounter: (value: number) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: '900',
          textTransform: 'uppercase',
        }}
      >
        Lịch ăn của tôi
      </Typography>

      <IconButton
        color="primary"
        onClick={handleClick}
        sx={{
          border: 1,
        }}
        size="small"
      >
        <QuestionMarkRounded fontSize="small" />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              background: 'white',
              width: '280px',
            },
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <HighlightAltRounded fontSize="small" />
            <Typography variant="body2" fontWeight={'light'}>
              <span style={{ fontWeight: 'bold' }}>Kéo và thả </span>
              công thức để di chuyển nó tới bất kỳ ngày nào trong tuần.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <MapsUgcRounded
              sx={{
                transform: 'scaleX(-1)',
              }}
              fontSize="small"
            />
            <Typography variant="body2" fontWeight={'light'}>
              <span style={{ fontWeight: 'bold' }}>Thêm </span>
              nhiều công thức nấu ăn ngon từ Tasteal.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <RotateLeftRounded fontSize="small" />
            <Typography variant="body2" fontWeight={'light'}>
              <span style={{ fontWeight: 'bold' }}>Đổi </span>
              một công thức để thay thế nó bằng một gợi ý khác.
            </Typography>
          </Box>
        </Box>
      </Popover>

      <IconButton
        color="primary"
        onClick={() => handleChangeWeekCounter(0)}
        sx={{
          border: 1,
        }}
        size="small"
        disabled={weekCounter === 0}
      >
        <RotateRightRounded fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default LeftActionSection;
