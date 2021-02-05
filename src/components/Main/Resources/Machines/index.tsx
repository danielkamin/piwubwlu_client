import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getData } from '../../../../api/index';
import queryString from 'query-string';
import { Container, Button, TextField } from '@material-ui/core';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import SortData from '../../../Shared/Groups/SortData';
import { ICardInfo } from '../../types';
import PageTitle from '../../../Shared/Display/PageTitle';
const DisplayMachines: React.FC = (props) => {
  const history = useHistory();
  const { search } = useLocation();
  const query = queryString.parse(search);
  const [loading, setLoading] = useState<boolean>(true);
  const [nameSearch, setNameSearch] = useState(() => {
    return query.q === undefined ? '' : query.q;
  });
  const [workshops, setWorkshops] = useState<ICardInfo[]>([]);
  useEffect(() => {
    getWorkshops();
  }, [search]);

  const getWorkshops = async () => {
    await getData(`machines/list${search}`, getAccessToken()).then((res) => {
      setWorkshops(res);
      console.log(res);
    });
    setLoading(false);
  };

  const handleNameSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.target.value);
  };
  const searchWorkshop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (nameSearch !== '') history.push(`/maszyny?q=${nameSearch}`);
    else history.push('/maszyny');
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Container maxWidth='xl' className='container-spacing'>
      <PageTitle title='Urządzenia Badawcze' />
      <form onSubmit={(e: React.SyntheticEvent) => searchWorkshop(e)}>
        <TextField value={nameSearch} onChange={handleNameSearchChange} />
        <Button type='submit'>Szukaj</Button>
      </form>
      <SortData data={workshops} sortQuery={query.sort} qQuery={nameSearch} linkString='/maszyny' />
    </Container>
  );
};

export default DisplayMachines;
