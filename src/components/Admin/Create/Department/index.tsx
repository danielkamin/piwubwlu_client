import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postData } from '../../../../api/index';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { IDepartment } from '../../types';
import { DepartmentSchema } from '../../schemas';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import { Button, TextField, Paper, Container, Avatar, Typography, CssBaseline } from '@material-ui/core';
import { Formik, Form } from 'formik';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import useStyles from '../../styles';
import AddIcon from '@material-ui/icons/Add';

const NewDepartment: React.FC = () => {
  const context = useAlertContext();

  const classes = useStyles();
  const history = useHistory();
  const createDepartment = async (values: IDepartment) => {
    await postData('departments', getAccessToken(), values)
      .then((res) => {
        context.openAlert(AlertType.success, 'Pomyślnie dodano nową katedrę do bazy!');
        history.push('/admin/departments');
      })
      .catch((err) => {
        context.openAlert(AlertType.warning, 'Coś poszło nie tak.');
      });
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
