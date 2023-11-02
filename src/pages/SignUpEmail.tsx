import { defaultAvtPath, signInImagePath } from "@/assets/exportImage";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  TextField,
  Container,
  TextFieldProps,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function SignUpEmail() {
  const navigate = useNavigate();
  const authorImage = useFirebaseImage(defaultAvtPath);
  const signInImage = useFirebaseImage(signInImagePath);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        maxHeight={"100vh"}
        sx={{
          overflow: "auto",
          scrollSnapType: "y mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Grid
          item
          xs={0}
          md={5}
          lg={6}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${signInImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              minHeight: "100vh",
              width: "100%",
            }}
          ></Box>
        </Grid>
        <Grid item xs={12} md={7} lg={6}>
          <Container
            sx={{
              width: "100%",
              height: "100%",
              minHeight: "100vh",
              px: { sm: 12 },
              py: 2,
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              justifyContent={"center"}
              sx={{
                height: "100%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "space-between", md: "flex-end" },
                  alignItems: "center",
                  width: "100%",
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
              >
                <Typography variant="caption" color="gray.500">
                  Bạn đã là thành viên?
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    ml: 2,
                  }}
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  <Typography variant="button" fontWeight={"bold"}>
                    Đăng nhập
                  </Typography>
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mt: 6,
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${authorImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    aspectRatio: "1/1",
                    width: "32px",
                    borderRadius: "50%",
                    mr: 1,
                  }}
                ></Box>
                <Typography variant="h6" color="primary">
                  Tasteal
                </Typography>
              </Box>

              <Typography
                variant="h4"
                fontWeight={"bold"}
                color="primary"
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Đăng ký với Email
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "light",
                }}
              >
                Lưu công thức, lên lịch ăn và chuẩn bị nguyên liệu
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  my: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TextField
                  {...typoProps}
                  placeholder="Chúng tôi có thể gọi bạn là?"
                  type="name"
                />
                <TextField {...typoProps} placeholder="Email" type="email" />
                <TextField
                  {...typoProps}
                  placeholder="Password"
                  type="password"
                />

                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    py: 1.2,
                    backgroundColor: "primary",
                    opacity: 1,
                    "&:hover": {
                      opacity: 0.9,
                      backgroundColor: "primary",
                    },
                    fontSize: "caption.fontSize",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  ĐĂNG KÝ
                </Button>
              </Box>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

const typoProps: TextFieldProps = {
  variant: "outlined",
  fullWidth: true,
  InputProps: {
    sx: {
      borderRadius: "40px",
      backgroundColor: "grey.100",
      fontSize: "body2.fontSize",
      px: 1.5,
    },
  },
};
