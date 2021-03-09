import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getData } from '../../../../api/index';
import queryString from 'query-string';
import { getAccessToken } from '../../../../utils/api/accessToken';
import SortData from '../../../Shared/Groups/SortData';
import Pagination from '../../../Shared/Groups/Pagination';
import PageTitle from '../../../Shared/Display/PageTitle';
import SearchData from '../../../Shared/Groups/SearchData';
import { ICardInfo } from '../../types';
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
    setNameSearch(query.q === undefined ? '' : query.q);
    getWorkshops();
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
    <div className='custom-container'>
      <PageTitle title='Urządzenia badawcze' />
      <div className='custom-search'>
        <SearchData searchFunction={searchWorkshop} buttonColor='black' placeholder='Wyszukaj maszynę' />
      </div>
      <SortData data={currentElements} sortQuery={query.sort} qQuery={nameSearch} linkString='/maszyny' loading={loading} />
      <Pagination elementsPerPage={elementsPerPage} paginate={paginate} totalElements={workshops.length} currentPage={currentPage} />
    </div>
  );
};

export default DisplayMachines;
