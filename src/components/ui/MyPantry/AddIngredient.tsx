import { CustomDialog } from '@/components/common/dialog/CustomDialog';
import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { SearchTextField } from '../search/SearchTextField';
import { DisplayPantryItem, NumberFormatCustom } from './PantryContent';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import IngredientService from '@/lib/services/ingredientService';
import SecondaryCard from '@/components/common/card/SecondaryCard';
import { removeDiacritics } from '@/utils/format';
import { CheckCircleRounded, CircleRounded } from '@mui/icons-material';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import PantryItemService from '@/lib/services/pantryItemService';
import AppContext from '@/lib/contexts/AppContext';
import useSnackbarService from '@/lib/hooks/useSnackbar';

export function AddIngredient({
  pantryDataDisplay,
  hanlePantryItemsChange,
}: {
  pantryDataDisplay: DisplayPantryItem[];
  hanlePantryItemsChange: (
    type: 'add' | 'remove' | 'update',
    item: Pantry_ItemEntity[]
  ) => void;
}) {
  const { login, handleSpinner } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [snackbarAlert] = useSnackbarService();

  const [tabValue, setTabValue] = useState<IngredientEntity['id']>(
    pantryDataDisplay.length > 0 ? pantryDataDisplay[0].ingredientType.id : -1
  );

  const [ingredientData, setIngredientData] = useState<IngredientEntity[]>([]);

  const [allIngredients, setAllIngredients] = useState<IngredientEntity[]>([]);

  useEffect(() => {
    async function fetch() {
      try {
        const pantry_ingres_ids = pantryDataDisplay
          .map((item) => item.ingredients.map((ingre) => ingre.ingredient_id))
          .flat();

        const final = allIngredients.filter((ingre) => {
          return !pantry_ingres_ids.includes(ingre.id);
        });

        setIngredientData(final);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
    if (pantryDataDisplay.length > 0) {
      setTabValue(pantryDataDisplay[0].ingredientType.id);
    }
  }, [pantryDataDisplay, allIngredients]);

  useEffect(() => {
    async function fetch() {
      try {
        const ingres = await IngredientService.GetAll();
        setAllIngredients(ingres);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  // update
  const [newIngredientIds, setNewIngredientIds] = useState<
    IngredientEntity['id'][]
  >([]);

  const [amount, setAmount] = useState(100);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{
          textWrap: 'nowrap',
          px: 5,
          width: 'fit-content',
          fontSize: 'caption.fontSize',
          fontWeight: 'bold',
        }}
        onClick={() => setOpenDialog(true)}
      >
        Thêm nguyên liệu
      </Button>

      {/* Dialog thêm */}
      <CustomDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        title={'Thêm nguyên liệu'}
        action={
          <Stack
            direction={'row'}
            sx={{
              width: '100%',
            }}
            spacing={2}
            justifyContent={'space-between'}
          >
            <TextField
              size="small"
              color="primary"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
              disabled={newIngredientIds.length == 0}
              sx={{
                '& fieldset': { border: 'none' },
                border: 1,
                borderRadius: '100px',
                borderColor:
                  newIngredientIds.length == 0 ? 'grey.500' : 'primary.main',
                px: 0.5,
                flexGrow: 1,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography
                      variant="body1"
                      fontWeight={900}
                      sx={{
                        color: 'grey.500',
                        mt: -0.5,
                      }}
                    >
                      {newIngredientIds.length != 1
                        ? '--'
                        : ingredientData.find(
                            (ingre) => ingre.id == newIngredientIds[0]
                          ).isLiquid
                        ? 'ml'
                        : 'g'}
                    </Typography>
                  </InputAdornment>
                ),
                inputComponent: NumberFormatCustom,
              }}
            />

            <Stack direction={'row'} spacing={2}>
              <Button
                variant="contained"
                size="small"
                disabled={newIngredientIds.length == 0}
                sx={{
                  px: 4,
                  fontSize: 'caption.fontSize',
                  boxShadow: 'none',
                }}
                onClick={async () => {
                  // Thêm mới PantryItem
                  if (!login.user || !login.user?.uid) return;
                  handleSpinner(true);
                  await Promise.all(
                    newIngredientIds.map(
                      async (id) =>
                        await PantryItemService.AddPantryItem({
                          account_id: login.user.uid,
                          ingredient_id: id,
                          number: amount,
                        })
                    )
                  )
                    .then((res) => {
                      const newData: Pantry_ItemEntity[] = res;
                      hanlePantryItemsChange('add', newData);
                      snackbarAlert('Thêm thành công', 'success');
                    })
                    .catch((err) => {
                      console.log(err);
                      snackbarAlert('Thêm thất bại', 'error');
                    });
                  handleSpinner(false);

                  setNewIngredientIds([]);
                  setOpenDialog(false);
                }}
              >
                Thêm
              </Button>
            </Stack>
          </Stack>
        }
      >
        <Box sx={{ width: '100%', pt: 2 }}>
          <SearchTextField
            textSearch={textSearch}
            handleChangeTextSearch={(e) => setTextSearch(e.target.value)}
            props={{
              size: 'small',
              placeholder: 'Tìm nguyên liệu',
            }}
            hideSearchButton={true}
          />
        </Box>

        <Box sx={{ maxWidth: '100%', my: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(_e, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              display: textSearch == '' ? '' : 'none',
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              '& .MuiTab-root.Mui-selected': {
                color: 'white',
                bgcolor: 'primary.main',
                borderRadius: '100px',
              },
              '& .MuiTab-root': {
                borderRadius: '100px',
                minHeight: '0px',
                mx: 0.5,
                color: 'primary.main',
                border: 1,
                borderColor: 'primary.main',
              },
            }}
          >
            {pantryDataDisplay.length > 0 &&
              pantryDataDisplay.map((item, index) => (
                <Tab
                  key={index}
                  value={item.ingredientType ? item.ingredientType.id : null}
                  label={
                    <Typography
                      variant="caption"
                      fontWeight={'bold'}
                      sx={{
                        color: 'inherit',
                      }}
                    >
                      {item.ingredientType ? item.ingredientType.name : 'Khác'}
                    </Typography>
                  }
                />
              ))}
          </Tabs>
        </Box>

        <Stack direction={'row'} flexWrap={'wrap'} sx={{ width: '100%' }}>
          {ingredientData
            .filter((item) => {
              if (textSearch == '') {
                if (tabValue == -1) {
                  return true;
                } else {
                  return item.type_id == tabValue;
                }
              } else {
                return removeDiacritics(item.name.toLowerCase()).includes(
                  removeDiacritics(textSearch.toLowerCase())
                );
              }
            })
            .map((item) => (
              <Box
                key={item.id}
                sx={{
                  width: {
                    xs: '100%',
                    sm: 'calc(100% / 2)',
                    md: 'calc(100% / 3)',
                    lg: 'calc(100% / 4)',
                  },
                  p: 1,
                }}
                onClick={() => {
                  if (newIngredientIds.includes(item.id)) {
                    setNewIngredientIds(
                      newIngredientIds.filter((i) => i !== item.id)
                    );
                  } else {
                    setNewIngredientIds([...newIngredientIds, item.id]);
                  }
                }}
              >
                <PantryItemCard
                  item={item}
                  newIngredientIds={newIngredientIds}
                />
              </Box>
            ))}
        </Stack>
      </CustomDialog>
    </>
  );
}

function PantryItemCard({
  item,
  newIngredientIds,
}: {
  item: IngredientEntity;
  newIngredientIds: IngredientEntity['id'][];
}) {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <SecondaryCard item={item} />
      <Checkbox
        checked={newIngredientIds.includes(item.id)}
        icon={
          <CircleRounded
            fontSize="small"
            sx={{
              color: 'white',
            }}
          />
        }
        checkedIcon={
          <CheckCircleRounded
            fontSize="small"
            sx={{
              color: 'primary.main',
            }}
          />
        }
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />
    </Box>
  );
}
