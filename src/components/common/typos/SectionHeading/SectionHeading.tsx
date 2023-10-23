import { Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const SectionHeading: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Typography typography={"h6"} color="primary.main" fontWeight={"bold"}>
      {children}
    </Typography>
  );
};

export default SectionHeading;
