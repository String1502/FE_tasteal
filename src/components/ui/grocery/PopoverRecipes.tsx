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
import { useCallback, useState } from 'react';
import { AddRecipeButton } from '../mealPlan/AddRecipeButton';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import SlideInDialog from '@/components/common/dialog/SlideInDialog';
import CartService from '@/lib/services/cartService';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';

export function PopoverRecipes({
  accountId,
}: {
  accountId: AccountEntity['uid'];
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [snackbarAlert] = useSnackbarService();

  const [openClearAll, setOpenClearAll] = useState(false);
  const handleOpenClearAll = () => setOpenClearAll(true);
  const handleCloseClearAll = () => setOpenClearAll(false);

  const DeleteAllCartByAccountId = useCallback(async () => {
    try {
      const result = await CartService.DeleteCartByAccountId(accountId);
      if (result) {
        snackbarAlert('Dọn giỏ đi chợ thành công.', 'success');
      } else snackbarAlert('Thao tác không thành công.', 'error');
    } catch (error) {
      console.log(error);
    }
  }, [accountId]);

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
              <ListItemButton
                onClick={() => {
                  handleOpenClearAll();
                  handleClose();
                }}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <DeleteRounded color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="body2"
                    fontWeight={'bold'}
                    color={'error'}
                  >
                    Dọn giỏ đi chợ
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Popover>

      {/* Dialog Clear All */}
      <SlideInDialog
        open={openClearAll}
        handleClose={handleCloseClearAll}
        withCloseButton={true}
        title="Bạn chắc chứ ?"
        content={
          'Tất cả công thức và nguyên liệu sẽ bị xóa khỏi giỏ đi chợ của bạn.'
        }
        cancelText="Hủy"
        confirmText="Xóa"
        confirmButtonProps={{
          color: 'error',
        }}
        onClickConfirm={async () => {
          await DeleteAllCartByAccountId();
          handleCloseClearAll();
        }}
      />
    </Box>
  );
}
