import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postData } from '../../Api/index';
import { getAccessToken } from '../../Helpers/accessToken';
import { IDepartment, DepartmentSchema } from './types';
import { useAlertContext, AlertType } from '../Context/AlertContext';
import { Button, TextField, Paper, Container, Avatar, Typography, CssBaseline } from '@material-ui/core';
import { Formik, Form } from 'formik';
import MyTextField from '../Utils/Inputs/MyTextField';
import useStyles from '../Login/styles';
import AddIcon from '@material-ui/icons/Add';

const NewDepartment: React.FC = () => {
  const context = useAlertContext();

  const classes = useStyles();
  const history = useHistory();
  const createDepartment = async (values: IDepartment) => {
    const res = await postData('departments', getAccessToken(), values);
    context.openAlert(AlertType.success, 'Pomyślnie dodano nową katedrę do bazy!');
    history.push('/admin/departments');
  };
  return (
    <Container maxWidth='sm' component='main'>
      <CssBaseline />
      <Paper elevation={6} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Dodaj Katedrę
        </Typography>

        <Formik
          validateOnChange={true}
          initialValues={{ name: '', english_name: '' }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            createDepartment(data);
            setSubmitting(false);
          }}
          validationSchema={DepartmentSchema}
        >
          {({ values, isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <MyTextField name='english_name' type='input' as={TextField} placeholder='Przetłumaczona nazwa' />
              <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                Dodaj Katedrę
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default NewDepartment;
