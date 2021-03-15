import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getData } from '../../../api/index';
import { getAccessToken } from '../../../utils/api/accessToken';
type Resource = {
  id: number;
  name: string;
  Workshops: {
    id: number;
    name: string;
    Machines: {
      id: number;
      name: string;
    }[];
  }[];
};
const AllResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const history = useHistory();
  useEffect(() => {
    getLabs();
  }, []);
  const getLabs = async () => {
    await getData('utils/names', getAccessToken())
      .then((res) => {
        setResources(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const redirectToResource = (model: string, id: number) => {
    history.push(`${model}/${id}`);
  };
  return (
    <div>
      lista
      <ul>
        {resources.map((lab) => (
          <li key={lab.id}>
            {lab.name}
            <ul>
              {lab.Workshops.map((workshop) => (
                <li key={workshop.id}>
                  {workshop.name}
                  <ul>
                    {workshop.Machines.map((machine) => (
                      <li key={machine.id}>{machine.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllResources;
