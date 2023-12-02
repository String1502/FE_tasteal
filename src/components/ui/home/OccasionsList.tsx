import BoxImage from "@/components/common/image/BoxImage";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";
import { OccasionEntity } from "@/lib/models/entities/OccasionEntity/OccasionEntity";
import { Box, Button, Link, Stack, Typography } from "@mui/material";

export function OccasionsList({ occasions }: { occasions: OccasionEntity[] }) {
  return (
    <>
      <Stack
        direction={"row"}
        useFlexGap
        flexWrap="wrap"
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        sx={{
          mx: -1.5,
        }}
      >
        {occasions.map((item, index) => (
          <OccasionCard key={index} item={item} />
        ))}
      </Stack>
    </>
  );
}

function OccasionCard({ item }: { item: OccasionEntity }) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "50%", md: "33%", lg: "25%" },
        p: 1.5,
      }}
    >
      <Box
        component={Button}
        sx={{
          width: "100%",
          aspectRatio: "1/0.7",
          boxShadow: 1,
          cursor: "pointer",
          transition: "all 0.15s ease-in-out",
          overflow: "hidden",
          borderRadius: 4,
          "&:hover": {
            boxShadow: 4,
            transform: "translateY(-3px)",
            backgroundColor: "white",
          },
          p: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <BoxImage
          src={item?.image}
          sx={{
            width: "100%",
            height: "68%",
          }}
        />

        <Box
          component={Link}
          underline="none"
          href={`/occasions/${item.name}`}
          sx={{
            width: "100%",
            height: "32%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
            px: 4,
          }}
        >
          <Typography
            variant="subtitle2"
            fontWeight={"bold"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            width={"100%"}
          >
            {item.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
