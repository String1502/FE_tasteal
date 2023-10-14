import { styled } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";

const RoundedButton = styled(Button)<ButtonProps>({
  borderRadius: 8,
  py: 1,
  typography: "subtitle1",
  fontWeight: 800,
});

export default RoundedButton;
