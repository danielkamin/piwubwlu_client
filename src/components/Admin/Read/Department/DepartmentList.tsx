import React, { useState, useEffect } from 'react';
import { getData, deleteData } from '../../../../api/index';
import MyButtonGroup from '../../../Shared/Groups/MyButtonGroup';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import { IDepartment } from '../../types';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
const DepartmentList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const context = useAlertContext();
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  useEffect(() => {
    getDepartments();
  }, []);
  const getDepartments = async () => {
    const response = await getData('departments', getAccessToken());
    setDepartments(response);
    setLoading(false);
  };
  const clickDelete = async (id: any) => {
    await deleteData('departments/' + id, getAccessToken());
    getDepartments();
    context.openAlert(AlertType.success, 'Pomyślnie usunięto katedrę z bazy!');
  };
  const columns: ColDef[] = [
    { field: 'id', headerName: 'Identyfikator', width: 90 },
    { field: 'name', headerName: 'Nazwa', width: 130 },
    { field: 'english_name', headerName: 'Name', width: 130 },
    {
      field: '',
      headerName: 'Edytuj/Usuń',
      width: 250,
      disableClickEventBubbling: true,
      renderCell: (params: CellParams) => {
        return (
          <MyButtonGroup
            deleteCB={() => {
              clickDelete(params.row.id);
            }}
            editLink={'/admin/update_department/' + params.row.id}
            modalBody='Czy na pewmo chcesz usunąć tą katedrę z bazy?'
            modalTitle='Usuń katedrę'
          />
        );
      }
    }
  ];
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <div className='resource-table'>
      <DataGrid rows={departments} columns={columns} pageSize={15} rowHeight={45} />
    </div>
  );
};

export default DepartmentList;
