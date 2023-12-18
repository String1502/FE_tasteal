import { useContext } from 'react';
import AdminPageContext from '../contexts/AdminPageContext';

/**
 * Custom hook that returns the admin page context value.
 * Uses the useContext hook to access the AdminPageContext and return its value.
 */
const useAdminPageContext = () => {
  const adminPageContext = useContext(AdminPageContext);

  return adminPageContext;
};

export default useAdminPageContext;
