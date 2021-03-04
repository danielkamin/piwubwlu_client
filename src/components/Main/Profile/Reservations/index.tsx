import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import { Roles } from '../../../../utils/constants';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { getData } from '../../../../api';
import ReservationsTable from './Parts/ReservationsTable';
import { Reservation } from '../../types';
import { useUserContext } from '../../../../context/UserContext';
import MyCalendar from './Parts/MyCalendar';
import ProfileCalendar from '../../../Shared/Calendar/ProfileCalendar';
const MyReservations: React.FC = () => {
  const context = useUserContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [owned, setOwned] = useState<Reservation[]>(() => {
    return [];
  });
  const [supervised, setSupervised] = useState<Reservation[] | null>(null);
  useEffect(() => {
    getReservations();
  }, []);
  const getReservations = async () => {
    const ownedReservations = await getData('rental/owned', getAccessToken());
    console.log({ owned: ownedReservations });
    if (context?.roles?.indexOf(Roles.supervisor) !== -1) {
      const supervisedReservations = await getData('rental/supervised', getAccessToken());
      console.log({ supervised: supervisedReservations });
      setSupervised(supervisedReservations);
    }
    setOwned(ownedReservations);
    setLoading(false);
  };

  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Container maxWidth='md'>
      <div className='container-spacing'>
        <Typography variant='h5' style={{ color: 'purple' }}>
          Moje wypożyczenia
        </Typography>
        <ReservationsTable data={owned} CB={getReservations} />
        {supervised != null && (
          <div>
            {' '}
            <Typography variant='h5' style={{ color: 'red' }}>
              Nadzorowane
            </Typography>
            <ReservationsTable data={supervised} supervised CB={getReservations} />
          </div>
        )}
      </div>
      {/* <MyCalendar ownedReservations={owned} supervisedReservations={supervised ? supervised : []} /> */}
      <ProfileCalendar ownedReservations={owned} supervisedReservations={supervised ? supervised : []} />
    </Container>
  );
};

export default MyReservations;
