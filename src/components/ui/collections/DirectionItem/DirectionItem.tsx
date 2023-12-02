import useFirebaseImage from '@/lib/hooks/useFirebaseImage';
import { Direction } from '@/lib/models/dtos/common';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { FC } from 'react';

type DirectionItemProps = {
    value: Omit<Direction, 'recipe_id'>;
    last?: boolean;
};

const DirectionItem: FC<DirectionItemProps> = ({ value, last = false }) => {
    const img = useFirebaseImage(value.image);

    return (
        <Stack gap={2}>
            <Typography
                color="primary.main"
                fontSize={20}
                fontWeight={'bold'}
            >
                Bước {value.step}
            </Typography>
            <Typography>{value.direction}</Typography>
            <Box
                component="img"
                src={img}
                sx={{
                    borderRadius: 8,
                    objectFit: 'cover',
                }}
            ></Box>

            {!last && <Divider />}
        </Stack>
    );
};

export default DirectionItem;
