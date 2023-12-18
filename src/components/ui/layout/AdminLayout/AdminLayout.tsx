import TabCode from '@/lib/enums/AdminTabCode';
import useAdminPageContext from '@/lib/hooks/useAdminPageContext';
import { Flatware, Home } from '@mui/icons-material';
import {
  Box,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  SxProps,
} from '@mui/material';
import { FC, PropsWithChildren, useCallback } from 'react';

const commonStyle: SxProps = {
  height: '100vh',
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const { navigateTo } = useAdminPageContext();

  const handleNavigate = useCallback(
    (tabCode: TabCode) => {
      navigateTo(tabCode);
    },
    [navigateTo]
  );

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
            <ListItemButton
              onClick={() => handleNavigate(TabCode.IngredientIndex)}
            >
              <ListItemIcon>
                <Flatware color="primary" />
              </ListItemIcon>
              <ListItemText primary="Nguyên liệu" />
            </ListItemButton>
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
