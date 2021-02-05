import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Cards from './Parts/Cards';
import Banner from './Parts/Banner';
import useStyles from './styles';
const Home: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Banner />
      <Container maxWidth='xl' className='home-container'>
        <Typography variant='h3'>Nasze zasoby uczelniane</Typography>
        <Cards />
      </Container>
    </div>
  );
};
export default Home;
