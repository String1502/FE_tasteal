import {
  AddRounded,
  BookmarksRounded,
  BorderColorRounded,
  SearchRounded,
} from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material';
import React from 'react';
import { ModalThemTuBoSuuTap } from './ModalThemTuBoSuuTap';
import { ModalTimKiem } from './ModalTimKiem';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '@/lib/constants/common';
import { Plan_ItemEntity } from '@/lib/models/entities/Plan_ItemEntity/Plan_ItemEntity';
import { DateDisplay } from '@/pages/MealPlanner';

export const AddRecipeButton = ({
  showContent = false,
  AddPlanItem,
  weekDates,
}: {
  showContent?: boolean;
  AddPlanItem: (item: Plan_ItemEntity) => Promise<void>;
  weekDates: DateDisplay;
}) => {
  //#region Menu
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  //#endregion

  //#region Bộ sưu tập
  const [openMySaved, setOpenMySaved] = React.useState(false);
  const handleOpenMySaved = () => {
    setOpenMySaved(true);
    handleClose();
  };
  const handleCloseMySaved = () => setOpenMySaved(false);
  //#endregion

  //#region Tìm kiếm
  const [openSearch, setOpenSearch] = React.useState(false);
  const handleOpenSearch = () => {
    setOpenSearch(true);
    handleClose();
  };
  const handleCloseSearch = () => setOpenSearch(false);
  //#endregion

  const navigate = useNavigate();

  return (
    <>
      {showContent == false && (
        <>
          <IconButton
            color="primary"
            sx={{
              border: 1,
            }}
            onClick={handleClick}
          >
            <AddRounded fontSize="small" />
          </IconButton>

          {/* Menu */}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: 4,
                  background: 'white',
                  width: '240px',
                },
              },
            }}
          >
            <List>
              <AddRecipeWays
                handleOpenMySaved={handleOpenMySaved}
                handleOpenSearch={handleOpenSearch}
                handleCreateNewRecipe={() => {
                  navigate(PageRoute.Recipe.Create);
                }}
              />
            </List>
          </Popover>
        </>
      )}

      {showContent == true && (
        <>
          <AddRecipeWays
            handleOpenMySaved={handleOpenMySaved}
            handleOpenSearch={handleOpenSearch}
            handleCreateNewRecipe={() => {
              navigate(PageRoute.Recipe.Create);
            }}
          />
        </>
      )}

      {/* Bộ sưu tập */}
      <ModalThemTuBoSuuTap
        open={openMySaved}
        handleClose={handleCloseMySaved}
        title="Thêm công thức từ bộ sưu tập"
        AddPlanItem={AddPlanItem}
        weekDates={weekDates}
      />

      {/* Tìm kiếm */}
      <ModalTimKiem
        open={openSearch}
        handleClose={handleCloseSearch}
        title="Thêm công thức từ tìm kiếm"
        AddPlanItem={AddPlanItem}
        weekDates={weekDates}
      />
    </>
  );
};

function AddRecipeWays({
  handleOpenMySaved,
  handleOpenSearch,
  handleCreateNewRecipe,
}: {
  handleOpenMySaved: () => void;
  handleOpenSearch: () => void;
  handleCreateNewRecipe: () => void;
}) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleOpenMySaved}>
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <BookmarksRounded
              sx={{
                color: 'primary.main',
                fontSize: 'large',
              }}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography fontWeight={'bold'} variant="body2">
              Thêm từ bộ sưu tập
            </Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={handleOpenSearch}>
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <SearchRounded
              sx={{
                color: 'primary.main',
                fontSize: 'large',
              }}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography fontWeight={'bold'} variant="body2">
              Tìm công thức
            </Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={handleCreateNewRecipe}>
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <BorderColorRounded
              sx={{
                color: 'primary.main',
                fontSize: 'large',
              }}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography fontWeight={'bold'} variant="body2">
              Tạo công thức mới
            </Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </>
  );
}
