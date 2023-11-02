import { SERVING_SIZES } from "@/lib/constants/options";
import { PeopleOutlineOutlined } from "@mui/icons-material";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { useCallback } from "react";

export type ServingSizeSelectProps = {
  servingSize: number;
  onServingSizeChange: (servingSize: number) => void;
  sizes?: number[];
} & Omit<SelectProps<number>, "onChange" | "value">;

export const ServingSizeSelect: React.FunctionComponent<
  ServingSizeSelectProps
> = ({ servingSize, onServingSizeChange, sizes = SERVING_SIZES, ...props }) => {
  const handleServingSizeChange = useCallback(
    (e: SelectChangeEvent<number>) => {
      const value = e.target.value;

      onServingSizeChange(typeof value === "number" ? value : parseInt(value));
    },
    [onServingSizeChange]
  );

  return (
    // TODO: add left margin to text (next to icon) if possible.
    <Select
      {...props}
      value={servingSize}
      onChange={handleServingSizeChange}
      startAdornment={<PeopleOutlineOutlined />}
      sx={{
        width: 96,
        borderRadius: 8,
        bgcolor: "secondary.main",
        typography: "subtitle1",
        fontWeight: 800,
        transition: "all 0.2s ease-in-out",
        ...props.sx,
      }}
      MenuProps={{
        ...props.MenuProps,
        sx: {
          height: 360,
          ...props.MenuProps?.sx,
        },
      }}
    >
      {sizes.map((size, index) => (
        <MenuItem key={index} value={size}>
          {size}
        </MenuItem>
      ))}
    </Select>
  );
};
