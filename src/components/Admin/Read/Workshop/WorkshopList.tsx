import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteData } from '../../Api/index';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import MyButtonGroup from '../Utils/Buttons/MyButtonGroup';
import { getAccessToken } from '../../Helpers/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IWorkshopDetails } from './types';
import { useAlertContext, AlertType } from '../Context/AlertContext';
const WorkshopList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [workshops, setWorkshops] = useState<IWorkshopDetails[] | any>([]);
  const context = useAlertContext();
  useEffect(() => {
    getWorkshops();
  }, []);
  const getWorkshops = async () => {
    const response = await getData('workshops', getAccessToken())
      .then((res) => {
        setWorkshops(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const clickDelete = async (id: any) => {
    await deleteData('workshops/' + id, getAccessToken())
      .then((res) => {
        console.log(res);
        getWorkshops();
        context.openAlert(AlertType.success, 'Pomyślnie usunięto katedrę z bazy!');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'Identyfikator',
      width: 60,
      renderCell: (params: CellParams) => {
        return <Link to={'/admin/workshop/' + params.data.id}>{params.data.id}</Link>;
      }
    },
    { field: 'name', headerName: 'Nazwa', width: 250 },
    { field: 'english_name', headerName: 'Name', width: 250 },
    { field: 'room_number', headerName: 'Nr Sali', width: 100 },
    { field: 'labId', headerName: 'Laboratorium', width: 120 },
    { field: 'typeId', headerName: 'Typ', width: 60 },
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
            editLink={'/admin/update_workshop/' + params.data.id}
            modalBody='Czy na pewmo chcesz usunąć pracownie z bazy?'
            modalTitle='Usuń pracownię'
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
      <DataGrid rows={workshops} columns={columns} pageSize={20} rowHeight={45} />
    </div>
  );
};

export default WorkshopList;
