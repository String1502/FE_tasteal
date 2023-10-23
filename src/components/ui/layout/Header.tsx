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
import { ColorModeContext } from "../../../App";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { SearchRounded, ShoppingBagRounded } from "@mui/icons-material";
import { ButtonHoverPopover } from "../header/ButtonHoverPopover";
import { PopoverContent } from "../header/PopoverContent";
import { CustomHeaderLink } from "../header/CustomLink";
import { useNavigate } from "react-router-dom";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  "Trang chủ",
  "Về Tasteal",
  "Lịch ăn",
  "Tủ lạnh",
  "Tìm kiếm",
  "Giỏ đi chợ",
  "Đăng ký",
  "Đăng nhập",
];

export function Header(props: Props) {
  // Dùng cho đổi theme
  const colorMode = React.useContext(ColorModeContext);
  const navigate = useNavigate();
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
    <Box
      component={"div"}
      id="headerApp"
      sx={{ display: "flex", height: "fit-content" }}
    >
      <AppBar
        component="nav"
        sx={{
          backgroundColor: theme.palette.common.white,
        }}
      >
        <Container>
          <Toolbar disableGutters>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                direction: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                gap: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <Box
                  sx={{
                    aspectRatio: "1/1",
                    height: "32px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "red",
                    mr: 1,
                    pointerEvents: "none",
                  }}
                ></Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  component="div"
                  color="primary"
                  sx={{
                    width: "fit-content",
                    pointerEvents: "none",
                  }}
                >
                  Tasteal
                </Typography>
              </Box>

              <ButtonHoverPopover
                customLink={<CustomHeaderLink href="#" label="Công thức" />}
              >
                <PopoverContent />
              </ButtonHoverPopover>

              <CustomHeaderLink href="#" label="Lịch ăn" />

              <CustomHeaderLink href="#" label="Tủ lạnh" />
            </Box>
            <Box
              sx={{
                direction: "row",
                alignItems: "center",
                justifyContent: "center",
                display: { xs: "none", md: "flex" },
              }}
            >
              <IconButton
                color="primary"
                size="small"
                sx={{
                  border: 1,
                  mr: 2,
                }}
                onClick={() => {
                  navigate("/search");
                }}
              >
                <SearchRounded fontSize="inherit" />
              </IconButton>

              <IconButton
                color="primary"
                size="small"
                sx={{
                  border: 1,
                  mr: 2,
                }}
              >
                <ShoppingBagRounded fontSize="inherit" />
              </IconButton>

              <Button
                color="primary"
                variant="contained"
                size="small"
                sx={{
                  mr: 2,
                  width: "140px",
                }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Đăng ký
              </Button>

              <Button
                color="primary"
                variant="outlined"
                size="small"
                sx={{
                  width: "140px",
                }}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Đăng nhập
              </Button>
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
            display: { xs: "block", md: "none" },
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
