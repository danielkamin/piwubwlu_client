import React, { useState, useEffect } from 'react';
import { getData, deleteData } from '../../../Api/index';
import MyButtonGroup from '../../Utils/Buttons/MyButtonGroup';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import { getAccessToken } from '../../../Helpers/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IGuest } from '../types';
interface Props {}

const GuestList: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [guests, setGuests] = useState<[]>([]);
  useEffect(() => {
    getGuests();
  }, []);
  const getGuests = async () => {
    const response = await getData('guests/list', getAccessToken());
    const newGuests: [] = response.map((res: IGuest) => ({
      firstName: res.firstName,
      lastName: res.lastName,
      id: res.id,
      email: res.email,
      isVerified: res.Guest.isVerified ? 'Zweryfikowany' : 'Nie zweryfikowany'
    }));
    setGuests(newGuests);
    setLoading(false);
  };
  const clickDelete = async (id: any) => {
    console.log(id);
    await deleteData('user/' + id, getAccessToken());
    getGuests();
  };
  const columns: ColDef[] = [
    { field: 'id', headerName: 'Identyfikator', width: 90 },
    { field: 'firstName', headerName: 'Imię', width: 130 },
    { field: 'lastName', headerName: 'Nazwisko', width: 130 },
    { field: 'email', headerName: 'E-Mail', width: 180 },
    { field: 'isVerified', headerName: 'Zweryfikowany?', width: 130 },
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
            editLink={'/admin/update_guest/' + params.data.id}
            modalBody='Czy na pewmo chcesz usunąć to konto gościa z bazy?'
            modalTitle='Usuń gościa'
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
      <DataGrid rows={guests} columns={columns} pageSize={20} rowHeight={45} />
    </div>
  );
};

export default GuestList;
