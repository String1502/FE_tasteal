import { DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { IngredientItemProps } from "../types";
import ItemTypography from "./ItemTypography";

export const IngredientItem: React.FunctionComponent<IngredientItemProps> = ({
  item,
  onDelete,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleDelete = useCallback(() => {
    onDelete(item.id);
  }, [onDelete, item.id]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <Stack
      key={item.id}
      justifyContent={"space-between"}
      alignItems={"center"}
      direction="row"
      sx={{
        backgroundColor: "#F0F0F0",
        borderRadius: 8,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#E0E0E0",
        },
        px: 2,
        py: 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box width={80}>
        <ItemTypography>{item.amount}</ItemTypography>
      </Box>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ flex: 1 }}
      >
        <ItemTypography>{item.name || "Unnamed ingredient"}</ItemTypography>

        <IconButton
          sx={{
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
          onClick={handleDelete}
        >
          <DeleteOutline />
        </IconButton>
      </Stack>
    </Stack>
  );
};
