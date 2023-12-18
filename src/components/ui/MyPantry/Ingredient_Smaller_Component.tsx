import { Suspense, useEffect, useState } from 'react';
import { Ingredient_Smaller_Carousel } from './Ingredient_Smaller_Carousel';
import { CarouselPrimaryCardSkeleton } from './CarouselPrimaryCardSkeleton';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import IngredientService from '@/lib/services/ingredientService';
import { Box, Grid } from '@mui/material';
import { Primary_Smaller_Card } from './Primary_Smaller_Card';

interface IngredientComponentProps {
  ingredient: IngredientEntity;
}

const Ingredient_Smaller_Component: React.FC<IngredientComponentProps> = ({
  ingredient,
}) => {
  return (
    <>
      <Primary_Smaller_Card ingredient={ingredient} />
    </>
  );
};

export default Ingredient_Smaller_Component;
