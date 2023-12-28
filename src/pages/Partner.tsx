import {
  FormatQuoteRounded,
  LanguageRounded,
  EditRounded,
} from '@mui/icons-material';
import Layout from '../layout/Layout';
import { PrimaryCard } from '../components/common/card/PrimaryCard.tsx';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity.ts';
import UserEditForm from './UserEditForm';
import { Suspense, useContext, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Link,
  Skeleton,
  Stack,
} from '@mui/material';

import MostContributedAuthors_Component from '@/components/ui/home/MostContributedAuthors_Component';
import RecipeService from '@/lib/services/recipeService.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { PageRoute } from '@/lib/constants/common.ts';
import AppContext from '@/lib/contexts/AppContext.ts';
import useSnackbarService from '@/lib/hooks/useSnackbar.ts';
import BoxImage from '@/components/common/image/BoxImage.tsx';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity.ts';
import AccountService from '@/lib/services/accountService.ts';

const itemsToAdd = 4;
const Partner = () => {
  const [userData, setUserData] = useState<AccountEntity | undefined>(
    undefined
  );

  const [isEditing, setIsEditing] = useState(false);
  const [snackbarAlert] = useSnackbarService();

  const navigate = useNavigate();
  const {
    login: { user },
  } = useContext(AppContext);
  const { uid } = useParams();

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleChangeUserData = (data: AccountEntity) => {
    setUserData(data);

    // Tắt chế độ chỉnh sửa
    setIsEditing(false);
  };

  //#region Recipes
  const [recipeData, setRecipeData] = useState<RecipeEntity[]>([]);
  const [visibleItems, setVisibleItems] = useState(8);

  const handleShowMore = () => {
    setVisibleItems(visibleItems + itemsToAdd);
  };
  //#endregion

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uid == '') {
          return;
        }
        const fetchUser = await AccountService.GetByUid(uid);
        setUserData(fetchUser);
        console.log(fetchUser);

        const recipes = await RecipeService.GetRecipeByRating(100);
        setRecipeData(recipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [uid]);

  return (
    <Layout>
      <Container>
        <Grid
          container
          spacing={6}
          sx={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            mb: 6,
            mt: 4,
          }}
        >
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} lg={5}>
                <Suspense
                  fallback={
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: '100%',
                        height: '500px',
                        borderRadius: '5%',
                      }}
                    />
                  }
                >
                  <BoxImage
                    src={userData?.avatar}
                    alt="Hình ảnh"
                    style={{
                      width: '100%',
                      height: '500px',
                      borderRadius: '5%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </Suspense>
              </Grid>
              <Grid item xs={12} lg={7}>
                {userData && (
                  <UserEditForm
                    isEditing={isEditing}
                    onClose={() => setIsEditing(false)}
                    userData={userData}
                    handleChangeUserData={handleChangeUserData}
                  />
                )}

                {userData ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        height: 'auto',
                        color: 'primary',
                        mb: 1,
                      }}
                    >
                      {userData.slogan}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        color: 'primary',
                        mb: 1,
                      }}
                    >
                      {userData.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      fontWeight={'light'}
                      sx={{
                        color: 'grey.800',
                        mb: 2,
                      }}
                    >
                      {userData.introduction}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="primary"
                      fontWeight={800}
                      sx={{
                        mb: 2,
                      }}
                    >
                      <FormatQuoteRounded
                        sx={{
                          color: 'grey.600',
                          rotate: '180deg',
                          mr: 1,
                        }}
                      />
                      {userData.quote}
                      <FormatQuoteRounded
                        sx={{
                          color: 'grey.600',
                          ml: 1,
                        }}
                      />
                    </Typography>

                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <LanguageRounded
                        color="primary"
                        fontSize="small"
                        sx={{
                          mr: 1,
                        }}
                      />
                      <Link
                        href={userData.link}
                        variant="caption"
                        color={'primary'}
                        fontWeight={'bold'}
                      >
                        {userData.link}
                      </Link>
                    </Box>
                  </>
                ) : (
                  <>
                    <Stack direction={'column'} spacing={3}>
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: '100%',
                          fontSize: 'h6.fontSize',
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: '100%',
                          fontSize: 'h4.fontSize',
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: '100%',
                          fontSize: 'body2.fontSize',
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: '100%',
                          fontSize: 'body1.fontSize',
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: '100%',
                          fontSize: 'caption.fontSize',
                        }}
                      />
                    </Stack>
                  </>
                )}
                <Button
                  onClick={handleStartEditing}
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    px: 3,
                  }}
                  startIcon={<EditRounded />}
                >
                  Chỉnh sửa
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={'800'}>
              Tất cả công thức của {userData?.name ?? 'Trống'}
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
              {recipeData.slice(0, visibleItems).map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <PrimaryCard recipe={item as RecipeEntity} />
                </Grid>
              ))}
            </Grid>
            {visibleItems < recipeData.length && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  onClick={handleShowMore}
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 4,
                    mt: 5,
                    textTransform: 'none',
                    boxShadow: 'none',
                  }}
                >
                  Hiện thêm
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          backgroundColor: 'secondary.main',
          py: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Box>
              <Typography
                variant="body1"
                fontWeight={'800'}
                sx={{
                  width: '100%',
                  textTransform: 'capitalize',
                }}
              >
                Những tác giả khác
              </Typography>
              <Typography
                variant="body2"
                fontWeight={'light'}
                sx={{
                  width: '100%',
                }}
              >
                Gặp gỡ cộng đồng các chuyên gia ẩm thực, người viết blog ẩm thực
                cho đến các đầu bếp bậc thầy của chúng tôi từ khắp nơi trên thế
                giới.
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                fontStyle: 'italic',
                textTransform: 'uppercase',
                width: '150px',
                textAlign: 'right',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'grey.600',
                },
              }}
              onClick={() => {
                navigate(PageRoute.AllPartner);
              }}
            >
              Xem tất cả
            </Typography>
          </Box>
          <MostContributedAuthors_Component exceptUid={[uid]} />
        </Container>
      </Box>
    </Layout>
  );
};

export default Partner;
