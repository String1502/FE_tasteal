import AdminLayout from '@/components/ui/layout/AdminLayout';
import AdminPageContext from '@/lib/contexts/AdminPageContext';
import TabCode from '@/lib/enums/AdminTabCode';
import { FC, useCallback, useMemo, useState } from 'react';
import AdminIngredientCreate from './ingredients/AdminIngredientsCreate';
import { AdminIngredientsIndex } from './ingredients/AdminIngredientsIndex';

const AdminPage: FC = () => {
  const [currentTabCode, setCurrentTabCode] = useState(TabCode.Dashboard);

  const CurrentTab = useMemo(() => {
    switch (currentTabCode) {
      case TabCode.IngredientIndex:
        return AdminIngredientsIndex;
      case TabCode.IngredientCreate:
        return AdminIngredientCreate;
      case TabCode.Dashboard:
      default:
        return () => <p>Hi!</p>;
    }
  }, [currentTabCode]);

  const handleCurrentTabChange = useCallback(
    (code: TabCode) => {
      if (code === currentTabCode) return;
      setCurrentTabCode(code);
    },
    [currentTabCode]
  );

  return (
    <AdminPageContext.Provider
      value={{ currentTab: currentTabCode, navigateTo: handleCurrentTabChange }}
    >
      <AdminLayout>
        <CurrentTab />
      </AdminLayout>
    </AdminPageContext.Provider>
  );
};

export default AdminPage;
