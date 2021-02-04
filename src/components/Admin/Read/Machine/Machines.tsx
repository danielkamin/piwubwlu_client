import React from 'react';
import { Container } from '@material-ui/core';
import MachineList from './MachineList';
import AddButton from '../Utils/Buttons/AddButton';
interface Props {}

const Machines: React.FC<Props> = () => {
  return (
    <Container maxWidth='lg'>
      <AddButton link='/admin/new_machine' message='Nowa Maszyna' />
      <MachineList />
    </Container>
  );
};

export default Machines;
