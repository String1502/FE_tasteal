import { createContext } from 'react';
import TabCode from '../enums/AdminTabCode';

export type AdminPageContextType = {
  currentTab?: TabCode;
  navigateTo?: (path: TabCode) => void;
};

const AdminPageContext = createContext<AdminPageContextType>({
  currentTab: TabCode.Dashboard,
});

export default AdminPageContext;
