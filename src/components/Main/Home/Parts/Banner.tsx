import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import wydzial from '../../../../assets/Images/wydzial.webp';
const Banner: React.FC = () => {
  return (
    <section className='banner'>
      <div className='banner-content'>
        <p>
          Wydziałowe centrum wypożyczeń <br />
          aparatury badawczej
        </p>
        <p>ul. Wiejska 45C, 15-351 Białystok</p>
        <div>
          <Link to='zarezerwuj'>Zarezerwuj</Link>
        </div>
      </div>
      <div className='banner-img'>
        <img src={wydzial} />
      </div>
    </section>
  );
};

export default Banner;
