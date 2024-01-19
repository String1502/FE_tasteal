import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CartItemFrame from './CartItemFrame';

import IngredientTypeService from '@/lib/services/ingredientTypeService';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';

import CartItemNotBoughtContent from './CartItemNotBoughtContent';

function CartItemContent({
  cartItemData,
  handleChangeCartItemData,
  handleChangeCartItemsData,
  pantryItems,
}: {
  cartItemData: Cart_ItemEntity[];
  handleChangeCartItemData: (cartId: number, ingredientId: number) => void;
  handleChangeCartItemsData(cartIds: number[], ingredientId: number): void;
  pantryItems: Pantry_ItemEntity[];
}) {
  const [ingredientTypes, setIngredientTypes] = useState<
    Ingredient_TypeEntity[]
  >([]);
  const [ingredientTypeData, setIngredientTypeData] = useState<
    (Ingredient_TypeEntity | null)[]
  >([]);

  useEffect(() => {
    const type_ids: Ingredient_TypeEntity['id'][] = cartItemData.map(
      (item) => item.ingredient?.type_id
    );
    const types = ingredientTypes.filter((x) => type_ids.includes(x.id));
    if (type_ids.includes(null)) {
      types.push(null);
    }

    setIngredientTypeData(types);
  }, [cartItemData, ingredientTypes]);

  useEffect(() => {
    async function fetch() {
      try {
        const types = await IngredientTypeService.GetAllIngredientTypes();
        setIngredientTypes(types);
      } catch (error) {
        setIngredientTypes([]);
      }
    }
    fetch();
  }, []);

  return (
    <>
      {ingredientTypeData.map((type, i) => {
        return (
          <Grid key={i} item xs={12} lg={8}>
            <CartItemFrame label={type ? type.name : 'Khác'}>
              {cartItemData
                .reduce((result: Cart_ItemEntity[][], element) => {
                  const foundItem = result.find(
                    (item) => item[0].ingredient_id === element.ingredient_id
                  );
                  if (foundItem) {
                    foundItem.push(element);
                  } else {
                    result.push([element]);
                  }

                  return result;
                }, [])
                .map((x) =>
                  x.filter(
                    (x) =>
                      ((!type && !x.ingredient.type_id) ||
                        (type &&
                          x.ingredient.type_id &&
                          x.ingredient.type_id == type.id)) &&
                      !x.isBought
                  )
                )
                .map((array: Cart_ItemEntity[], u) => {
                  if (array.length == 0) {
                    return null;
                  }

                  console.log(array);

                  const first = array[0];
                  const soMon = cartItemData.filter(
                    (x) => x.ingredient_id == first.ingredient_id
                  );

                  const total: number = soMon.reduce((a, b) => a + b.amount, 0);

                  const mightHave = checkMightHave(
                    pantryItems.find(
                      (p) => p.ingredient_id === first.ingredient_id
                    ),
                    first,
                    total
                  );

                  return (
                    <CartItemNotBoughtContent
                      key={u}
                      type={type}
                      cartItemData={cartItemData}
                      array={array}
                      handleChangeCartItemData={handleChangeCartItemData}
                      handleChangeCartItemsData={handleChangeCartItemsData}
                      total={total}
                      mightHave={mightHave}
                      pantryItems={pantryItems}
                      soMon={soMon}
                    />
                  );
                })}
            </CartItemFrame>
          </Grid>
        );
      })}
    </>
  );
}

export default CartItemContent;

function checkMightHave(
  pantryItem: Pantry_ItemEntity | undefined,
  cartItem: Cart_ItemEntity,
  total: number
) {
  if (!pantryItem) {
    return undefined;
  }
  if (pantryItem.ingredient_id === cartItem.ingredient_id) {
    if (pantryItem.amount >= total) {
      return { state: true, amount: 0 };
    } else {
      return { state: false, amount: pantryItem.amount };
    }
  }

  return undefined;
}
