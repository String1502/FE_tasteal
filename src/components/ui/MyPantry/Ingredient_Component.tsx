import { Suspense, useEffect, useState } from 'react';
import { IngredientsCarousel } from './IngredientsCarousel';
import { CarouselPrimaryCardSkeleton } from './CarouselPrimaryCardSkeleton';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import IngredientService from '@/lib/services/ingredientService';

interface IngredientComponentProps {
  ingredients: IngredientEntity[];
}

const Ingredient_Component: React.FC<IngredientComponentProps> = ({ ingredients }) => {
    const [loading, setLoading] = useState(true);
    const [ingredient, setIngredient] = useState<IngredientEntity[] | undefined>(undefined);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Here you can set the loading state to true before fetching data
          setLoading(true);
    
          let newIngredients: IngredientEntity[];
    
          // Check if the ingredients prop is provided and not empty
          if (ingredients && ingredients.length > 0) {
            // Fetch specific ingredients based on the prop
            newIngredients = ingredients;
          } else {
            // Fetch all ingredients using IngredientService.GetAll()
            newIngredients = await IngredientService.GetAll();
          }
    
          // Update the ingredient state with the new array
          setIngredient(newIngredients);
    
          // After fetching data, set the loading state to false
          setLoading(false);
        } catch (error) {
          console.log(error);
          setIngredient([]);
          setLoading(false);
        }
      };
    
      fetchData();
    }, [ingredients]); // Watch for changes in the ingredients prop

  return (
    <>
      {loading && <CarouselPrimaryCardSkeleton />}

      {!loading && (
        <Suspense fallback={<CarouselPrimaryCardSkeleton />}>
          <IngredientsCarousel array={ingredient || []} />
        </Suspense>
      )}
    </>
  );
}

export default Ingredient_Component;
