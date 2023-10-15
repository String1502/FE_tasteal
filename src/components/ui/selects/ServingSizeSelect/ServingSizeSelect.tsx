import { PeopleOutlineOutlined } from "@mui/icons-material";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useCallback } from "react";

export const ServingSizeSelect: React.FunctionComponent<{
  servingSize: number;
  sizes: number[];
  onServingSizeChange: (servingSize: number) => void;
}> = ({ servingSize, sizes, onServingSizeChange }) => {
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
      value={servingSize}
      onChange={handleServingSizeChange}
      startAdornment={<PeopleOutlineOutlined />}
      sx={{
        width: 96,
        borderRadius: 8,
        bgcolor: "secondary.main",
        typography: "subtitle1",
        fontWeight: 800,
      }}
      MenuProps={{
        sx: {
          height: 360,
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
