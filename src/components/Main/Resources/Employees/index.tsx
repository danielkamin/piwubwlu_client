import React, { useState, useEffect } from 'react';
import { getData } from '../../../Api/index';
import { TextField, Container, MenuItem } from '@material-ui/core';
import { getAccessToken } from '../../../Helpers/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Employee } from '../Employee/types';
import PageTitle from '../../Utils/PageTitle';
import { Department } from '../types';
import EmployeeTable from './EmployeeTable';
const Employees: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [initialEmployees, setInitialEmployees] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
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
        if (item.Department !== null && item?.Department.name === e.target.value) return item;
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
