import React, { useState } from 'react';
import { Input, IconButton, InputAdornment, FormControl, InputLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
interface Props {
  searchFunction: (e: React.SyntheticEvent, searchValue: string | undefined) => void;
}

const SearchData: React.FC<Props> = ({ searchFunction }) => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <div>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          searchFunction(e, searchInput);
        }}
      >
        <FormControl>
          <InputLabel htmlFor='search-field'>Szukaj</InputLabel>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchInput(e.target.value);
            }}
            id='search-field'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton type='submit'>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
    </div>
  );
};

export default SearchData;
