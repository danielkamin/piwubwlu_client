import React from 'react';
import { Container } from '@material-ui/core';
import DepartmentList from './DepartmentList';
import NewResourceButton from '../../../Shared/Buttons/NewResourceButton';

const Departments: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <NewResourceButton link='/admin/new_department' message='Nowa Katedra' />
      <DepartmentList />
    </Container>
  );
};

export default Departments;
