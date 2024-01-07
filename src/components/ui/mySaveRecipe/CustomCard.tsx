import {
  CheckboxProps,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { CookBook_RecipeEntity } from '@/lib/models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity';
import { PrimaryCard } from '@/components/common/card/PrimaryCard';
import { DeleteRounded, PlayArrowRounded } from '@mui/icons-material';
import SlideInDialog from '@/components/common/dialog/SlideInDialog';
import CookbookRecipeService from '@/lib/services/cookbookRecipeService';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import RecipeService from '@/lib/services/recipeService';
import { NewRecipeCookBookReq } from '@/lib/models/dtos/Request/NewRecipeCookBookReq/NewRecipeCookBookReq';
import { CookbookChoosingType } from '@/pages/MySavedRecipes';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';

export function CustomCard({
  cookbookRecipe,
  cookbookData,
  handleChangeRecipeInCookbook,
}: {
  cookbookRecipe: CookBook_RecipeEntity;
  cookbookData: CookbookChoosingType[];
  handleChangeRecipeInCookbook: (
    type: 'move' | 'remove',
    cookbook_recipe: CookBook_RecipeEntity,
    newIdCookBook?: CookBookEntity['id']
  ) => void;
}) {
  //#region Dialog Xóa recipe khỏi cookbook
  const [openDelete, setOpenDelete] = React.useState(false);
  //#endregion
  //#region Di chuyển recipe tới cookbook khác
  const [openMove, setOpenMove] = React.useState(false);
  const [moveToNewCookbook_Id, setMoveToNewCookbook_Id] = React.useState(-1);
  //#endregion
  //#region Menu context
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //#endregion
  const checkboxProps: CheckboxProps = useMemo(() => {
    return {
      checked: true,
      onClick: (e: any) => {
        handleClick(e);
      },
    };
  }, []);

  const [snackbarAlert] = useSnackbarService();

  return (
    <>
      <PrimaryCard
        recipe={cookbookRecipe.recipe}
        saveCheckBoxProps={checkboxProps}
      />

      {/* Menu context */}
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
        {cookbookData &&
          cookbookData.map((cookbook) => {
            if (cookbook.Cookbook.id == cookbookRecipe.cook_book_id) {
              return null;
            }
            return (
              <MenuItem
                key={cookbook.Cookbook.id}
                onClick={() => {
                  setOpenMove(true);
                  setMoveToNewCookbook_Id(cookbook.Cookbook.id);
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
                  {cookbook.Cookbook.name}
                </Typography>
              </MenuItem>
            );
          })}

        <MenuItem
          onClick={async () => {
            setOpenDelete(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteRounded color="error" fontSize="small" />
          </ListItemIcon>
          <Typography
            variant="body2"
            color="error"
            fontWeight={'bold'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
          >
            Xóa
          </Typography>
        </MenuItem>
      </Menu>

      {/* Dialog di chuyển */}
      <SlideInDialog
        open={openMove}
        handleClose={() => setOpenMove(false)}
        title="Bạn muốn di chuyển công thức?"
        content={`
                Công thức sẽ di chuyển đến ${
                  cookbookData.find(
                    (cookbook) => cookbook.Cookbook.id == moveToNewCookbook_Id
                  )?.Cookbook.name
                }`}
        cancelText="Hủy"
        confirmText="Xác nhận"
        onClickConfirm={async () => {
          handleChangeRecipeInCookbook(
            'move',
            cookbookRecipe,
            moveToNewCookbook_Id
          );
          const data: NewRecipeCookBookReq = {
            cookbook_recipe_id: cookbookRecipe.id,
            cookbook_id: moveToNewCookbook_Id,
          };
          const result = await RecipeService.MoveRecipeToNewCookbook(data);
          if (result) {
            snackbarAlert('Di chuyển thành công', 'success');
          } else {
            snackbarAlert('Di chuyển thất bại', 'error');
          }
        }}
      />

      {/* Dialog xóa */}
      <SlideInDialog
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        title="Bạn muốn xóa công thức?"
        content={`Công thức sẽ bị xóa khỏi bộ sưu tập ${cookbookRecipe?.cook_book?.name}!`}
        confirmButtonProps={{
          color: 'error',
        }}
        cancelText="Hủy"
        confirmText="Xóa"
        onClickConfirm={async () => {
          handleChangeRecipeInCookbook('remove', cookbookRecipe);
          const result = await CookbookRecipeService.DeleteCookBookRecipe(
            cookbookRecipe.id
          );
          if (result) {
            snackbarAlert('Xóa thành công', 'success');
          } else {
            snackbarAlert('Xóa thất bại', 'error');
          }
        }}
      />
    </>
  );
}
