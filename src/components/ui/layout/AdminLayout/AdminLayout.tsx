import { PageRoute } from '@/lib/constants/common';
import { CalendarMonth, Category, Flatware, Home } from '@mui/icons-material';
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
    return location.pathname.includes(path);
  }

  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid item xs={2.5} sx={[commonStyle]}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
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
        <Paper
          elevation={4}
          sx={{ mt: 1, borderRadius: 4, overflow: 'hidden' }}
        >
          <Box>
            <AdminListButton
              Icon={Flatware}
              label="Nguyên liệu"
              path={PageRoute.Admin.Ingredients.Index}
              selected={checkSelected('ingredients')}
            />
            <AdminListButton
              Icon={Category}
              label="Loại nguyên liệu"
              path={PageRoute.Admin.IngredientTypes.Index}
              selected={checkSelected('ingredientTypes')}
            />
            <AdminListButton
              Icon={CalendarMonth}
              label="Dịp lễ"
              path={PageRoute.Admin.Occasions.Index}
              selected={checkSelected(`occasions`)}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={9.5} sx={[commonStyle]}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
          }}
        >
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
