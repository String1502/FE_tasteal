import BoxImage from '@/components/common/image/BoxImage';
import { PageRoute } from '@/lib/constants/common';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const localStorageAccountId = 'accountId';

export const AuthorCard = ({ author }: { author: AccountEntity }) => {
    const navigate = useNavigate();
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    localStorage.setItem(localStorageAccountId, author.uid);
                    navigate(PageRoute.Partner(author.name));
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        aspectRatio: '1/1.3',
                        borderRadius: 6,
                        boxShadow: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        mb: 2,
                    }}
                >
                    <BoxImage
                        src={author?.avatar ?? ''}
                        sx={{
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.2) ',
                            },
                        }}
                    />
                </Box>
                <Typography
                    variant="body2"
                    fontWeight={'regular'}
                    fontStyle={'italic'}
                    whiteSpace={'nowrap'}
                    textOverflow={'ellipsis'}
                    textTransform={'uppercase'}
                    overflow={'hidden'}
                    width={'100%'}
                >
                    {!author.slogan || author.slogan == ''
                        ? 'TASTEAL AUTHOR'
                        : author.slogan}
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={'bold'}
                    whiteSpace={'nowrap'}
                    textOverflow={'ellipsis'}
                    overflow={'hidden'}
                    width={'100%'}
                    sx={{
                        my: 1.5,
                    }}
                >
                    {!author.name || author.name == ''
                        ? 'Vô danh'
                        : author.name}
                </Typography>
                <Typography
                    variant="body2"
                    textOverflow={'ellipsis'}
                    overflow={'hidden'}
                    width={'100%'}
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: '6',
                        WebkitBoxOrient: 'vertical',
                        height: '150.13px',
                    }}
                >
                    {!author.introduction || author.introduction == ''
                        ? 'Nếu được chọn một lần nữa, có lẽ tôi vẫn chọn như vậy. '
                        : author.introduction}
                </Typography>
            </Box>
        </>
    );
};
