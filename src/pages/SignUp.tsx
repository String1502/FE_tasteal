import { Box, Button, Grid, Stack, Typography, TextField } from "@mui/material";
import signin from "../../public/signin.jpg";
import GoogleIcon from "../../public/google-icon.png";
import FacebookIcon from "../../public/facebook-icon.png";
import EmailIcon from "../../public/email-icon.png";
import logo from "../../public/gordonramsay.jpg";
import { Facebook, Google, MailOutline } from "@mui/icons-material";

export function SignUp() {
  return (
    <>
      <SignUpContent />
    </>
  );
}

function SignUpContent() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        {/*Cái hình bên trái*/}
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

        {/*Cái đống bên phải*/}
        <Grid item xs={6} sx={{ height: "100vh", px: 4, pt: 2 }}>
          {/*Cái đống mé trên bên phải*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="gray.500">
              Bạn đã là thành viên?
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
              <Typography variant="button">Đăng nhập</Typography>
            </Button>
          </Box>

          {/*Cái logo*/}
          <Box
            sx={{
              backgroundImage: `url(${logo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "10%",
              width: "60%",
              margin: "auto",
              marginTop: "7vh",
            }}
          ></Box>

          {/*Cái nội dung mé dưới*/}
          <Stack
            spacing={3.2}
            sx={{ height: "100vh", marginTop: "2vh" }}
            alignItems={"center"}
            direction={"column"}
          >
            {/*Tiêu đề chào mừng*/}
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center", fontSize: "48px" }}
            >
              CHÀO MỪNG VỚI TASTEAL!
            </Typography>

            {/*Câu slogan*/}
            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontSize: "24px" }}
            >
              Lưu công thức, lên lịch ăn và mua nguyên liệu
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

            {/*Cái nút với email nè*/}
            <Button
              variant="contained"
              color="info"
              sx={{
                width: "60vh",
                height: "6vh",
                borderRadius: "40px",
                backgroundColor: "#01404e",
                mt: 1,
              }}
              onClick={() => {
                window.location.href = "/signupemail";
              }}
            >
              {/*icon của cái nút email nè*/}
              <MailOutline
                sx={{ width: "2.4vh", height: "2.4vh", marginRight: "8px" }}
              ></MailOutline>
              Tiếp tục với Email
            </Button>


            {/* Radio button cái điều khoản links tới mấy cái điều khoản */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                id="subscribe"
                name="subscription"
                value="subscribe"
              />
              <label>
                {" "}
                &nbsp;Tôi muốn nhận cảm hứng về công thức, kế hoạch bữa ăn, cập
                nhật và nhiều hơn nữa!
              </label>
            </div>

            <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
              Bằng cách đăng ký, tôi đồng ý với &nbsp;
              <a
                href="/"
                style={{ textDecoration: "underline", color: "#000" }}
              >
                Điều khoản Dịch vụ
              </a>{" "}
              và <br></br>
              <a
                href="/"
                style={{ textDecoration: "underline", color: "#000" }}
              >
                Chính sách Bảo mật
              </a>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
