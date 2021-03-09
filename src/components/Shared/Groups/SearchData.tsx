import React, { useState } from 'react';
import { Input, IconButton, InputAdornment, FormControl, InputLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
interface Props {
  searchFunction: (e: React.SyntheticEvent, searchValue: string | undefined) => void;
  buttonColor: string;
  placeholder: string;
}

const SearchData: React.FC<Props> = ({ searchFunction, buttonColor, placeholder }) => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <form
      onSubmit={(e: React.SyntheticEvent) => {
        searchFunction(e, searchInput);
      }}
    >
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchInput(e.target.value);
        }}
        id='header-search'
        placeholder={placeholder}
      />
      <button type='submit'>
        <SearchIcon style={{ color: buttonColor }} />
      </button>
    </form>
  );
};

export default SearchData;
