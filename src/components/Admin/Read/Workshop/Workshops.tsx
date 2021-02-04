import React from 'react';
import { Container } from '@material-ui/core';
import WorkshopList from './WorkshopList';
import AddButton from '../Utils/Buttons/AddButton';
interface Props {}

const Workshops: React.FC<Props> = () => {
  return (
    <Container maxWidth='lg'>
      <AddButton link='/admin/new_workshop' message='Nowa Pracownia' />
      <WorkshopList />
    </Container>
  );
};

export default Workshops;
