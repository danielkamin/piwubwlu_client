import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Button, TextField, Container, CssBaseline, Avatar, Typography } from '@material-ui/core';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import { NewPasswordForm } from '../../types';
import { PasswordSchema } from '../../schemas';
import useStyles from '../../styles';
import customAxios from '../../../../utils/api/customAxios';
import { API_URL } from '../../../../utils/constants';
import { useParams } from 'react-router-dom';
import { authRoute } from '../../../../api/index';
import TokenExpired from '../../../Shared/Display/TokenExpired';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
interface Params {
  token: string;
}

const NewPassword: React.FC = () => {
  const classes = useStyles();
  const context = useAlertContext();
  useEffect(() => {
    getNewPassForm();
  }, []);
  const { token } = useParams<Params>();
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const getNewPassForm = async () => {
    await customAxios.get(API_URL + '/auth/new_password/' + token).catch((err) => {
      setErrorMessage(true);
    });
  };
  const newPassword = async (data: NewPasswordForm) => {
    await authRoute('new_password/' + token, data)
      .then((res) => context.openAlert(AlertType.info, 'Pomyślnie zmieniono hasło'))
      .catch((err) => {
        context.openAlert(AlertType.error, 'Coś poszło nie tak.');
      });
  };
  if (errorMessage) return <TokenExpired message='Reset hasła wygasł. Proszę spróbować jeszcze raz.' />;

  return (
    <div className='black-hidden login-register'>
      <img src='' className='img-cover' />
      <Container component='main' maxWidth='xs' className='form'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar src='' className={classes.avatarLarge} />
          <Typography component='h1' variant='h5'>
            Ustaw nowe hasło
          </Typography>
          <Formik
            validateOnChange={true}
            initialValues={{
              password: '',
              repeatPassword: ''
            }}
            validationSchema={PasswordSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              newPassword(data);
              setSubmitting(false);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form style={{ display: 'grid' }} className={classes.form}>
                <MyTextField placeholder='Hasło' type='password' as={TextField} name='password' />
                <MyTextField placeholder='Powtórz Hasło' type='password' as={TextField} name='repeatPassword' />
                <Button type='submit' variant='contained' color='primary' disabled={isSubmitting} fullWidth className={classes.submit}>
                  Nowe Hasło
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default NewPassword;
