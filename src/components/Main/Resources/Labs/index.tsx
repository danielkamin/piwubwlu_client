import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { getData } from '../../../../api/index';
import { Container } from '@material-ui/core';
import { ICardInfo } from '../../types';
import MyCard from './MyCard';
import PageTitle from '../../../Shared/Display/PageTitle';
interface Props {}

const DisplayLabs: React.FC<Props> = () => {
  const [labs, setLabs] = useState<ICardInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getLabs();
  }, []);
  const getLabs = async () => {
    await getData('labs/list', getAccessToken()).then((res) => {
      setLabs(res);
    });
    setLoading(false);
  };
  return (
    <Container maxWidth='xl'>
      <PageTitle title='Laboratoria' />
      <div className='labs-grid'>
        {labs.map((item) => (
          <MyCard link={'/laboratoria/' + item.id} name={item.name} english_name={item.english_name} key={item.id} />
        ))}
      </div>
    </Container>
  );
};

export default DisplayLabs;
