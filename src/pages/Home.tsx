import {
  bannerFootImage,
  mealPlanImage,
  orderWhatYouNeedImage,
  recipesOccasionsImage,
  saveRecipesImage,
} from "@/assets/exportImage";
import { AuthorsCarousel } from "@/components/ui/home/AuthorsCarousel";
import { Banner } from "@/components/ui/home/Banner";
import { OccasionsList } from "@/components/ui/home/OccasionsList";
import { RecipesCarousel } from "@/components/ui/home/RecipesCarousel";
import AccountService from "@/lib/services/AccountService";
import OccasionService from "@/lib/services/OccasionService";
import RecipeService from "@/lib/services/RecipeService";
import { AccountEntity, OccasionEntity, RecipeEntity } from "@/types/type";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const typoProps: TypographyProps = {
  variant: "h6",
  fontWeight: "900",
  textTransform: "uppercase",
};

const whyTastealArray = [
  {
    title: "Công cụ lịch ăn miễn phí",
    image: mealPlanImage,
  },
  {
    title: "Tất cả công thức bạn yêu thích",
    image: saveRecipesImage,
  },
  {
    title: "Thực đơn theo dịp đặc biệt",
    image: recipesOccasionsImage,
  },
  {
    title: "Chỉ mua những thứ cần thiết",
    image: orderWhatYouNeedImage,
  },
];

const WhyTasteal = ({ item }: { item: { title: string; image: string } }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Box
          component={"img"}
          src={item.image}
          sx={{
            width: "20%",
            aspectRatio: "1/1",
            objectFit: "contain",
            objectPosition: "center",
            mb: 2,
          }}
        />
        <Typography
          variant="body2"
          fontWeight={"bold"}
          sx={{
            textAlign: "center",
            textTransform: "Capitalize",
          }}
        >
          {item.title}
        </Typography>
      </Box>
    </>
  );
};

function Home() {
  const [newReleases, setNewReleases] = useState<RecipeEntity[]>([]);

  const [trending, setTrending] = useState<RecipeEntity[]>([]);

  const [occasions, setOccasions] = useState<OccasionEntity[]>([]);

  const [mostContributedAuthors, setMostContributedAuthors] = useState<
    AccountEntity[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setNewReleases(await RecipeService.GetNewReleaseRecipes(10));
      setTrending(await RecipeService.GetTrendingRecipes(10));
      setMostContributedAuthors(
        await AccountService.GetMostContributedAccounts(10)
      );
      setOccasions(await OccasionService.GetAllOccasions());
    };
    fetchData();
  }, []);

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
        <Grid item xs={12}>
          <Container>
            <Typography {...typoProps}>Vừa ra mắt</Typography>
            <Typography variant="body1">
              Các công thức nấu ăn nhanh, mới, dễ đi chợ giúp bạn tiết kiệm thời
              gian và tiền bạc.
            </Typography>
            <RecipesCarousel array={newReleases} />
          </Container>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "secondary.main",
              py: 12,
              minHeight: "75vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container>
              <Typography {...typoProps}>Công thức theo dịp</Typography>
              <OccasionsList occasions={occasions} />
            </Container>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Container>
            <Typography {...typoProps}>Thịnh hành</Typography>
            <Typography variant="body1">
              Những công thức được mọi người yêu thích nhất!
            </Typography>
            <RecipesCarousel array={trending} />
          </Container>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "secondary.main",
              py: 12,
              minHeight: "75vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
              <AuthorsCarousel array={mostContributedAuthors} />
            </Container>
          </Box>
        </Grid>

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
              {whyTastealArray.map((item, index) => {
                return (
                  <Grid item xs={6} md={3}>
                    <WhyTasteal key={index} item={item} />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Grid>

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
