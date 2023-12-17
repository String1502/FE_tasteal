import { OccasionsList } from '@/components/ui/home/OccasionsList';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import OccasionService from '@/lib/services/occasionService';
import { Box, Skeleton, Stack } from '@mui/material';
import { Suspense, useEffect, useState } from 'react';

const SkeletonOccasion = ({ lenght = 8 }: { lenght?: number }) => {
    return (
        <Stack
            direction={'row'}
            useFlexGap
            flexWrap="wrap"
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            sx={{
                mx: -1.5,
            }}
        >
            {new Array(lenght).fill(0).map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        width: { xs: '100%', sm: '50%', md: '33%', lg: '25%' },
                        p: 1.5,
                    }}
                >
                    <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={'100%'}
                        sx={{
                            aspectRatio: '1/0.7',
                            borderRadius: 4,
                        }}
                    />
                </Box>
            ))}
        </Stack>
    );
};

export function Occasion_Component() {
    const [occasions, setOccasions] = useState<OccasionEntity[] | undefined>(
        undefined
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                setOccasions(await OccasionService.GetAll());
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
