import {
  Box,
  CardActionArea,
  CardProps,
  IconButton,
  Typography,
} from '@mui/material';
import CustomCard from '@/components/common/card/CustomCard';
import ImageRecipe from '@/components/common/card/ImageRecipe';
import NameRecipe from '@/components/common/card/NameRecipe';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import { CloseRounded } from '@mui/icons-material';

const height = '148px';
const padding = 1;

export function PantryCard({
  item,
  hanlePantryItemsChange,
  handleOpenDialog,
  ...props
}: {
  props?: CardProps;
  hanlePantryItemsChange: (
    type: 'add' | 'remove' | 'update',
    item: Pantry_ItemEntity[]
  ) => Promise<void>;
  item: Pantry_ItemEntity;
  handleOpenDialog: (item: Pantry_ItemEntity) => void;
}) {
  return (
    <>
      <CustomCard {...props}>
        <CardActionArea onClick={() => handleOpenDialog(item)}>
          <ImageRecipe
            imgHeight={height}
            src={item.ingredient?.image}
            alt={item.ingredient?.name}
            quality={1}
          />

          <Box
            sx={{
              position: 'absolute',
              left: 0,
              width: '100%',
              top: height,
              zIndex: 1,
              px: padding,
              pb: 1,
              pt: 2,
              transform: 'translateY(-99%)',
              background:
                'linear-gradient(to top, rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0))',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="caption"
              color="common.white"
              sx={{ fontWeight: 'bold' }}
            >
              {getLabelAmount(item.amount, item.ingredient.isLiquid)}
            </Typography>
          </Box>
        </CardActionArea>

        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            top: padding * 8,
            right: padding * 8,
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            transition: 'all 0.1s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              transform: 'scale(1.15)',
            },
          }}
          onClick={async () => {
            await hanlePantryItemsChange('remove', [item]);
          }}
        >
          <CloseRounded fontSize="inherit" />
        </IconButton>

        <Box sx={{ p: 1 }}>
          <NameRecipe centered={true} name={item.ingredient?.name} />
        </Box>
      </CustomCard>
    </>
  );
}

function getLabelAmount(amount: number, isLiquid: boolean) {
  let amountStr = '';
  if (isLiquid) {
    if (amount >= 1000) {
      amountStr = `${amount / 1000}  lit`;
    } else {
      amountStr = `${amount} ml`;
    }
  } else {
    if (amount >= 1000) {
      amountStr = `${amount / 1000} kg`;
    } else {
      amountStr = `${amount} g`;
    }
  }

  return amountStr;
}
