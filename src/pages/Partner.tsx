import { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { FormatQuoteRounded, LanguageRounded } from "@mui/icons-material";
import Layout from "../layout/Layout";
import { PrimaryCard } from "../components/common/card/PrimaryCard.tsx";
import { RecipeEntity } from "@/lib/models/entities/RecipeEntity/RecipeEntity.ts";
import UserEditForm from "./UserEditForm";
import { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Box, Link } from '@mui/material';
import {
    EditRounded,
    FormatQuoteRounded,
    LanguageRounded,
} from '@mui/icons-material';
import Layout from '../layout/Layout';
import { PrimaryCard } from '../components/common/card/PrimaryCard.tsx';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity.ts';
import UserEditForm from './UserEditForm';
import MostContributedAuthors_Component from '@/components/ui/home/MostContributedAuthors_Component';
import RecipeService from '@/lib/services/recipeService.ts';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '@/lib/constants/common.ts';
import { localStorageAccountId } from '@/components/ui/home/AuthorCard.tsx';
import AppContext from '@/lib/contexts/AppContext.ts';

const itemsToAdd = 4;
const Partner = () => {
    const navigate = useNavigate();
    const {
        login: { user },
    } = useContext(AppContext);
    const [newReleaseRecipes, setNewReleaseRecipes] = useState<RecipeEntity[]>(
        []
    );
    const [visibleItems, setVisibleItems] = useState(8);
    const [name, setName] = useState('Healer');
    const [image, setImage] = useState(
        'https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg'
    );
    const [description, setDescription] = useState('Healer is so handsome.');
    const [philosophy, setPhilosophy] = useState('Healer is healer');
    const [website, setWebsite] = useState(
        'https://www.facebook.com/nmhieu.healer'
    );
    const [slogan, setSlogan] = useState('Healer always heals');

    const [isEditing, setIsEditing] = useState(false);

    const handleShowMore = () => {
        setVisibleItems(visibleItems + itemsToAdd);
    };

    const handleStartEditing = () => {
        setIsEditing(true);
    };

    const handleSave = (editedData) => {
        // Cập nhật thông tin người dùng với các giá trị mới
        setName(editedData.name);
        setImage(editedData.image);
        setDescription(editedData.description);
        setPhilosophy(editedData.philosophy);
        setWebsite(editedData.website);
        setSlogan(editedData.slogan);

        // Tắt chế độ chỉnh sửa
        setIsEditing(false);
    };

    useEffect(() => {
        // Load new release recipes when the component mounts
        loadNewReleaseRecipes();

        let uid = localStorage.getItem(localStorageAccountId);

        if (!uid && user) {
            uid = user.uid;
        }

        // fetchAPI user infor

        localStorage.removeItem(localStorageAccountId);
    }, []);

    const loadNewReleaseRecipes = async () => {
        try {
            const recipes = await RecipeService.GetTrendingRecipes(100);
            setNewReleaseRecipes(recipes);
        } catch (error) {
            console.error('Error loading new release recipes:', error);
        }
    };

    return (
        <Layout>
            <Container>
                <Grid
                    container
                    spacing={6}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        mb: 6,
                        mt: 4,
                    }}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Grid
                            container
                            spacing={6}
                        >
                            <Grid
                                item
                                xs={12}
                                lg={5}
                            >
                                <img
                                    src={image}
                                    alt="Hình ảnh"
                                    style={{
                                        width: '100%',
                                        height: '500px',
                                        borderRadius: '5%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                lg={7}
                            >
                                {isEditing ? (
                                    <UserEditForm
                                        name={name}
                                        image={image}
                                        description={description}
                                        philosophy={philosophy}
                                        website={website}
                                        slogan={slogan}
                                        onSave={handleSave}
                                        uid="13b865f7-d6a6-4204-a349-7f379b232f0c"
                                        onCancel={() => setIsEditing(false)}
                                    />
                                ) : (
                                    <>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 800,
                                                height: 'auto',
                                                color: 'primary',
                                                mb: 1,
                                            }}
                                        >
                                            {slogan}
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 800,
                                                color: 'primary',
                                                mb: 1,
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight={'light'}
                                            sx={{
                                                color: 'grey.800',
                                                mb: 2,
                                            }}
                                        >
                                            {description}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                            fontWeight={800}
                                            sx={{
                                                mb: 2,
                                            }}
                                        >
                                            <FormatQuoteRounded
                                                sx={{
                                                    color: 'grey.600',
                                                    rotate: '180deg',
                                                    mr: 1,
                                                }}
                                            />
                                            {philosophy}
                                            <FormatQuoteRounded
                                                sx={{
                                                    color: 'grey.600',
                                                    ml: 1,
                                                }}
                                            />
                                        </Typography>

                                        <Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <LanguageRounded
                                                color="primary"
                                                fontSize="small"
                                                sx={{
                                                    mr: 1,
                                                }}
                                            />
                                            <Link
                                                href={website}
                                                variant="caption"
                                                color={'primary'}
                                                fontWeight={'bold'}
                                            >
                                                {website}
                                            </Link>
                                        </Box>

                                        <Button
                                            onClick={handleStartEditing}
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                mt: 2,
                                                textTransform: 'none',
                                                px: 3,
                                            }}
                                            startIcon={<EditRounded />}
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={'800'}
                        >
                            Tất cả công thức của {name}
                        </Typography>

                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                            sx={{
                                mt: 3,
                            }}
                        >
                            {newReleaseRecipes
                                .slice(0, visibleItems)
                                .map((item, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        key={index}
                                    >
                                        <PrimaryCard
                                            recipe={item as RecipeEntity}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                        {visibleItems < newReleaseRecipes.length && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    onClick={handleShowMore}
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
                    </Grid>
                </Grid>
            </Container>

            <Box
                sx={{
                    backgroundColor: 'secondary.main',
                    py: 6,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Box>
                            <Typography
                                variant="body1"
                                fontWeight={'800'}
                                sx={{
                                    width: '100%',
                                    textTransform: 'capitalize',
                                }}
                            >
                                Những tác giả khác
                            </Typography>
                            <Typography
                                variant="body2"
                                fontWeight={'light'}
                                sx={{
                                    width: '100%',
                                }}
                            >
                                Gặp gỡ cộng đồng các chuyên gia ẩm thực, người
                                viết blog ẩm thực cho đến các đầu bếp bậc thầy
                                của chúng tôi từ khắp nơi trên thế giới.
                            </Typography>
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontStyle: 'italic',
                                textTransform: 'uppercase',
                                width: '150px',
                                textAlign: 'right',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    color: 'grey.600',
                                },
                            }}
                            onClick={() => {
                                navigate(PageRoute.AllPartner);
                            }}
                        >
                            Xem tất cả
                        </Typography>
                    </Box>
                    <MostContributedAuthors_Component />
                </Container>
            </Box>
        </Layout>
    );
};

export default Partner;
