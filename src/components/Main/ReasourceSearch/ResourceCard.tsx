import React from 'react';

interface Props {
  type: string;
  name: string;
  english_name: string;
}

const ResourceCard: React.FC<Props> = ({ type, name, english_name }) => {
  return (
    <div>
      {type}
      {name}
      {english_name}
    </div>
  );
};

export default ResourceCard;
