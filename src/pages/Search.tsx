import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import Layout from "../layout/Layout";
import { SearchRounded } from "@mui/icons-material";
import { HoverShadow, MainShadow } from "../theme/muiTheme";

function Search() {
  return (
    <Layout>
      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                my: 4,
              }}
            >
              <TextField
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
                    boxShadow: MainShadow,
                    border: 0,
                  },
                }}
                placeholder="Đang đói lắm phải không?"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Grid>

          <Grid item xs={3}>
            <h1>Search</h1>
          </Grid>
          <Grid item xs={9}>
            <h3>Công thức phổ biến</h3>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default Search;
