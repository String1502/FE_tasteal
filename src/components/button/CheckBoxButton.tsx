import { Button, Checkbox, Typography } from "@mui/material";
import { TuKhoa } from "../../pages/Search";

const sx = {
  borderRadius: "40px",
  height: "35px",
};

const CustomButton = ({ label, variant }: { label: string; variant: any }) => {
  return (
    <Button sx={sx} variant={variant}>
      <Typography
        variant="body2"
        sx={{ fontWeight: "bold", textTransform: "lowercase" }}
      >
        # {label}
      </Typography>
    </Button>
  );
};

export function CheckBoxButton({
  value,
  label,
  handleChangeTuKhoa,
}: {
  value: boolean;
  label: string;
  handleChangeTuKhoa: (tukhoa: TuKhoa) => void;
}) {
  return (
    <>
      <Checkbox
        value={value}
        onChange={(e) => {
          handleChangeTuKhoa({ label, value: e.target.checked });
        }}
        icon={<CustomButton label={label} variant="outlined" />}
        checkedIcon={<CustomButton label={label} variant="contained" />}
        disableRipple
      />
    </>
  );
}
