import React from 'react';
import { setAccessToken, setRoles, getRoles } from '../../../../utils/api/accessToken';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import { LoginValues } from '../../types';
import { LoginSchema } from '../../schemas';
import { Button, TextField, Container, Avatar, Typography, CssBaseline, FormControlLabel, Checkbox } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useUserContext } from '../../../../context/UserContext';
import useStyles from '../../styles';
import { authRoute } from '../../../../api/index';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
const Login: React.FC = () => {
  const classes = useStyles();
  const context = useUserContext();
  const alertContext = useAlertContext();
  const history = useHistory();
  const login = async (values: LoginValues) => {
    await authRoute('login', values)
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRoles(res.data.accessToken);
        context?.changeState(true, getRoles());
        history.push('/');
      })
      .catch((err) => {
        alertContext.openAlert(AlertType.error, err);
      });
  };
  return (
    <div className='black-hidden login-register'>
      <img src='' className='img-cover' />
      <Container className='form' maxWidth='xs' component='main'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar src='' className={classes.avatarLarge} />
          <Typography component='h1' variant='h5'>
            Logowanie
          </Typography>
          <Formik
            validateOnChange={true}
            initialValues={{ email: '', password: '' }}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              login(data);
              setSubmitting(false);
            }}
            validationSchema={LoginSchema}
          >
            {({ isSubmitting }) => (
              <Form autoComplete='on' className={classes.form}>
                <MyTextField name='email' type='input' as={TextField} placeholder='E-mail' />
                <MyTextField name='password' type='password' as={TextField} placeholder='Hasło' />
                <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Zapamiętaj mnie' />
                <Button type='submit' variant='contained' color='primary' disabled={isSubmitting} fullWidth className={classes.submit}>
                  Zaloguj się
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant='caption' component={Link} to='/reset_hasla'>
            Zapomniałem hasła.
          </Typography>
        </div>
      </Container>
    </div>
  );
};
export default Login;
