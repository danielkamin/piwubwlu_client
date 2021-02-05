import { Typography } from '@material-ui/core';
import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className='landing'>
      <div className='banner black-hidden'>
        <img src='../../../assets/Images/background.jpg' className='img-cover' />
        <div className='banner-subtitle'>
          <Typography variant='h2'>Politechnika Białostocka</Typography>
          <Typography variant='subtitle1'>Najlepsza uczelnia techniczna w północno-wschpdniej Polsce</Typography>
        </div>
      </div>
    </div>
  );
};

export default Banner;
