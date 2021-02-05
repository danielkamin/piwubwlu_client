import React, { createRef } from 'react';
import { postData, deleteData } from '../../../api/index';
import { getAccessToken } from '../../../utils/api/accessToken';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
const ResourceSearch: React.FC = () => {
  const history = useHistory();
  const inputSearchRef = createRef<HTMLInputElement>();
  const searchResources = async () => {
    history.push(`/${inputSearchRef.current?.value}`);
  };
  return (
    <form onSubmit={searchResources} className='search-form'>
      <input className='search-input' ref={inputSearchRef}></input>
      <button type='submit' className='search-button'>
        <SearchIcon />
      </button>
    </form>
  );
};

export default ResourceSearch;
