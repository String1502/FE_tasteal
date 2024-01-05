import { SearchRounded } from '@mui/icons-material';
import {
  Button,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';

export function SearchTextField({
  props,
  textSearch,
  handleChangeTextSearch,
  hideSearchButton,
}: {
  props?: TextFieldProps;
  textSearch: string;
  handleChangeTextSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hideSearchButton?: boolean;
}) {
  return (
    <>
      <TextField
        {...props}
        sx={{
          '& fieldset': { border: 'none' },
          ...props?.sx,
        }}
        value={textSearch}
        onChange={handleChangeTextSearch}
        placeholder={props?.placeholder ?? 'Hôm nay nấu gì?'}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                display: hideSearchButton ? 'none' : '',
              }}
            >
              <Button
                variant="contained"
                size={props?.size ?? props?.size}
                sx={{
                  borderRadius: '40px',
                  boxShadow: 'none',
                  pointerEvents: 'none',
                }}
              >
                Tìm kiếm
              </Button>
            </InputAdornment>
          ),
          sx: {
            borderRadius: '40px',
            pl: 3,
            pr: 2,
            py: 0.5,
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 20px 0px',
            border: 0,
            backgroundColor: 'white',
          },
        }}
      />
    </>
  );
}
