import { PageRoute } from '@/lib/constants/common';
import AppContext from '@/lib/contexts/AppContext';
import ColorModeContext from '@/lib/contexts/ColorModeContext';
import { signOutUser } from '@/lib/firebase/auth';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import {
    BookmarkBorderRounded,
    Logout,
    SearchRounded,
    ShoppingBagRounded,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    ButtonBase,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material';
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonHoverPopover } from '../header/ButtonHoverPopover';
import { CustomHeaderLink } from '../header/CustomLink';
import { PopoverContent } from '../header/PopoverContent';
import AvatarMenuItem from './AvatarMenuItem';

interface Props {
    window?: () => Window;
}

const drawerWidth = 240;

/**
 * Define local message constants
 */
const MESSAGE_CONSTANTS = {
    LOGOUT_FAIL: 'Đăng xuất thất bại!',
    LOGOUT_SUCESS: 'Đăng xuất thành công.',
} as const;

export function Header(props: Props) {
    //#region Others

    const { window } = props;

    //#endregion

    //#region Hooks

    // Dùng cho đổi theme
    const colorMode = React.useContext(ColorModeContext);
    const navigate = useNavigate();
    const theme = useTheme();

    // Toast
    const [snackbarAlert] = useSnackbarService();

    //#endregion

    //#region States

    const [mobileOpen, setMobileOpen] = React.useState(false);

    //#endregion

    //#region Auth State

    const { login } = useContext(AppContext);
    const [userAvatar, setUserAvatar] = useState<string>(
        login.user?.photoURL || ''
    );
    const avatarButtonRef = useRef<HTMLButtonElement>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState<boolean>(false);

    //#endregion

    //#region Authentication UseEffect

    useEffect(() => {
        setUserAvatar(login.user?.photoURL || '');
    }, [login.user]);

    //#endregion

    //#region Handlers

    const handleDrawerToggle = useCallback(() => {
        setMobileOpen((prevState) => !prevState);
    }, []);

    const handleAvatarMenuClose = useCallback(() => {
        setIsAvatarMenuOpen(false);
        setAnchorEl(null);
    }, []);

    const handleAvatarClick = useCallback(() => {
        setIsAvatarMenuOpen(true);
        setAnchorEl(avatarButtonRef.current);
    }, [avatarButtonRef.current]);

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

    //#endregion

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
            { label: 'Tủ lạnh', href: '/' },
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
            <Box
                onClick={handleDrawerToggle}
                sx={{ textAlign: 'center' }}
            >
                <Typography
                    variant="h6"
                    sx={{ my: 2 }}
                >
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
                            <ListItem
                                key={i}
                                disablePadding
                            >
                                {!item.onClick && (
                                    <ListItemButton
                                        sx={{ textAlign: 'center' }}
                                        href={item.href ?? '#'}
                                    >
                                        <ListItemText
                                            primaryTypographyProps={{
                                                sx: {
                                                    fontSize:
                                                        'caption.fontSize',
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
                                                    backgroundColor:
                                                        'primary.main',
                                                    borderRadius: '40px',
                                                    py: 0.5,
                                                    px: 2,
                                                    width: 'fit-content',
                                                    fontSize:
                                                        'caption.fontSize',
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
        window !== undefined ? () => window().document.body : undefined;

    console.log(login);

    return (
        <Box
            component={'div'}
            id="headerApp"
            sx={{ display: 'flex', height: 'fit-content' }}
        >
            <AppBar
                component="nav"
                sx={{
                    backgroundColor: theme.palette.common.white,
                    boxShadow: 'none',
                    borderBottom: 1.2,
                    borderColor: 'secondary.main',
                }}
            >
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
                                    sx={{
                                        aspectRatio: '1/1',
                                        height: '32px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        backgroundColor: 'red',
                                        mr: 1,
                                        pointerEvents: 'none',
                                    }}
                                ></Box>
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
                                customLink={
                                    <CustomHeaderLink
                                        href="#"
                                        label="Công thức"
                                    />
                                }
                            >
                                <PopoverContent />
                            </ButtonHoverPopover>

                            <CustomHeaderLink
                                href={PageRoute.MealPlanner}
                                label="Lịch ăn"
                            />

                            <CustomHeaderLink
                                href="#"
                                label="Tủ lạnh"
                            />

                            <CustomHeaderLink
                                href="#"
                                label="Về Tasteal"
                            />
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
                                    <ButtonBase
                                        ref={avatarButtonRef}
                                        onClick={handleAvatarClick}
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
                                                    minWidth: '180px',
                                                },
                                            },
                                        }}
                                    >
                                        <AvatarMenuItem
                                            icon={
                                                <Logout
                                                    color="warning"
                                                    fontSize="small"
                                                />
                                            }
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
            </AppBar>
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
            <Toolbar />
        </Box>
    );
}

{
    // Color mode
    /* <Button color="inherit" onClick={colorMode.toggleColorMode}>
  Login
</Button>; */
}
