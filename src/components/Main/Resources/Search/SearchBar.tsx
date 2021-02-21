import React from 'react';
import SearchData from '../../../Shared/Groups/SearchData';
import { useHistory } from 'react-router-dom';
const SearchBar: React.FC = () => {
  const history = useHistory();
  const searchResources = (e: React.SyntheticEvent, searchValue: string | undefined) => {
    e.preventDefault();
    if (searchValue !== '') history.push(`/szukaj?q=${searchValue}`);
  };
  return (
    <div>
      <SearchData searchFunction={searchResources} />
    </div>
  );
};

export default SearchBar;
