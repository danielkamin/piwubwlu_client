import React, { useState, useEffect, ReactText } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteData } from '../../../../api/index';
import MyButtonGroup from '../../../Shared/Groups/MyButtonGroup';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IMachine } from '../../types';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
const MachineList: React.FC = () => {
  const context = useAlertContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [machines, setMachines] = useState<IMachine[]>([]);
  useEffect(() => {
    getMachines();
  }, []);
  const getMachines = async () => {
    const response = await getData('machines', getAccessToken())
      .then((res) => {
        console.log(res);
        setMachines(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const clickDelete = async (id: ReactText) => {
    await deleteData('machines/' + id, getAccessToken());
    await getMachines();
    context.openAlert(AlertType.success, 'Pomyślnie usunięto maszynę z bazy!');
  };
  const columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'Identyfikator',
      width: 130,
      renderCell: (params: CellParams) => {
        return <Link to={'/admin/machine/' + params.row.id}>{params.row.id}</Link>;
      }
    },
    { field: 'name', headerName: 'Nazwa', width: 300 },
    { field: 'english_name', headerName: 'Name', width: 200 },
    { field: 'workshopId', headerName: 'Id Pracowni', width: 130 },
    { field: 'timeUnit', headerName: 'Jednostka czasu', width: 130 },
    { field: 'maxUnit', headerName: 'Max jednostek czasu', width: 130 },
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
            editLink={'/admin/update_machine/' + params.row.id}
            modalBody='Czy na pewmo chcesz usunąć urządzenie badawcze z bazy?'
            modalTitle='Usuń maszynę'
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
      {console.log(machines)}
      <DataGrid rows={machines} columns={columns} pageSize={20} rowHeight={45} />
    </div>
  );
};

export default MachineList;
