import {
  AddRounded,
  BookmarksRounded,
  BorderColorRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import React from "react";

export const AddRecipeButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        color="primary"
        sx={{
          border: 1,
        }}
        onClick={handleClick}
      >
        <AddRounded fontSize="small" />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              background: "white",
              width: "240px",
            },
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <BookmarksRounded
                  sx={{
                    color: "primary.main",
                    fontSize: "large",
                  }}
                />
              </ListItemIcon>
              <ListItemText>
                <Typography fontWeight={"bold"} variant="body2">
                  Thêm từ bộ sưu tập
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <SearchRounded
                  sx={{
                    color: "primary.main",
                    fontSize: "large",
                  }}
                />
              </ListItemIcon>
              <ListItemText>
                <Typography fontWeight={"bold"} variant="body2">
                  Tìm công thức
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <BorderColorRounded
                  sx={{
                    color: "primary.main",
                    fontSize: "large",
                  }}
                />
              </ListItemIcon>
              <ListItemText>
                <Typography fontWeight={"bold"} variant="body2">
                  Tạo công thức mới
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};
