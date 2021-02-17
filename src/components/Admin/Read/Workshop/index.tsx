import React from 'react';
import { Container } from '@material-ui/core';
import WorkshopList from './WorkshopList';
import NewResourceButton from '../../../Shared/Buttons/NewResourceButton';
const Workshops: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <NewResourceButton link='/admin/new_workshop' message='Nowa Pracownia' />
      <WorkshopList />
    </Container>
  );
};

export default Workshops;
