import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Paper, Button, TextField, MenuItem, Select } from '@material-ui/core';
import { IMediaCard } from '../../Helpers/types';
import { API_URL } from '../../Helpers/constants';
import MyCard from './MyCard';
interface Props {
  sortQuery: string | string[] | null;
  data: IMediaCard[];
  qQuery: string | string[] | null;
  linkString: string;
}

const SortData: React.FC<Props> = ({ sortQuery, data, qQuery, linkString }) => {
  const history = useHistory();
  const sortWorkshops = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    if (value !== '') history.push(`${linkString}?q=${qQuery}&sort=${value}`);
    else history.push(`${linkString}?q=${qQuery}`);
  };

  return (
    <div>
      <div className='sort-form'>
        <b>Sortuj: </b>
        <Select onChange={sortWorkshops} label='Sortuj' value={sortQuery === undefined ? '' : sortQuery} displayEmpty>
          <MenuItem value=''>Domyślnie</MenuItem>
          <MenuItem value='asc'>Nazwa - rosnaco</MenuItem>
          <MenuItem value='desc'>Nazwa - malejąco</MenuItem>
        </Select>
      </div>
      <div className='workshops'>
        {data.map((item) => (
          <MyCard key={item.id} name={item.name} english_name={item.english_name} imagePath={API_URL + '/' + item.imagePath} id={item.id} linkTo={linkString} />
        ))}
      </div>
    </div>
  );
};

export default SortData;
