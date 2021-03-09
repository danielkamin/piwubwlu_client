import React from 'react';
import HomeCard from './HomeCard';
import laboratoria from '../../../../assets/Images/laboratoria.jpg';
import maszyny from '../../../../assets/Images/maszyny.jpg';
import pracownicy from '../../../../assets/Images/pracownicy.jpg';
import pracownie from '../../../../assets/Images/pracownie.jpg';
interface CardInfo {
  title: string;
  link: string;
  image: string;
}
const cards: CardInfo[] = [
  { title: 'Laboratoria', link: '/laboratoria', image: pracownie },
  { title: 'Pracownie', link: '/pracownie', image: laboratoria },
  { title: 'Urządzenia Badawcze', link: '/maszyny', image: maszyny },
  { title: 'Pracownicy', link: '/kadra', image: pracownicy }
];
const Cards: React.FC = () => {
  return (
    <div className='home-grid'>
      {cards.map((item) => (
        <HomeCard title={item.title} link={item.link} image={item.image} key={item.title} />
      ))}
    </div>
  );
};

export default Cards;
