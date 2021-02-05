import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../../Api/index';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper, TextField } from '@material-ui/core';
import { getAccessToken } from '../../../Helpers/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Employee } from '../Employee/types';
import useStyles from '../Employee/styles';
import { StyledTableCell, StyledTableRow } from '../../Utils/Table/StyledTable';
import { API_URL } from '../../../Helpers/constants';
interface Props {
  Employees: Employee[];
}

const EmployeeTable: React.FC<Props> = ({ Employees }) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Imię</StyledTableCell>
            <StyledTableCell>Nazwisko</StyledTableCell>
            <StyledTableCell>Katedra</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Employees.map((row) => (
            <StyledTableRow key={row.userId}>
              <TableCell>
                <Link to={'/kadra/' + row.userId}>{row.User.picturePath !== null ? <Avatar src={API_URL + '/' + row.User.picturePath} /> : <Avatar />}</Link>
              </TableCell>
              <TableCell>{row.User.firstName}</TableCell>
              <TableCell>{row.User.lastName}</TableCell>
              <TableCell>{row.Department !== null ? row.Department.name : ' '}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
