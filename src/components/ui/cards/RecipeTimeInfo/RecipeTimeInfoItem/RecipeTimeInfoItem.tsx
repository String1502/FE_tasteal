import { dateTimeToMinutes } from '@/utils/format';
import { Typography } from '@mui/material';
import { FC } from 'react';

export type RecipeTimeInfoItemProps = {
    time: number;
    type: 'total' | 'active';
};

const RecipeTimeInfoItem: FC<RecipeTimeInfoItemProps> = ({ time, type }) => {
    return (
        <>
            <Typography
                typography={'h6'}
                fontWeight={'bolder'}
            >
                {time} phút
            </Typography>

            {type === 'total' ? (
                <Typography
                    color={'gray.main'}
                    fontStyle={'italic'}
                >
                    Tổng thời gian
                </Typography>
            ) : (
                <Typography
                    color={'gray.main'}
                    fontStyle={'italic'}
                >
                    Thời gian thực
                </Typography>
            )}
        </>
    );
};

export default RecipeTimeInfoItem;
