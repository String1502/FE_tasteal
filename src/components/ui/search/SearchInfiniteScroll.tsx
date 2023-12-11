import { Box, CircularProgress, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

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
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            py: 4,
                        }}
                    >
                        <CircularProgress
                            size={24}
                            sx={{
                                color: 'grey.400',
                            }}
                        />
                        <Typography
                            variant="body1"
                            fontWeight={'bold'}
                            sx={{
                                color: 'grey.400',
                            }}
                        >
                            Chờ một chút...
                        </Typography>
                    </Box>
                </>
            }
            endMessage={
                <>
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{
                            width: '100%',
                            mt: 4,
                            color: 'grey.400',
                        }}
                    >
                        Không còn công thức phù hợp! :(
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
