import React from 'react';
import { Container } from '@material-ui/core';
import DepartmentList from './DepartmentList';
import AddButton from '../Utils/Buttons/AddButton';
interface Props {}

const Departments: React.FC<Props> = () => {
  return (
    <Container maxWidth='lg'>
      <AddButton link='/admin/new_department' message='Nowa Katedra' />
      <DepartmentList />
    </Container>
  );
};

export default Departments;
