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
      <div className='container-spacing'>
        <Container maxWidth='sm'>
          <Paper className={classes.paper}>
            <div className='image-details'>{workshopDetails?.imagePath !== null && <img src={API_URL + '/' + workshopDetails?.imagePath} />}</div>
            <Typography variant='h3'>{workshopDetails?.name}</Typography>
            <Typography variant='h5'>{workshopDetails?.english_name}</Typography>
            <Typography variant='body1'>{workshopDetails?.room_number}</Typography>
            {workshopDetails?.WorkshopType ? (
              <Typography variant='body1'>
                Typ pracowni: {workshopDetails?.WorkshopType.name} <br></br> Workshop type: {workshopDetails?.WorkshopType.english_name}
              </Typography>
            ) : (
              <Typography variant='body1'>
                Typ pracowni: Nie określono<br></br> Workshop type: Nie określono
              </Typography>
            )}

            <br></br>
            <Typography variant='body1'>
              <b>Wyposażenie pracowni: </b>
            </Typography>
            {workshopDetails?.Machines.map((item) => (
              <Typography variant='body2' component={Link} to={'/maszyny/' + item.id} key={item.id}>
                nazwa: {item.name} / name: {item.english_name} <br></br>
              </Typography>
            ))}
            <br></br>
            <Typography variant='body1'>
              <b>Osoby nadzorujące</b>
            </Typography>
            {workshopDetails?.Employees.map((item) => (
              <Typography variant='body2' component={Link} to={'/kadra/' + item.userId} key={item.id}>
                Nazwisko: {item.User.lastName} / Imię: {item.User.firstName}
              </Typography>
            ))}
          </Paper>
        </Container>
      </div>
      {context?.loggedIn && <WorkshopCalendar id={id} />}
    </Container>
  );
};

export default WorkshopDetails;
