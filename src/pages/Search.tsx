import { SearchRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { CheckBoxButton } from "../components/button/CheckBoxButton.tsx";
import { PrimaryCard } from "../components/card/PrimaryCard";
import { SearchFilter } from "../components/search/SearchFilter.tsx";
import Layout from "../layout/Layout";
import { MainShadow } from "../theme/muiTheme";
import { recipes } from "../types/sampleData";
import { RecipeEntity } from "../types/type";

export type TuKhoa = {
  label: string;
  value: boolean;
};

const DefaultTuKhoas: TuKhoa[] = [
  {
    label: "Bánh mì",
    value: false,
  },
  {
    label: "Bánh bao",
    value: false,
  },
  {
    label: "heo quay",
    value: false,
  },
  {
    label: "bún thịt nướng",
    value: false,
  },
  {
    label: "cơm sườn",
    value: false,
  },
  {
    label: "Bún đậu",
    value: false,
  },
];

function Search() {
  const [resultItem, setResultItem] = React.useState<RecipeEntity[]>(recipes);

  //#region Từ khóa
  const [tuKhoas, setTuKhoas] = React.useState<TuKhoa[]>(DefaultTuKhoas);

  const handleChangeTuKhoa = (tukhoa: TuKhoa) => {
    setTuKhoas((prev) => {
      return prev.map((item) => {
        if (item.label === tukhoa.label) {
          return {
            ...item,
            value: !item.value,
          };
        } else {
          return item;
        }
      });
    });
  };

  useEffect(() => {
    setTuKhoas(DefaultTuKhoas);
  }, [DefaultTuKhoas]);

  //#endregion

  return (
    <Layout>
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            mt: 8,
          }}
        >
          <Box>
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

        <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
          <SearchFilter />
        </Grid>

        <Grid item xs={12} lg={9} sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Công thức phổ biến
          </Typography>

          <Stack flexWrap={"wrap"} direction="row" sx={{ my: 2 }}>
            {tuKhoas.map((item) => (
              <CheckBoxButton
                key={item.label}
                label={item.label}
                value={item.value}
                handleChangeTuKhoa={handleChangeTuKhoa}
              />
            ))}
          </Stack>

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
    </Layout>
  );
}

export default Search;
