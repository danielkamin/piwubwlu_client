import React from 'react';
import { Container } from '@material-ui/core';
import MachineList from './MachineList';
import NewResourceButton from '../../../Shared/Buttons/NewResourceButton';
interface Props {}

const Machines: React.FC<Props> = () => {
  return (
    <Container maxWidth='lg'>
      <NewResourceButton link='/admin/new_machine' message='Nowa Maszyna' />
      <MachineList />
    </Container>
  );
};

export default Machines;
