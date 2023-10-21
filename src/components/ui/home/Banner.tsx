import { bannerImage } from "@/assets/exportImage";
import OccasionService from "@/lib/services/OccasionService";
import { OccasionEntity } from "@/types/type";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import React from "react";
import { SearchTextField } from "../search/SearchTextField";

const height = "480px";

export function Banner(props?: any) {
  const theme = useTheme();

  const [occasion, setOccasion] = React.useState<OccasionEntity | undefined>(
    undefined
  );

  React.useEffect(() => {
    const fetchData = async () => {
      setOccasion(await OccasionService.GetCurrentOccassions());
    };
    fetchData();
  }, []);

  console.log(occasion);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: height,
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0.15),rgba(0, 0, 0, 0))",
          }}
        >
          <Container>
            <Box
              sx={{
                width: "100%",
                height: height,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                py: 4,
              }}
            >
              <Typography
                variant="h3"
                color="white"
                sx={{
                  fontFamily: "Dancing Script",
                  textShadow: `0px 0px 15px ${theme.palette.primary.light}, 0 0 15px ${theme.palette.primary.light},0 0 15px ${theme.palette.common.black}`,
                  textTransform: "uppercase",
                  fontWeight: "300",
                }}
              >
                {occasion?.name ?? "Tasteal"}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 8,
                  color: "white",
                  backgroundColor: "primary.light",

                  px: 4,
                  py: 1.5,
                }}
              >
                <Typography variant="caption" fontWeight={"bold"}>
                  Xem công thức ngay!
                </Typography>
              </Button>

              <SearchTextField />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
