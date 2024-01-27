import { PageRoute } from '@/lib/constants/common';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import {
  BookmarkBorderRounded,
  BookmarkRounded,
  PlayArrowRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  CardProps,
  Checkbox,
  CheckboxProps,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCard from './CustomCard';
import TotalTimeRecipe from './TotalTimeRecipe';
import AvatarRecipe from './AvatarRecipe';
import RatingRecipe from './RatingRecipe';
import NameRecipe from './NameRecipe';
import ImageRecipe from './ImageRecipe';
import AppContext from '@/lib/contexts/AppContext';
import { RecipeToCookBookReq } from '@/lib/models/dtos/Request/RecipeToCookBook/RecipeToCookBook';
import RecipeService from '@/lib/services/recipeService';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { RecipeToCartReq } from '@/lib/models/dtos/Request/RecipeToCartReq/RecipeToCartReq';
import CartItemService from '@/lib/services/CartItemService';
import SlideInDialog from '../dialog/SlideInDialog';

export const imgHeight = '224px';
export const padding = 2;

export function PrimaryCard({
  recipe,
  saveCheckBoxProps,
  ...props
}: {
  props?: CardProps;
  saveCheckBoxProps?: CheckboxProps;
  recipe: RecipeEntity;
}) {
  const navigate = useNavigate();
  const { login, cookbooks, handleSpinner } = useContext(AppContext);
  const [snackbarAlert] = useSnackbarService();

  // Popover Cookbook
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Recipe Details
  const handleCardClick = useCallback(() => {
    navigate(PageRoute.Recipe.Detail(recipe.id));
  }, [navigate, recipe.id]);

  // Dialog Cần
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <CustomCard {...props}>
        <CardActionArea onClick={handleCardClick}>
          <ImageRecipe
            imgHeight={imgHeight}
            src={recipe.image}
            alt={recipe.name}
            quality={10}
          />
          <TotalTimeRecipe
            imgHeight={imgHeight}
            padding={padding}
            totalTime={recipe.totalTime}
          />

          <AvatarRecipe
            imgHeight={imgHeight}
            padding={padding}
            quality={1}
            account={recipe.account}
          />
        </CardActionArea>

        <Checkbox
          size="small"
          sx={{
            position: 'absolute',
            top: padding * 8,
            right: padding * 8,
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: 'white',
            transition: 'all 0.1s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              transform: 'scale(1.15)',
            },
          }}
          icon={<BookmarkBorderRounded sx={{ color: 'white' }} />}
          checkedIcon={<BookmarkRounded sx={{ color: 'white' }} />}
          onClick={(e: any) => {
            e.preventDefault();
            handleClick(e);
          }}
          {...saveCheckBoxProps}
        />

        <CardContent
          sx={{
            p: padding,
          }}
        >
          <RatingRecipe rating={recipe.rating} />

          <NameRecipe name={recipe.name} />

          {recipe.ingredients_miss && recipe.ingredients_miss.length > 0 && (
            <>
              <Tooltip
                slotProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'grey.700',
                      p: 2,
                      borderRadius: '12px',
                    },
                  },
                }}
                onClick={() => setOpenDialog(true)}
                title={
                  <Stack gap={1} sx={{ width: '100%' }}>
                    <Typography sx={{ color: 'white' }} variant="body2">
                      {recipe.ingredients_miss.length} nguyên liệu cần:
                    </Typography>
                    {recipe.ingredients_miss.map((ingredient) => (
                      <Typography
                        sx={{ color: 'white', width: '100%' }}
                        variant="body2"
                      >
                        - {ingredient.name}
                      </Typography>
                    ))}
                  </Stack>
                }
              >
                <Stack
                  sx={{
                    width: '100%',
                    mt: 1,
                    bgcolor: 'grey.200',
                    borderRadius: '100px',
                  }}
                  direction={'row'}
                  gap={1}
                  alignItems={'center'}
                >
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      borderRadius: '100px 0 0 100px',
                      overflow: 'hidden',
                      height: '100%',
                      pl: 1.2,
                      pr: 1,
                      py: 0.4,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: 3,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: '500', color: 'white' }}
                    >
                      Cần {recipe.ingredients_miss.length}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      overflow: 'hidden',
                      flex: 1,
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      pr: 1.2,
                    }}
                  >
                    {recipe.ingredients_miss.map((ingredient, index) => (
                      <span key={index}>
                        {ingredient.name}
                        {index < recipe.ingredients_miss.length - 1
                          ? ', '
                          : ''}{' '}
                      </span>
                    ))}
                  </Typography>
                </Stack>
              </Tooltip>

              <SlideInDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                title={recipe.ingredients_miss.length + ' nguyên liệu cần:'}
                content={
                  <Stack gap={1} sx={{ width: '100%' }}>
                    {recipe.ingredients_miss.map((ingredient) => (
                      <Typography
                        sx={{ color: 'primary.main', width: '100%' }}
                        variant="body1"
                      >
                        - {ingredient.name}
                      </Typography>
                    ))}
                  </Stack>
                }
              />
            </>
          )}

          <Button
            variant="outlined"
            sx={{
              borderRadius: '40px',
              mt: 2,
              width: '100%',
            }}
            onClick={async () => {
              if (!login.user || !login.user?.uid) {
                snackbarAlert('Vui lòng đăng nhập lại!', 'error');
                return;
              }

              handleSpinner(true);
              const uid = login.user.uid;

              const addData: RecipeToCartReq = {
                account_id: uid,
                recipe_ids: [recipe.id],
              };

              const result = await CartItemService.AddRecipeToCart(addData);

              handleSpinner(false);
              if (result) {
                snackbarAlert('Thêm vào giỏ đi chợ thành công', 'success');
              } else {
                snackbarAlert('Thêm thất bại', 'error');
              }
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Thêm vào giỏ đi chợ
            </Typography>
          </Button>
        </CardContent>
      </CustomCard>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              background: 'white',
              borderRadius: 4,
              width: '200px',
            },
          },
        }}
      >
        {cookbooks &&
          cookbooks.map((cookbook) => {
            return (
              <MenuItem
                key={cookbook.id}
                onClick={async () => {
                  const data: RecipeToCookBookReq = {
                    cook_book_id: cookbook.id,
                    recipe_id: recipe.id,
                  };
                  const result = await RecipeService.AddRecipeToCookBook(data);
                  if (result) {
                    snackbarAlert('Thêm vào bộ sưu tập thành công', 'success');
                  } else {
                    snackbarAlert('Đã có lỗi xảy ra', 'error');
                  }
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <PlayArrowRounded color="primary" fontSize="small" />
                </ListItemIcon>
                <Typography
                  variant="body2"
                  color="primary"
                  fontWeight={'bold'}
                  whiteSpace={'nowrap'}
                  textOverflow={'ellipsis'}
                  overflow={'hidden'}
                >
                  {cookbook.name}
                </Typography>
              </MenuItem>
            );
          })}

        {!login.isUserSignedIn && (
          <MenuItem
            onClick={() => {
              navigate(PageRoute.SignIn);
            }}
          >
            <Typography
              variant="body2"
              color="primary"
              fontWeight={'bold'}
              whiteSpace={'nowrap'}
              textOverflow={'ellipsis'}
              overflow={'hidden'}
              textAlign={'center'}
              width={'100%'}
            >
              Đăng nhập
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
