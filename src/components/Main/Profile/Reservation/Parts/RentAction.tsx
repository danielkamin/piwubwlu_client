import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
interface ButtonProps {
  onAccepted: () => void;
  onRejected: () => void;
}
const RentAction: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonGroup>
      <Button onClick={props.onAccepted} color='primary' variant='contained'>
        Akceptuj
      </Button>
      <Button onClick={props.onRejected} color='secondary' variant='contained'>
        Odrzuć
      </Button>
    </ButtonGroup>
  );
};
export default RentAction;
