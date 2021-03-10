import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../../../api/index';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { CircularProgress, Container, Typography, Avatar } from '@material-ui/core';
import { IMachineDetails } from '../../types';
import useStyles from '../../styles';
import { useUserContext } from '../../../../context/UserContext';
import { API_URL } from '../../../../utils/constants';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import MachineCalendar from '../../Calendar/MachineCalendar';
import NotFound from '../../../../assets/Images/not-found.webp';
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
      <div className='page-details'>
        <div className='image-details'>{machineDetails?.imagePath !== null ? <img src={API_URL + '/' + machineDetails?.imagePath} /> : <img src={NotFound} />}</div>
        <div className='page-details-content'>
          <Typography variant='h3'>{machineDetails?.name}</Typography>
          <Typography variant='h5'>{machineDetails?.english_name}</Typography>
          <br />
          <Typography variant='subtitle2'>Status:</Typography>
          <Typography variant='subtitle1' className='error'>
            {machineDetails?.machineState ? 'Aktywna' : 'Nieaktywna'}
          </Typography>
          <Typography variant='body2'>{machineDetails?.additionalInfo !== null && machineDetails?.additionalInfo}</Typography>
        </div>
      </div>
      {context?.loggedIn && <MachineCalendar id={id} isMachineActive={machineDetails?.machineState} timeUnit={machineDetails!.timeUnit} maxUnit={machineDetails?.maxUnit} roles={context.roles} />}
    </Container>
  );
};

export default MachineDetails;
