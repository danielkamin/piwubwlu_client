import { IconButton, Toolbar, Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../../components/Main/Auth/Logout/logout';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import useStyles from '../../../styles';
import { useUserContext } from '../../../../context/UserContext';
import { Link } from 'react-router-dom';
import { AccountCircleOutlined } from '@material-ui/icons';
import SearchBar from '../../../../components/Main/Resources/Search/SearchBar';
interface Props {
  hiddenMenu: boolean;
  onRedirect: () => void;
}
const Links: React.FC<Props> = ({ hiddenMenu, onRedirect }) => {
  const context = useUserContext();
  const history = useHistory();
  const redirectLogout = async () => {
    await logout();
    context?.changeState(false, []);
    history.push('/');
  };
  return (
    <div className={`menu collapse ${hiddenMenu ? '' : 'in'}`}>
      <ul className='list'>
        <li>
          <ul className='inner-list'>
            <li>
              <b>Zasoby</b>
            </li>
            <li>
              <Link to='/kadra' onClick={onRedirect}>
                Kadra pracownicza
              </Link>
            </li>
            <li>
              <Link to='/laboratoria' onClick={onRedirect}>
                Laboratoria
              </Link>
            </li>
            <li>
              <Link to='/pracownie' onClick={onRedirect}>
                Pracownie specjalistyczne
              </Link>
            </li>
            <li>
              <Link to='/maszyny' onClick={onRedirect}>
                Urządzenia badawcze
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <ul className='inner-list'>
            <li>
              <b>Inne platformy</b>
            </li>
            <li>
              <a>Wydział mechaniczny</a>
            </li>
            <li>
              <a>Wydział informatyczny</a>
            </li>
            <li>
              <a>Wydział elektryczny</a>
            </li>
            <li>
              <a>Wydział budowniczy</a>
            </li>
          </ul>
        </li>
        <li>
          <ul className='inner-list'>
            <li>
              <b>Inne...</b>
            </li>
            <li>
              <a>Biblioteka</a>
            </li>
            <li>
              <a>Studium</a>
            </li>
            <li>
              <a>SWFiS</a>
            </li>
            <li>
              <a>UCI</a>
            </li>
          </ul>
        </li>

        {context?.loggedIn ? (
          <li>
            <ul className='inner-list'>
              <li>
                <b>Moje Konto</b>
              </li>
              <li>
                <Link to='/moje_konto' onClick={onRedirect}>
                  {' '}
                  Prolil
                </Link>
              </li>
              <li>
                <Link to='/moje_konto/zmiana_hasla' onClick={onRedirect}>
                  {' '}
                  Zmiana hasła
                </Link>
              </li>
              <li>
                <Link to='/moje_konto/rezerwacje' onClick={onRedirect}>
                  {' '}
                  Moje rezerwacje
                </Link>
              </li>
              <li>
                <Link to='/moje_konto/usun_konto' onClick={onRedirect}>
                  {' '}
                  Usuń Konto
                </Link>
              </li>
              <li>
                <a
                  color='inherit'
                  onClick={() => {
                    onRedirect();
                    redirectLogout();
                  }}
                >
                  Wyloguj się
                </a>
              </li>
            </ul>
          </li>
        ) : (
          <li>
            <ul className='inner-list'>
              <li>
                <b>Platforma</b>
              </li>
              <li>
                <Link color='inherit' to='/rejestracja' onClick={onRedirect}>
                  Rejestracja
                </Link>
              </li>
              <li>
                <Link color='inherit' to='/login' onClick={onRedirect}>
                  Login
                </Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Links;
