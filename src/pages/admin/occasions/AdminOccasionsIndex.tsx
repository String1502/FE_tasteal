import CommonIndexPage from '@/components/ui/admin/CommonAdminIndexPage';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import OccasionService from '@/lib/services/occasionService';
import { GridColDef } from '@mui/x-data-grid';
import { FC, useEffect, useState } from 'react';

export const AdminOccasionsIndex: FC = () => {
  //#region Occasions Data

  const [occasions, setOccasions] = useState<OccasionEntity[]>([]);
  const [isOccasionsFetching, setIsOccasionsFetching] = useState(false);

  useEffect(() => {
    setIsOccasionsFetching(true);

    OccasionService.GetAll()
      .then((occasions) => setOccasions(occasions))
      .catch(() => setOccasions([]))
      .finally(() => setIsOccasionsFetching(false));
  }, []);

  const occasionColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Tên',
    },
    {
      field: 'description',
      headerName: 'Mô tả',
    },
  ];

  //#endregion

  return (
    <CommonIndexPage
      title={'Dịp lễ'}
      rows={occasions}
      columns={occasionColumns}
      loading={isOccasionsFetching}
      dialogProps={{
        title: 'Xóa dịp lễ',
        content: 'Bạn có chắc muốn xóa dịp lễ này?',
      }}
    />
  );
};
