import { PageRoute } from '@/lib/constants/common';
import AppContext from '@/lib/contexts/AppContext';
import {
  AccountBoxRounded,
  BookmarkBorderRounded,
  Logout,
  NotificationsActiveRounded,
  SearchRounded,
  ShoppingBagRounded,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonHoverPopover } from '../header/ButtonHoverPopover';
import { CustomHeaderLink } from '../header/CustomLink';
import { PopoverContent } from '../header/PopoverContent';
import AvatarMenuItem from './AvatarMenuItem';
import AccountService from '@/lib/services/accountService';
import {
  AccountEntity,
  isAccountEntityFullInfor,
} from '@/lib/models/entities/AccountEntity/AccountEntity';
import useFirebaseImage from '@/lib/hooks/useFirebaseImage';
import logo1 from '@/assets/logo1.png';

export const localNeedFillInfor = 'localNeedFillInfor';

export function TastealAppBar({
  handleDrawerToggle,
  handleSignOut,
}: {
  handleDrawerToggle: () => void;
  handleSignOut: () => void;
}) {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const [accountData, setAccountData] = useState<AccountEntity | undefined>(
    undefined
  );
  const userAvatar = useFirebaseImage(accountData?.avatar);

  const [needFillInfor, setNeedFillInfor] = useState<boolean>(false);

  console.log(login.user);

  //#region Avatar Menu
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState<boolean>(false);

  const handleAvatarMenuClose = useCallback(() => {
    setIsAvatarMenuOpen(false);
    setAnchorEl(null);
  }, []);

  const handleAvatarClick = useCallback(() => {
    setIsAvatarMenuOpen(true);
    setAnchorEl(avatarButtonRef.current);
  }, [avatarButtonRef.current]);

  //#endregion

  useEffect(() => {
    async function getAccount(uid: string) {
      try {
        const data = await AccountService.GetByUid(uid);
        if (!data) return;
        setAccountData(data);
        if (!isAccountEntityFullInfor(data)) {
          setNeedFillInfor(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (login.isUserSignedIn && login.user) {
      getAccount(login.user.uid);
    }
  }, [login.user]);

  return (
    <Container>
      <Toolbar disableGutters>
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            direction: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            gap: 4,
          }}
        >
          {/* LOGO */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate(PageRoute.Home);
            }}
          >
            <Box
              component={'img'}
              src={logo1}
              sx={{
                aspectRatio: '1/1',
                height: '42px',
                borderRadius: '50%',
                overflow: 'visible',
                objectFit: 'contain',
                mr: 1,
                pointerEvents: 'none',
              }}
            />
            <Typography
              variant="subtitle1"
              fontWeight={'bold'}
              component="div"
              color="primary"
              sx={{
                width: 'fit-content',
                pointerEvents: 'none',
              }}
            >
              Tasteal
            </Typography>
          </Box>

          <ButtonHoverPopover
            customLink={<CustomHeaderLink href="#" label="Công thức" />}
          >
            <PopoverContent />
          </ButtonHoverPopover>

          <CustomHeaderLink href={PageRoute.MealPlanner} label="Lịch ăn" />

          <CustomHeaderLink href={PageRoute.MyPantry} label="Tủ lạnh" />

          <CustomHeaderLink href="#" label="Về Tasteal" />
        </Box>

        <Box
          sx={{
            direction: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {/* Search */}
          <IconButton
            color="primary"
            size="small"
            sx={{
              border: 1,
              mr: 2,
            }}
            onClick={() => {
              navigate(PageRoute.Search);
            }}
          >
            <SearchRounded fontSize="inherit" />
          </IconButton>

          {/* Bộ sưu tập */}
          <IconButton
            color="primary"
            size="small"
            sx={{
              border: 1,
              mr: 2,
            }}
            onClick={() => {
              navigate(PageRoute.MySavedRecipes);
            }}
          >
            <BookmarkBorderRounded fontSize="inherit" />
          </IconButton>

          {/* Giỏ đi chợ */}
          <IconButton
            color="primary"
            size="small"
            sx={{
              border: 1,
              mr: 2,
            }}
            onClick={() => {
              navigate(PageRoute.Grocery);
            }}
          >
            <ShoppingBagRounded fontSize="inherit" />
          </IconButton>

          {/* Avatar */}
          {login.isUserSignedIn == true && (
            <>
              <ButtonBase ref={avatarButtonRef} onClick={handleAvatarClick}>
                <Badge
                  color="error"
                  overlap="circular"
                  badgeContent={needFillInfor ? '?' : 0}
                  variant="dot"
                >
                  <Avatar
                    alt="user avatar"
                    src={userAvatar}
                    sx={{
                      width: '33.83px',
                      height: '33.83px',
                      border: 1,
                      borderColor: 'primary.main',
                    }}
                  />
                </Badge>
              </ButtonBase>

              <Menu
                open={isAvatarMenuOpen}
                onClose={handleAvatarMenuClose}
                anchorEl={anchorEl}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                sx={{
                  mt: 1,
                }}
                slotProps={{
                  paper: {
                    sx: {
                      minWidth: '240px',
                    },
                  },
                }}
              >
                <AvatarMenuItem
                  icon={
                    <Badge
                      overlap="circular"
                      badgeContent={
                        needFillInfor ? (
                          <Box
                            sx={{
                              backgroundColor: 'error.main',
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              p: 1.2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <NotificationsActiveRounded
                              fontSize="inherit"
                              sx={{
                                width: 'inherit',
                                height: 'inherit',
                                color: 'white',
                              }}
                            />
                          </Box>
                        ) : (
                          0
                        )
                      }
                    >
                      <AccountBoxRounded color="primary" />
                    </Badge>
                  }
                  label="Thông tin tác giả"
                  onClick={() => {
                    navigate(PageRoute.Partner(login.user.uid));
                  }}
                />
                <AvatarMenuItem
                  icon={<Logout color="warning" />}
                  label="Đăng xuất"
                  onClick={handleSignOut}
                />
              </Menu>
            </>
          )}

          {/* Nút đăng nhập/ xuất */}
          {login.isUserSignedIn == false && (
            <>
              <Button
                color="primary"
                variant="contained"
                size="small"
                sx={{
                  mr: 2,
                  width: '140px',
                }}
                onClick={() => {
                  navigate(PageRoute.SignUp);
                }}
              >
                Đăng ký
              </Button>

              <Button
                color="primary"
                variant="outlined"
                size="small"
                sx={{
                  width: '140px',
                }}
                onClick={() => {
                  navigate(PageRoute.SignIn);
                }}
              >
                Đăng nhập
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </Container>
  );
}
