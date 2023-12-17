import TastealBreadCrumbs from '@/components/common/breadcrumbs/TastealBreadcrumbs';
import { AuthorCard } from '@/components/ui/home/AuthorCard';
import Layout from '@/layout/Layout';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import AccountService from '@/lib/services/accountService';
import { Box, Button, Container, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

const breadCrumbsLinks = [
    {
        href: '/',
        label: 'Tasteal',
    },
    {
        label: 'Tác Giả',
    },
];

const viewportItemAmount = 15;

export function AllPartner() {
    const [authors, setAuthors] = useState<AccountEntity[]>([]);
    const [end, setEnd] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getAuthors = async () => {
            const authors = await AccountService.GetAllUser(
                viewportItemAmount,
                page + 1
            );
            setAuthors(authors.slice(0, viewportItemAmount));
        };
        getAuthors();
    }, []);

    const loadNext = useCallback(async () => {
        let nextData: AccountEntity[] = [];
        nextData = await AccountService.GetAllUser(
            viewportItemAmount,
            page + 1
        );
        if (nextData.length == 0) {
            setEnd(true);
            return;
        }

        setPage((prev) => prev + 1);
        setAuthors((prev) => [...prev, ...nextData]);
    }, [authors]);

    return (
        <Layout>
            <Container>
                <Box sx={{ mt: 4, mb: 8 }}>
                    <TastealBreadCrumbs links={breadCrumbsLinks} />
                    <Typography
                        variant="h5"
                        fontWeight={'bold'}
                        textTransform={'capitalize'}
                        sx={{
                            mt: 2,
                        }}
                    >
                        Những người sáng tạo công thức nấu ăn của chúng tôi
                    </Typography>
                    <Typography
                        variant="body1"
                        fontWeight={'light'}
                        sx={{
                            width: '100%',
                            mt: 2,
                            mb: 4,
                        }}
                    >
                        Gặp gỡ cộng đồng các chuyên gia ẩm thực, người viết blog
                        ẩm thực cho đến các đầu bếp bậc thầy của chúng tôi từ
                        khắp nơi trên thế giới.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            flexWrap: 'wrap',
                            margin: -1,
                            overflow: 'visible',
                        }}
                    >
                        {authors.map((item) => (
                            <Box
                                key={item.uid}
                                sx={{
                                    p: 1,
                                    width: {
                                        xs: 'calc(100%/2)',
                                        sm: 'calc(100%/3)',
                                        md: 'calc(100%/4)',
                                        lg: 'calc(100%/5)',
                                    },
                                }}
                            >
                                <AuthorCard author={item} />
                            </Box>
                        ))}
                    </Box>
                    {!end && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                onClick={loadNext}
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    px: 4,
                                    mt: 5,
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                }}
                            >
                                Hiện thêm
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </Layout>
    );
}
