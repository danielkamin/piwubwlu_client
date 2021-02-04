import { Formik, Form } from 'formik';
import { authRoute } from '../../../Api/index';
import MyTextField from '../../Utils/Inputs/MyTextField';
import { getAccessToken } from '../../../Helpers/accessToken';
import { Button, Container, TextField, Paper, Avatar, Typography, CssBaseline } from '@material-ui/core';
import React from 'react';
import { useAlertContext, AlertType } from '../../Context/AlertContext';
import { IPasswordForm, ChangePasswordSchema } from '../types';
import { useHistory } from 'react-router-dom';
import useStyles from '../../Login/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
const ChangePassword: React.FC = () => {
  const context = useAlertContext();
  const history = useHistory();
  const classes = useStyles();
  const postNewPassword = async (values: IPasswordForm) => {
    await authRoute('change_password', values, getAccessToken())
      .then((res) => {
        context.openAlert(AlertType.success, 'Zmiana hasła przebiegła pomyślnie');
      })
      .catch((err) => {
        context.openAlert(AlertType.error, err.data);
      });
    history.push('/moje_konto');
  };

  return (
    <Container maxWidth='sm' className='container-spacing'>
      <CssBaseline />
      <Paper elevation={6} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Zmiana Hasła
        </Typography>
        <Formik
          validateOnChange={true}
          validationSchema={ChangePasswordSchema}
          initialValues={{
            password: '',
            repeatPassword: ''
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            postNewPassword(data);
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='password' type='password' as={TextField} placeholder='Hasło' />
              <MyTextField name='repeatPassword' type='password' as={TextField} placeholder='Powtórz Hasło' />
              <Button variant='contained' type='submit' disabled={isSubmitting} color='primary'>
                Ustaw Nowe Hasło
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
