import { Chip, Stack } from "@mui/material";
import { FC } from "react";

const ChipsDisplayer: FC<ChipsDisplayerProps> = ({ chips, onChange }) => {
  return (
    <Stack flexWrap="wrap" gap={1} alignItems={"flex-start"} direction={"row"}>
      {chips.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.name}
          onDelete={() => onChange(chips.filter((c) => c.id !== chip.id))}
          sx={{
            py: 2,
            border: "1px solid transparent",
            "&:hover": {
              border: "1px solid",
              transition: "all 0.2s ease-in-out",
            },
            fontSize: 16,
            fontWeight: "bold",
          }}
        />
      ))}
    </Stack>
  );
};

export default ChipsDisplayer;

export type ChipsDisplayerProps = {
  chips: ChipValue[];
  onChange: (chips: ChipValue[]) => void;
};
export type ChipValue = {
  id: number;
  name: string;
};
