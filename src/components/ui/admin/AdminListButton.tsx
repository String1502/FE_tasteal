import { SvgIconComponent } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export type AdminListButtonProps = {
  Icon: SvgIconComponent;
  label: string;
  onClick?: () => void;
  path: string;
  selected: boolean;
};

const AdminListButton: FC<AdminListButtonProps> = ({
  Icon,
  label,
  path,
  selected,
}) => {
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <ListItemButton
      onClick={() => handleNavigate(path)}
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
