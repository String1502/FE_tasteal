import { Box, Button, Grid, Stack, Typography, TextField } from "@mui/material";
import signin from "../../public/signin.jpg";

export function ForgotPass() {
  return (
    <>
      <ForgotPassContent />
    </>
  );
}

function ForgotPassContent() {
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
              backgroundImage: `url(${signin})`,
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

          <Stack
            spacing={3.2}
            sx={{ height: "100vh", marginTop: "25vh" }}
            alignItems={"center"}
            direction={"column"}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center", fontSize: "48px" }}
            >
              BẠN ĐÃ QUÊN MẬT KHẨU?
            </Typography>
            <Typography
              variant="h5"
              sx={{ textAlign: "start", fontSize: "19px" }}
            >
              <i>
                Nhập Email SideChef của bạn. <br></br>
                Chúng tôi sẽ gửi bạn đường dẫn để đặt lại mật khẩu.
              </i>
            </Typography>

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
              Gửi đường dẫn để đặt lại
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
