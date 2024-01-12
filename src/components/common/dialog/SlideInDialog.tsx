import { CloseRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const buttonProps: ButtonProps = {
  size: 'small',
  sx: {
    px: 3,
    width: '150px',
  },
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type SlideInDialogProps = {
  open: boolean;
  handleClose: () => void;
  withCloseButton?: boolean;
  title?: string;
  content?: string | React.ReactNode;
  onClickConfirm?: () => void;
  onClickCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
};

function SlideInDialog(props: SlideInDialogProps) {
  const {
    open,
    handleClose,
    withCloseButton,
    title,
    content,
    onClickConfirm,
    onClickCancel,
    confirmText,
    cancelText,
    confirmButtonProps,
    cancelButtonProps,
  } = props;
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            pt: 1,
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="h6"
              fontWeight={'bold'}
              sx={{
                width: '100%',
              }}
            >
              {title}
            </Typography>

            {withCloseButton && (
              <IconButton
                size="small"
                color="primary"
                sx={{
                  border: 1,
                }}
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseRounded color="primary" fontSize="inherit" />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content && typeof content === 'string' && (
              <Typography sx={{ width: '100%' }} variant="body1">
                {content}
              </Typography>
            )}
            {content && typeof content !== 'string' && <>{content}</>}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
          }}
        >
          {(cancelText || onClickCancel) && (
            <Button
              onClick={() => {
                onClickCancel?.();
                handleClose();
              }}
              {...buttonProps}
              {...cancelButtonProps}
              variant="outlined"
            >
              {cancelText ?? 'Quay lại'}
            </Button>
          )}

          {(confirmText || onClickConfirm) && (
            <Button
              onClick={() => {
                onClickConfirm?.();
                handleClose();
              }}
              {...buttonProps}
              {...confirmButtonProps}
              variant="contained"
            >
              {confirmText ?? 'Tiếp tục'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SlideInDialog;
