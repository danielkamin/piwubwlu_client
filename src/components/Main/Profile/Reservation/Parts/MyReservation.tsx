import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import { Roles } from '../../../Helpers/types';
import { getAccessToken } from '../../../Helpers/accessToken';
import { getData } from '../../../Api/index';
import Reservations from './Reservations';
import { Reservation } from '../types';
import FullCalendar, { EventInput, EventClickArg } from '@fullcalendar/react';
import { useUserContext } from '../../Context/UserContext';
import MyCalendar from './MyCalendar';
const MyReservation: React.FC = () => {
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
        <Reservations data={owned} CB={getReservations} />
        {supervised != null && (
          <div>
            {' '}
            <Typography variant='h5' style={{ color: 'red' }}>
              Nadzorowane
            </Typography>
            <Reservations data={supervised} supervised CB={getReservations} />
          </div>
        )}
      </div>
      <MyCalendar ownedReservations={owned} supervisedReservations={supervised ? supervised : []} />
    </Container>
  );
};

export default MyReservation;
