import React from 'react';
import { Formik, Form } from 'formik';
import { Button, TextField, Container, CssBaseline, Avatar, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import MyCheckBox from '../../../Shared/Inputs/MyCheckBox';
import { RegisterValues } from '../../types';
import { RegisterSchema } from '../../schemas';
import useStyles from '../../styles';
import LogoPB from '../../../../assets/Images/LogoPB.png';
import { authRoute } from '../../../../api/index';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
const Register: React.FC = () => {
  const context = useAlertContext();
  const history = useHistory();
  const classes = useStyles();
  const register = async (data: RegisterValues) => {
    await authRoute('register', data)
      .then((res) => {
        history.push('/login');
        context.openAlert(AlertType.info, 'Pomyślnie stworzono konto. Proszę czekać na rozpatrzenie rejestracji');
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 403 || err.status === 409) context.openAlert(AlertType.error, err.data);
        else context.openAlert(AlertType.error, 'Coś poszło nie tak.');
      });
  };

  return (
    <div className=''>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar src={LogoPB} className={classes.avatarLarge} />
          <Typography component='h1' variant='h5'>
            Rejestracja
          </Typography>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: '',
              password: '',
              repeatPassword: '',
              firstName: '',
              lastName: '',
              acceptRegulations: false
            }}
            validationSchema={RegisterSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              register(data);
              setSubmitting(false);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form style={{ display: 'grid' }} className={classes.form}>
                <MyTextField placeholder='E-mail' type='input' as={TextField} name='email' />
                <MyTextField placeholder='Imię' type='input' as={TextField} name='firstName' />
                <MyTextField placeholder='Nazwisko' type='input' as={TextField} name='lastName' />
                <MyTextField placeholder='Hasło' type='password' as={TextField} name='password' />
                <MyTextField placeholder='Powtórz Hasło' type='password' as={TextField} name='repeatPassword' />
                <Typography variant='subtitle2'>
                  Rejestrując się akceptujesz <Link to='/regulamin'>regulamin</Link> platformy
                </Typography>
                <MyCheckBox name='acceptRegulations' placeholder='Akceptuję Regulamin?' />
                <Button type='submit' variant='contained' color='primary' disabled={isSubmitting} fullWidth className={classes.submit}>
                  Zarejestruj się
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};
export default Register;
