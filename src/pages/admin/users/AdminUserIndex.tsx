import CommonIndexPage from '@/components/ui/admin/CommonAdminIndexPage';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import AccountService from '@/lib/services/accountService';
import { GridColDef } from '@mui/x-data-grid';
import { FC, useEffect, useState } from 'react';

export const AdminUserIndex: FC = () => {
  //#region Accounts Data

  const [accounts, setAccounts] = useState<AccountEntity[]>([]);
  const [isAccountsFetching, setIsAccountsFetching] = useState(false);

  useEffect(() => {
    setIsAccountsFetching(true);

    AccountService.GetAllUser()
      .then((accounts) => setAccounts(accounts))
      .catch(() => setAccounts([]))
      .finally(() => setIsAccountsFetching(false));
  }, []);

  const accountColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
  ];

  //#endregion

  return (
    <CommonIndexPage
      title={'Tài khoản'}
      rows={accounts}
      columns={accountColumns}
      loading={isAccountsFetching}
      dialogProps={{
        title: 'Xóa tài khoản',
        content: 'Bạn có chắc muốn xóa tài khoản này?',
      }}
    />
  );
};
