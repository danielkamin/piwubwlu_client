import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper, TextField } from '@material-ui/core';
import { IEmployee } from '../../types';
import useStyles from '../../styles';
import { API_URL } from '../../../../utils/constants';
interface Props {
  Employees: IEmployee[];
}

const EmployeeTable: React.FC<Props> = ({ Employees }) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Imię</TableCell>
            <TableCell>Nazwisko</TableCell>
            <TableCell>Katedra</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Employees.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link to={'/kadra/' + row.id}>{row.picturePath !== null ? <Avatar src={API_URL + '/' + row.picturePath} /> : <Avatar />}</Link>
              </TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.Employee?.Department.name !== null ? row.Employee?.Department.name : ' '}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
