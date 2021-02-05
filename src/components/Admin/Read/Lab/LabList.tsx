import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteData } from '../../../../api/index';
import MyButtonGroup from '../../../Shared/Groups/MyButtonGroup';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ILab } from '../../types';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
const LabList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [labs, setLabs] = useState<ILab[]>([]);
  const context = useAlertContext();
  useEffect(() => {
    getLabs();
  }, []);
  const getLabs = async () => {
    const response = await getData('labs', getAccessToken())
      .then((res) => {
        setLabs(res);
      })
      .catch((err) => {
        context.openAlert(AlertType.error, 'oops! coś poszło nie tak');
      });
    setLoading(false);
  };
  const clickDelete = async (id: any) => {
    console.log(id);
    await deleteData('labs/' + id, getAccessToken());
    getLabs();
    context.openAlert(AlertType.success, 'Pomyślnie usunięto laboratorium z bazy!');
  };
  const columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'Identyfikator',
      width: 130,
      renderCell: (params: CellParams) => {
        return <Link to={'/admin/lab/' + params.row.id}>{params.row.id}</Link>;
      }
    },
    { field: 'name', headerName: 'Nazwa', width: 130 },
    { field: 'english_name', headerName: 'Name', width: 130 },
    { field: 'employeeId', headerName: 'Pracownik', width: 110 },
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
            editLink={'/admin/update_lab/' + params.row.id}
            modalBody='Czy na pewmo chcesz usunąć to laboratorium z bazy?'
            modalTitle='Usuń laboratorium'
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
      <DataGrid rows={labs} columns={columns} pageSize={20} rowHeight={45} />
    </div>
  );
};

export default LabList;
