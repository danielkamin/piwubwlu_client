import React, { useState, useEffect } from 'react';
import { getData } from '../../../../api/index';
import { TextField, Container, MenuItem } from '@material-ui/core';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IEmployee } from '../../types';
import PageTitle from '../../../Shared/Display/PageTitle';
import { Department } from '../../types';
import EmployeeTable from './table';
const Employees: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [initialEmployees, setInitialEmployees] = useState<IEmployee[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filter, setFilter] = useState<string>('all');
  useEffect(() => {
    getEmployees();
  }, []);
  const getEmployees = async () => {
    const [empData, depData] = await Promise.all([getData('employees/display', getAccessToken()), getData('departments/list', getAccessToken())]);
    setEmployees(empData);
    setInitialEmployees(empData);
    setDepartments(depData);
    setLoading(false);
  };
  const filterEmployees = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== 'all') {
      let newEmployees = initialEmployees.filter((item) => {
        if (item.Employee?.Department !== null && item?.Employee?.Department.name === e.target.value) return item;
      });
      setEmployees(newEmployees);
    } else setEmployees(initialEmployees);
    setFilter(e.target.value);
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Container maxWidth='md' className='container-spacing'>
      <PageTitle title='Kadra Pracownicza' />
      <div className='sort-form'>
        <b>Wyszukaj po:</b>
        <TextField select name='dep-filter' onChange={filterEmployees} value={filter}>
          <MenuItem value='all'>
            <em>Wszystkie</em>
          </MenuItem>
          {departments.map((dep) => (
            <MenuItem key={dep.id} value={dep.name}>
              {dep.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <EmployeeTable Employees={employees} />
    </Container>
  );
};

export default Employees;
