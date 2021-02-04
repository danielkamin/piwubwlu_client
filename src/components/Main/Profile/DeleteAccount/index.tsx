import React from 'react';
import { Formik, Form } from 'formik';
import { authRoute } from '../../../Api/index';
import MyTextField from '../../Utils/Inputs/MyTextField';
import { getAccessToken } from '../../../Helpers/accessToken';
import { Button, Container, TextField, Paper, Avatar, Typography, CssBaseline } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { logout } from '../../Nav/Logout';
import { useAlertContext, AlertType } from '../../Context/AlertContext';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import useStyles from '../../Login/styles';
import { IPasswordForm, ChangePasswordSchema } from '../types';
interface Props {}

const DeleteAccount: React.FC<Props> = () => {
  const context = useAlertContext();
  const classes = useStyles();
  const history = useHistory();
  const deleteAccount = async (data: IPasswordForm) => {
    await authRoute('delete_account', data, getAccessToken())
      .then(async (res) => {
        await logout();
        context.openAlert(AlertType.warning, 'Pomyślnie usunięto konto');
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
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
          validationSchema={ChangePasswordSchema}
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
