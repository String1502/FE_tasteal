import BoxImage from '@/components/common/image/BoxImage';
import { Direction } from '@/lib/models/dtos/common';
import { Divider, Stack, Typography } from '@mui/material';
import { FC, useCallback } from 'react';

type DirectionItemProps = {
    value: Omit<Direction, 'recipe_id'>;
    onImageClick?: () => void;
    last?: boolean;
};

const DirectionItem: FC<DirectionItemProps> = ({
    value,
    last = false,
    onImageClick,
}) => {
    const handleImageClick = useCallback(() => {
        if (value.image && onImageClick) {
            onImageClick();
        }
    }, [onImageClick, value.image]);

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

            {value.image ? (
                <BoxImage
                    src={value.image}
                    quality={100}
                    onClick={handleImageClick}
                    sx={{
                        width: '100%',
                        height: '400px',
                        borderRadius: 4,
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        boxSizing: 'border-box',
                        ':hover': {
                            transform: 'scale(1.05)',
                            outline: '2px solid',
                            outlineOffset: '2px',
                            cursor: 'pointer',
                        },
                    }}
                />
            ) : null}

            {!last && <Divider />}
        </Stack>
    );
};

export default DirectionItem;
