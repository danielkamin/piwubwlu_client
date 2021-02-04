import React from 'react';
import HomeCard from './Resources/HomeCard';
import { Grid } from '@material-ui/core';
import { API_URL } from '../../Helpers/constants';
interface CardInfo {
  title: string;
  details: string;
  link: string;
  image: string;
}
const cards: CardInfo[] = [
  { title: 'Laboratoria', details: 'Dowiedz się więcej o naszych laboratoriach', link: '/laboratoria', image: API_URL + '/uploads/display-image4.png' },
  { title: 'Pracownie', details: 'Dowiedz się więcej o naszych pracowniach', link: '/pracownie', image: API_URL + '/uploads/display-image3.jpg' },
  { title: 'Urządzenia Badawcze', details: 'Dowiedz się więcej o naszych urządzeniach badawczych', link: '/maszyny', image: API_URL + '/uploads/display-image1.jpg' },
  { title: 'Pracownicy', details: 'Dowiedz się więcej o naszych pracownikach', link: '/kadra', image: API_URL + '/uploads/display-image2.jpg' }
];
const Cards: React.FC = () => {
  return (
    <div className='card-container'>
      {cards.map((item) => (
        <HomeCard details={item.details} title={item.title} link={item.link} image={item.image} key={item.title} />
      ))}
    </div>
  );
};

export default Cards;
