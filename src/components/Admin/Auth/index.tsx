import React from 'react';
import { setAccessToken, setRoles, getRoles } from '../../../utils/api/accessToken';
import MyTextField from '../../Shared/Inputs/MyTextField';
import { Button, TextField, Container, Avatar, Typography, CssBaseline, FormControlLabel, Checkbox } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { authRoute } from '../../../api/index';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useUserContext } from '../../../context/UserContext';
import useStyles from '../styles';
import { useAlertContext, AlertType } from '../../../context/AlertContext';
import { ILogin } from '../types';
import { LoginSchema } from '../schemas';
const AdminLogin: React.FC = () => {
  const alertContext = useAlertContext();
  const classes = useStyles();
  const userContext = useUserContext();
  const history = useHistory();

  const login = async (values: ILogin) => {
    await authRoute('admin/login', values)
      .then((res: any) => {
        setAccessToken(res.data.accessToken);
        setRoles(res.data.accessToken);
        userContext?.changeState(true, getRoles());
        history.push('/admin');
      })
      .catch((err: any) => {
        console.log(err);
        if (err.status === 400) alertContext.openAlert(AlertType.error, err.data);
        else alertContext.openAlert(AlertType.error, 'Coś poszło nie tak.');
      });
  };
  if (userContext?.loggedIn) return <Redirect to='/admin' />;

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Panel administracyjny
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
          {({ values, isSubmitting }) => (
            <Form autoComplete='on' className={classes.form}>
              <MyTextField name='email' type='input' as={TextField} placeholder='Nazwa Użytkownika' />
              <MyTextField name='password' type='password' as={TextField} placeholder='Hasło' />
              <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Zapamiętaj mnie' />
              <Button type='submit' variant='contained' color='primary' disabled={isSubmitting} fullWidth className={classes.submit}>
                Zaloguj się
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
export default AdminLogin;
