import { defaultAvtPath, signInImagePath } from "@/assets/exportImage";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";
import { Box, Button, Grid, Stack, Typography, TextField } from "@mui/material";

export function SignUpEmail() {
  return (
    <>
      <SignUpEmailContent />
    </>
  );
}

function SignUpEmailContent() {
  const authorImage = useFirebaseImage(defaultAvtPath);
  const signInImage = useFirebaseImage(signInImagePath);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={6} sx={{ height: "1000px" }}>
          <Box
            sx={{
              backgroundImage: `url(${signInImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
            }}
          ></Box>
        </Grid>
        <Grid item xs={6} sx={{ height: "100vh", px: 4, pt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="gray.500">
              Bạn chưa có tài khoản?
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "40px",
                ml: 2,
              }}
              onClick={() => {
                window.location.href = "/signin";
              }}
            >
              <Typography variant="button">Đăng ký</Typography>
            </Button>
          </Box>

          <Box
            sx={{
              backgroundImage: `url(${authorImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "10%",
              width: "60%",
              margin: "auto",
              marginTop: "7vh",
            }}
          ></Box>

          <Stack
            spacing={3.2}
            sx={{ height: "100vh", marginTop: "2vh" }}
            alignItems={"center"}
            direction={"column"}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center", fontSize: "48px" }}
            >
              ĐĂNG KÝ VỚI EMAIL
            </Typography>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontSize: "24px" }}
            >
              Lưu công thức, lên lịch ăn và mua nguyên liệu
            </Typography>

            <TextField
              label="Tên người dùng"
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                width: "60vh",

                backgroundColor: "#f7f7f7",
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                width: "60vh",

                backgroundColor: "#f7f7f7",
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              sx={{
                mt: 2,
                width: "60vh",
                backgroundColor: "#f7f7f7",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "60vh",
                height: "6vh",
                borderRadius: "40px",
                mt: 2,
              }}
            >
              Đăng nhập
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
