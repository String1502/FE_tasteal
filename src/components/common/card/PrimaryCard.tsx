import { PageRoute } from '@/lib/constants/common';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import {
  BookmarkBorderRounded,
  BookmarkRounded,
  PlayArrowRounded,
} from '@mui/icons-material';
import {
  Button,
  CardActionArea,
  CardContent,
  CardProps,
  Checkbox,
  CheckboxProps,
  ListItemIcon,
  Menu,
  MenuItem,
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
import { RecipeToCookBookReq } from '@/lib/models/dtos/Request/RecipeToCookBookReq/RecipeToCookBook';
import RecipeService from '@/lib/services/recipeService';
import useSnackbarService from '@/lib/hooks/useSnackbar';

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { login, cookbooks } = useContext(AppContext);

  const handleCardClick = useCallback(() => {
    navigate(PageRoute.Recipe.Detail(recipe.id));
  }, [navigate, recipe.id]);
  const [snackbarAlert] = useSnackbarService();

  return (
    <>
      <CustomCard {...props}>
        <CardActionArea onClick={handleCardClick}>
          <ImageRecipe
            imgHeight={imgHeight}
            src={recipe.image}
            alt={recipe.name}
            quality={80}
          />
          <TotalTimeRecipe
            imgHeight={imgHeight}
            padding={padding}
            totalTime={recipe.totalTime}
          />

          <AvatarRecipe
            imgHeight={imgHeight}
            padding={padding}
            quality={10}
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

          <Button
            variant="outlined"
            sx={{
              borderRadius: '40px',
              mt: 2,
              width: '100%',
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
