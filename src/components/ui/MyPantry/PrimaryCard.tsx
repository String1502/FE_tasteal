import { PageRoute } from '@/lib/constants/common';
import AccountService from '@/lib/services/accountService';
import { CardActionArea, CardContent, CardProps, Radio } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCard from './CustomCard';
import NameIngredient from './NameIngredient';
import ImageIngredient from './ImageIngredient';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { DoneRounded } from '@mui/icons-material';

export const imgHeight = '200px';
export const padding = 2;

export function PrimaryCard({
    ingredient: ingredient,
    saveCheckBoxProps,
    ...props
}: {
    props?: CardProps;
    saveCheckBoxProps?: any; // Updated to any, as it can be used for Radio now
    ingredient: IngredientEntity;
}) {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const handleCardClick = useCallback(() => {
        navigate(PageRoute.Recipe.Detail(ingredient.id));
    }, [navigate, ingredient.id]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // Handle your click event here
        // Toggle the checked state
        setChecked(!checked);
    };

    return (
        <CustomCard {...props}>
            <CardActionArea onClick={handleCardClick}>
                <ImageIngredient
                    imgHeight={imgHeight}
                    src={ingredient.image}
                    alt={ingredient.name}
                    quality={80}
                />
            </CardActionArea>

            <Radio
                size="12px"
                icon={<span />} // Transparent circle initially
                checkedIcon={
                    <DoneRounded sx={{ color: 'black', fontSize: '12px' }} />
                } // DoneRounded when checked
                checked={checked}
                onClick={handleClick}
                {...saveCheckBoxProps}
                sx={{
                    position: 'absolute',
                    top: padding * 8,
                    right: padding * 8,
                    zIndex: 1,
                    backgroundColor: checked
                        ? 'rgba(255, 255, 255, 0.8)'
                        : '(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '50%', // Make it circular
                    border: '1px solid black', // Black border
                    transition: 'all 0.1s ease-in-out',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        color: 'white',
                        transform: 'scale(1.15)',
                    },
                }}
            />

            <CardContent
                sx={{
                    p: padding,
                    justifyContent: 'space-between',
                }}
            >
                <NameIngredient name={ingredient.name} />
            </CardContent>
        </CustomCard>
    );
}
