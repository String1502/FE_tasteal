import { Card, CardContent, CardProps } from "@mui/material";
import { FC } from "react";

type SimpleContainerProps = CardProps;

const SimpleContainer: FC<SimpleContainerProps> = ({ children, ...props }) => {
  return (
    <Card
      {...props}
      sx={{
        ...props.sx,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.12)",
        borderWidth: 2,
        borderRadius: 6,
        boxShadow: "none",
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default SimpleContainer;
