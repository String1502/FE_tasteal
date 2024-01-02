import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { CloseRounded } from '@mui/icons-material';

export function ChatImageDialog({
  open,
  handleClose,
  src,
}: {
  open: boolean;
  handleClose: () => void;
  src: string;
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        },
      }}
      PaperProps={{
        sx: {
          width: '100%',
          background: 'transparent',
          borderRadius: '24px 24px 0 0',
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 0.5,
          px: 2,
          backgroundColor: 'secondary.main',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={'space-between'}
        >
          <Typography
            variant="caption"
            fontWeight={'bold'}
            sx={{ color: 'white' }}
          >
            Trình xem ảnh
          </Typography>

          <IconButton
            onClick={handleClose}
            sx={{
              color: 'white',
            }}
            size="small"
          >
            <CloseRounded fontSize="inherit" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Box
        component={'div'}
        sx={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          p: 0,
          lineHeight: 0,
        }}
      >
        <Box
          component={'img'}
          src={src}
          loading="lazy"
          sx={{
            width: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </Box>
    </Dialog>
  );
}
