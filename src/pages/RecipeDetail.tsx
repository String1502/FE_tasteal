import TastealBreadCrumbs from '@/components/common/breadcrumbs/TastealBreadcrumbs';
import TastealIconButton from '@/components/common/buttons/TastealIconButton';
import BoxImage from '@/components/common/image/BoxImage';
import WithFallback from '@/components/common/layouts/WithFallback';
import TastealTextField from '@/components/common/textFields/TastealTextField';
import BigSectionHeading from '@/components/common/typos/BigSectionHeading/BigSectionHeading';
import SectionHeading from '@/components/common/typos/SectionHeading';
import RecipeTimeInfo from '@/components/ui/cards/RecipeTimeInfo';
import DirectionItem from '@/components/ui/collections/DirectionItem';
import IngredientDisplayer from '@/components/ui/collections/IngredientDisplayer';
import SimpleContainer from '@/components/ui/container/SimpleContainer';
import SameAuthorRecipesCarousel from '@/components/ui/displayers/SameAuthorRecipesCarousel/SameAuthorRecipesCarousel';
import NutrionPerServingModal from '@/components/ui/modals/NutrionPerServingModal';
import Layout from '@/layout/Layout';
import { N_AValue, PageRoute } from '@/lib/constants/common';
import AppContext from '@/lib/contexts/AppContext';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { CommentRes } from '@/lib/models/dtos/Response/CommentRes/CommentRes';
import { RecipeRes } from '@/lib/models/dtos/Response/RecipeRes/RecipeRes';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { CommentEntity } from '@/lib/models/entities/CommentEntity/CommentEntity';
import AccountService from '@/lib/services/accountService';
import CommentService from '@/lib/services/commentService';
import RecipeService from '@/lib/services/recipeService';
import { createDebugStringFormatter } from '@/utils/debug/formatter';
import {
  Add,
  Bookmark,
  BookmarkOutlined,
  Close,
  CommentsDisabledRounded,
  Edit,
  Facebook,
  Mail,
  Pinterest,
  PrintOutlined,
  StarRateRounded,
  Twitter,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  Modal,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock bread crumbs data (will be remove later)
const breadCrumbsLinks = [
  {
    href: '/',
    label: 'Tasteal',
  },
  {
    href: '/',
    label: 'Recipes',
  },
  {
    href: '/',
    label: 'Keto',
  },
];

/**
 * Page id for debug purpose.
 * @constant {string} PAGE_ID
 */
const PAGE_ID = 'RecipeDetail';

/**
 * Constants for recipe detail page
 */
const RecipeDetailStringConstants = {
  DEFAULT_NAME: N_AValue,
  DEFAULT_INSTRUCTION: N_AValue,
} as const;

/**
 * Formatter help attach page identifier to message log.
 */
const debugStringFormatter = createDebugStringFormatter(PAGE_ID);

const RecipeDetail: FC = () => {
  //#region Loading

  const [loading, setLoading] = useState(false);

  //#endregion
  //#region Destructuring

  const { id } = useParams();

  //#endregion
  //#region Hooks

  const { handleSpinner, login } = useContext(AppContext);
  const navigate = useNavigate();
  const [snackbarAlert] = useSnackbarService();
  const {
    login: { user },
  } = useContext(AppContext);

  //#endregion
  //#region Recipe

  const [isRecipeFound, setIsRecipeFound] = useState(true);
  const [recipe, setRecipe] = useState<RecipeRes | null>(null);

  useEffect(() => {
    setRecipe(null);
    setLoading(true);
    handleSpinner(true);

    if (!id) {
      setRecipe(null);
      setLoading(false);
      console.log(debugStringFormatter('Failed to get recipe id'));
      return;
    }

    const parsedId = parseInt(id);

    RecipeService.GetById(parsedId)
      .then((recipe) => {
        setRecipe(recipe);
        setIsRecipeFound(true);
      })
      .catch((err) => {
        setRecipe(null);
        setIsRecipeFound(false);
        console.log(debugStringFormatter('Failed to get recipe data!'));
        console.log('error', err);
      })
      .finally(() => {
        handleSpinner(false);
        setLoading(false);
      });
  }, [handleSpinner, id]);

  //#endregion
  //#region Nutrition

  const [nutritionPerServingModalOpen, setNutritionPerServingModalOpen] =
    useState(false);

  const handleNutrionPerServingModalClose = useCallback(() => {
    setNutritionPerServingModalOpen(false);
  }, [setNutritionPerServingModalOpen]);

  //#endregion
  //#region Edit Recipe

  const canEditRecipe = useMemo(() => {
    if (login.user) {
      if (!login.user) return false;

      if (!recipe || !recipe.author) return false;

      return login.user.uid === recipe.author.uid;
    }

    return false;
  }, [login.user, recipe]);

  const handleOpenEditEditor = useCallback(() => {
    if (!id) {
      snackbarAlert('Lỗi khi truy vấn công thức', 'warning');
      return;
    }

    const intId = parseInt(id);

    navigate(PageRoute.Recipe.Edit(intId));
  }, [id, navigate, snackbarAlert]);

  //#endregion
  //#region Direction

  const [viewDirectionImageUrl, setViewDirectionImageUrl] = useState('');
  const [viewDirectionImageOpen, setViewDirectionImageOpen] = useState(false);

  const handleOpenViewDirectionImage = useCallback((url: string) => {
    setViewDirectionImageOpen(true);
    setViewDirectionImageUrl(url);
  }, []);

  const handleCloseViewDirectionImage = useCallback(() => {
    setViewDirectionImageOpen(false);
    setViewDirectionImageUrl('');
  }, []);

  //#endregion
  //#region Feedback

  const [comment, setComment] = useState('');

  function handleComment() {
    const [valid, message] = validateComment();
    if (!valid) {
      snackbarAlert(message, 'warning');
      return;
    }

    console.log(recipe!.id, user.uid, comment);

    CommentService.Create(recipe!.id, user.uid, comment)
      .then((comment) => console.log('Đã comment', comment))
      .catch((error) => console.log('error', error));
  }
  function validateComment(): [boolean, string] {
    if (!comment) {
      return [false, 'Vui lòng nhập comment'];
    }
    if (!user) {
      return [false, 'Vui lòng đăng nhập!'];
    }
    if (!recipe) {
      return [false, 'Không lấy được thông tin công thức!'];
    }

    return [true, ''];
  }

  const [comments, setComments] = useState<CommentEntity[]>([]);
  useEffect(() => {
    if (!recipe) {
      return;
    }
    CommentService.Get(recipe!.id)
      .then((res) => setComments(res.comments))
      .catch(() => setComments([]));
  }, [recipe]);
  console.log(comments);

  //#endregion
  //#region Others

  const recipeBrief = useMemo(() => {
    if (!recipe) {
      return RecipeDetailStringConstants.DEFAULT_NAME;
    }

    const ingredientCount = recipe.ingredients.length;
    const directionCount = recipe.directions.length;
    const totalTime = recipe.totalTime;

    return `${ingredientCount} NGUYÊN LIỆU • ${directionCount} BƯỚC • ${totalTime} PHÚT`;
  }, [recipe]);

  //#endregion

  console.log('render');

  return (
    <Layout>
      <WithFallback criteria={isRecipeFound} fallback={<RecipeNotFound />}>
        <Container>
          <Grid
            container
            sx={{ backgroundColor: 'background.default', py: 2 }}
            spacing={2}
          >
            <Grid item xs={12}>
              <TastealBreadCrumbs links={breadCrumbsLinks} />
            </Grid>

            <Grid item xs={12}>
              <Grid container columnSpacing={4}>
                <Grid item xs={8}>
                  <BoxImage
                    src={recipe?.image ?? ''}
                    alt={'Không tìm thấy ảnh'}
                    quality={80}
                    sx={{
                      width: '100%',
                      height: 520,
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Stack justifyContent={'center'} height={'100%'} gap={1}>
                    <Chip
                      label="Công thức"
                      sx={{
                        borderRadius: 1,
                        width: 'fit-content',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        typography: 'body2',
                        fontWeight: 'bold',
                      }}
                    />
                    {loading ? (
                      <>
                        <Skeleton variant="rounded" animation="wave" />
                        <Skeleton
                          variant="rounded"
                          animation="wave"
                          height={80}
                        />
                        <Skeleton
                          variant="rounded"
                          animation="wave"
                          height={40}
                        />
                      </>
                    ) : (
                      <>
                        <Typography
                          fontStyle={'italic'}
                          color={'primary.main'}
                          sx={{
                            bgColor: 'secondary.main',
                            borderRadius: 4,
                            mt: 1,
                          }}
                        >
                          {recipeBrief}
                        </Typography>
                        <Typography
                          typography={'h3'}
                          color={'primary.main'}
                          fontWeight={'bold'}
                        >
                          {recipe?.name ??
                            RecipeDetailStringConstants.DEFAULT_NAME}
                        </Typography>
                        <Button
                          startIcon={<Edit />}
                          variant="contained"
                          onClick={() => handleOpenEditEditor()}
                          sx={{
                            display: canEditRecipe ? 'flex' : 'none',
                          }}
                        >
                          Chỉnh sửa
                        </Button>
                      </>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Stack gap={8}>
                {loading ? (
                  <>
                    <Stack>
                      <SectionHeading>Mô tả</SectionHeading>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={160}
                      />
                    </Stack>

                    <SimpleContainer>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={120}
                      />
                    </SimpleContainer>
                    <Stack>
                      <SectionHeading>Nguyên liệu</SectionHeading>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={400}
                      />
                    </Stack>
                    <Stack>
                      <SectionHeading>Ghi chú của tác giả</SectionHeading>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={120}
                      />
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack>
                      <SectionHeading>Mô tả</SectionHeading>
                      <Typography color="primary.main" typography={'body1'}>
                        {recipe?.introduction ??
                          RecipeDetailStringConstants.DEFAULT_INSTRUCTION}
                      </Typography>
                    </Stack>

                    <RecipeTimeInfo totalTime={recipe?.totalTime} />

                    <IngredientDisplayer
                      ingredients={recipe?.ingredients ?? []}
                    />
                    <Stack>
                      <SectionHeading>Ghi chú của tác giả</SectionHeading>
                      <Typography color="primary.main" typography={'body1'}>
                        {recipe?.author_note ?? 'Không'}
                      </Typography>
                    </Stack>
                  </>
                )}
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <SimpleContainer>
                {loading ? (
                  <Skeleton variant="rounded" animation="wave" height={60} />
                ) : (
                  <Box display="flex" flexDirection={'column'} gap={1}>
                    <Box display="flex" gap={1}>
                      <TastealIconButton>
                        <PrintOutlined color="primary" />
                      </TastealIconButton>
                      <TastealIconButton>
                        <Pinterest color="primary" />
                      </TastealIconButton>
                      <TastealIconButton>
                        <Facebook color="primary" />
                      </TastealIconButton>
                      <TastealIconButton>
                        <Twitter color="primary" />
                      </TastealIconButton>
                      <TastealIconButton>
                        <Mail color="primary" />
                      </TastealIconButton>
                    </Box>
                    <Button variant="contained" startIcon={<Bookmark />}>
                      LƯU CÔNG THỨC
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      sx={{
                        color: 'primary.main',
                        backgroundColor: 'background.default',
                        '&:hover': {
                          backgroundColor: 'background.default',
                        },
                      }}
                    >
                      Thêm vào lịch ăn
                    </Button>
                  </Box>
                )}
              </SimpleContainer>

              <SimpleContainer sx={{ mt: 2 }}>
                {loading ? (
                  <Skeleton variant="rounded" animation="wave" height={60} />
                ) : (
                  <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Stack direction="row" alignItems={'center'} gap={2}>
                      <Avatar src={recipe?.author.avatar} />
                      <Link>
                        <Typography fontWeight={'bold'}>
                          {recipe?.author.name}
                        </Typography>
                      </Link>
                    </Stack>
                    <Typography color="gray">
                      {recipe?.author.introduction}
                    </Typography>
                    {/* TODO: Implementation this */}
                    <Link color="primary.main" fontWeight={'bold'}>
                      https://www.sidechef.com/(not implemented)
                    </Link>
                  </Box>
                )}
              </SimpleContainer>
            </Grid>
          </Grid>
        </Container>

        <Box
          sx={{
            backgroundColor: 'secondary.main',
          }}
        >
          <Container sx={{ py: 8, width: '100%' }}>
            <Stack width={'60%'} gap={1}>
              <Stack
                direction="row"
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <SectionHeading>Hướng dẫn nấu</SectionHeading>
                {loading ? (
                  <Skeleton variant="rounded" animation="wave" height={20} />
                ) : (
                  <Link href="#">Ẩn hình ảnh</Link>
                )}
              </Stack>

              <Stack gap={2}>
                {loading ? (
                  <Skeleton variant="rounded" animation="wave" height={160} />
                ) : (
                  <>
                    {recipe?.directions.map((direction, index) => (
                      <DirectionItem
                        key={index}
                        value={direction}
                        last={index === recipe.directions.length - 1}
                        onImageClick={() =>
                          handleOpenViewDirectionImage(direction.image)
                        }
                      />
                    ))}
                  </>
                )}
              </Stack>
            </Stack>
          </Container>
        </Box>

        <Box>
          <Container
            sx={{
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Stack width="60%" gap={1}>
              <Stack
                direction="row"
                alignItems={'end'}
                justifyContent={'space-between'}
              >
                <BigSectionHeading>Đánh giá & Review</BigSectionHeading>
                {loading ? (
                  <Skeleton variant="rounded" animation="wave" />
                ) : (
                  <Stack direction="row" alignItems={'center'}>
                    <Typography
                      color="primary"
                      fontSize={20}
                      fontWeight={'bold'}
                    >
                      Chạm để đánh giá:
                    </Typography>
                    <Rating
                      size="large"
                      icon={<StarRateRounded />}
                      emptyIcon={<StarRateRounded />}
                    ></Rating>
                  </Stack>
                )}
              </Stack>

              {loading ? (
                <Skeleton variant="rounded" animation="wave" height={160} />
              ) : (
                <>
                  <Box position="relative">
                    <TastealTextField
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      multiline
                      rows={4}
                      placeholder="Để lại bình luận"
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleComment}
                      sx={{
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                        opacity: comment ? 1 : 0,
                        transition: 'all 0.3s',
                      }}
                    >
                      Bình luận
                    </Button>
                  </Box>
                  <List>
                    {/* {recipe?.comments?.length > 0 &&
                        recipe?.comments.map((comment) => (
                          <CommentItem comment={comment} />
                        ))} */}
                    {comments.length > 0 &&
                      comments.map((comment, index) => (
                        <>
                          <CommentItem comment={comment} />
                          {index < comments.length - 1 && (
                            <Divider sx={{ my: 2, opacity: 0.4 }} />
                          )}
                        </>
                      ))}
                  </List>

                  <Button
                    variant="contained"
                    size="large"
                    sx={{ alignSelf: 'center' }}
                    onClick={() => alert('Load more comments')}
                  >
                    Hiện thêm
                  </Button>
                </>
              )}
            </Stack>

            {/* <Box width="60%">
            <BigSectionHeading>Tags</BigSectionHeading>
            <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => (
                <TagChip key={index} label={`Tag ${num}`} />
              ))}
            </Box>
          </Box> */}

            <Divider sx={{ width: '60%' }} />

            <Box display={'flex'} justifyContent={'space-between'} width="60%">
              <Box display="flex" alignItems={'center'} gap={1}>
                <TastealIconButton>
                  <BookmarkOutlined color="primary" />
                </TastealIconButton>
                <Typography color="primary.main" fontSize={16}>
                  Đã lưu {122} (not implemented yet)
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <TastealIconButton>
                  <PrintOutlined color="primary" />
                </TastealIconButton>
                <TastealIconButton>
                  <Pinterest color="primary" />
                </TastealIconButton>
                <TastealIconButton>
                  <Facebook color="primary" />
                </TastealIconButton>
                <TastealIconButton>
                  <Twitter color="primary" />
                </TastealIconButton>
                <TastealIconButton>
                  <Mail color="primary" />
                </TastealIconButton>
              </Box>
            </Box>

            <Box
              component="img"
              src="https://www.sidechef.com/profile/0d2c1ebb-7521-4107-9b04-0c85d6a5b4f1.png"
              borderRadius={6}
            ></Box>

            <Box>
              <Box
                display="flex"
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <BigSectionHeading>
                  Xem thêm của {recipe?.author.name || '{AuthorName}'} tại
                  SideChef
                </BigSectionHeading>
                <Button
                  sx={{
                    color: 'primary.main',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Xem tất cả
                </Button>
              </Box>
              <Box>
                {loading ? (
                  <Skeleton variant="rounded" animation="wave" height={320} />
                ) : (
                  <SameAuthorRecipesCarousel recipes={recipe?.relatedRecipes} />
                )}
              </Box>
            </Box>

            <Box>
              <Box
                display="flex"
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <BigSectionHeading>Công thức gợi ý</BigSectionHeading>
              </Box>
              <Box>{'Not yet implemented'}</Box>
            </Box>
          </Container>
        </Box>

        <NutrionPerServingModal
          open={nutritionPerServingModalOpen}
          onClose={handleNutrionPerServingModalClose}
          nutritionInfo={recipe?.nutrition_info}
        />

        <Modal
          open={viewDirectionImageOpen}
          onClose={handleCloseViewDirectionImage}
          aria-labelledby="modal-view-direction-image"
          aria-describedby="modal-view-direction-image"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 520,
              boxShadow: 24,
              borderRadius: '24px',
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: 'primary.contrastText',
              maxHeight: '90%',
              overflowY: 'auto',
              '::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <BoxImage quality={100} src={viewDirectionImageUrl} />
            <IconButton
              sx={{
                color: 'primary.contrastText',
                position: 'absolute',
                top: 8,
                right: 8,
                transition: 'all 0.2s ease-in-out',
                ':hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Close onClick={handleCloseViewDirectionImage} />
            </IconButton>
          </Box>
        </Modal>
      </WithFallback>
    </Layout>
  );
};

function RecipeNotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography typography="h4" align="center">
        Xin lỗi, công thức không tồn tại!
      </Typography>
    </Box>
  );
}

function CommentItem({ comment }: { comment: CommentEntity }) {
  const [account, setAccount] = useState<AccountEntity | null>(null);
  useEffect(() => {
    AccountService.GetByUid(comment.account_id)
      .then((account) => setAccount(account))
      .catch(() => setAccount(null));
  }, [comment.account_id]);

  return (
    <ListItem
      disablePadding
      sx={{
        pb: 2,
      }}
    >
      <Stack direction="row" width="100%">
        <Box pr={3}>
          <BoxImage
            src={account?.avatar ?? ''}
            alt={
              account
                ? 'Comment avatar of ' + account.name
                : 'null comment avatar'
            }
            quality={10}
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
            }}
          />
        </Box>
        <Stack
          gap={2}
          sx={{
            flexGrow: 1,
          }}
        >
          <Stack gap={1}>
            <Typography typography="h6">
              {account?.name ?? 'Không tìm thấy'}
            </Typography>
            <Typography typography="body1">5 tháng, 4 tuần trước</Typography>
          </Stack>
          <Rating readOnly />
          <Typography fontSize={20}>{comment.comment}</Typography>
        </Stack>
      </Stack>
    </ListItem>
  );
}

export default RecipeDetail;
