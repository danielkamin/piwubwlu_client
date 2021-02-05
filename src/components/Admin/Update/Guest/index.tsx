import React, { useEffect, useState } from 'react';
import { putData, getData } from '../../../../api/index';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IGuest } from '../../types';
import { UserSchema } from '../../schemas';
import { Button, TextField, Container, Grid, Paper, Checkbox, FormControlLabel, CssBaseline, Avatar, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import useStyles from '../../styles';
import EditIcon from '@material-ui/icons/Edit';
import { Params } from '../../../../utils/types';
const UpdateGuest: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentGuest, setCurrentGuest] = useState<IGuest>({ id: 0, firstName: '', lastName: '', email: '', isVerified: false, setEmployee: false });
  const { id } = useParams<Params>();
  const classes = useStyles();
  useEffect(() => {
    getGuest();
  }, []);
  const getGuest = async () => {
    const data = await getData('guests/' + id, getAccessToken());
    setCurrentGuest(data);
    setLoading(false);
  };
  const history = useHistory();
  const updateGuest = async (values: any) => {
    const res = await putData('guests/' + id, getAccessToken(), values);
    history.push('/admin/guests');
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
          Edytuj profil gościa
        </Typography>

        <Formik
          validateOnChange={true}
          initialValues={{
            firstName: currentGuest.firstName,
            lastName: currentGuest.lastName,
            email: currentGuest.email,
            password: '',
            repeatPassword: '',
            isVerified: currentGuest.isVerified,
            setEmployee: currentGuest.setEmployee
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            updateGuest(data);
            setSubmitting(false);
          }}
          validationSchema={UserSchema}
        >
          {({ isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='firstName' type='input' as={TextField} placeholder='Imię' />
              <MyTextField name='lastName' type='input' as={TextField} placeholder='Nazwisko' />
              <MyTextField name='email' type='input' as={TextField} placeholder='Email' />
              <MyTextField name='password' type='input' as={TextField} placeholder='Nowe Hasło' />
              <MyTextField name='repeatPassword' type='input' as={TextField} placeholder='Powtórz Hasło' />
              <FormControlLabel label='Zwerifikowany?' control={<Field name='isVerified' as={Checkbox} type='checkbox' />} />

              <FormControlLabel label='Pracownik?' control={<Field name='setEmployee' as={Checkbox} type='checkbox' />} />
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

export default UpdateGuest;
