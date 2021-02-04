import React, { useState, useEffect, ReactText } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteData } from '../../Api/index';
import MyButtonGroup from '../Utils/Buttons/MyButtonGroup';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import { getAccessToken } from '../../Helpers/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IMachineDetails } from './types';
import { useAlertContext, AlertType } from '../Context/AlertContext';
const MachineList: React.FC = () => {
  const context = useAlertContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [machines, setMachines] = useState<IMachineDetails[]>([]);
  useEffect(() => {
    getMachines();
  }, []);
  const getMachines = async () => {
    const response = await getData('machines', getAccessToken())
      .then((res) => {
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
        return <Link to={'/admin/machine/' + params.data.id}>{params.data.id}</Link>;
      }
    },
    { field: 'name', headerName: 'Nazwa', width: 130 },
    { field: 'english_name', headerName: 'Name', width: 130 },
    { field: 'workshopId', headerName: 'Id Pracowni', width: 130 },
    { field: 'machineState', headerName: 'Stan', width: 130 },
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
              clickDelete(params.data.id);
            }}
            editLink={'/admin/update_machine/' + params.data.id}
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
    <div className='resource-table'>
      <DataGrid rows={machines} columns={columns} pageSize={20} rowHeight={45} />
    </div>
  );
};

export default MachineList;
