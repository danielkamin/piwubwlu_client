import React from 'react';
import { Container } from '@material-ui/core';
import WorkshopTypeList from './WorkshopTypeList';
import NewResourceButton from '../../../Shared/Buttons/NewResourceButton';

const WorkshopTypes: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <NewResourceButton link='/admin/new_workshop_type' message='Nowy Typ Pracowni' />
      <WorkshopTypeList />
    </Container>
  );
};

export default WorkshopTypes;
