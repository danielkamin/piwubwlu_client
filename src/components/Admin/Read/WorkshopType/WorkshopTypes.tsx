import React from 'react';

import { Container } from '@material-ui/core';
import WorkshopTypeList from './WorkshopTypeList';
import AddButton from '../Utils/Buttons/AddButton';
interface Props {}

const WorkshopTypes: React.FC<Props> = () => {
  return (
    <Container maxWidth='lg'>
      <AddButton link='/admin/new_workshop_type' message='Nowy Typ Pracowni' />

      <WorkshopTypeList />
    </Container>
  );
};

export default WorkshopTypes;
