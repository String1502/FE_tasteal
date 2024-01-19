import { Box, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { SearchTextField } from '../search/SearchTextField';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import IngredientTypeService from '@/lib/services/ingredientTypeService';
import { BoxIngredientType } from './BoxIngredientType';
import { BoxIngredientTypeSkeleton } from './BoxIngredientTypeSkeleton';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import { removeDiacritics } from '@/utils/format';
import SlideInDialog from '@/components/common/dialog/SlideInDialog';
import { AddIngredient } from './AddIngredient';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { NumericFormat } from 'react-number-format';

export type DisplayPantryItem = {
  ingredientType?: Ingredient_TypeEntity;
  ingredients: Pantry_ItemEntity[];
};

function PantryContent({
  pantryItems,
  hanlePantryItemsChange,
}: {
  pantryItems: Pantry_ItemEntity[];
  hanlePantryItemsChange: (
    type: 'add' | 'remove' | 'update',
    item: Pantry_ItemEntity[]
  ) => Promise<void>;
}) {
  const [snackbarAlert] = useSnackbarService();

  //#region Text Search
  const [searchText, setSearchText] = useState('');
  //#endregion

  //#region Pantry
  const [pantryDataDisplay, setPantryDataDisplay] = useState<
    DisplayPantryItem[]
  >([]);

  const [ingredientType, setIngredientType] = useState<Ingredient_TypeEntity[]>(
    []
  );

  //#endregion

  //#region Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [editPantryItem, setEditPantryItem] = useState<
    Pantry_ItemEntity | undefined
  >(undefined);
  const handleOpenDialog = (item: Pantry_ItemEntity) => {
    setEditPantryItem(item);
    setOpenDialog(true);
  };
  //#endregion

  useEffect(() => {
    async function fetch() {
      try {
        let final = ingredientType.map((type) => {
          return {
            ingredientType: type,
            ingredients: pantryItems.filter((item) => {
              return item.ingredient?.type_id == type.id;
            }),
          };
        });

        if (pantryItems.map((item) => item.ingredient.type_id).includes(null)) {
          final.push({
            ingredientType: null,
            ingredients: pantryItems.filter((item) => {
              return item.ingredient.type_id == null;
            }),
          });
        }

        final = final.sort(
          (a, b) => b.ingredients.length - a.ingredients.length
        );

        setPantryDataDisplay(
          final.map((item) => ({
            ...item,
            ingredients: item.ingredients.sort((a, b) =>
              a.ingredient?.name < b.ingredient?.name ? -1 : 1
            ),
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [pantryItems, ingredientType]);

  console.log(pantryDataDisplay);

  useEffect(() => {
    async function fetch() {
      try {
        const types = await IngredientTypeService.GetAllIngredientTypes();

        setIngredientType(types);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  return (
    <>
      <Stack direction={'column'} sx={{ width: '100%' }} gap={2}>
        {/* search */}
        <Stack direction={'row'} sx={{ width: '100%' }} gap={2}>
          <SearchTextField
            textSearch={searchText}
            handleChangeTextSearch={(event) =>
              setSearchText(event.target.value)
            }
            hideSearchButton={true}
            props={{
              placeholder: 'Tìm kiếm trong tủ lạnh',
            }}
          />
          {/* Nút thêm nguyên liệu */}
          <AddIngredient
            pantryDataDisplay={pantryDataDisplay}
            hanlePantryItemsChange={hanlePantryItemsChange}
          />
        </Stack>

        {pantryDataDisplay.length == 0 && <BoxIngredientTypeSkeleton />}

        {/* các khung loại nguyên liệu */}
        {pantryDataDisplay.length > 0 && (
          <Stack
            direction={'row'}
            spacing={2}
            sx={{ width: '100%' }}
            justifyContent={'center'}
            alignItems={'flex-start'}
          >
            {/* Cột phải */}
            <Box
              sx={{
                width: `100%`,
              }}
            >
              <Stack
                direction={'column'}
                sx={{ width: '100%', height: '100%' }}
                spacing={2}
              >
                {pantryDataDisplay.map((item, index) => {
                  return (
                    <BoxIngredientType
                      key={index}
                      displayPantryItem={{
                        ingredientType: item.ingredientType,
                        ingredients: item.ingredients.filter((ingre) =>
                          removeDiacritics(
                            ingre.ingredient?.name.toLowerCase()
                          ).includes(removeDiacritics(searchText.toLowerCase()))
                        ),
                      }}
                      handleOpenDialog={handleOpenDialog}
                      hanlePantryItemsChange={hanlePantryItemsChange}
                    />
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        )}
      </Stack>

      {/* Dialog chỉnh sửa số lượng */}
      <SlideInDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        title={`${editPantryItem?.ingredient.name}`}
        content={
          <>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              <TextField
                sx={{ width: '100%', flexGrow: 1 }}
                value={editPantryItem?.amount ?? ''}
                onChange={(event) => {
                  setEditPantryItem({
                    ...editPantryItem!,
                    amount: Number(event.target.value),
                  });
                }}
                size="small"
                placeholder="Số lượng"
                InputProps={{
                  sx: {
                    borderRadius: '40px 0px 0px 40px',
                    mt: 1,
                  },
                  inputComponent: NumberFormatCustom,
                }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  width: '100%',
                  px: 1,
                  mt: 1,
                  backgroundColor: 'grey.200',
                  borderRadius: '0px 40px 40px 0px',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                {editPantryItem?.ingredient.isLiquid ? 'ml' : 'g'}
              </Box>
            </Box>
          </>
        }
        confirmText="Thay đổi"
        cancelText="Huỷ"
        onClickConfirm={() => {
          if (editPantryItem) {
            hanlePantryItemsChange('update', [editPantryItem]);
            snackbarAlert('Cập nhật thành công', 'success');
          }
        }}
      />
    </>
  );
}

export default PantryContent;

export function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}
