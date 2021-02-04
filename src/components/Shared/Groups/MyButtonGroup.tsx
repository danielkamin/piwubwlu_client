import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import DeleteModal from '../DeleteModal';
interface Props {
  editLink: string;
  deleteCB: () => void;
  modalTitle: string;
  modalBody: string;
}
const useStyles = makeStyles(() => ({
  btnGroup: {
    display: 'flex',
    '& button': {
      marginLeft: 10
    }
  }
}));
const MyButtonGroup: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.btnGroup}>
      <div>
        <Button startIcon={<EditIcon />} component={Link} to={props.editLink} variant='outlined'>
          Edytuj
        </Button>
      </div>
      <DeleteModal triggerText='Usuń' okBtnText='Usuń' title={props.modalTitle} bodyText={props.modalBody} onApproved={props.deleteCB} />
    </div>
  );
};

export default MyButtonGroup;
