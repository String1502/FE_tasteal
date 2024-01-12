import BoxImage from '@/components/common/image/BoxImage';
import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import {
  CheckCircleRounded,
  ExpandMore,
  RadioButtonUncheckedRounded,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Stack,
  Typography,
  TypographyProps,
} from '@mui/material';
import CartItemCheckBox from './CartItemCheckBox';
import CartItemService from '@/lib/services/CartItemService';
import useSnackbarService from '@/lib/hooks/useSnackbar';
const typoProps: TypographyProps = {
  variant: 'body2',
  fontWeight: 'light',
  sx: {
    width: '100%',
  },
};
function CartItemNotBoughtContent({
  type,
  cartItemData,
  array,
  handleChangeCartItemData,
  handleChangeCartItemsData,
  total,
  mightHave,
  pantryItems,
  soMon,
}: {
  type: Ingredient_TypeEntity;
  cartItemData: Cart_ItemEntity[];
  array: Cart_ItemEntity[];
  handleChangeCartItemData: (cartId: number, ingredientId: number) => void;
  handleChangeCartItemsData: (cartIds: number[], ingredientId: number) => void;
  total: number;
  mightHave: {
    state: boolean;
    amount: number;
  };
  pantryItems: Pantry_ItemEntity[];
  soMon: Cart_ItemEntity[];
}) {
  const [snackbarAlert] = useSnackbarService();

  return (
    <Accordion
      disableGutters
      elevation={0}
      TransitionProps={{ unmountOnExit: true }}
      sx={{
        boxShadow: 'none',
        bgcolor: 'transparent',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          bgcolor: 'grey.100',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          sx={{
            width: '100%',
          }}
        >
          <BoxImage
            src={array[0].ingredient?.image}
            quality={1}
            sx={{
              height: '60px',
              width: '60px',
              objectFit: 'contain',
              borderRadius: '50%',
              mr: 2,
            }}
          />

          <Box
            sx={{
              flexGrow: 1,
              height: 'fit-content',
            }}
          >
            <Typography {...typoProps} fontWeight={900}>
              {array[0].ingredient?.name}
            </Typography>

            <Typography {...typoProps}>
              {soMon.length} món: {Math.ceil(total)}
              {array[0]?.ingredient.isLiquid ? ' (ml)' : ' (g)'}
              {pantryItems && mightHave?.state ? (
                <Typography
                  component={'span'}
                  variant="caption"
                  sx={{
                    color: 'white',
                    bgcolor: 'primary.main',
                    px: 0.8,
                    py: 0.4,
                    ml: 1,
                    borderRadius: '6px',
                  }}
                >
                  Tủ lạnh có đủ
                </Typography>
              ) : mightHave?.state == false ? (
                <Typography
                  component={'span'}
                  variant="caption"
                  sx={{
                    color: 'white',
                    bgcolor: 'primary.light',
                    px: 0.8,
                    py: 0.4,
                    ml: 1,
                    borderRadius: '6px',
                  }}
                >
                  Tủ lạnh có {mightHave?.amount}
                  {array[0]?.ingredient.isLiquid ? 'ml' : 'g'}
                </Typography>
              ) : (
                ''
              )}
            </Typography>
          </Box>

          <Checkbox
            icon={<RadioButtonUncheckedRounded />}
            checkedIcon={<CheckCircleRounded />}
            onChange={async () => {
              const ids = array.map((x) => x.cartId);
              handleChangeCartItemsData(ids, array[0].ingredient_id);

              try {
                await Promise.all(
                  ids.map(
                    async (x) =>
                      await CartItemService.UpdateCartItem(
                        x,
                        array[0].ingredient_id,
                        true
                      )
                  )
                ).then(() => {
                  snackbarAlert('Cập nhật thành công!', 'success');
                });
              } catch (error) {
                console.log(error);
                snackbarAlert('Thao tác không thành công.', 'error');
              }
            }}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {array.map((item, y) => {
            if (
              ((!type && !item.ingredient.type_id) ||
                (type &&
                  item.ingredient.type_id &&
                  item.ingredient.type_id == type.id)) &&
              !item.isBought
            ) {
              return (
                <CartItemCheckBox
                  key={y}
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
                  shorten={true}
                />
              );
            }
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default CartItemNotBoughtContent;
