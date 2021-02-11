import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../../../api/index';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { CircularProgress, Container, Typography, Avatar } from '@material-ui/core';
import MachineCalendar from './Calendar';
import { IMachineDetails } from '../../types';
import useStyles from '../../styles';
import { useUserContext } from '../../../../context/UserContext';
import { API_URL } from '../../../../utils/constants';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
interface Params {
  id: string;
}
const MachineDetails: React.FC = () => {
  const { id } = useParams<Params>();
  const context = useUserContext();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [machineDetails, setMachineDetails] = useState<IMachineDetails>();
  useEffect(() => {
    getMachineDetails();
  }, []);

  const getMachineDetails = async () => {
    const data = await getData(`machines/${id}`, getAccessToken());
    setMachineDetails(data);
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
          <div className='details'>
            <div className='image'>
              {machineDetails?.imagePath !== null ? (
                <div className='image-details'>
                  <img src={API_URL + '/' + machineDetails?.imagePath} />
                </div>
              ) : (
                <Avatar variant='rounded' className={classes.image}>
                  <BrokenImageIcon />
                </Avatar>
              )}
              <div className='main'>
                <Typography variant='h4'>{machineDetails?.name}</Typography>
                <Typography variant='h6' paragraph={true}>
                  {machineDetails?.english_name}
                </Typography>

                <Typography variant='subtitle2'>Status:</Typography>
                <Typography variant='subtitle1' className='error'>
                  {machineDetails?.machineState ? 'Aktywna' : 'Nieaktywna'}
                </Typography>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {context?.loggedIn && <MachineCalendar id={id} isMachineActive={machineDetails?.machineState} timeUnit={machineDetails!.timeUnit} maxUnit={machineDetails?.maxUnit} />}
    </Container>
  );
};

export default MachineDetails;
