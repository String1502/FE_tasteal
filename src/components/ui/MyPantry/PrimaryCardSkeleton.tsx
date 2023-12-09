import { Skeleton, SkeletonProps } from '@mui/material';

export const PrimaryCardSkeleton = (props?: SkeletonProps) => (
    <Skeleton
        variant="rounded"
        {...props}
        sx={{
            height: 372,
            borderRadius: '16px',
            ...props?.sx,
        }}
    />
);
