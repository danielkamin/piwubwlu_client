import React, { useState, useEffect, useRef } from 'react';
import { getData } from '../../../../api/index';
import { TextField, Container, MenuItem } from '@material-ui/core';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IEmployee, Department, Degree } from '../../types';
import PageTitle from '../../../Shared/Display/PageTitle';
import EmployeeTable from './table';
interface IFilterValues {
  Department: string;
  Degree: string;
}
const Employees: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [initialEmployees, setInitialEmployees] = useState<IEmployee[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [departments, setDepartments] = useState<Department[]>(() => {
    return [];
  });
  const [degrees, setDegrees] = useState<Degree[]>(() => {
    return [];
  });
  const [filterValues, setFilterValues] = useState<IFilterValues>({
    Degree: '',
    Department: ''
  });
  useEffect(() => {
    getEmployees();
  }, []);
  const getEmployees = async () => {
    const [empData, depData, degData] = await Promise.all([getData('employees/display', getAccessToken()), getData('departments/list', getAccessToken()), getData('degrees/list', getAccessToken())]);
    setEmployees(empData);
    setInitialEmployees(empData);
    setDepartments(() => {
      return depData;
    });
    setDegrees(() => {
      return degData;
    });
    setLoading(false);
  };
  const filterEmployees = (newFilterValues: IFilterValues) => {
    let newEmployees: IEmployee[] = initialEmployees;
    Object.entries(newFilterValues).forEach((entry) => {
      newEmployees = keyFiltering(entry, newEmployees);
    });
    setEmployees(newEmployees);
  };
  const keyFiltering = (entry: [string, string], filteredEmployes: IEmployee[]) => {
    if (entry[1] !== '') {
      return filteredEmployes.filter((emp) => {
        if (Object.getOwnPropertyDescriptor(emp.Employee!, entry[0])?.value.name === entry[1]) return emp;
      });
    } else return filteredEmployes;
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
        <TextField
          select
          name='dep-filter'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            filterEmployees({ Department: e.target.value, Degree: filterValues.Degree });
            setFilterValues({ Department: e.target.value, Degree: filterValues.Degree });
          }}
          value={filterValues.Department}
        >
          <MenuItem value=''>Katedra</MenuItem>
          {departments.map((dep) => (
            <MenuItem key={dep.id} value={dep.name}>
              {dep.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          name='dep-filter'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            filterEmployees({ Degree: e.target.value, Department: filterValues.Department });
            setFilterValues({ Degree: e.target.value, Department: filterValues.Department });
          }}
          value={filterValues.Degree}
        >
          <MenuItem value=''>Tytuł nauk</MenuItem>
          {degrees.map((deg) => (
            <MenuItem key={deg.id} value={deg.name}>
              {deg.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <EmployeeTable Employees={employees} />
    </Container>
  );
};

export default Employees;
