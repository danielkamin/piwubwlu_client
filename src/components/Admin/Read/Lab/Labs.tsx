import React from 'react';
import { Container } from '@material-ui/core';
import LabList from './LabList';
import NewResourceButton from '../../../Shared/Buttons/NewResourceButton';

const Labs: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <NewResourceButton link='/admin/new_lab' message='Nowe Laboratorium' />
      <LabList />
    </Container>
  );
};

export default Labs;
