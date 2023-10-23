import { Typography, styled } from "@mui/material";

const BigSectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: 32,
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

export default BigSectionHeading;
