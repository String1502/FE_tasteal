import { PageRoute } from '@/lib/constants/common';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import AccountService from '@/lib/services/accountService';
import CookbookService from '@/lib/services/cookbookService';
import {
    BookmarkBorderRounded,
    BookmarkRounded,
    PlayArrowRounded,
    StarRounded,
} from '@mui/icons-material';
import {
    Box,
    Button,
    CardActionArea,
    CardContent,
    CardProps,
    Checkbox,
    CheckboxProps,
    ListItemIcon,
    Menu,
    MenuItem,
    Rating,
    Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoxImage from '../image/BoxImage';
import CustomCard from './CustomCard';
import TotalTimeRecipe from './TotalTimeRecipe';
import AvatarRecipe from './AvatarRecipe';
import RatingRecipe from './RatingRecipe';
import NameRecipe from './NameRecipe';
import ImageRecipe from './ImageRecipe';

export const imgHeight = '224px';
export const padding = 2;

export function PrimaryCard({
    recipe,
    saveCheckBoxProps,
    ...props
}: {
    props?: CardProps;
    saveCheckBoxProps?: CheckboxProps;
    recipe: RecipeEntity;
}) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [Cookbooks, setCookbooks] = useState<CookBookEntity[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const account = await AccountService.GetByUid('1');
                const cookbooks = await CookbookService.GetCookbooksByAccountId(
                    account.uid
                );
                setCookbooks(cookbooks);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleCardClick = useCallback(() => {
        navigate(PageRoute.Recipe.Detail(recipe.id));
    }, [navigate, recipe.id]);

    return (
        <>
            <CustomCard {...props}>
                <CardActionArea onClick={handleCardClick}>
                    <ImageRecipe
                        imgHeight={imgHeight}
                        recipe={recipe}
                        quality={80}
                    />
                    <TotalTimeRecipe
                        imgHeight={imgHeight}
                        padding={padding}
                        totalTime={recipe.totalTime}
                    />

                    <AvatarRecipe
                        imgHeight={imgHeight}
                        padding={padding}
                        quality={10}
                        account={recipe.account}
                    />
                </CardActionArea>

                <Checkbox
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: padding * 8,
                        right: padding * 8,
                        zIndex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        color: 'white',
                        transition: 'all 0.1s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            transform: 'scale(1.15)',
                        },
                    }}
                    icon={<BookmarkBorderRounded sx={{ color: 'white' }} />}
                    checkedIcon={<BookmarkRounded sx={{ color: 'white' }} />}
                    onClick={(e: any) => {
                        e.preventDefault();
                        handleClick(e);
                    }}
                    {...saveCheckBoxProps}
                />

                <CardContent
                    sx={{
                        p: padding,
                    }}
                >
                    <RatingRecipe rating={recipe.rating} />

                    <NameRecipe name={recipe.name} />

                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: '40px',
                            mt: 2,
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 'bold' }}
                        >
                            Thêm vào giỏ đi chợ
                        </Typography>
                    </Button>
                </CardContent>
            </CustomCard>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            background: 'white',
                            borderRadius: 4,
                            width: '200px',
                        },
                    },
                }}
            >
                {Cookbooks.map((cookbook) => {
                    return (
                        <MenuItem
                            key={cookbook.id}
                            onClick={handleClose}
                        >
                            <ListItemIcon>
                                <PlayArrowRounded
                                    color="primary"
                                    fontSize="small"
                                />
                            </ListItemIcon>
                            <Typography
                                variant="body2"
                                color="primary"
                                fontWeight={'bold'}
                                whiteSpace={'nowrap'}
                                textOverflow={'ellipsis'}
                                overflow={'hidden'}
                            >
                                {cookbook.name}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}
