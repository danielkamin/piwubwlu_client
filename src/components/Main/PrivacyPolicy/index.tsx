import React from 'react';
import { Container, Typography, Paper } from '@material-ui/core';
const Regulations: React.FC = () => {
  return (
    <Container maxWidth='md'>
      <div className='container-spacing'>
        <Paper>
          <Typography variant='h3'>Regulamin</Typography>
          <Typography variant='body1'></Typography>
        </Paper>
      </div>
    </Container>
  );
};

export default Regulations;
