import {
  CalendarMonth,
  Flatware,
  Home,
  Person,
  Settings,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  SxProps,
} from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import AdminListButton from '../../admin/AdminListButton';

const commonStyle: SxProps = {
  height: '100vh',
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  function checkSelected(path: string) {
    return path === location.pathname;
  }

  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid item xs={2} sx={[commonStyle]}>
        <Paper elevation={4}>
          <Box component="nav">
            <ListItemButton>
              <ListItemIcon>
                <Home color="primary" />
              </ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primaryTypographyProps={{
                  fontFamily: 'Dancing Script',
                  fontSize: 32,
                }}
                primary="Tasteal"
              />
            </ListItemButton>
          </Box>
        </Paper>
        <Paper elevation={4} sx={{ mt: 1 }}>
          <Box>
            <AdminListButton
              Icon={Person}
              label="Người dùng"
              path="/admin/users"
              selected={checkSelected('/admin/users')}
            />
            <AdminListButton
              Icon={Flatware}
              label="Nguyên liệu"
              path="/admin/ingredients"
              selected={checkSelected('/admin/ingredients')}
            />
            <AdminListButton
              Icon={CalendarMonth}
              label="Dịp lễ"
              path="/occasions"
              selected={checkSelected('/admin/occasions')}
            />
            <AdminListButton
              Icon={Settings}
              label="Cài đặt"
              path="/admin/settings"
              selected={checkSelected('/admin/settings')}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={10} sx={[commonStyle]}>
        <Paper elevation={4}>{children}</Paper>
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
