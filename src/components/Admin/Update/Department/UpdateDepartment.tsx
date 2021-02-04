import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getData, putData } from '../../Api/index';
import { getAccessToken } from '../../Helpers/accessToken';
import { IDepartment, DepartmentSchema } from './types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, TextField, Paper, Container, Avatar, Typography, CssBaseline } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useAlertContext, AlertType } from '../Context/AlertContext';
import MyTextField from '../Utils/Inputs/MyTextField';
import { Params } from '../../Helpers/types';
import useStyles from '../Login/styles';
import AddIcon from '@material-ui/icons/Add';
const UpdateDepartment: React.FC = () => {
  const context = useAlertContext();
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentDepartment, setCurrentDepartment] = useState<IDepartment>({ name: '', english_name: '' });
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    getDepartment();
    console.log(id);
  }, []);
  const createDepartment = async (values: IDepartment) => {
    const res = await putData('departments/' + id, getAccessToken(), values);
    context.openAlert(AlertType.success, 'Pomyślnie zaktualizowano nową katedrę w bazie!');
    history.push('/admin/departments');
  };
  const getDepartment = async () => {
    const data = await getData('departments/' + id, getAccessToken());

    setCurrentDepartment(data);
    setLoading(false);
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
          <AddIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Dodaj Katedrę
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{ name: currentDepartment.name, english_name: currentDepartment.english_name }}
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
                Aktualizuj Katedrę
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default UpdateDepartment;
