import React, { useState, useEffect } from 'react';
import { getData } from '../../../../api/index';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useParams } from 'react-router-dom';
import { ILabDetails } from '../../types';
import { Container, Typography, Paper } from '@material-ui/core';
import MyCard from '../../../Main/Resources/Labs/MyCard';
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
    <Container maxWidth='md'>
      <div className='lab-details'>
        <div className='lab-details-title'>
          <Typography variant='h4'>{labDetails?.name}</Typography>
          <Typography variant='h5'>{labDetails?.english_name}</Typography>
          <br />
          <Typography variant='body1'>
            <b>Osoba nadzorująca:</b>
          </Typography>
          {labDetails?.Employee !== null && (
            <Typography variant='body1' component={Link} to={'/kadra/' + labDetails?.Employee.userId}>
              {labDetails?.Employee.User.lastName} {labDetails?.Employee.User.firstName}
            </Typography>
          )}
        </div>
        <div className='lab-details-content'>
          <Typography variant='body1'>Pracownie specjalistyczne należącego do tego laboratorium:</Typography>
          <div className='labs-grid'>
            {labDetails?.Workshops.map((item) => (
              <MyCard key={item.id} name={item.name} english_name={item.english_name} roomNumber={item.room_number.toString()} link={'/pracownie/' + item.id} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LabDetails;
