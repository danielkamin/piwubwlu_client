import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getData } from '../../../../api/index';
import queryString from 'query-string';
import { Container, Button, TextField } from '@material-ui/core';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import SortData from '../../../Shared/Groups/SortData';
import PageTitle from '../../../Shared/Display/PageTitle';
import { ICardInfo } from '../../types';
const DisplayWorkshops: React.FC = () => {
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
    await getData(`workshops/list${search}`, getAccessToken()).then((res) => {
      setWorkshops(res);
    });
    setLoading(false);
  };

  const handleNameSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.target.value);
  };
  const searchWorkshop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (nameSearch !== '') history.push(`/pracownie?q=${nameSearch}`);
    else history.push('/pracownie');
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Container maxWidth='xl' className='container-spacing'>
      <PageTitle title='Pracownie' />
      <form onSubmit={(e: React.SyntheticEvent) => searchWorkshop(e)}>
        <TextField value={nameSearch} onChange={handleNameSearchChange} />
        <Button type='submit'>Szukaj</Button>
      </form>
      <SortData data={workshops} sortQuery={query.sort} qQuery={nameSearch} linkString='/pracownie' />
    </Container>
  );
};

export default DisplayWorkshops;
