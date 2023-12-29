import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
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
