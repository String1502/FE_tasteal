import { Suspense, useEffect, useState } from 'react';
import { IngredientsCarousel } from './IngredientsCarousel';
import { CarouselPrimaryCardSkeleton } from './CarouselPrimaryCardSkeleton';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import  IngredientService  from '@/lib/services/ingredientService';
interface IngredientComponentProps {
    ingredients: IngredientEntity[];
  }
  const Ingredient_Component: React.FC<IngredientComponentProps> = ({ ingredients }) => {
    const [ingredient, setIngredient] = useState<IngredientEntity[] | undefined>(
        undefined
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIngredient(await IngredientService.GetAll());
            } catch (error) {
                console.log(error);
                setIngredient([]);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {!ingredient && <CarouselPrimaryCardSkeleton />}

            {ingredient && (
                <Suspense fallback={<CarouselPrimaryCardSkeleton />}>
                    <IngredientsCarousel array={ingredient} />
                </Suspense>
            )}
        </>
    );
}

export default Ingredient_Component;
