import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardActionArea, CardContent, Typography } from '@material-ui/core';
import useStyles from '../styles';

interface Props {
  title: string;
  details: string;
  link: string;
  image: string;
}

const HomeCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Card className='card'>
      {' '}
      <CardActionArea component={Link} to={props.link}>
        <CardMedia component='img' alt='' height='140' image={props.image} title='' />
        <CardContent className='card-content'>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.details}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HomeCard;
