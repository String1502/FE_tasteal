import BoxImage from '@/components/common/image/BoxImage';
import { Direction } from '@/lib/models/dtos/common';
import { Divider, Stack, Typography } from '@mui/material';
import { FC } from 'react';

type DirectionItemProps = {
    value: Omit<Direction, 'recipe_id'>;
    last?: boolean;
};

const DirectionItem: FC<DirectionItemProps> = ({ value, last = false }) => {
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

            <BoxImage
                src={value.image}
                quality={100}
                sx={{
                    borderRadius: 8,
                    objectFit: 'cover',
                }}
            />
            {!last && <Divider />}
        </Stack>
    );
};

export default DirectionItem;
