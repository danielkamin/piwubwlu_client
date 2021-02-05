import React from 'react';
import { Formik, Form } from 'formik';
import { Button, TextField, Container, CssBaseline, Avatar, Typography } from '@material-ui/core';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import { EmailSchema } from '../../schemas';
import { useHistory } from 'react-router-dom';
import useStyles from '../../styles';
import { authRoute } from '../../../../api/index';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
interface Email {
  email: string;
}

const ResetPassword: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const context = useAlertContext();
  const sendResetPassword = async (data: Email) => {
    await authRoute('reset_password', data)
      .then((res) => {
        context.openAlert(AlertType.info, 'Pomyślnie wysłano prośbę o reset hasła. Proszę sprawdzać skrzynkę mailową.');
      })
      .catch((err) => {
        context.openAlert(AlertType.error, 'Coś poszło nie tak');
      });
    history.push('/');
  };
  return (
    <div className='black-hidden login-register'>
      <img src='' className='img-cover' />
      <Container component='main' maxWidth='xs' className='form'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar src='' className={classes.avatarLarge} />
          <Typography component='h1' variant='h5'>
            Reset Hasła
          </Typography>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: ''
            }}
            validationSchema={EmailSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              sendResetPassword(data);
              setSubmitting(false);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form style={{ display: 'grid' }} className={classes.form}>
                <MyTextField placeholder='E-mail' type='input' as={TextField} name='email' />
                <Button type='submit' variant='contained' color='primary' disabled={isSubmitting} fullWidth className={classes.submit}>
                  Wyślij
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
