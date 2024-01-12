import BoxImage from '@/components/common/image/BoxImage';
import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import {
  CheckCircleRounded,
  RadioButtonUncheckedRounded,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import { typoProps, customTypography } from './DialogContent';

export function DialogItem({
  first,
  item,
  total,
  handleCartAdd,
  handleCartTuLanh,
  addCheck,
  tulanhCheck,
  tulanh,
}: {
  first: Cart_ItemEntity;
  item: Cart_ItemEntity[];
  total: number;
  handleCartAdd: (
    type: 'add' | 'addAll',
    newCartAdd: Cart_ItemEntity[]
  ) => void;
  handleCartTuLanh: (
    type: 'add' | 'addAll',
    newCartTuLanh: Pantry_ItemEntity['id'][]
  ) => void;
  addCheck: boolean;
  tulanhCheck: boolean;
  tulanh: Pantry_ItemEntity | undefined;
}) {
  return (
    <Stack
      gap={1}
      direction={'row'}
      sx={{
        width: '100%',
        py: 1.5,
        borderTop: 1,
        borderColor: 'grey.300',
        mx: 0,
        pr: 4,
      }}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          opacity: 1,
        }}
      >
        <BoxImage
          src={first.ingredient?.image}
          quality={1}
          sx={{
            height: '60px',
            width: '60px',
            objectFit: 'contain',
            borderRadius: '50%',
            mx: 2,
          }}
        />
        <Box
          sx={{
            flexGrow: 1,
            height: 'fit-content',
          }}
        >
          <Typography {...typoProps} fontWeight={900}>
            {first.ingredient?.name}
          </Typography>

          <Typography {...typoProps}>
            <span
              style={{
                textDecoration: tulanh && tulanhCheck ? 'line-through' : '',
              }}
            >
              {total}
              {first.ingredient?.isLiquid ? 'ml' : 'g'}
            </span>{' '}
            {tulanh && tulanhCheck && (
              <span>
                {total - tulanh?.amount > 0 ? total - tulanh?.amount : 0}
                {first.ingredient?.isLiquid ? 'ml' : 'g'}
              </span>
            )}
            {tulanh && (
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
                Tủ lạnh có {tulanh.amount}
                {first?.ingredient.isLiquid ? 'ml' : 'g'}
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>

      <Stack direction={'row'} alignItems={'center'} gap={1}>
        <FormControlLabel
          sx={{
            display: tulanh ? '' : 'none',
          }}
          control={
            <Checkbox
              checked={tulanhCheck}
              onChange={() => {
                handleCartTuLanh('add', [tulanh?.id]);
              }}
            />
          }
          label={
            <Typography {...customTypography}>Dùng trong tủ lạnh</Typography>
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={addCheck}
              onChange={() => {
                handleCartAdd('add', item);
              }}
              icon={<RadioButtonUncheckedRounded />}
              checkedIcon={<CheckCircleRounded />}
            />
          }
          label={
            <Typography {...customTypography}>Thêm vào tủ lạnh</Typography>
          }
        />
      </Stack>
    </Stack>
  );
}
