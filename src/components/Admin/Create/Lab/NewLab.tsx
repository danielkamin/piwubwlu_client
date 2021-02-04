import React, { useState, useEffect } from 'react';
import { postData, getData } from '../../Api/index';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../Helpers/accessToken';
import { LabSchema } from './types';
import { useAlertContext, AlertType } from '../Context/AlertContext';
import { Button, TextField, Container, InputLabel, FormControl, Paper, Avatar, Typography, CssBaseline, NativeSelect } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import MyTextField from '../Utils/Inputs/MyTextField';
import { IEmployee } from '../Workshop/types';
import useStyles from '../Login/styles';
import AddIcon from '@material-ui/icons/Add';

const NewLab: React.FC = () => {
  const classes = useStyles();
  const context = useAlertContext();
  const history = useHistory();
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  useEffect(() => {
    getEmployees();
  }, []);
  const createLab = async (values: any) => {
    const res = await postData('labs', getAccessToken(), values);
    context.openAlert(AlertType.success, 'Pomyślnie dodano nowe laboratorium do bazy!');
    history.push('/admin/labs');
  };
  const getEmployees = async () => {
    const data = await getData('employees/list', getAccessToken());
    setEmployees(data);
  };
  return (
    <Container maxWidth='sm' component='main'>
      <CssBaseline />
      <Paper elevation={6} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Dodaj Laboratorium
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{ name: '', english_name: '', employeeId: '' }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            createLab(data);
            setSubmitting(false);
          }}
          validationSchema={LabSchema}
        >
          {({ values, isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <MyTextField name='english_name' type='input' as={TextField} placeholder='Przetłumaczona nazwa' />
              <FormControl>
                <InputLabel shrink htmlFor='employeeId'>
                  Pracownik{' '}
                </InputLabel>
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
                Stwórz Laboratorium
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default NewLab;
