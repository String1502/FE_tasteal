import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CartItemFrame from './CartItemFrame';
import CartItemCheckBox from './CartItemCheckBox';
import IngredientTypeService from '@/lib/services/ingredientTypeService';

function CartItemContent({
  cartItemData,
  handleChangeCartItemData,
}: {
  cartItemData: Cart_ItemEntity[];
  handleChangeCartItemData: (cartId: number, ingredientId: number) => void;
}) {
  const [ingredientTypes, setIngredientTypes] = useState<
    Ingredient_TypeEntity[]
  >([]);
  const [ingredientTypeData, setIngredientTypeData] = useState<
    (Ingredient_TypeEntity | null)[]
  >([]);

  console.log(cartItemData);

  useEffect(() => {
    const type_ids: Ingredient_TypeEntity['id'][] = cartItemData.map(
      (item) => item.ingredient?.type_id
    );
    console.log(type_ids);

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
              {cartItemData.map((item, index) => {
                if (
                  ((!type && !item.ingredient.type_id) ||
                    (type &&
                      item.ingredient.type_id &&
                      item.ingredient.type_id == type.id)) &&
                  !item.isBought
                ) {
                  return (
                    <CartItemCheckBox
                      key={index}
                      item={item}
                      total={() => {
                        let total = 0;
                        cartItemData.forEach((x) => {
                          if (x.ingredient_id == item.ingredient_id) {
                            total += x.amount;
                          }
                        });
                        return total;
                      }}
                      handleChangeCartItemData={handleChangeCartItemData}
                    />
                  );
                }
              })}
            </CartItemFrame>
          </Grid>
        );
      })}
    </>
  );
}

export default CartItemContent;
