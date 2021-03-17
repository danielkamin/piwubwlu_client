import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { getData } from '../../../api/index';
import { Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Typography } from '@material-ui/core';
import { getAccessToken } from '../../../utils/api/accessToken';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinkIcon from '@material-ui/icons/Link';
import { useUserContext } from '../../../context/UserContext';
import useStyles from '../styles';
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
  const classes = useStyles();
  const userContext = useUserContext();
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
  return (
    <div className='resource-list-container'>
      {!userContext.loggedIn && (
        <div className='login-alert'>
          <h3>W celu rezerwacji maszyny należy się zalogować!</h3>
        </div>
      )}
      {resources.map((lab) => (
        <Accordion className={classes.accordionCustom}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label='Expand' aria-controls='additional-actions1-content' id='additional-actions1-header'>
            <Link to={`/laboratoria/${lab.id}`}>{lab.name}</Link>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <Typography variant='subtitle2'>
              <b>Pracownie:</b>
            </Typography>
            {lab.Workshops.map((workshop) => (
              <Accordion style={{ width: '100%' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label='Expand' aria-controls='additional-actions1-content' id='additional-actions1-header'>
                  <Link to={`/pracownie/${workshop.id}`}>{workshop.name}</Link>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                  <Typography variant='subtitle2'>
                    <b>Wyposażenie:</b>
                  </Typography>
                  {workshop.Machines.map((machine) => (
                    <div>
                      <Link to={`/maszyny/${machine.id}`}>{machine.name}</Link>{' '}
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AllResources;
