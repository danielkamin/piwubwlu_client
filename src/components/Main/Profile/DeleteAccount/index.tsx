import React from 'react';
import { Formik, Form } from 'formik';
import { authRoute } from '../../../../api/index';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { Button, Container, TextField, Paper, Avatar, Typography, CssBaseline } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { logout } from '../../Auth/Logout/logout';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import useStyles from '../../styles';
import { NewPasswordForm } from '../../types';
import { PasswordSchema } from '../../schemas';

const DeleteAccount: React.FC = () => {
  const context = useAlertContext();
  const classes = useStyles();
  const history = useHistory();
  const deleteAccount = async (data: NewPasswordForm) => {
    await authRoute('delete_account', data, getAccessToken())
      .then(async (res) => {
        await logout();
        context.openAlert(AlertType.success, 'Pomyślnie usunięto konto');
        history.push('/');
      })
      .catch((err) => {
        context.openAlert(AlertType.error, err);
      });
  };

  return (
    <Container maxWidth='sm' className='container-spacing'>
      <CssBaseline />
      <Paper elevation={6} className={classes.paper}>
        <DeleteForeverOutlinedIcon color='error' fontSize='large' />
        <Typography component='h1' variant='h5'>
          Usuń konto
        </Typography>
        <Typography variant='subtitle1' className='error'>
          UWAGA! Proces usunięcia konta jest nieodwracalny!
        </Typography>
        <Formik
          validateOnChange={true}
          validationSchema={PasswordSchema}
          initialValues={{
            password: '',
            repeatPassword: ''
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            deleteAccount(data);
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='password' type='password' as={TextField} placeholder='Hasło' />
              <MyTextField name='repeatPassword' type='password' as={TextField} placeholder='Powtórz Hasło' />
              <Button variant='contained' type='submit' disabled={isSubmitting} color='primary'>
                Usuń Konto
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default DeleteAccount;
