import { CloseRounded } from '@mui/icons-material';
import { Box, Dialog, IconButton, SxProps, Typography } from '@mui/material';
import React from 'react';

type CustomDialogProps = {
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  title: string;
  childrenContainerSx?: SxProps;
  action?: React.ReactNode;
};

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  handleClose,
  children,
  title,
  childrenContainerSx,
  action,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          minWidth: '80%',
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: 1.4,
            borderColor: 'secondary.main',
            p: 2,
          }}
        >
          <Typography
            variant="body1"
            fontWeight={900}
            textTransform={'capitalize'}
            color={'primary'}
          >
            {title}
          </Typography>

          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              border: 1,
            }}
            color="primary"
          >
            <CloseRounded fontSize="inherit" color="inherit" />
          </IconButton>
        </Box>

        <Box
          sx={{
            height: '430px',
            overflow: 'auto',
            '::-webkit-scrollbar': {
              display: 'none',
            },
            p: 2,
            pt: 0,
            ...childrenContainerSx,
          }}
        >
          {children}
        </Box>

        {action && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            }}
          >
            {action}
          </Box>
        )}
      </Box>
    </Dialog>
  );
};
