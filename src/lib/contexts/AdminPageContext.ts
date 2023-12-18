import { createContext } from 'react';
import TabCode from '../enums/AdminTabCode';

export type AdminPageContextType = {
  navigateTo?: (path: TabCode) => void;
};

const AdminPageContext = createContext<AdminPageContextType>({});

export default AdminPageContext;
