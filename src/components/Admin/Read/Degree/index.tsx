import React from 'react';
import { Container } from '@material-ui/core';
import DegreeList from './DegreeList';
import NewResourceButton from '../../../Shared/Buttons/NewResourceButton';

const Degrees: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <NewResourceButton link='/admin/new_degree' message='Nowa Tytuł' />
      <DegreeList />
    </Container>
  );
};

export default Degrees;
