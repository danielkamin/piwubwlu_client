import React from 'react';
import { Typography } from '@material-ui/core';
interface Props {
  title: string;
}

const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className='page-title'>
      <Typography variant='h4'>{title}</Typography>
    </div>
  );
};

export default PageTitle;
