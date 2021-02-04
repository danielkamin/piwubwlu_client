import React, { useState, useEffect } from 'react';
import { getData, deleteData } from '../../Api/index';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import MyButtonGroup from '../Utils/Buttons/MyButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAccessToken } from '../../Helpers/accessToken';
import { IWorkshopTypeDetails } from './types';
import { useAlertContext, AlertType } from '../Context/AlertContext';
const WorkshopTypeList: React.FC = () => {
  const context = useAlertContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [workshopTypes, setWorkshopTypes] = useState<IWorkshopTypeDetails[]>([]);
  useEffect(() => {
    getWorkshopTypes();
  }, []);
  const getWorkshopTypes = async () => {
    const response = await getData('workshopTypes/', getAccessToken())
      .then((res) => {
        setWorkshopTypes(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const clickDelete = async (id: any) => {
    await deleteData('workshopTypes/' + id, getAccessToken());
    context.openAlert(AlertType.success, 'Pomyślnie usunięto typ pracowni z bazy!');
    getWorkshopTypes();
  };
  const columns: ColDef[] = [
    { field: 'id', headerName: 'Identyfikator', width: 130 },
    { field: 'name', headerName: 'Nazwa', width: 130 },
    { field: 'english_name', headerName: 'Prztłumaczona Nazwa', width: 130 },
    { field: 'symbol', headerName: 'Skrót', width: 130 },
    {
      field: '',
      headerName: 'Edytuj/Usuń',
      width: 250,
      disableClickEventBubbling: true,
      renderCell: (params: CellParams) => {
        const onClick = () => {
          console.log(params.data.id);
        };
        return (
          <MyButtonGroup
            deleteCB={() => {
              clickDelete(params.data.id);
            }}
            editLink={'/admin/update_workshop_type/' + params.data.id}
            modalBody='Czy na pewmo chcesz usunąć typ pracowni z bazy?'
            modalTitle='Usuń typ pracowni'
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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={workshopTypes} columns={columns} pageSize={10} rowHeight={45} />
    </div>
  );
};

export default WorkshopTypeList;
