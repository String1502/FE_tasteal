import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const buttonProps: ButtonProps = {
  size: "small",
  sx: {
    px: 3,
    maxWidth: "200px",
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
  confirm?: boolean;
  handleClickOpen: (title?: string, content?: string) => void;
  handleClose: (confirm?: boolean) => void;
  title?: string;
  content?: string;
};

function SlideInDialog(props: SlideInDialogProps) {
  const { open, handleClose, title, content } = props;
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
            minWidth: "240px",
            borderRadius: 6,
            py: 2,
            px: 4,
          },
        }}
      >
        <DialogTitle>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{
              width: "100%",
            }}
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography sx={{ width: "100%" }} variant="body1">
              {content}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            width: "100%",
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              handleClose(false);
            }}
            {...buttonProps}
            variant="outlined"
          >
            Quay lại
          </Button>
          <Button
            onClick={() => {
              handleClose(true);
            }}
            {...buttonProps}
            variant="contained"
          >
            Tiếp tục
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SlideInDialog;
