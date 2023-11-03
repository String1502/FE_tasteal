import { Add } from "@mui/icons-material";
import { Button, ButtonProps, Typography } from "@mui/material";
const AddIngredientButton: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "grey.400",
        bgcolor: "#F0F0F0",
        color: "#777d86",
        boxShadow: "none",
        mt: 2,
        justifyContent: "left",
        textTransform: "none",
        alignItems: "center",
        py: 2,
        "&:hover": {
          bgcolor: "#E0E0E0",
          boxShadow: "none",
        },
      }}
    >
      <Add />
      <Typography ml={1} fontSize={18}>
        Add Ingredient
      </Typography>
    </Button>
  );
};

export default AddIngredientButton;
