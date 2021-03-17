import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import wydzial from '../../../../assets/Images/wydzial.webp';
const Banner: React.FC = () => {
  return (
    <section className='page-title-banner'>
      <div className='banner'>
        <div className='banner-content'>
          <p>
            <b>Wydziałowe centrum wypożyczeń aparatury badawczej</b>
          </p>
          <p>Wydział Mechaniczny</p>
          <p>ul. Wiejska 45C, 15-351 Białystok</p>
          <br />
          <div>
            <Link to='zarezerwuj'>Zarezerwuj</Link>
          </div>
        </div>
        <div className='banner-img'>
          <img src={wydzial} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
