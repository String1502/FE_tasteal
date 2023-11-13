import { Add } from "@mui/icons-material";
import { Button, ButtonProps, Typography } from "@mui/material";

/**
 * Default label for CollectionItemAddButton
 */
const DEFAULT_LABEL = "Add";

const CollectionItemAddButton: React.FunctionComponent<
  ButtonProps & { label?: string }
> = (props) => {
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
        {props.label || DEFAULT_LABEL}
      </Typography>
    </Button>
  );
};

export default CollectionItemAddButton;
