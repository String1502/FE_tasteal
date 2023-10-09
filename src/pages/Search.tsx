import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../layout/Layout";
import { SearchRounded } from "@mui/icons-material";
import { HoverShadow, MainShadow } from "../theme/muiTheme";
import React from "react";
import { RecipeEntity } from "../types/type";
import { recipes } from "../types/sampleData";
import { PrimaryCard } from "../components/card/PrimaryCard";
import { SearchFilter } from "../components/Search/SearchFilter";

function Search() {
  const [resultItem, setResultItem] = React.useState<RecipeEntity[]>(recipes);
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

          <Grid
            item
            lg={3}
            sx={{ display: { xs: "none", md: "none", lg: "block" } }}
          >
            <SearchFilter />
          </Grid>

          <Grid item xs={12} lg={9}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Công thức phổ biến
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              {resultItem.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <PrimaryCard recipe={item as RecipeEntity} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default Search;
