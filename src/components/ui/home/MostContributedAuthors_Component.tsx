import { AccountEntity } from "@/lib/models/entities/AccountEntity/AccountEntity";
import AccountService from "@/lib/services/accountService";
import { Suspense, useEffect, useState } from "react";
import { AuthorsCarousel } from "./AuthorsCarousel";
import { Skeleton } from "@mui/material";

const SkeletonAuthors = () => (
  <Skeleton variant="rounded" height={575} width={"100%"} />
);

function MostContributedAuthors_Component() {
  const [mostContributedAuthors, setMostContributedAuthors] = useState<
    AccountEntity[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMostContributedAuthors(
          await AccountService.GetMostContributedAccounts(10)
        );
      } catch (error) {
        console.log(error);
        setMostContributedAuthors([]);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!mostContributedAuthors && <SkeletonAuthors />}

      {mostContributedAuthors && (
        <Suspense fallback={<SkeletonAuthors />}>
          <AuthorsCarousel array={mostContributedAuthors} />
        </Suspense>
      )}
    </>
  );
}

export default MostContributedAuthors_Component;
