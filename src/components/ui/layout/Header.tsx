import { PageRoute } from '@/lib/constants/common';
import AppContext from '@/lib/contexts/AppContext';
// import ColorModeContext from '@/lib/contexts/ColorModeContext';
import { signOutUser } from '@/lib/firebase/auth';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import {
  AppBar,
  AppBarProps,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  // useTheme,
} from '@mui/material';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomCountDown } from './CustomCountDown';
import { TastealAppBar } from './TastealAppBar';

interface Props {
  window_?: () => Window;
  isDynamicHeader?: boolean;
  headerPosition?: 'fixed' | 'static';
}

const drawerWidth = 240;
export const headerHeight = 64 + 50;

/**
 * Define local message constants
 */
const MESSAGE_CONSTANTS = {
  LOGOUT_FAIL: 'Đăng xuất thất bại!',
  LOGOUT_SUCESS: 'Đăng xuất thành công.',
} as const;

const TastealAppBarProps: AppBarProps['sx'] = {
  backgroundColor: 'white',
  boxShadow: 'none',
  borderBottom: 1.2,
  borderColor: 'secondary.main',
};

export function Header(props: Props) {
  const { window_, isDynamicHeader, headerPosition } = props;

  // Dùng cho đổi theme
  // const colorMode = useContext(ColorModeContext);
  // const theme = useTheme();
  const navigate = useNavigate();
  const [snackbarAlert] = useSnackbarService();

  const { login } = useContext(AppContext);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);

  const handleSignOut = useCallback(() => {
    signOutUser()
      .then(() => {
        snackbarAlert(MESSAGE_CONSTANTS.LOGOUT_SUCESS, 'success');
        if (login.handleLogin) {
          login.handleLogin(false);
        }
        navigate(PageRoute.Home);
      })
      .catch(() => {
        snackbarAlert(MESSAGE_CONSTANTS.LOGOUT_FAIL, 'warning');
        if (login.handleLogin) {
          login.handleLogin(false);
        }
      });
  }, []);

  const drawerItems: {
    label: string;
    href?: string;
    onClick?: () => void;
    isHiden?: boolean;
  }[] = useMemo(
    () => [
      { label: 'Trang chủ', href: PageRoute.Home },
      { label: 'Về Tasteal', href: '/' },
      { label: 'Tìm kiếm', href: PageRoute.Search },
      { label: 'Giỏ đi chợ', href: PageRoute.Grocery },
      { label: 'Lịch ăn', href: PageRoute.MealPlanner },
      { label: 'Tủ lạnh', href: 'PageRoute.MyPantry' },
      {
        label: 'Bộ sưu tập',
        href: PageRoute.MySavedRecipes,
      },
      //
      { label: 'Đăng ký', href: PageRoute.SignUp, isHiden: true },
      { label: 'Đăng nhập', href: PageRoute.SignIn, isHiden: true },
      //
      {
        label: 'Đăng xuất',
        onClick: () => {
          handleSignOut();
        },
        isHiden: false,
      },
    ],
    [handleSignOut]
  );

  const drawer = useMemo(
    () => (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          MUI
        </Typography>
        <Divider />
        <List>
          {drawerItems
            .filter((item) => {
              if (item.isHiden === undefined) {
                return true;
              } else if (login.isUserSignedIn) {
                return !item.isHiden;
              } else {
                return item.isHiden;
              }
            })
            .map((item, i) => (
              <ListItem key={i} disablePadding>
                {!item.onClick && (
                  <ListItemButton
                    sx={{ textAlign: 'center' }}
                    href={item.href ?? '#'}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          fontSize: 'caption.fontSize',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                        },
                      }}
                      primary={item.label}
                    />
                  </ListItemButton>
                )}

                {item.onClick && (
                  <ListItemButton onClick={item.onClick}>
                    <ListItemText
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      primaryTypographyProps={{
                        sx: {
                          color: 'white',
                          backgroundColor: 'primary.main',
                          borderRadius: '40px',
                          py: 0.5,
                          px: 2,
                          width: 'fit-content',
                          fontSize: 'caption.fontSize',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                        },
                      }}
                      primary={item.label}
                    />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
        </List>
      </Box>
    ),
    [drawerItems, login.isUserSignedIn, handleSignOut]
  );

  const container =
    window_ !== undefined ? () => window_().document.body : undefined;

  const boxRef = useRef<HTMLDivElement>(null);
  const trigger = useScrollTrigger({
    target: window_ ? window_() : undefined,
  });

  return (
    <Box component={'div'} id="headerApp">
      <Slide
        appear={false}
        direction="down"
        in={
          headerPosition == 'static'
            ? true
            : isDynamicHeader == undefined
            ? !trigger
            : isDynamicHeader == true
            ? !trigger
            : true
        }
      >
        <AppBar
          position={headerPosition == undefined ? 'fixed' : headerPosition}
          ref={boxRef}
          sx={TastealAppBarProps}
        >
          <CustomCountDown />
          <TastealAppBar
            handleDrawerToggle={handleDrawerToggle}
            handleSignOut={handleSignOut}
          />
        </AppBar>
      </Slide>

      <Toolbar
        sx={{
          height: boxRef.current?.offsetHeight,
          display: headerPosition == 'static' ? 'none' : 'block',
        }}
      />
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

{
  // Color mode
  /* <Button color="inherit" onClick={colorMode.toggleColorMode}>
  Login
</Button>; */
}
