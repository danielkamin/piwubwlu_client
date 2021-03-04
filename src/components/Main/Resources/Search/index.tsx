import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';
import queryString from 'query-string';
import { getData } from '../../../../api/index';
import Pagination from '../../../Shared/Groups/Pagination';
import SearchCard, { CardProps } from './SearchCard';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';

const SearchResources: React.FC = () => {
  const { search } = useLocation();
  const query = queryString.parse(search);
  const [loading, setLoading] = useState<boolean>(true);
  const [nameSearch, setNameSearch] = useState(() => {
    return query.q === undefined ? '' : query.q;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(5);
  const [resources, setResources] = useState<[]>([]);

  useEffect(() => {
    getResources();
  }, [search]);
  const getResources = async () => {
    await getData(`utils/search${search}`, getAccessToken())
      .then((res) => {
        setResources(res);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  const paginate = (page: number) => setCurrentPage(page);
  const indexOfLastPost = currentPage * elementsPerPage;
  const indexOfFirstPost = indexOfLastPost - elementsPerPage;
  const currentElements = resources.slice(indexOfFirstPost, indexOfLastPost);
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <Container maxWidth='xl'>
      <Container maxWidth='md'>
        {currentElements.map((res: CardProps) => (
          <SearchCard key={Math.random()} id={res.id} name={res.name} secondName={res.secondName} type='wk' />
        ))}
      </Container>
      <Pagination paginate={paginate} totalElements={resources.length} elementsPerPage={elementsPerPage} currentPage={currentPage} />
    </Container>
  );
};

export default SearchResources;
