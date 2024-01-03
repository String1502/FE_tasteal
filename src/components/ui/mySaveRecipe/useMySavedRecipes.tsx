import { useCallback, useEffect, useState } from 'react';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import CookbookService from '@/lib/services/cookbookService';
import CookbookRecipeService from '@/lib/services/cookbookRecipeService';
import { CookbookChoosingType } from '../../../pages/MySavedRecipes';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';

export function useMySavedRecipes(uid: AccountEntity['uid']) {
  const [cookbookData, setCookbookData] = useState<CookBookEntity[]>([]);
  console.log(cookbookData);

  const [choosing, setChoosing] = useState<CookbookChoosingType | undefined>(
    undefined
  );
  console.log(cookbookData);

  const handleChoosing = useCallback(async (cookbook: CookBookEntity) => {
    const recipes = await CookbookRecipeService.GetCookBookRecipeByCookBookId(
      cookbook.id
    );

    console.log(recipes);

    setChoosing({
      Cookbook: cookbook,
      CookbookRecipes: recipes,
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const cookbooks = await CookbookService.GetAllCookBookByAccountId(uid);
        setCookbookData(cookbooks);
        if (cookbooks.length > 0) {
          handleChoosing(cookbooks[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return {
    cookbookData,
    choosing,
    handleChoosing,
  };
}
