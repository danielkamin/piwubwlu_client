import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { IMediaCard } from '../../Helpers/types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: 330
    }
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  cardBtn: {
    marginTop: 'auto'
  },
  cover: {
    height: 200,
    width: 'auto'
  }
}));
interface Props extends IMediaCard {
  linkTo: string;
}
const MyCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5'>
            {props.name}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {props.english_name}
          </Typography>
          <CardActions className={classes.cardBtn}>
            <Button component={Link} to={props.linkTo + '/' + props.id} variant='outlined' color='secondary'>
              Więcej...
            </Button>
          </CardActions>
        </CardContent>
      </div>
      {props.imagePath !== null ? <CardMedia className={classes.cover} src={props.imagePath} title='' component='img' /> : <CardMedia className={classes.cover} title='' component='img' />}
    </Card>
  );
};

export default MyCard;
