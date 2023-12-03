import ColorModeContext from '@/lib/contexts/ColorModeContext';
import { signOutUser } from '@/lib/firebase/auth';
import { auth } from '@/lib/firebase/config';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { Logout, SearchRounded, ShoppingBagRounded } from '@mui/icons-material';
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
import { onAuthStateChanged } from 'firebase/auth';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonHoverPopover } from '../header/ButtonHoverPopover';
import { CustomHeaderLink } from '../header/CustomLink';
import { PopoverContent } from '../header/PopoverContent';
import AvatarMenuItem from './AvatarMenuItem';

interface Props {
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
    'Trang chủ',
    'Về Tasteal',
    'Lịch ăn',
    'Tủ lạnh',
    'Tìm kiếm',
    'Giỏ đi chợ',
    'Đăng ký',
    'Đăng nhập',
];

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

    const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);
    const [userAvatar, setUserAvatar] = useState<string>('');
    const avatarButtonRef = useRef<HTMLButtonElement>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState<boolean>(false);

    //#endregion

    //#region Authentication UseEffect

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserAvatar(user.photoURL);
                setIsUserSignedIn(true);
            } else {
                setUserAvatar('');
                setIsUserSignedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

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
            })
            .catch(() => {
                snackbarAlert(MESSAGE_CONSTANTS.LOGOUT_FAIL, 'warning');
            });
    }, []);

    //#endregion

    const drawer = (
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
                {navItems.map((item) => (
                    <ListItem
                        key={item}
                        disablePadding
                    >
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

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
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    navigate('/');
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
                                href="/mealplanner"
                                label="Lịch ăn"
                            />

                            <CustomHeaderLink
                                href="#"
                                label="Tủ lạnh"
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
                            <IconButton
                                color="primary"
                                size="small"
                                sx={{
                                    border: 1,
                                    mr: 2,
                                }}
                                onClick={() => {
                                    navigate('/search');
                                }}
                            >
                                <SearchRounded fontSize="inherit" />
                            </IconButton>

                            <IconButton
                                color="primary"
                                size="small"
                                sx={{
                                    border: 1,
                                    mr: 2,
                                }}
                                onClick={() => {
                                    navigate('/grocery');
                                }}
                            >
                                <ShoppingBagRounded fontSize="inherit" />
                            </IconButton>

                            <Box>
                                {isUserSignedIn ? (
                                    <>
                                        <ButtonBase
                                            ref={avatarButtonRef}
                                            sx={{
                                                transition: 'transform .3s',
                                                ':hover': {
                                                    transform:
                                                        'scale(1.1) rotate(10deg)',
                                                },
                                            }}
                                            onClick={handleAvatarClick}
                                        >
                                            <Avatar
                                                alt="user avatar"
                                                src={userAvatar}
                                                sx={{
                                                    outlineWidth: 1,
                                                    outlineColor: 'black',
                                                    outlineStyle: 'solid',
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
                                ) : (
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
                                                navigate('/signup');
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
                                                navigate('/signin');
                                            }}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </>
                                )}
                            </Box>
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
    /* <Button color="inherit" onClick={colorMode.toggleColorMode}>
  Login
</Button>; */
}
