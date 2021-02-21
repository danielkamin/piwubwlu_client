import { Button } from '@material-ui/core';
import React from 'react';
interface Props {
  totalElements: number;
  elementsPerPage: number;
  paginate: (number: number) => void;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({ totalElements, elementsPerPage, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalElements / +elementsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <Button onClick={() => paginate(number)} className='page-link' size='small' variant={currentPage === number ? 'contained' : 'outlined'}>
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
