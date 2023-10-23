import { Chip, ChipProps } from "@mui/material";
import { FC } from "react";

const TagChip: FC<ChipProps> = (props) => {
  return (
    <Chip
      {...props}
      variant="outlined"
      clickable
      sx={{
        p: 2,
        borderWidth: 1,
        borderColor: "primary.main",
        borderStyle: "solid",
        fontSize: 16,
        fontWeight: "bold",
        "&:hover": {
          bgColor: "#000",
        },
      }}
    />
  );
};

export default TagChip;