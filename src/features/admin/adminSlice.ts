import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';

export type IngredientState = {
  editValue: IngredientEntity | null;
};

export type AdminState = {
  ingredient: IngredientState;
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    ingredient: {
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
  },
});

export const { setEditIngredient } = adminSlice.actions;
export default adminSlice.reducer;
