import SecondaryCard from '@/components/common/card/SecondaryCard';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { DisplayIngredientType } from './IngredientTypeContent';

import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';

export function CustomAccodion({
  item,
  watchingId,
  handleOpenDialog,
}: {
  item: DisplayIngredientType;
  watchingId: Ingredient_TypeEntity['id'];
  handleOpenDialog: (item: IngredientEntity) => void;
}) {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  useEffect(() => {
    if (expanded == false && watchingId == item.ingredientType.id) {
      setExpanded(true);
      setTimeout(() => {
        const yOffset = -32;
        const element = window.document.getElementById(`${watchingId}`);
        const y =
          element?.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 1000);
    }
    if (expanded == true && watchingId != item.ingredientType.id) {
      setExpanded(false);
    }
  }, [watchingId]);

  return (
    <>
      <Accordion
        elevation={0}
        disableGutters
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
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
          id={`${item.ingredientType.id}`}
          sx={{
            bgcolor: 'white',
            borderRadius: '100px',
            boxShadow: 3,
            px: 3,
          }}
        >
          <Typography variant="body2" fontWeight={'bold'} color={'inherit'}>
            {item.ingredientType.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack
            direction={'row'}
            sx={{ width: '100%', m: -1, pt: 2 }}
            flexWrap={'wrap'}
          >
            {item.ingredients.length > 0 &&
              item.ingredients.map((i) => {
                return (
                  <Box
                    key={i.id}
                    sx={{
                      width: {
                        xs: '100%',
                        sm: 'calc(100% / 3)',
                        md: 'calc(100% / 4)',
                        lg: 'calc(100% / 5)',
                      },
                      p: 1,
                    }}
                    onClick={() => handleOpenDialog(i)}
                  >
                    <SecondaryCard item={i} />
                  </Box>
                );
              })}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
