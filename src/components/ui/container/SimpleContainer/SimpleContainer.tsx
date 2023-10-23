import { Card, CardContent } from "@mui/material";
import { FC, PropsWithChildren } from "react";

type SimpleContainerProps = PropsWithChildren;

const SimpleContainer: FC<SimpleContainerProps> = ({ children }) => {
  return (
    <Card
      sx={{
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
