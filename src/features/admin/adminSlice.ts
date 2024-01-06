import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';

export type IngredientState = {
  editValue: IngredientEntity | null;
};
export type OccasionState = {
  editValue: OccasionEntity | null;
};

export type AdminState = {
  ingredient: IngredientState;
  occasion: OccasionState;
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    ingredient: {
      editValue: null,
    },
    occasion: {
      editValue: null,
    },
  } as AdminState,
  reducers: {
    setEditIngredient: (
      state,
      action: PayloadAction<IngredientEntity | null>
    ) => {
      state.ingredient.editValue = action.payload;
    },
    setEditOccasion: (state, action: PayloadAction<OccasionEntity | null>) => {
      state.occasion.editValue = action.payload;
    },
  },
});

export const { setEditIngredient, setEditOccasion } = adminSlice.actions;
export default adminSlice.reducer;
