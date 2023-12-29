import AppContext from '@/lib/contexts/AppContext';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { ArrowRightRounded } from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Skeleton,
} from '@mui/material';
import { useContext } from 'react';

function IngredientTypeMenu({
  watchingId,
  handleChangeWatchingId,
}: {
  watchingId: Ingredient_TypeEntity['id'];
  handleChangeWatchingId: (id: Ingredient_TypeEntity['id']) => void;
}) {
  const { popOverHeader } = useContext(AppContext);

  return (
    <>
      {popOverHeader && popOverHeader.ingredients.length > 0 ? (
        <MenuList
          sx={{
            py: 2,
            borderRadius: '24px',
            overflow: 'hidden',
            bgcolor: 'white',
            boxShadow: 3,
          }}
        >
          {popOverHeader.ingredients
            .map((item) => item?.ingredient_type)
            .filter(
              (item, index, self) =>
                item && self.findIndex((i) => i.id == item.id) === index
            )
            .map((item) => {
              return (
                <MenuItem
                  key={item.id}
                  onClick={() => {
                    handleChangeWatchingId(item.id);
                  }}
                  selected={watchingId === item.id}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  <ListItemIcon>
                    <ArrowRightRounded
                      sx={{
                        color: watchingId === item.id ? 'white' : '',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      variant: 'body1',
                      color: 'inherit',
                      sx: {
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      },
                    }}
                  />
                </MenuItem>
              );
            })}
        </MenuList>
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{
            height: '500px',
            width: '100%',
          }}
        />
      )}
    </>
  );
}

export default IngredientTypeMenu;
