import React, { useEffect, useState } from 'react';
import { putData, getData } from '../../../../api/index';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IEmployee, IDepartment, IDegree } from '../../types';
import { UserSchema } from '../../schemas';
import { Button, TextField, Paper, Container, Checkbox, FormControlLabel, Typography, FormControl, InputLabel, NativeSelect, CssBaseline, Avatar } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import { Params } from '../../../../utils/types';
import useStyles from '../../styles';
import EditIcon from '@material-ui/icons/Edit';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';

const UpdateEmployee: React.FC = () => {
  const classes = useStyles();
  const alertContext = useAlertContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [departmentList, setDepartmentList] = useState<IDepartment[]>(() => {
    return [];
  });
  const [degreesList, setDegreesList] = useState<IDegree[]>(() => {
    return [];
  });
  const [currentEmp, setCurrentEmp] = useState<IEmployee>({
    id: 0,
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    email: '',
    setEmployee: true,
    Employee: {
      departmentId: 0,
      degreeId: 0
    }
  });
  const history = useHistory();
  const { id } = useParams<Params>();
  useEffect(() => {
    getEmp();
  }, []);
  const getEmp = async () => {
    const [emp, depList, degList] = await Promise.all([getData('employees/' + id, getAccessToken()), getData('departments/list', getAccessToken()), getData('degrees/list', getAccessToken())]);
    setDepartmentList(() => {
      return depList;
    });
    setDegreesList(() => {
      return degList;
    });
    setCurrentEmp({
      id: +id,
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      password: '',
      repeatPassword: '',
      setEmployee: true,
      Employee: {
        departmentId: emp.Employee.Department ? emp.Employee.Department.id : 0,
        degreeId: emp.Employee.Degree ? emp.Employee.Degree.id : 0,
        room: emp.Employee.room,
        telephone: emp.Employee.telephone
      }
    });
    setLoading(false);
  };
  const updateEmp = async (values: any) => {
    await putData('employees/' + id, getAccessToken(), values)
      .then(() => {
        alertContext.openAlert(AlertType.success, 'Pomyślnie zaktualizowano pracownika');
        history.push('/admin/employees');
      })
      .catch((err) => alertContext.openAlert(AlertType.warning, err));
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Container maxWidth='sm' component='main'>
      <CssBaseline />
      <Paper elevation={6} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Edytuj Profil Pracownika
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{
            firstName: currentEmp.firstName,
            lastName: currentEmp.lastName,
            email: currentEmp.email,
            password: currentEmp.password,
            repeatPassword: currentEmp.repeatPassword,
            setEmployee: currentEmp.setEmployee,
            departmentId: currentEmp.Employee.departmentId,
            degreeId: currentEmp.Employee.degreeId,
            telephone: currentEmp.Employee.telephone,
            room: currentEmp.Employee.room
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            updateEmp(data);
            setSubmitting(false);
          }}
          validationSchema={UserSchema}
        >
          {({ values, isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='firstName' type='input' as={TextField} placeholder='Imię' />
              <MyTextField name='lastName' type='input' as={TextField} placeholder='Nazwisko' />
              <MyTextField name='email' type='input' as={TextField} placeholder='Email' />
              <MyTextField name='telephone' type='input' as={TextField} placeholder='Telefon kontaktowy' />
              <MyTextField name='room' type='input' as={TextField} placeholder='Numer pokoju' />
              <MyTextField name='password' type='input' as={TextField} placeholder='Nowe Hasło' />
              <MyTextField name='repeatPassword' type='input' as={TextField} placeholder='Powtórz Hasło' />
              <FormControlLabel label='Pracownik?' control={<Field name='setEmployee' as={Checkbox} type='checkbox' />} />
              <FormControl>
                <InputLabel htmlFor='departmentId'>Katedra</InputLabel>
                <Field name='departmentId' type='select' as={NativeSelect}>
                  <option value=''></option>
                  {departmentList?.map((department) => (
                    <option value={department.id} key={department.id}>
                      {department.name}
                    </option>
                  ))}
                </Field>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor='degreeId'>Tytuł Naukowy</InputLabel>
                <Field name='degreeId' type='select' as={NativeSelect}>
                  <option value=''></option>
                  {degreesList?.map((degree) => (
                    <option value={degree.id} key={degree.id}>
                      {degree.name}
                    </option>
                  ))}
                </Field>
              </FormControl>
              <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                Aktualizuj
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};
export default UpdateEmployee;
