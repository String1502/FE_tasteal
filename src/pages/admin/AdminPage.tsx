import { useAppSelector } from '@/app/hook';
import AdminLayout from '@/components/ui/layout/AdminLayout';
import TabCode from '@/lib/enums/AdminTabCode';
import { FC, useMemo } from 'react';
import AdminIngredientCreate from './ingredients/AdminIngredientsCreate';
import { AdminIngredientsIndex } from './ingredients/AdminIngredientsIndex';
import { AdminOccasionsIndex } from './occasions/AdminOccasionsIndex';
import { AdminUserIndex } from './users/AdminUserIndex';

const AdminPage: FC = () => {
  const currentTabCode = useAppSelector((state) => state.admin.currentTab);

  const CurrentTab = useMemo(() => {
    switch (currentTabCode) {
      case TabCode.UserIndex:
        return AdminUserIndex;
      case TabCode.IngredientIndex:
        return AdminIngredientsIndex;
      case TabCode.IngredientCreate:
        return AdminIngredientCreate;
      case TabCode.OccasionIndex:
        return AdminOccasionsIndex;
      case TabCode.Dashboard:
      default:
        return () => <p>Hi!</p>;
    }
  }, [currentTabCode]);

  return (
    <AdminLayout>
      <CurrentTab />
    </AdminLayout>
  );
};

export default AdminPage;
