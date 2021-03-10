import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';
import queryString from 'query-string';
import { getData } from '../../../../api/index';
import Pagination from '../../../Shared/Groups/Pagination';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyCard from '../Labs/MyCard';
export interface CardProps {
  name: string;
  secondName: string;
  link: string;
}
const SearchResources: React.FC = () => {
  const { search } = useLocation();
  const query = queryString.parse(search);
  const [loading, setLoading] = useState<boolean>(true);
  const [nameSearch, setNameSearch] = useState(() => {
    return query.q === undefined ? '' : query.q;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(20);
  const [resources, setResources] = useState<CardProps[]>([]);
  useEffect(() => {
    getResources();
  }, [search]);
  const getResources = async () => {
    await getData(`utils/search${search}`, getAccessToken())
      .then((res) => {
        let tempResources: CardProps[] = [];
        tempResources.push(
          ...res[0].map((item: any) => {
            return { name: item.name, secondName: item.secondName, link: '/kadra/' + item.id };
          })
        );
        tempResources.push(
          ...res[1].map((item: any) => {
            return { name: item.name, secondName: item.secondName, link: '/maszyny/' + item.id };
          })
        );
        tempResources.push(
          ...res[2].map((item: any) => {
            return { name: item.name, secondName: item.secondName, link: '/pracownie/' + item.id };
          })
        );
        tempResources.push(
          ...res[3].map((item: any) => {
            return { name: item.name, secondName: item.secondName, link: '/laboratoria/' + item.id };
          })
        );
        console.log(tempResources);
        setResources(tempResources);
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
      <p>
        Wynik wyszukiwania: <b>{query.q !== undefined && query.q}</b>
      </p>
      <div className='resource-grid'>
        {currentElements.map((res: CardProps) => (
          <MyCard key={Math.random()} name={res.name} english_name={res.secondName} link={res.link} />
        ))}
      </div>
      <Pagination paginate={paginate} totalElements={resources.length} elementsPerPage={elementsPerPage} currentPage={currentPage} />
    </Container>
  );
};

export default SearchResources;
