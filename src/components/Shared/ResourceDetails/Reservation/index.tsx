import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Avatar } from '@material-ui/core';
import { getData } from '../../../../api/index';
import { IReservationDetails } from '../../types';
import { useParams } from 'react-router-dom';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { API_URL } from '../../../../utils/constants';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import format from 'date-fns/format';
import useStyles from '../../styles';
import UpdateResCalendar from '../../Calendar/UpdateResCalendar';
type Params = {
  id: string;
};

const ReservationDetails: React.FC = () => {
  const { id } = useParams<Params>();
  const [isOwned, setIsOwned] = useState<boolean>(false);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<IReservationDetails>();
  useEffect(() => {
    isReservationOwned();
    getReservationDetails();
  }, []);
  const getReservationDetails = async () => {
    await getData('rental/' + id, getAccessToken())
      .then((res) => {
        console.log(res);
        setReservation(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const isReservationOwned = async () => {
    await getData('rental/owned/' + id, getAccessToken())
      .then((res) => {
        setIsOwned(true);
      })
      .catch((err) => {});
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <Container maxWidth='xl'>
      <section className='container-spacing'>
        <Container maxWidth='sm'>
          <div className='details'>
            <div className='image'>
              {reservation?.Machine.imagePath !== null ? (
                <div className='image-details'>
                  <img src={API_URL + '/' + reservation?.Machine.imagePath} />
                </div>
              ) : (
                <Avatar variant='rounded' className={classes.image}>
                  <BrokenImageIcon />
                </Avatar>
              )}
              <div className='main'>
                <Typography variant='h6'>{reservation?.Machine.name}</Typography>
                <Typography variant='subtitle1'>
                  Początek: <i>{format(new Date(reservation!.start_date), 'HH:mm dd/MM/yyyy')}</i>
                </Typography>
                <Typography variant='subtitle1'>
                  Koniec: <i>{format(new Date(reservation!.end_date), 'HH:mm dd/MM/yyyy')}</i>
                </Typography>
              </div>
            </div>
            <div className='submain'>
              <Typography variant='body1'>Osoba wypożyczająca: {reservation?.Employee.User.firstName + '' + reservation?.Employee.User.lastName}</Typography>
              <Typography variant='subtitle1'>
                Komentarz do rezerwacji: <br></br> {reservation?.ReservationSurvey !== null ? reservation?.ReservationSurvey.comment : ''}
              </Typography>
            </div>
          </div>
        </Container>
      </section>
      {isOwned && (
        <UpdateResCalendar
          maxUnit={reservation?.Machine.maxUnit}
          timeUnit={reservation!.Machine.timeUnit}
          endDate={reservation!.end_date}
          startDate={reservation!.start_date}
          isMachineActive={reservation!.Machine.machineState}
          id={reservation!.id}
          machineId={reservation!.Machine.id}
          state={reservation!.state}
        />
      )}
    </Container>
  );
};

export default ReservationDetails;
