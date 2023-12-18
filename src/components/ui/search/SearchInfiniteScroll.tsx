import { Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderInfiniteScroll from './LoaderInfiniteScroll';

export function SearchInfiniteScroll({
    loadNext,
    dataLenght,
    end,
    children,
}: {
    loadNext?: () => Promise<void>;
    dataLenght: number;
    end: boolean;
    children: React.ReactNode;
}) {
    return (
        <InfiniteScroll
            // 3*2*2
            dataLength={dataLenght}
            next={loadNext}
            hasMore={!end}
            loader={
                <>
                    <LoaderInfiniteScroll />
                </>
            }
            endMessage={
                <>
                    <Typography
                        variant="body1"
                        align="center"
                        fontWeight={'bold'}
                        sx={{
                            width: '100%',
                            mt: 4,
                            color: 'grey.500',
                        }}
                    >
                        {dataLenght == 0
                            ? 'Hệ thống chưa có công thức phù hợp!'
                            : 'Đã hiển thị toàn bộ công thức phù hợp!'}
                    </Typography>
                </>
            }
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                margin: -1,
                overflow: 'visible',
            }}
        >
            {children}
        </InfiniteScroll>
    );
}
