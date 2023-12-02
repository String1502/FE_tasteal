import { bannerFootImagePath } from "@/assets/exportImage";
import { Banner } from "@/components/ui/home/Banner";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";
import { NewRelease_Component } from "@/components/ui/home/NewRelease_Component";
import { WhyTasteal } from "../components/ui/home/WhyTasteal";
import { Occasion_Component } from "../components/ui/home/Occasion_Component";
import Trending_Component from "@/components/ui/home/Trending_Component";
import MostContributedAuthors_Component from "@/components/ui/home/MostContributedAuthors_Component";

const typoProps: TypographyProps = {
  variant: "h6",
  fontWeight: "900",
  textTransform: "uppercase",
};

function Home() {
  const bannerFootImage = useFirebaseImage(bannerFootImagePath);
  const navigate = useNavigate();
  return (
    <Layout>
      <Banner />

      <Grid
        container
        alignItems={"stretch"}
        justifyContent={"center"}
        spacing={8}
        sx={{
          my: 4,
        }}
      >
        {/* Vừa ra mắt */}
        <Grid item xs={12}>
          <Container>
            <Typography {...typoProps}>Vừa ra mắt</Typography>
            <Typography variant="body1">
              Các công thức nấu ăn nhanh, mới, dễ đi chợ giúp bạn tiết kiệm thời
              gian và tiền bạc.
            </Typography>
            <NewRelease_Component />
          </Container>
        </Grid>

        {/* Công thức theo dịp */}
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "secondary.main",
              py: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Container>
              <Typography {...typoProps}>Công thức theo dịp</Typography>
              <Occasion_Component />
            </Container>
          </Box>
        </Grid>

        {/* Thịnh hành */}
        <Grid item xs={12}>
          <Container>
            <Typography {...typoProps}>Thịnh hành</Typography>
            <Typography variant="body1">
              Những công thức được mọi người yêu thích nhất!
            </Typography>
            <Trending_Component />
          </Container>
        </Grid>

        {/* Đóng góp nhiều nhất */}
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "secondary.main",
              py: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Container>
              <Typography
                {...typoProps}
                sx={{
                  textAlign: "center",
                }}
              >
                đóng góp nhiều nhất
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  px: { lg: 8, md: 4, sm: 2, xs: 0 },
                }}
              >
                Gặp gỡ cộng đồng các chuyên gia ẩm thực, người viết blog ẩm thực
                cho đến các đầu bếp bậc thầy của chúng tôi từ khắp nơi trên thế
                giới.
              </Typography>
              <MostContributedAuthors_Component />
            </Container>
          </Box>
        </Grid>

        {/* Với Tasteal */}
        <Grid item xs={12}>
          <Container>
            <Typography
              {...typoProps}
              sx={{
                textAlign: "center",
              }}
            >
              Với Tasteal
            </Typography>

            <Grid
              container
              spacing={2}
              justifyContent={"center"}
              alignItems={"flex-start"}
              sx={{
                pt: 4,
                pb: 6,
              }}
            >
              <WhyTasteal />
            </Grid>
          </Container>
        </Grid>

        {/* Foot Banner */}
        <Grid item xs={12}>
          <Container>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/0.28",
                minHeight: "300px",
                overflow: "hidden",
                borderRadius: 6,
                mb: 4,
                backgroundImage: `url(${bannerFootImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  background:
                    "linear-gradient(to top,rgba(0,0,0,0.4),rgba(0,0,0,0.2))",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                  alignItems: "center",
                  p: 8,
                }}
              >
                <Stack direction={"column"} spacing={2} alignItems={"center"}>
                  <Typography
                    variant="h4"
                    color="white"
                    fontFamily={"Dancing Script"}
                    fontWeight={"bold"}
                    align="center"
                  >
                    Xem tất cả công thức chỉ với <br /> MỘT click chuột!
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      px: 3,
                    }}
                    onClick={() => {
                      navigate("/search");
                    }}
                  >
                    Xem ngay!
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Home;
