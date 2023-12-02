import { OccasionsList } from "@/components/ui/home/OccasionsList";
import OccasionService from "@/lib/services/occasionService";
import { Skeleton } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { OccasionEntity } from "@/lib/models/entities/OccasionEntity/OccasionEntity";

const SkeletonOccasion = () => {
  return (
    <Skeleton
      variant="rounded"
      width={"100%"}
      height={"100%"}
      sx={{
        aspectRatio: "1/0.7",
      }}
    />
  );
};

export function Occasion_Component() {
  const [occasions, setOccasions] = useState<OccasionEntity[] | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        setOccasions(await OccasionService.GetAllOccasions());
      } catch (error) {
        console.log(error);
        setOccasions([]);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {!occasions && <SkeletonOccasion />}

      {occasions && (
        <Suspense fallback={<SkeletonOccasion />}>
          <OccasionsList occasions={occasions} />
        </Suspense>
      )}
    </>
  );
}
