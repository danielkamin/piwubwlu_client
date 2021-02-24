import React from 'react';
import { useHistory } from 'react-router-dom';
import { postData } from '../../../../api/index';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { IDegree } from '../../types';
import { DegreeSchema } from '../../schemas';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import { Button, TextField, Paper, Container, Avatar, Typography, CssBaseline } from '@material-ui/core';
import { Formik, Form } from 'formik';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import useStyles from '../../styles';
import AddIcon from '@material-ui/icons/Add';

const NewDegree: React.FC = () => {
  const context = useAlertContext();

  const classes = useStyles();
  const history = useHistory();
  const createDegree = async (values: IDegree) => {
    await postData('degrees', getAccessToken(), values)
      .then(() => {
        context.openAlert(AlertType.success, 'Pomyślnie dodano nowy tytuł naukowy do bazy!');
        history.push('/admin/degrees');
      })
      .catch((err) => {
        context.openAlert(AlertType.warning, err);
      });
  };
  return (
    <Container maxWidth='sm' component='main'>
      <CssBaseline />
      <Paper elevation={6} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Nowa Tytuł
        </Typography>

        <Formik
          validateOnChange={true}
          initialValues={{ name: '', id: 0 }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            createDegree(data);
            setSubmitting(false);
          }}
          validationSchema={DegreeSchema}
        >
          {({ values, isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                Dodaj Tytuł naukowy
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default NewDegree;
