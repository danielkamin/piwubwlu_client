import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getData } from '../../../Api/index';
import queryString from 'query-string';
import { Container, Paper, Button, TextField, MenuItem, Select } from '@material-ui/core';
import { getAccessToken } from '../../../Helpers/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import SortData from '../../Utils/SortData';
import PageTitle from '../../Utils/PageTitle';
import { IMediaCard } from '../../../Helpers/types';
const DisplayWorkshops: React.FC = (props) => {
  const history = useHistory();
  const { search } = useLocation();
  const query = queryString.parse(search);
  const [loading, setLoading] = useState<boolean>(true);
  const [nameSearch, setNameSearch] = useState(() => {
    return query.q === undefined ? '' : query.q;
  });
  const [workshops, setWorkshops] = useState<IMediaCard[]>([]);
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
