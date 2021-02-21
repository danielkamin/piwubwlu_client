import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getData } from '../../../../api/index';
import queryString from 'query-string';
import { Container } from '@material-ui/core';
import { getAccessToken } from '../../../../utils/api/accessToken';
import SortData from '../../../Shared/Groups/SortData';
import Pagination from '../../../Shared/Groups/Pagination';
import SearchData from '../../../Shared/Groups/SearchData';
import { ICardInfo } from '../../types';
import PageTitle from '../../../Shared/Display/PageTitle';
const DisplayMachines: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const query = queryString.parse(search);
  const [loading, setLoading] = useState<boolean>(true);
  const [nameSearch, setNameSearch] = useState(() => {
    return query.q === undefined ? '' : query.q;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(5);
  const [workshops, setWorkshops] = useState<ICardInfo[]>([]);
  useEffect(() => {
    getWorkshops();
    console.log(search);
  }, [search]);

  const getWorkshops = async () => {
    await getData(`machines/list${search}`, getAccessToken())
      .then((res) => {
        setWorkshops(res);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  const searchWorkshop = (e: React.SyntheticEvent, searchValue: string | undefined) => {
    e.preventDefault();
    if (searchValue !== '') history.push(`/maszyny?q=${searchValue}`);
    else history.push(`/maszyny`);
  };
  const indexOfLastPost = currentPage * elementsPerPage;
  const indexOfFirstPost = indexOfLastPost - elementsPerPage;
  const currentElements = workshops.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (page: number) => setCurrentPage(page);

  return (
    <Container maxWidth='xl' className='container-spacing'>
      <PageTitle title='Urządzenia Badawcze' />
      <SearchData searchFunction={searchWorkshop} />
      <SortData data={currentElements} sortQuery={query.sort} qQuery={nameSearch} linkString='/maszyny' loading={loading} />
      <Pagination elementsPerPage={elementsPerPage} paginate={paginate} totalElements={workshops.length} currentPage={currentPage} />
    </Container>
  );
};

export default DisplayMachines;
