import React, { useState, useEffect } from 'react';
import { getData } from '../../../../api/index';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { CircularProgress, Paper, Container, Typography } from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';
import { IWorkshopDetails } from '../../types';
import { Params } from '../../../../utils/types';
import useStyles from '../../styles';
import { useUserContext } from '../../../../context/UserContext';
import { API_URL } from '../../../../utils/constants';
import WorkshopCalendar from '../../Calendar/WorkshopCalendar';
import NotFound from '../../../../assets/Images/not-found.webp';
import MyCard from '../../../Main/Resources/Labs/MyCard';
const WorkshopDetails: React.FC = () => {
  const { id } = useParams<Params>();
  const classes = useStyles();
  const context = useUserContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [workshopDetails, setWorkshopDetails] = useState<IWorkshopDetails>();
  useEffect(() => {
    getWorkshop();
  }, []);
  const getWorkshop = async () => {
    const data = await getData(`workshops/${id}`, getAccessToken());
    setWorkshopDetails(data);
    setLoading(false);
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Container maxWidth='xl'>
      <div className='page-details'>
        <div className='image-details'>{workshopDetails?.imagePath !== null ? <img src={API_URL + '/' + workshopDetails?.imagePath} /> : <img src={NotFound} />}</div>
        <div className='page-details-content'>
          <Typography variant='h3'>{workshopDetails?.name}</Typography>
          <Typography variant='h5'>{workshopDetails?.english_name}</Typography>
          <br />
          <Typography variant='body1'>Numer sali: {workshopDetails?.room_number}</Typography>
          <br />
          <Typography variant='body1'>Osoby nadzorujące:</Typography>
          {workshopDetails?.Employees.map((item) => (
            <Typography variant='body2' component={Link} to={'/kadra/' + item.userId} key={item.id}>
              <b>
                {item.User.lastName} {item.User.firstName}
              </b>
            </Typography>
          ))}
          <br />
          {workshopDetails?.WorkshopType ? (
            <Typography variant='body1'>
              Typ pracowni: {workshopDetails?.WorkshopType.name} <br></br> Workshop type: {workshopDetails?.WorkshopType.english_name}
            </Typography>
          ) : (
            <Typography variant='body1'>
              Typ pracowni: Nie określono<br></br> Workshop type: Nie określono
            </Typography>
          )}
        </div>
        <br />
      </div>
      <div className='labs-grid'>
        <Typography variant='body1'>
          <b>Wyposażenie pracowni: </b>
        </Typography>
        {workshopDetails?.Machines.map((item) => (
          <MyCard key={item.id} link={'/maszyny/' + item.id} name={item.name} english_name={item.english_name} />
        ))}
      </div>
      <br></br>
      {context?.loggedIn && <WorkshopCalendar id={id} />}
    </Container>
  );
};

export default WorkshopDetails;
