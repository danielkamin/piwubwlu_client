import React, { useEffect, useState } from 'react';
import { putData, getData } from '../../../Api/index';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../../Helpers/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IGuest, GuestSchema, IGuestForm } from '../types';
import { Button, TextField, Container, Grid, Paper, Checkbox, FormControlLabel, NativeSelect, CssBaseline, Avatar, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import MyTextField from '../../Utils/Inputs/MyTextField';
import useStyles from '../../Login/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Params } from '../../../Helpers/types';
const UpdateGuest: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentGuest, setCurrentGuest] = useState<IGuest>({ id: 0, firstName: '', lastName: '', email: '', picturePath: '', Guest: { isVerified: false, id: 0 } });
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
  const updateGuest = async (values: IGuestForm) => {
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
            isVerified: currentGuest.Guest.isVerified,
            setEmployee: false
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            updateGuest(data);
            setSubmitting(false);
          }}
          validationSchema={GuestSchema}
        >
          {({ values, isSubmitting }) => (
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
