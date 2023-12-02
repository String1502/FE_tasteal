import useFirebaseImage from "@/lib/hooks/useFirebaseImage";
import { Box, BoxProps } from "@mui/material";
import React from "react";

function BoxImage({ ...props }: BoxProps & { src: string; alt?: string }) {
  const imgSrc = useFirebaseImage(props.src);
  return (
    <Box
      loading="lazy"
      {...props}
      component={"img"}
      src={imgSrc ?? ""}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        position: "relative",
        opacity: 0,
        transition: "all 0.2s ease-in-out",
        ...props.sx,
      }}
      onLoad={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
    />
  );
}

export default BoxImage;
