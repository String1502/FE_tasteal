import adminReducer from '@/features/admin/adminSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // TODO: the naming seems wrong, fix this
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
