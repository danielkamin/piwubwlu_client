import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: 330
    }
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));
interface Props {
  name: string;
  english_name: string;
  id: number;
}
const MyCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h5'>{props.name}</Typography>
        <Typography variant='subtitle1'>{props.english_name}</Typography>
        <CardActions>
          <Button component={Link} to={'/laboratoria/' + props.id} variant='outlined' color='secondary'>
            Dowiedz się więcej...
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
export default MyCard;
