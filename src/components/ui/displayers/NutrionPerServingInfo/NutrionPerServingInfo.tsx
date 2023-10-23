import SectionHeading from "@/components/common/typos/SectionHeading";
import { Grid, Link, Stack } from "@mui/material";
import { FC } from "react";
import NutrionInfo, { NutrionType } from "./NutrionInfo/NutrionInfo";

export type NutrionPerServingInfoProps = {
  test?: string;
};

const NutrionPerServingInfo: FC<NutrionPerServingInfoProps> = () => {
  return (
    <Stack gap={1}>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <SectionHeading>Nutrion Per Serving</SectionHeading>
        <Link href="#">VIEW ALL</Link>
      </Stack>
      <Grid container>
        <Grid item xs>
          <NutrionInfo type={NutrionType.calories} value={452} />
        </Grid>
        <Grid item xs>
          <NutrionInfo type={NutrionType.calories} value={35} withGrams />
        </Grid>
        <Grid item xs>
          <NutrionInfo type={NutrionType.calories} value={4} withGrams />
        </Grid>
        <Grid item xs>
          <NutrionInfo type={NutrionType.calories} value={31.1} withGrams />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default NutrionPerServingInfo;
