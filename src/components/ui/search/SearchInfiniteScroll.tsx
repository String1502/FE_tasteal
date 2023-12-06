import { Box, CircularProgress, Typography } from '@mui/material';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity.ts';
import InfiniteScroll from 'react-infinite-scroll-component';

export function SearchInfiniteScroll({
    viewportItemAmount,
    loadNext,
    resultIds,
    recipes,
    children,
}: {
    viewportItemAmount: number;
    loadNext: () => Promise<void>;
    resultIds: RecipeEntity['id'][];
    recipes: RecipeEntity[];
    children: React.ReactNode;
}) {
    return (
        <InfiniteScroll
            // 3*2*2
            dataLength={viewportItemAmount}
            next={loadNext}
            hasMore={resultIds.length != recipes.length}
            scrollableTarget="scrollableDiv"
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
                        }}
                    >
                        <CircularProgress
                            size={30}
                            color="primary"
                        />
                        <Typography
                            variant="body1"
                            fontWeight={'bold'}
                            color={'primary'}
                        >
                            Đang tải dữ liệu...
                        </Typography>
                    </Box>
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
                            mt: 6,
                            color: 'grey.600',
                        }}
                    >
                        Không còn công thức phù hợp!
                    </Typography>
                </>
            }
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexWrap: 'wrap',
                width: '100%',
                margin: -1,
                overflow: 'visible',
            }}
        >
            {children}
        </InfiniteScroll>
    );
}
