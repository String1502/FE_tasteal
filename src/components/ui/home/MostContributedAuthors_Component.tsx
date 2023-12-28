import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import AccountService from '@/lib/services/accountService';
import { Suspense, useEffect, useState } from 'react';
import { AuthorsCarousel } from './AuthorsCarousel';
import { Skeleton } from '@mui/material';

const SkeletonAuthors = () => (
  <Skeleton variant="rounded" height={575} width={'100%'} />
);

function MostContributedAuthors_Component({
  exceptUid,
}: {
  exceptUid?: string[];
}) {
  const [mostContributedAuthors, setMostContributedAuthors] = useState<
    AccountEntity[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AccountService.GetMostContributedAccounts(10).then(
          (data) => {
            if (exceptUid && exceptUid.length > 0) {
              return data.filter((account) => !exceptUid.includes(account.uid));
            } else {
              return data;
            }
          }
        );
        setMostContributedAuthors(data);
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
