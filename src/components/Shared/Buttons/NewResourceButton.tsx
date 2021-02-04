import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from '../../../Helpers/styles';
interface Props {
  link: string;
  message: string;
}

const NewResourceButton: React.FC<Props> = ({ link, message }) => {
  const classes = useStyles();
  return (
    <Link to={link} className={classes.buttonlinks}>
      <Button variant='contained' endIcon={<AddIcon />} color='secondary' className={classes.addbtn}>
        {message}
      </Button>
    </Link>
  );
};
export default NewResourceButton;
