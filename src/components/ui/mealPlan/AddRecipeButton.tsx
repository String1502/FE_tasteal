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

export const AddRecipeButton = () => {
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
                                <Typography
                                    fontWeight={'bold'}
                                    variant="body2"
                                >
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
                                <Typography
                                    fontWeight={'bold'}
                                    variant="body2"
                                >
                                    Tìm công thức
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate(PageRoute.Recipe.Create);
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <BorderColorRounded
                                    sx={{
                                        color: 'primary.main',
                                        fontSize: 'large',
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography
                                    fontWeight={'bold'}
                                    variant="body2"
                                >
                                    Tạo công thức mới
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>

            {/* Bộ sưu tập */}
            <ModalThemTuBoSuuTap
                open={openMySaved}
                handleClose={handleCloseMySaved}
                title="Thêm công thức từ bộ sưu tập"
            />

            {/* Tìm kiếm */}
            <ModalTimKiem
                open={openSearch}
                handleClose={handleCloseSearch}
                title="Thêm công thức từ tìm kiếm"
            />
        </>
    );
};
