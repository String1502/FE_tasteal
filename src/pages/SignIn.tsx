import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import signin from "../../public/signin.jpg";

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
        <Grid item xs={6} sx={{ height: "100vh" }}>
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
        <Grid item xs={6} sx={{ height: "100%", px: 4, pt: 2 }}>
          <Stack spacing={2} sx={{ height: "100%" }} direction={"column"}>
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
                  window.location.href = "/search";
                }}
              >
                <Typography variant="button">Đăng ký</Typography>
              </Button>
            </Box>

            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Tasteal xin chào!
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
