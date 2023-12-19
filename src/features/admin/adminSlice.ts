import TabCode from '@/lib/enums/AdminTabCode';
import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';

export type AdminPageSlice = {
  currentTab: TabCode;
  params?: unknown | null;
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    currentTab: TabCode.Dashboard,
    params: null,
  },
  reducers: {
    navigateTo: (
      state,
      action: PayloadAction<{ tab: TabCode; params?: unknown }>
    ) => {
      state.currentTab = action.payload.tab;
      state.params = action.payload.params;
    },
  },
});

export const { navigateTo } = adminSlice.actions;
export default adminSlice.reducer;
