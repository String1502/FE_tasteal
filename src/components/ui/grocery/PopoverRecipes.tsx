import {
  ArchiveRounded,
  DeleteRounded,
  MoreHorizRounded,
} from '@mui/icons-material';
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
import SlideInDialog from '@/components/common/dialog/SlideInDialog';

export function PopoverRecipes({
  DeleteAllCartByAccountId,
  addToPantry,
}: {
  DeleteAllCartByAccountId: () => Promise<void>;
  addToPantry: () => Promise<void>;
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

  const [openClearAll, setOpenClearAll] = useState(false);

  const [openAddTuLanh, setOpenAddTuLanh] = useState(false);

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
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setOpenAddTuLanh(true);
                  handleClose();
                }}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <ArchiveRounded color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="body2"
                    fontWeight={'bold'}
                    color={'primary'}
                  >
                    Thêm vào tủ lạnh
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setOpenClearAll(true);
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
        handleClose={() => setOpenClearAll(false)}
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
          setOpenClearAll(false);
        }}
      />

      {/* Dialog Thêm tủ lạnh */}
      <SlideInDialog
        open={openAddTuLanh}
        handleClose={() => setOpenAddTuLanh(false)}
        withCloseButton={true}
        title="Thêm vào tủ lạnh?"
        content={
          'Tất cả nguyên liệu đã mua (ngoại trừ đồ cá nhân không nằm trong hệ thống) sẽ được thêm vào tủ lạnh của bạn. Sau đó giỏ đi chợ sẽ được dọn!'
        }
        cancelText="Hủy"
        confirmText="Thêm"
        confirmButtonProps={{
          color: 'primary',
        }}
        onClickConfirm={async () => {
          await addToPantry();
          setOpenAddTuLanh(false);
        }}
      />
    </Box>
  );
}
