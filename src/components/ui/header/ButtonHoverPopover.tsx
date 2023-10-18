import { ExpandMoreRounded } from "@mui/icons-material";
import { Box, Button, Link, Popover, Typography } from "@mui/material";
import React, { useEffect } from "react";

export function ButtonHoverPopover({
  children,
  customLink,
}: {
  children: React.ReactNode;
  customLink: React.ReactNode;
}) {
  const [anchorElement, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorElement);

  return (
    <div>
      <Box
        onMouseEnter={handlePopoverOpen}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {customLink}
        <ExpandMoreRounded color="primary" />
      </Box>
      <Popover
        open={open}
        anchorEl={anchorElement}
        anchorReference="anchorPosition"
        elevation={3}
        anchorPosition={{
          top: anchorElement ? anchorElement.offsetHeight + 36 : 0,
          left: 0,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
      >
        <Box
          sx={{
            width: "100vw",
          }}
          onMouseLeave={handlePopoverClose}
        >
          {children}
        </Box>
      </Popover>
    </div>
  );
}
