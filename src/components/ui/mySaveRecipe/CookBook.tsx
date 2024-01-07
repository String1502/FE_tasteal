import {
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
} from '@mui/icons-material';
import BoxImage from '@/components/common/image/BoxImage';
import { CookbookChoosingType } from '../../../pages/MySavedRecipes';
import SlideInDialog from '@/components/common/dialog/SlideInDialog';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import CookbookService from '@/lib/services/cookbookService';
import { NewCookBookNameReq } from '@/lib/models/dtos/Request/NewCookBookNameReq/NewCookBookNameReq';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';

export function CookBook({
  cookbook,
  choosing,
  handleChoosing,
  handleChangeCookbook,
  index,
}: {
  cookbook: CookbookChoosingType;
  choosing: CookbookChoosingType | undefined;
  handleChoosing: (cookbook: CookbookChoosingType) => void;
  handleChangeCookbook: (
    type: 'edit' | 'remove',
    cookbook: CookBookEntity
  ) => void;
  index: number;
}) {
  const color = useMemo(() => {
    if (cookbook.Cookbook.id == choosing?.Cookbook.id) {
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

  const [openRenameDialog, setOpenRenameDialog] = React.useState(false);
  const [renameValue, setRenameValue] = React.useState(cookbook.Cookbook.name);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [snackbarAlert] = useSnackbarService();

  return (
    <Box
      component={'div'}
      id={cookbook.Cookbook.id.toString()}
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
          src={cookbook?.CookbookRecipes[0]?.recipe?.image}
          quality={1}
          sx={{
            aspectRatio: '1/1',
            borderRadius: '50%',
            border: 3,
            borderColor: 'white',
          }}
        />
      </Box>

      <Tooltip title={cookbook.Cookbook.name}>
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
          {cookbook.Cookbook.name}
        </Typography>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={openMenuContext}
        onClose={() => setAnchorEl(null)}
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
            setOpenRenameDialog(true);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <DriveFileRenameOutlineRounded color="primary" fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" color="primary" fontWeight={'bold'}>
            Đổi tên
          </Typography>
        </MenuItem>
        {index != 0 && (
          <MenuItem
            onClick={() => {
              setOpenDelete(true);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <DeleteRounded color="error" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" color="error" fontWeight={'bold'}>
              Xóa
            </Typography>
          </MenuItem>
        )}
      </Menu>

      {/* Dialog đổi tên */}
      <SlideInDialog
        open={openRenameDialog}
        handleClose={() => setOpenRenameDialog(false)}
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
        onClickConfirm={async () => {
          handleChangeCookbook('edit', {
            ...cookbook.Cookbook,
            name: renameValue,
          });
          const data: NewCookBookNameReq = {
            id: cookbook.Cookbook.id,
            name: renameValue,
          };
          const result = await CookbookService.UpdateCookBookName(data);
          if (result) {
            snackbarAlert('Cập nhật thành công', 'success');
          } else {
            snackbarAlert('Cập nhật thất bại', 'error');
          }
        }}
      />

      {/* Dialog xóa */}
      {index !== 0 && (
        <SlideInDialog
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
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
          onClickConfirm={async () => {
            handleChangeCookbook('remove', cookbook.Cookbook);
            const result = await CookbookService.DeleteCookBookById(
              cookbook.Cookbook.id
            );
            if (result) {
              snackbarAlert('Xóa thành công', 'success');
            } else {
              snackbarAlert('Xóa thất bại', 'error');
            }
          }}
        />
      )}
    </Box>
  );
}
