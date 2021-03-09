import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Links from './Links';
import SearchBar from '../../../../components/Main/Resources/Search/SearchBar';
interface Props {}

const Nav: React.FC<Props> = () => {
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const menuCollapseRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setHidden(!hidden);
    burgerMenuRef?.current?.classList.toggle('toggle');
  };
  const onRedirect = () => setHidden(true);
  const [hidden, setHidden] = useState(true);
  return (
    <header>
      <div className='full-header'>
        <div className='header'>
          <div className='burger' onClick={toggleMenu} ref={burgerMenuRef}>
            <div className='line1'></div>
            <div className='line2'></div>
            <div className='line3'></div>
          </div>
          <div className='header-logo'>
            <div id='godlo' aria-label='Godło Rzeczypospolitej Polskiej'></div>
            <a id='logo-pb' className='brand' href='http://pb.edu.pl' title='Strona główna serwisu Politechniki Białostockiej' aria-label='Politechnika Białostocka'></a>
          </div>
          <SearchBar />
        </div>
        <div className='header-title'>
          <Link to='/'>
            <span>
              Platforma wynajmu urządzeń badawczych <br /> Wydziału Mechanicznego
            </span>
          </Link>
        </div>
      </div>
      <Links hiddenMenu={hidden} onRedirect={toggleMenu} />
    </header>
  );
};

export default Nav;
