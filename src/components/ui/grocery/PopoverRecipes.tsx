import { DeleteRounded, MoreHorizRounded } from '@mui/icons-material';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { AddRecipeButton } from '../mealPlan/AddRecipeButton';

export function PopoverRecipes() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box>
            <Typography
                variant="subtitle1"
                fontWeight={'light'}
                onClick={handleClick}
                sx={{
                    cursor: 'pointer',
                }}
            >
                <MoreHorizRounded fontSize="inherit" />
            </Typography>
            <Popover
                id={id}
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
                            background: 'white',
                            borderRadius: 4,
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        px: 1,
                    }}
                >
                    <List>
                        <AddRecipeButton showContent={true} />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DeleteRounded
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography
                                        variant="body2"
                                        fontWeight={'bold'}
                                    >
                                        Xóa tất cả
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Popover>
        </Box>
    );
}
