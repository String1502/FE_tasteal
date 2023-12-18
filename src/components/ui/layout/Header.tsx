import { PageRoute } from '@/lib/constants/common';
import AppContext from '@/lib/contexts/AppContext';
import ColorModeContext from '@/lib/contexts/ColorModeContext';
import { signOutUser } from '@/lib/firebase/auth';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import {
    AppBar,
    AppBarProps,
    Box,
    Container,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Slide,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger,
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
import { TastealAppBar } from './TastealAppBar';
import { FlareRounded } from '@mui/icons-material';
import Countdown from 'react-countdown';
import moment from 'moment';
import * as momentLunar from 'moment-lunar';

interface Props {
    window_?: () => Window;
}

const drawerWidth = 240;

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
    const { window_ } = props;

    // Dùng cho đổi theme
    const colorMode = React.useContext(ColorModeContext);
    const theme = useTheme();
    const navigate = useNavigate();
    const [snackbarAlert] = useSnackbarService();

    const { login } = useContext(AppContext);

    const [mobileOpen, setMobileOpen] = React.useState(false);

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
        window_ !== undefined ? () => window_().document.body : undefined;

    const boxRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const trigger = useScrollTrigger({
        target: window_ ? window_() : undefined,
    });
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box
            component={'div'}
            id="headerApp"
        >
            <Slide
                appear={false}
                direction="down"
                in={!trigger}
            >
                <AppBar
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

export function CustomCountDown() {
    const { currentOccasion } = useContext(AppContext);
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <span>huy</span>;
        } else {
            // Render a countdown
            const array = [hours, minutes, seconds];
            return (
                <Stack
                    gap={0.4}
                    direction={'row'}
                    divider={<>:</>}
                >
                    {array.map((item, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                aspectRatio: '1/1',
                                borderRadius: 2,
                                backgroundColor: 'white',
                                width: '36px',
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="primary"
                                sx={{ fontWeight: 800 }}
                            >
                                {item}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            );
        }
    };

    const [dateCountDown, setDateCountDown] = useState<Date | undefined>(
        undefined
    );

    useEffect(() => {
        if (currentOccasion) {
            // let date = moment()
            //     .year(currentOccasion.start_at.getFullYear())
            //     .month(currentOccasion.start_at.getMonth())
            //     .date(currentOccasion.start_at.getDate());
            // console.log(date);
            // if (currentOccasion.is_lunar_date && date) {
            //     date = date.solar();
            // }
            // setDateCountDown(date.toDate());
        }
    }, [currentOccasion]);
    console.log(dateCountDown);

    return (
        <Box
            sx={{
                background:
                    'linear-gradient(45deg, rgba(14,92,173,1) 0%, rgba(121,241,164,1) 100%)',
                width: '100%',
            }}
        >
            <Container>
                <Grid
                    container
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                        py: 1.5,
                    }}
                    spacing={3}
                    wrap="nowrap"
                >
                    <Grid
                        item
                        xs={7}
                        sm={8}
                        md={9}
                        lg={10}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <FlareRounded
                                sx={{ color: 'white' }}
                                fontSize="small"
                            />
                            <Typography
                                variant="body1"
                                fontWeight={900}
                                sx={{
                                    color: 'white',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {currentOccasion?.name ?? 'Tasteal'}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontWeight={700}
                                sx={{
                                    color: 'white',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                }}
                            >
                                {currentOccasion?.description ??
                                    'Tìm kiếm mọi công thức nấu ăn...'}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        xs={'auto'}
                    >
                        <Box sx={{}}>
                            <Countdown
                                key={dateCountDown?.toString()}
                                date={dateCountDown}
                                renderer={renderer}
                                zeroPadTime={2}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
