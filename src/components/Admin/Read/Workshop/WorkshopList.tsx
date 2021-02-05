import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteData } from '../../../../api/index';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import MyButtonGroup from '../../../Shared/Groups/MyButtonGroup';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IWorkshop } from '../../types';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
const WorkshopList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [workshops, setWorkshops] = useState<IWorkshop[] | any>([]);
  const context = useAlertContext();
  useEffect(() => {
    getWorkshops();
  }, []);
  const getWorkshops = async () => {
    await getData('workshops', getAccessToken())
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
        return <Link to={'/admin/workshop/' + params.row.id}>{params.row.id}</Link>;
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
              clickDelete(params.row.id);
            }}
            editLink={'/admin/update_workshop/' + params.row.id}
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
