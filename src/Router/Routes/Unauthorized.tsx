import React from 'react';

interface Props {}

const Unauthorized: React.FC<Props> = () => {
  return (
    <div>
      <h1>403 - Unauthorized</h1>
    </div>
  );
};

export default Unauthorized;
