import React from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';
import { ICardInfo } from '../types';
import { API_URL } from '../../../utils/constants';
import MyCard from '../Display/MyCard';
import CircularProgress from '@material-ui/core/CircularProgress';
interface Props {
  sortQuery: string | string[] | null;
  data: ICardInfo[];
  qQuery: string | string[] | null;
  linkString: string;
  loading: boolean;
}

const SortData: React.FC<Props> = ({ sortQuery, data, qQuery, linkString, loading }) => {
  const history = useHistory();
  const sortWorkshops = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    if (value !== '') history.push(`${linkString}?q=${qQuery}&sort=${value}`);
    else history.push(`${linkString}?q=${qQuery}`);
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
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
