import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  link: string;
  roomNumber?: string;
}
const MyCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className='lab-card'>
      <Link to={props.link}>
        <div className='lab-card-content'>
          <h4>{props.name}</h4>
          <h5>{props.english_name}</h5>
          {props.roomNumber && <p>Nr sali: {props.roomNumber}</p>}
        </div>
      </Link>
    </div>
  );
};
export default MyCard;
