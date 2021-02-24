import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import useStyles from '../../../styles';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

const Links: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Link to='/admin' className={classes.links}>
        <ListItem button key={1}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary='Strona Główna' />
        </ListItem>
      </Link>
      <Link to='/admin/workshops' className={classes.links}>
        <ListItem button key={2}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Pracownie' />
        </ListItem>
      </Link>
      <Link to='/admin/labs' className={classes.links}>
        <ListItem button key={2}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Laboratoria' />
        </ListItem>
      </Link>
      <Link to='/admin/machines' className={classes.links}>
        <ListItem button key={2}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Maszyny' />
        </ListItem>
      </Link>
      <Link to='/admin/departments' className={classes.links}>
        <ListItem button key={2}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Katedry' />
        </ListItem>
      </Link>
      <Link to='/admin/workshop_types' className={classes.links}>
        <ListItem button key={2}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Typy Pracowni' />
        </ListItem>
      </Link>
      <Link to='/admin/degrees' className={classes.links}>
        <ListItem button key={2}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Tytuły Naukowe' />
        </ListItem>
      </Link>
      <Link to='/admin/guests' className={classes.links}>
        <ListItem button key={2}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Goście' />
        </ListItem>
      </Link>
      <Link to='/admin/employees' className={classes.links}>
        <ListItem button key={2}>
          <ListItemIcon>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary='Pracownicy' />
        </ListItem>
      </Link>
      <Link to='/admin/reservations' className={classes.links}>
        <ListItem button key={2}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Rezerwacje' />
        </ListItem>
      </Link>
    </div>
  );
};
export default Links;
