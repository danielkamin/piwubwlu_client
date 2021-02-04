import React from 'react';

import { Container } from '@material-ui/core';
import LabList from './LabList';
import AddButton from '../Utils/Buttons/AddButton';

interface Props {}

const Labs: React.FC<Props> = () => {
  return (
    <Container maxWidth='lg'>
      <AddButton link='/admin/new_lab' message='Nowe Laboratorium' />
      <LabList />
    </Container>
  );
};

export default Labs;
