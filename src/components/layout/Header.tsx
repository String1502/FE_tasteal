import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Drawer,
  useTheme,
  Container,
} from "@mui/material";
import { ColorModeContext } from "../../App";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Trang chủ", "Về Tasteal", "Tìm kiếm"];

export function Header(props: Props) {
  // Dùng cho đổi theme
  const colorMode = React.useContext(ColorModeContext);

  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: theme.palette.common.white,
        }}
      >
        <Container>
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              color="primary"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Tasteal
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  variant="contained"
                  color="primary"
                  key={item}
                  sx={{ mx: 2 }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />
    </Box>
  );
}

{
  /* <Button color="inherit" onClick={colorMode.toggleColorMode}>
  Login
</Button>; */
}
