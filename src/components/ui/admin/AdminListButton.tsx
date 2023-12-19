import { useAppDispatch } from '@/app/hook';
import { navigateTo } from '@/features/admin/adminSlice';
import TabCode from '@/lib/enums/AdminTabCode';
import { SvgIconComponent } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC, useCallback, useMemo } from 'react';

export type AdminListButtonProps = {
  Icon: SvgIconComponent;
  label: string;
  tabCode: TabCode;
  onClick?: () => void;
  checkSelected?: (tabCode: TabCode) => boolean;
};

const AdminListButton: FC<AdminListButtonProps> = ({
  Icon,
  label,
  tabCode,
  checkSelected,
}) => {
  const dispatch = useAppDispatch();

  const handleNavigate = useCallback(
    (tabCode: TabCode) => {
      dispatch(navigateTo({ tab: tabCode }));
    },
    [dispatch]
  );

  const selected = useMemo(
    () => checkSelected(tabCode),
    [checkSelected, tabCode]
  );

  return (
    <ListItemButton
      onClick={() => handleNavigate(tabCode)}
      sx={
        selected
          ? {
              backgroundColor: 'primary.light',
              ':hover': {
                backgroundColor: 'primary.main',
              },
              ':focus': {
                backgroundColor: 'primary.main',
              },
            }
          : {
              backgroundColor: 'primary.contrastText',
            }
      }
    >
      <ListItemIcon>
        <Icon
          sx={{ color: selected ? 'primary.contrastText' : 'primary.main' }}
        />
      </ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          color: selected ? 'primary.contrastText' : 'primary.main',
        }}
      />
    </ListItemButton>
  );
};

export default AdminListButton;
