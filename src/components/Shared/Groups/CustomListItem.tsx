import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
interface Props {
  text: string;
  link: string;
  expandable: boolean;
  expandList?: () => void;
}

const CustomListItem: React.FC<Props> = ({ text, link, expandable, expandList }) => {
  return (
    <div className='resource-list-item'>
      <Link to={link}>{text}</Link>
      {expandable && (
        <IconButton onClick={expandList}>
          <ArrowForwardIcon />
        </IconButton>
      )}
    </div>
  );
};

export default CustomListItem;
