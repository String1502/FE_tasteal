import {
    Button,
    CheckboxProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import { CookBook_RecipeEntity } from '@/lib/models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity';
import { PrimaryCard } from '@/components/common/card/PrimaryCard';
import { DeleteRounded, PlayArrowRounded } from '@mui/icons-material';
import { DialogPaperProps } from '../../../pages/MySavedRecipes';
import SlideInDialog from '@/components/common/dialog/SlideInDialog';

export function CustomCard({
    cookbookRecipe,
    cookbookData,
}: {
    cookbookRecipe: CookBook_RecipeEntity;
    cookbookData: CookBookEntity[];
}) {
    //#region Dialog Xóa recipe khỏi cookbook
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    //#endregion
    //#region Di chuyển recipe tới cookbook khác
    const [openMove, setOpenMove] = React.useState(false);
    const handleOpenMove = () => setOpenMove(true);
    const handleCloseMove = () => setOpenMove(false);
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

    return (
        <>
            <PrimaryCard
                recipe={cookbookRecipe.RecipeEntity}
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
                {cookbookData.map((cookbook) => {
                    if (cookbook.id == cookbookRecipe.cook_book_id) {
                        return null;
                    }
                    return (
                        <MenuItem
                            key={cookbook.id}
                            onClick={() => {
                                handleOpenMove();
                                setMoveToNewCookbook_Id(cookbook.id);
                                handleClose();
                            }}
                        >
                            <ListItemIcon>
                                <PlayArrowRounded
                                    color="primary"
                                    fontSize="small"
                                />
                            </ListItemIcon>
                            <Typography
                                variant="body2"
                                color="primary"
                                fontWeight={'bold'}
                                whiteSpace={'nowrap'}
                                textOverflow={'ellipsis'}
                                overflow={'hidden'}
                            >
                                {cookbook.name}
                            </Typography>
                        </MenuItem>
                    );
                })}

                <MenuItem
                    onClick={() => {
                        handleOpenDelete();
                        handleClose();
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
                handleClose={handleCloseMove}
                title="Bạn muốn di chuyển công thức?"
                content={`
                Công thức sẽ di chuyển đến ${
                    cookbookData.find(
                        (cookbook) => cookbook.id == moveToNewCookbook_Id
                    )?.name
                }`}
                cancelText="Hủy"
                confirmText="Xác nhận"
            />

            {/* Dialog xóa */}
            <SlideInDialog
                open={openDelete}
                handleClose={handleCloseDelete}
                title="Bạn muốn xóa công thức?"
                content={`Công thức sẽ bị xóa khỏi bộ sưu tập ${cookbookRecipe.cook_book.name}!`}
                confirmButtonProps={{
                    color: 'error',
                }}
                cancelText="Hủy"
                confirmText="Xóa"
            />
        </>
    );
}
