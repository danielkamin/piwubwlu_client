import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../../../api/index';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import format from 'date-fns/format';
interface Props {}

const ReservationList: React.FC<Props> = () => {
  useEffect(() => {
    getReservations();
  }, []);
  const context = useAlertContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [reservations, setReservations] = useState<[]>([]);
  const getReservations = async () => {
    await getData('rental', getAccessToken())
      .then((res) => {
        let tmpReservations = res.map((item: any) => {
          return {
            id: item.id,
            MachineName: item.Machine.name,
            WorkshopName: item.Machine.Workshop.name,
            start_date: format(new Date(item.start_date), 'HH:mm dd/MM/yyyy'),
            end_date: format(new Date(item.start_date), 'HH:mm dd/MM/yyyy'),
            state: item.state
          };
        });
        setReservations(tmpReservations);
      })
      .catch((err) => {
        context.openAlert(AlertType.error, err);
      });
    setLoading(false);
  };

  const columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'Identyfikator',
      type: 'number',
      width: 130,
      disableClickEventBubbling: true,
      renderCell: (params: CellParams) => {
        return <Link to={'/rezerwacje/' + params.value}>{params.value}</Link>;
      }
    },
    { field: 'MachineName', headerName: 'Maszyna', width: 130 },
    { field: 'WorkshopName', headerName: 'Pracownia', width: 130 },
    { field: 'start_date', headerName: 'Początek', width: 160 },
    { field: 'end_date', headerName: 'Koniec', width: 160 },
    { field: 'state', headerName: 'Status', width: 130 }
  ];
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={reservations} columns={columns} pageSize={20} rowHeight={45} />
    </div>
  );
};

export default ReservationList;
