import { Box, Button, Grid, Stack, Typography, TextField } from "@mui/material";

import FacebookIcon from "../../public/facebook-icon.png";
import { Facebook, Google } from "@mui/icons-material";
import { signInImage } from "@/assets/exportImage";

export function SignIn() {
  return (
    <>
      <SignInContent />
    </>
  );
}

function SignInContent() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        {/*// Grid của cái hình bên trái */}
        <Grid
          item
          md={6}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${signInImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          ></Box>
        </Grid>

        {/*Grid của cái đống bên phải*/}
        <Grid item xs={12} md={6} sx={{ height: "100vh", px: 4, pt: 2 }}>
          {/*Cái box của dòng chữ mé trên bên phải*/}
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
                window.location.href = "/signup";
              }}
            >
              <Typography variant="button">Đăng ký</Typography>
            </Button>
          </Box>

          {/*Stack này là từ cái tựa đi xuống*/}
          <Stack
            spacing={3.2}
            sx={{ height: "100vh", marginTop: "12vh" }}
            alignItems={"center"}
            direction={"column"}
          >
            {/*Cái tựa nè*/}
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center", fontSize: "48px" }}
            >
              Tasteal xin chào!
            </Typography>

            {/*Cái nút với google nè */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "60vh",
                borderRadius: "40px",
                height: "6vh",
                mt: 2,
                backgroundColor: "#3998f2",
              }}
            >
              {/*icon của cái nút google nè*/}
              <Google
                sx={{ width: "2.4vh", height: "2.4vh", marginRight: "8px" }}
              />
              Tiếp tục với Google
            </Button>

            {/*Cái nút với facebook nè*/}
            <Button
              variant="contained"
              color="info"
              sx={{
                width: "60vh",
                height: "6vh",
                borderRadius: "40px",
                backgroundColor: "#3b5998",
                mt: 1,
              }}
            >
              {/*icon của cái nút facebook nè*/}
              <Facebook
                sx={{ width: "2.4vh", height: "2.4vh", marginRight: "8px" }}
              ></Facebook>
              Tiếp tục với Facebook
            </Button>

            {/*Cái stack này của cái lằng gạch ngang*/}
            <Stack
              direction="row"
              alignItems="center"
              sx={{ mt: 2, textAlign: "right", width: "60vh" }}
            >
              <div style={{ width: "30%" }}>
                <hr style={{ border: "none", borderTop: "1px solid #000" }} />
              </div>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  textAlign: "center",
                  marginBottom: "2vh",
                  color: "grey",
                }}
              >
                <i>&nbsp; Hoặc dùng Email của bạn &nbsp;</i>
              </Typography>
              <div style={{ width: "30%" }}>
                <hr style={{ border: "none", borderTop: "1px solid #000" }} />
              </div>
            </Stack>

            {/*Cái ô nhập mail*/}
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

            {/*Cái ô nhập password*/}
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

            {/*Text quên mật khẩu*/}
            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: "right" }}
              component={"a"}
              href="./forgotpass"
              color="primary"
              width="100%"
            >
              Bạn đã quên mật khẩu?
            </Typography>

            {/*Nút đăng nhập*/}
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
