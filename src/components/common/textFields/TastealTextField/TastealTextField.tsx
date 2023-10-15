import { TextField } from "@mui/material";
import { ComponentProps, FC } from "react";

const TEXT_FIELD_BG_COLOR = "#F0F0F0";

export const TastealTextField: FC<ComponentProps<typeof TextField>> = (
  props
) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        sx: {
          border: "none",
          borderRadius: 4,
          backgroundColor: TEXT_FIELD_BG_COLOR,
          fontSize: 18,
          ...props.InputProps?.sx,
        },
      }}
    />
  );
};
