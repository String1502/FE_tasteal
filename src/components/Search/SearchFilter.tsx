import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export function SearchFilter() {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Grid item xs={12}>
          <Accordion
            square
            sx={{
              boxShadow: 0,
              borderBottom: 1,
              borderColor: "grey.300",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Nguyên liệu</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="caption">Bao gồm:</Typography>
              <Select
                //   value={age}
                //   onChange={handleChange}
                sx={{
                  my: 1,
                  width: "100%",
                }}
                variant="filled"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

              <Typography variant="caption" sx={{ mt: 3 }}>
                Không bao gồm:
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
}
