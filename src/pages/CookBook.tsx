import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ListItemIcon,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import {
    DeleteRounded,
    DriveFileRenameOutlineRounded,
} from '@mui/icons-material';
import BoxImage from '@/components/common/image/BoxImage';
import { CookbookChoosingType, DialogPaperProps } from './MySavedRecipes';
import SlideInDialog from '@/components/common/dialog/SlideInDialog';

export function CookBook({
    cookbook,
    choosing,
    handleChoosing,
}: {
    cookbook: CookBookEntity;
    choosing: CookbookChoosingType | undefined;
    handleChoosing: (cookbook: CookBookEntity) => void;
}) {
    const color = useMemo(() => {
        if (cookbook.id == choosing?.Cookbook.id) {
            return 'primary.main';
        } else {
            return 'grey.400';
        }
    }, [choosing]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenuContext = Boolean(anchorEl);
    const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleCloseRightClick = () => {
        setAnchorEl(null);
    };

    const [openRenameDialog, setOpenRenameDialog] = React.useState(false);
    const handleOpenRenameDialog = () => setOpenRenameDialog(true);
    const handleCloseRenameDialog = () => setOpenRenameDialog(false);
    const [renameValue, setRenameValue] = React.useState(cookbook.name);

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    return (
        <Box
            component={'div'}
            id={cookbook.id.toString()}
            sx={{
                cursor: 'pointer',
            }}
            onContextMenu={handleRightClick}
        >
            <Box
                sx={{
                    width: '100%',
                    aspectRatio: '1/1',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 3,
                    borderColor: color,
                }}
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    if (event.type == 'click') {
                        handleChoosing(cookbook);
                    }
                }}
            >
                <BoxImage
                    src={choosing?.CookbookRecipes[0]?.recipe?.image}
                    quality={30}
                    sx={{
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        border: 3,
                        borderColor: 'white',
                    }}
                />
            </Box>

            <Typography
                variant="body2"
                fontWeight={'bold'}
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    py: 0.5,
                    color: color,
                }}
                whiteSpace={'nowrap'}
                textOverflow={'ellipsis'}
                overflow={'hidden'}
            >
                {cookbook.name}
            </Typography>

            <Menu
                anchorEl={anchorEl}
                open={openMenuContext}
                onClose={handleCloseRightClick}
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
                <MenuItem
                    onClick={() => {
                        handleOpenRenameDialog();
                        handleCloseRightClick();
                    }}
                >
                    <ListItemIcon>
                        <DriveFileRenameOutlineRounded
                            color="primary"
                            fontSize="small"
                        />
                    </ListItemIcon>
                    <Typography
                        variant="body2"
                        color="primary"
                        fontWeight={'bold'}
                    >
                        Đổi tên
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleOpenDelete();
                        handleCloseRightClick();
                    }}
                >
                    <ListItemIcon>
                        <DeleteRounded
                            color="error"
                            fontSize="small"
                        />
                    </ListItemIcon>
                    <Typography
                        variant="body2"
                        color="error"
                        fontWeight={'bold'}
                    >
                        Xóa
                    </Typography>
                </MenuItem>
            </Menu>

            {/* Dialog đổi tên */}
            <SlideInDialog
                open={openRenameDialog}
                handleClose={handleCloseRenameDialog}
                title="Đổi tên"
                content={
                    <TextField
                        sx={{ width: '100%' }}
                        placeholder="Tên bộ sưu tập"
                        variant="outlined"
                        value={renameValue}
                        onChange={(event) => {
                            setRenameValue(event.target.value);
                        }}
                        InputProps={{
                            sx: {
                                borderRadius: 4,
                            },
                        }}
                    />
                }
                cancelText="Hủy"
                confirmText="Cập nhật"
            />

            {/* Dialog xóa */}
            <SlideInDialog
                open={openDelete}
                handleClose={handleCloseDelete}
                title="Bạn chắc chắn muốn xóa?"
                content=" Các công thức đã lưu trong bộ sưu tập sẽ bị xóa!"
                cancelText="Hủy"
                confirmText="Xóa"
                confirmButtonProps={{
                    color: 'error',
                }}
                cancelButtonProps={{
                    color: 'primary',
                }}
            />
        </Box>
    );
}
