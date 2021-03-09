import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from '../styles';
interface Props {
  title: string;
  subTitle?: string;
  link: string;
  image: string;
}

const HomeCard: React.FC<Props> = (props) => {
  return (
    <div className='boxlink zoomIn animated'>
      <Link to={props.link}>
        <div className='boxlink-title'>
          {props.title}{' '}
          {props.subTitle !== null && (
            <span>
              <br />
              {props.subTitle}
            </span>
          )}
        </div>
        <div className='boxlink-content'>
          <img src={props.image} />
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
