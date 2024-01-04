import CommonIndexPage from '@/components/ui/admin/CommonAdminIndexPage';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import OccasionService from '@/lib/services/occasionService';
import { GridColDef } from '@mui/x-data-grid';
import { FC, useEffect, useState } from 'react';

export const AdminOccasionsIndex: FC = () => {
  //#region Datagrid columns

  const occasionColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Miểu tả',
      flex: 1,
    },
  ];

  //#endregion
  //#region Pagination

  const [rows, setRows] = useState<OccasionEntity[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      (async () => {
        let occasions: OccasionEntity[];
        try {
          occasions = await OccasionService.GetAll();
        } catch (err) {
          console.log(err);
          occasions = [];
        }
        if (!active) return;

        setRows(occasions);
        setRowCount(occasions.length);
        setLoading(false);
      })();
    })();

    return () => {
      active = false;
    };
  }, [paginationModel, paginationModel.page, paginationModel.pageSize]);

  //#endregion

  return (
    <CommonIndexPage
      title={'Dịp lễ'}
      rows={rows}
      columns={occasionColumns}
      loading={loading}
      dialogProps={{
        title: 'Xóa dịp lễ',
        content: 'Bạn có chắc muốn xóa dịp lễ này?',
      }}
      paginationModel={paginationModel}
      rowCount={rowCount}
      onPaginationModelChange={setPaginationModel}
    />
  );
};
