import { useAppSelector } from '@/app/hook';
import TabCode from '@/lib/enums/AdminTabCode';
import { Flatware, Home, Settings } from '@mui/icons-material';
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
import AdminListButton from '../../admin/AdminListButton';

const commonStyle: SxProps = {
  height: '100vh',
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const currentTab = useAppSelector((state) => state.admin.currentTab);

  const checkSelected = useCallback(
    (code: TabCode) => currentTab === code,
    [currentTab]
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
            <AdminListButton
              Icon={Flatware}
              label="Nguyên liệu"
              tabCode={TabCode.IngredientIndex}
              selected={checkSelected(TabCode.IngredientIndex)}
            />
            <AdminListButton
              Icon={Settings}
              label="Cài đặt"
              tabCode={TabCode.Settings}
              selected={checkSelected(TabCode.Settings)}
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
