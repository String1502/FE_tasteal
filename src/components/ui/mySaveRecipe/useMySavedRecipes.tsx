import { useContext, useEffect, useState } from 'react';
import CookbookService from '@/lib/services/cookbookService';
import CookbookRecipeService from '@/lib/services/cookbookRecipeService';
import { CookbookChoosingType } from '../../../pages/MySavedRecipes';
import AppContext from '@/lib/contexts/AppContext';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import { CookBook_RecipeEntity } from '@/lib/models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity';

export function useMySavedRecipes() {
  const [cookbookData, setCookbookData] = useState<CookbookChoosingType[]>([]);

  const [choosing, setChoosing] = useState<CookbookChoosingType | undefined>(
    undefined
  );

  const { login, handleSpinner } = useContext(AppContext);

  const handleChoosing = (cookbook: CookbookChoosingType) => {
    setChoosing(cookbook);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (!login.user || !login.user?.uid) {
          return;
        }
        handleSpinner(true);
        const cookbooks = await CookbookService.GetAllCookBookByAccountId(
          login.user.uid
        );

        console.log(cookbooks);

        const recipes = await Promise.all(
          cookbooks.map(
            async (cookbook) =>
              await CookbookRecipeService.GetCookBookRecipeByCookBookId(
                cookbook.id
              )
          )
        ).then((data) => data);

        const final = cookbooks.map((cookbook, index) => ({
          Cookbook: cookbook,
          CookbookRecipes: recipes[index],
        }));
        setCookbookData(final);
        if (final.length > 0) {
          handleChoosing(final[0]);
        }
        handleSpinner(false);
      } catch (error) {
        console.log(error);
        handleSpinner(false);
      }
    }
    fetchData();
  }, [login.user]);

  const handleChangeCookbook = (
    type: 'edit' | 'remove' | 'add',
    cookbook: CookBookEntity
  ) => {
    if (type == 'edit') {
      setCookbookData(
        cookbookData.map((item) => {
          if (item.Cookbook.id == cookbook.id) {
            return {
              Cookbook: cookbook,
              CookbookRecipes: item.CookbookRecipes,
            };
          }
          return item;
        })
      );

      if (choosing?.Cookbook.id == cookbook.id) {
        setChoosing((prev) => {
          if (prev) {
            return {
              Cookbook: cookbook,
              CookbookRecipes: prev.CookbookRecipes,
            };
          }
        });
      }
    } else if (type == 'remove') {
      const newCookbookData = cookbookData.filter(
        (item) => item.Cookbook.id != cookbook.id
      );
      setCookbookData(newCookbookData);
      if (choosing?.Cookbook.id == cookbook.id) {
        if (newCookbookData.length > 0) {
          setChoosing(newCookbookData[0]);
        } else {
          setChoosing(undefined);
        }
      }
    } else if (type == 'add') {
      setCookbookData([
        ...cookbookData,
        {
          Cookbook: cookbook,
          CookbookRecipes: [],
        },
      ]);
    }
  };

  const handleChangeRecipeInCookbook = (
    type: 'move' | 'remove',
    cookbook_recipe: CookBook_RecipeEntity,
    newIdCookBook?: CookBookEntity['id']
  ) => {
    if (type == 'remove') {
      setCookbookData(
        cookbookData.map((item) => {
          if (item.Cookbook.id == cookbook_recipe.cook_book_id) {
            return {
              ...item,
              CookbookRecipes: item.CookbookRecipes.filter(
                (item) => item.id != cookbook_recipe.id
              ),
            };
          }
          return item;
        })
      );

      if (choosing?.Cookbook.id == cookbook_recipe.cook_book_id) {
        setChoosing((prev) => {
          if (prev) {
            return {
              ...prev,
              CookbookRecipes: prev.CookbookRecipes.filter(
                (item) => item.id != cookbook_recipe.id
              ),
            };
          }
        });
      }
    }

    if (type == 'move' && newIdCookBook) {
      setCookbookData(
        cookbookData.map((item) => {
          if (item.Cookbook.id == cookbook_recipe.cook_book_id) {
            return {
              ...item,
              CookbookRecipes: item.CookbookRecipes.filter(
                (item) => item.id != cookbook_recipe.id
              ),
            };
          }
          if (item.Cookbook.id == newIdCookBook) {
            const isExist = item.CookbookRecipes.find(
              (item) => item.id == cookbook_recipe.id
            );
            if (!isExist) {
              return {
                ...item,
                CookbookRecipes: [
                  ...item.CookbookRecipes,
                  {
                    ...cookbook_recipe,
                    cook_book_id: newIdCookBook,
                    cook_book: item.Cookbook,
                  },
                ],
              };
            } else {
              return item;
            }
          }
          return item;
        })
      );

      if (choosing?.Cookbook.id == cookbook_recipe.cook_book_id) {
        setChoosing((prev) => {
          if (prev) {
            return {
              ...prev,
              CookbookRecipes: prev.CookbookRecipes.filter(
                (item) => item.id != cookbook_recipe.id
              ),
            };
          }
        });
      }
    }
  };

  return {
    cookbookData,
    choosing,
    handleChoosing,
    handleChangeCookbook,
    handleChangeRecipeInCookbook,
  };
}
