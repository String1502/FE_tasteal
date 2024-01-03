import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import { CardActionArea, CardProps } from '@mui/material';
import React from 'react';
import CustomCard from './CustomCard';
import ImageRecipe from './ImageRecipe';

function DetailCard({
  occasion,
  children,
  ...props
}: {
  props?: CardProps;
  children?: React.ReactNode;
  occasion: OccasionEntity;
}) {
  return (
    <>
      <CustomCard {...props}>
        <CardActionArea>
          <ImageRecipe
            imgHeight={'360px'}
            src={occasion.image}
            alt={occasion.name}
            quality={80}
          />
        </CardActionArea>
        {children}
      </CustomCard>
    </>
  );
}

export default DetailCard;
