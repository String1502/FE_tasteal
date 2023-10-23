import { SearchRounded } from "@mui/icons-material";
import {
  Button,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";

export function SearchTextField({ placeholder, ...props }: TextFieldProps) {
  return (
    <>
      <TextField
        {...props}
        sx={{
          "& fieldset": { border: "none" },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "40px",
                }}
              >
                Search
              </Button>
            </InputAdornment>
          ),
          sx: {
            borderRadius: "40px",
            pl: 3,
            pr: 2,
            py: 0.5,
            boxShadow: 2,
            border: 0,
            backgroundColor: "white",
          },
        }}
        placeholder={placeholder ?? "Hôm nay nấu gì?"}
        variant="outlined"
        fullWidth
      />
    </>
  );
}
