import { Stack } from '@mui/material';
import React from 'react';

export function MySavedRecipesContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Stack
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={3}
                sx={{
                    width: '100%',
                    py: 3,
                }}
            >
                {children}
            </Stack>
        </>
    );
}
