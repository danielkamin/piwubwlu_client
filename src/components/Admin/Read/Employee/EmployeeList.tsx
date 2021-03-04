import React, { useState, useEffect } from 'react';
import { getData, deleteData } from '../../../../api/index';
import MyButtonGroup from '../../../Shared/Groups/MyButtonGroup';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IEmployee } from '../../types';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
interface Props {}

const EmployeeList: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [emps, setEmps] = useState<IEmployee[]>([]);
  const context = useAlertContext();
  useEffect(() => {
    getEmps();
  }, []);
  const getEmps = async () => {
    const response = await getData('employees/', getAccessToken());
    setEmps(response);
    setLoading(false);
  };
  const clickDelete = async (id: any) => {
    console.log(id);
    await deleteData('user/' + id, getAccessToken());
    context.openAlert(AlertType.success, 'Usunięto Pracownika z bazy danych');
    getEmps();
  };
  const columns: ColDef[] = [
    { field: 'id', headerName: 'Identyfikator', width: 90 },
    { field: 'firstName', headerName: 'Imię', width: 130 },
    { field: 'lastName', headerName: 'Nazwisko', width: 130 },
    { field: 'email', headerName: 'E-Mail', width: 290 },
    { field: 'userType', headerName: 'Typ Użytkownika', width: 130 },
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
            editLink={'/admin/update_employee/' + params.row.id}
            modalBody='Czy na pewmo chcesz usunąć konto pracownika z bazy?'
            modalTitle='Usuń pracownika'
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
    <div style={{ height: 700 }}>
      <DataGrid rows={emps} columns={columns} pageSize={20} rowHeight={45} />
    </div>
  );
};

export default EmployeeList;
