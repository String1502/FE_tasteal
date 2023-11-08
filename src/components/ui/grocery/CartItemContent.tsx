import { Cart_ItemEntity } from "@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity";
import { Ingredient_TypeEntity } from "@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CartItemFrame from "./CartItemFrame";
import CartItemCheckBox from "./CartItemCheckBox";

function CartItemContent({
  cartItemData,
  handleChangeCartItemData,
}: {
  cartItemData: Cart_ItemEntity[];
  handleChangeCartItemData: (cartId: number, ingredientId: number) => void;
}) {
  const [ingredientTypeData, setIngredientTypeData] = useState<
    Ingredient_TypeEntity[]
  >([]);

  useEffect(() => {
    let ingredientTypes: Ingredient_TypeEntity[] = [];
    if (cartItemData.length > 0) {
      cartItemData.forEach((item) => {
        if (item.ingredient?.ingredient_type) {
          ingredientTypes.push(item.ingredient.ingredient_type);
        }
      });
      ingredientTypes = ingredientTypes.filter(function (item, pos) {
        return ingredientTypes.indexOf(item) == pos;
      });
      setIngredientTypeData(ingredientTypes);
    }
  }, [cartItemData]);

  return (
    <>
      {ingredientTypeData.map((type, i) => {
        return (
          <Grid key={i} item xs={12} lg={8}>
            <CartItemFrame label={type.name}>
              {cartItemData.map((item, index) => {
                if (item.ingredient?.type_id == type.id && !item.isBought) {
                  return (
                    <CartItemCheckBox
                      key={index}
                      item={item}
                      total={() => {
                        let total = 0;
                        cartItemData.forEach((x) => {
                          if (x.ingredientId == item.ingredientId) {
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
