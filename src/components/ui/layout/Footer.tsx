import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { CustomHeaderLink, CustomLink } from "../header/CustomLink";

const gap = 4;

export function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Container
        sx={{
          pt: 12,
          pb: gap,
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          alignSelf={"stretch"}
          spacing={gap}
        >
          <Grid
            item
            lg={1}
            sx={{
              display: { xs: "none", lg: "block" },
            }}
          ></Grid>

          <Grid item xs={12} md={5} lg={4}>
            <Box
              sx={{
                aspectRatio: "1/1",
                width: "100%",
                backgroundColor: "secondary.main",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
                maxWidth: "70vw",
                display: { xs: "none", md: "flex" },
              }}
            >
              Logo nha bà!
            </Box>

            <Typography
              color={"white"}
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 2,
                display: { xs: "block", md: "none" },
              }}
            >
              Tasteal
            </Typography>

            <form action="post">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <FormControl>
                  <Input
                    sx={{
                      borderRadius: "40px",
                      backgroundColor: "white",
                      px: 3,
                      py: 1,
                      fontSize: "caption.fontSize",
                    }}
                    type="email"
                    placeholder="Email của bạn"
                    disableUnderline
                    aria-describedby="my-helper-text"
                  />
                  <FormHelperText sx={{ color: "white" }}>
                    Chúng tôi sẽ không chia sẻ Email của bạn.
                  </FormHelperText>
                </FormControl>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    borderRadius: "40px",
                    backgroundColor: "white",
                    px: 3,
                    py: 1.3,
                    fontSize: "caption.fontSize",
                    color: "primary.main",
                    width: "140px",
                    boxShadow: "none",
                    opacity: 1,
                    "&:hover": {
                      boxShadow: "none",
                      backgroundColor: "white",
                      color: "primary.main",
                      opacity: 0.8,
                    },
                  }}
                >
                  Đăng ký
                </Button>
              </Box>
            </form>
          </Grid>

          <Grid
            item
            lg={1}
            sx={{
              display: { xs: "none", lg: "block" },
            }}
          ></Grid>

          <Grid item xs={12} md={3} lg={2}>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <CustomHeaderLink href="#" label="Giới thiệu" color="white" />
              <CustomLink href="#" label="Công thức" color="white" my={gap} />
              <CustomLink href="#" label="Lịch ăn" color="white" my={gap} />
              <CustomLink href="#" label="Tìm kiếm" color="white" my={gap} />
            </Box>
          </Grid>

          <Grid
            item
            lg={1}
            sx={{
              display: { xs: "none", lg: "block" },
            }}
          ></Grid>

          <Grid item xs={12} md={4} lg={2}>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <CustomHeaderLink href="#" label="Doanh nghiệp" color="white" />
              <CustomLink href="#" label="Về Tasteal" color="white" my={gap} />
              <CustomLink href="#" label="Liên lạc" color="white" my={gap} />
              <CustomLink href="#" label="Điều khoản" color="white" my={gap} />
              <CustomLink href="#" label="FAQ" color="white" my={gap} />
            </Box>
          </Grid>

          <Grid
            item
            lg={1}
            sx={{
              display: { xs: "none", lg: "block" },
            }}
          ></Grid>

          <Grid item xs={12} lg={10}>
            <Box
              sx={{
                borderTop: 1,
                borderColor: "grey.600",
                width: "100%",
              }}
            ></Box>
          </Grid>

          <Grid item xs={12} lg={10}>
            <Typography
              color={"white"}
              variant="body2"
              textAlign={{ xs: "center", md: "right" }}
            >
              © Tasteal Inc. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
