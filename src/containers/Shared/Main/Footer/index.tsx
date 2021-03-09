import React from 'react';
import { Typography } from '@material-ui/core';
import { API_URL } from '../../../../utils/constants';
import instagram from '../../../../assets/Images/PB_socialicon_instagram.png';
import facebook from '../../../../assets/Images/PB_socialicon_fb.png';
import youtube from '../../../../assets/Images/PB_socialicon_youtube.png';

const Footer: React.FC = () => {
  return (
    <div className='footer'>
      <div className='content'>
        <Typography variant='h5'>Politechnika Białostocka</Typography>
        <Typography variant='body1'>
          ul. Wiejska 45A, 15-351 Białystok<br></br>
          tel. 85 746 90 00 (centrala), fax 85 746 90 15<br></br>
          REGON: 000001672, NIP: 542-020-87-21
        </Typography>
        <div className='socials'>
          <a title='przejdź do facebook PB' href='https://pl-pl.facebook.com/politechnikabialostocka/' target='_blank' rel='noopener noreferrer'>
            <img alt='przejdź do facebook PB' src={facebook} />
          </a>
          <a title='przejdź do instagram PB' href='https://www.instagram.com/politechnika_bialostocka/' target='_blank' rel='noopener noreferrer'>
            <img alt='przejdź do instagram PB' src={instagram} />
          </a>
          <a title='przejdź do youtube PB' href='https://www.youtube.com/channel/UComx9YaRB1AlVQ9tQkelQjw/' target='_blank' rel='noopener noreferrer'>
            <img alt='przejdź do youtube PB' src={youtube} />
          </a>
        </div>
        <Typography variant='caption'>Copyright © 2020 Politechnika Białostocka</Typography>
      </div>
    </div>
  );
};

export default Footer;
