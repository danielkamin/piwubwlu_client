import React, { useState, useEffect } from 'react';
import { getData } from '../../../../api/index';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useParams } from 'react-router-dom';
import { ILabDetails } from '../../types';
import { Container, Typography, Paper } from '@material-ui/core';
interface Params {
  id: string;
}
const LabDetails: React.FC = () => {
  const { id } = useParams<Params>();
  const [labDetails, setLabDetails] = useState<ILabDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getLabDetails();
  }, []);
  const getLabDetails = async () => {
    const data = await getData(`labs/${id}`, getAccessToken());
    console.log(data);
    setLabDetails(data);
    setLoading(false);
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <Container maxWidth='sm'>
      <div className='container-spacing'>
        <Paper className='flex-center-column'>
          <Typography variant='h3'>{labDetails?.name}</Typography>
          <Typography variant='h5'>{labDetails?.english_name}</Typography>
          <br />
          <Typography variant='body1'>
            <b>Pracownie specjalistyczne należącego do tego laboratorium:</b>
          </Typography>
          {labDetails?.Workshops.map((item) => (
            <Typography variant='body2' component={Link} to={'/pracownie/' + item.id}>
              nazwa: {item.name} / name: {item.english_name} / nr sali: {item.room_number} <br></br>
            </Typography>
          ))}
          <br />
          <Typography variant='body1'>
            <b>Osoba nadzorująca:</b>
          </Typography>
          {labDetails?.Employee !== null && (
            <Typography variant='body1' component={Link} to={'/kadra/' + labDetails?.Employee.userId}>
              Nazwisko: {labDetails?.Employee.User.lastName} Imię: {labDetails?.Employee.User.firstName}
            </Typography>
          )}
        </Paper>
      </div>
    </Container>
  );
};

export default LabDetails;
