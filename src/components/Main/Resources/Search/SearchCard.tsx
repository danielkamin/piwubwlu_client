import React from 'react';

export interface CardProps {
  id: number;
  name: string;
  secondName: string;
  type: string;
}

const SearchCard: React.FC<CardProps> = ({ id, name, secondName, type }) => {
  return (
    <div>
      {id},{name},{secondName}
    </div>
  );
};

export default SearchCard;
