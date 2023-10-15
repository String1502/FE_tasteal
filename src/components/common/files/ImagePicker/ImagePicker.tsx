import { PhotoCameraOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FC } from "react";

export const ImagePicker: FC = () => {
  return (
    <label htmlFor="image">
      <Box
        width="240px"
        height="240px"
        sx={{
          backgroundColor: "#ffe6d4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "24px",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#ffccbb",
          },
        }}
      >
        <PhotoCameraOutlined htmlColor="#777d86" />
        <Typography
          sx={{ fontSize: "16px", fontWeight: 1000, color: "#777d86" }}
        >
          Add your image
        </Typography>

        <input id="image" type="file" style={{ display: "none" }} />
      </Box>
    </label>
  );
};
