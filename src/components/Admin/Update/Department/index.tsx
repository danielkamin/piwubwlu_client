import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getData, putData } from '../../../../api/index';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { IDepartment } from '../../types';
import { DepartmentSchema } from '../../schemas';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, TextField, Paper, Container, Avatar, Typography, CssBaseline } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import { Params } from '../../../../utils/types';
import useStyles from '../../styles';
import AddIcon from '@material-ui/icons/Add';
const UpdateDepartment: React.FC = () => {
  const context = useAlertContext();
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentDepartment, setCurrentDepartment] = useState<IDepartment>({ name: '', english_name: '', id: 0 });
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    getDepartment();
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
          initialValues={{ name: currentDepartment.name, english_name: currentDepartment.english_name, id: currentDepartment.id }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            createDepartment(data);
            setSubmitting(false);
          }}
          validationSchema={DepartmentSchema}
        >
          {({ isSubmitting }) => (
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
