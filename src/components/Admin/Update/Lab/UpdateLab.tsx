import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { putData, getData } from '../../Api/index';
import { getAccessToken } from '../../Helpers/accessToken';
import { ILab, LabSchema } from './types';
import { useAlertContext, AlertType } from '../Context/AlertContext';
import { IEmployee } from '../Workshop/types';
import { Button, TextField, Container, InputLabel, FormControl, Paper, Avatar, Typography, CssBaseline, NativeSelect } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import MyTextField from '../Utils/Inputs/MyTextField';
import { Params } from '../../Helpers/types';
import useStyles from '../Login/styles';
import EditIcon from '@material-ui/icons/Edit';
const Lab: React.FC = () => {
  const classes = useStyles();
  const context = useAlertContext();
  const history = useHistory();
  const { id } = useParams<Params>();
  const [currentLab, setCurrentLab] = useState<ILab>({ name: '', english_name: '', employeeId: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  useEffect(() => {
    getLab();
    getEmployees();
  }, []);
  const getLab = async () => {
    const data = await getData('labs/' + id, getAccessToken());
    setCurrentLab(data);
    setLoading(false);
  };
  const getEmployees = async () => {
    const data = await getData('employees/list', getAccessToken());
    setEmployees(data);
  };
  const updateLab = async (values: any) => {
    const res = await putData('labs/' + id, getAccessToken(), values);
    context.openAlert(AlertType.success, 'Pomyślnie zaktualizowano laboratorium w bazie!');
    history.push('/admin/labs');
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
          Edytuj Laboratorium
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{ name: currentLab.name, english_name: currentLab.english_name, employeeId: currentLab.employeeId !== null ? currentLab.employeeId : '' }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            updateLab(data);
            setSubmitting(false);
          }}
          validationSchema={LabSchema}
        >
          {({ values, isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <MyTextField name='english_name' type='input' as={TextField} placeholder='Przetłumaczona nazwa' />
              <FormControl>
                <InputLabel htmlFor='employeeId'>Pracownik </InputLabel>
                <Field name='employeeId' type='select' as={NativeSelect}>
                  <option value=''></option>
                  {employees.map((emp) => (
                    <option value={emp.Employee.id} key={emp.Employee.id}>
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </Field>
              </FormControl>
              <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                Zaktualizuj Laboratorium
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Lab;
