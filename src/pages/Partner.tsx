import { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { FormatQuoteRounded, LanguageRounded } from "@mui/icons-material";
import Layout from "../layout/Layout";
import { PrimaryCard } from "../components/common/card/PrimaryCard.tsx";
import { RecipeEntity } from "@/lib/models/entities/RecipeEntity/RecipeEntity.ts";
import UserEditForm from "./UserEditForm";
import MostContributedAuthors_Component from '@/components/ui/home/MostContributedAuthors_Component';
import RecipeService from "@/lib/services/recipeService.ts";




const Partner = () => {
  const [newReleaseRecipes, setNewReleaseRecipes] = useState<RecipeEntity[]>([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const itemsToAdd = 4;
  const [name, setName] = useState("Healer");
  const [image, setImage] = useState(
    "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg"
  );
  const [description, setDescription] = useState("Healer is so handsome.");
  const [philosophy, setPhilosophy] = useState("Healer is healer");
  const [website, setWebsite] = useState(
    "https://www.facebook.com/nmhieu.healer"
  );
  const [slogan, setSlogan] = useState("Healer always heals");

  const [isEditing, setIsEditing] = useState(false);

  const handleShowMore = () => {
    setVisibleItems(visibleItems + itemsToAdd);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleSave = (editedData) => {
    // Cập nhật thông tin người dùng với các giá trị mới
    setName(editedData.name);
    setImage(editedData.image);
    setDescription(editedData.description);
    setPhilosophy(editedData.philosophy);
    setWebsite(editedData.website);
    setSlogan(editedData.slogan);

    // Tắt chế độ chỉnh sửa
    setIsEditing(false);
  };

  useEffect(() => {
    // Load new release recipes when the component mounts
    loadNewReleaseRecipes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNewReleaseRecipes = async () => {
    try {
      const recipes = await RecipeService.GetTrendingRecipes(100);
      setNewReleaseRecipes(recipes);
    } catch (error) {
      console.error("Error loading new release recipes:", error);
    }
  };

  return (
    <Layout>
      <Container sx={{ p: 0 }}>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            mb: 8,
          }}
        >
          <Grid item xs={12} lg={11} sx={{ mt: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={5} sx={{ mt: 2 }}>
                <img
                  src={image}
                  alt="Hình ảnh"
                  style={{
                    width: "100%",
                    height: "500px",
                    borderRadius: "5%",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={7} sx={{ mt: 2 }}>
                {isEditing ? (
                  <UserEditForm
                    name={name}
                    image={image}
                    description={description}
                    philosophy={philosophy}
                    website={website}
                    slogan={slogan}
                    onSave={handleSave}
                    uid='13b865f7-d6a6-4204-a349-7f379b232f0c'
                    onCancel={() => setIsEditing(false)}
                  />
                ) : (
                  <>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 800,
                        fontSize: "22px",
                        height: "auto",
                        color: "primary",
                        fontFamily: "Poppins, sans-serif",
                        mb: 1,
                      }}
                    >
                      {slogan}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "26px",
                        height: "auto",
                        color: "primary",
                        fontFamily: "Poppins, sans-serif",
                        mb: 1,
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 300,
                        fontSize: "16px",
                        color: "#777d86",
                        fontFamily: "Poppins, sans-serif",
                        mb: 2,
                      }}
                    >
                      {description}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "primary",
                        fontFamily: "Poppins, sans-serif",
                        mb: 2,
                      }}
                    >
                      <FormatQuoteRounded
                        sx={{ color: "#777d86", rotate: "180deg", mr: 1 }}
                      ></FormatQuoteRounded>
                      {philosophy}
                      <FormatQuoteRounded
                        sx={{ color: "#777d86", ml: 1 }}
                      ></FormatQuoteRounded>
                    </Typography>
                    <Grid item xs={12} alignItems="center">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <LanguageRounded
                          sx={{ color: "#00404e", mr: 1 }}
                        ></LanguageRounded>{" "}
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "14px",
                            color: "#00404e",
                            fontWeight: "bold",
                          }}
                        >
                          {website}
                        </a>
                      </div>
                    </Grid>
                    <Button
                      onClick={handleStartEditing}
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      Chỉnh sửa
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={11} sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Tất cả công thức của {name}
            </Typography>


            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
              sx={{
                mt: 3,
              }}
            >
              {newReleaseRecipes.slice(0, visibleItems).map((item, index) => (
                <Grid item xs={12} sm={3} md={3} key={index}>
                  <PrimaryCard recipe={item as RecipeEntity} />
                </Grid>
              ))}
            </Grid>
            {visibleItems < newReleaseRecipes.length && (
              <Grid container justifyContent="center">
                <Button
                  onClick={handleShowMore}
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 2,
                    mt: 5,
                  }}
                >
                  Hiện thêm
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>

      <Grid
                    item
                    xs={12}
                >
                    <Box
                        sx={{
                            backgroundColor: 'secondary.main',
                            py: 12,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Container>
                        {/* <Typography
                                {...typoProps}
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                đóng góp nhiều nhất
                            </Typography> */}
                            {/* <Typography
                                variant="body1"
                                sx={{
                                    textAlign: 'center',
                                    px: { lg: 8, md: 4, sm: 2, xs: 0 },
                                }}
                            >
                                Gặp gỡ cộng đồng các chuyên gia ẩm thực, người
                                viết blog ẩm thực cho đến các đầu bếp bậc thầy
                                của chúng tôi từ khắp nơi trên thế giới.
                            </Typography> */}
                            <MostContributedAuthors_Component />
                        </Container>
                    </Box>
                </Grid>
    </Layout>
  );
};

export default Partner;
