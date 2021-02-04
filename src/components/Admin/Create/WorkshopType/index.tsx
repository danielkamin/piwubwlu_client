import React from 'react';
import { postData } from '../../../../api/index';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { IWorkshopType } from '../../types';
import { WorkshopTypeSchema } from '../../schemas';
import { Button, TextField, Container, Avatar, Typography, CssBaseline, Paper } from '@material-ui/core';
import { Formik, Form } from 'formik';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import useStyles from '../../styles';
import AddIcon from '@material-ui/icons/Add';

const NewWorkshopType: React.FC = () => {
  const classes = useStyles();
  const context = useAlertContext();
  const history = useHistory();
  const newWorkshopType = async (values: IWorkshopType) => {
    const res = await postData('workshopTypes/', getAccessToken(), values);
    context.openAlert(AlertType.success, 'Pomyślnie dodano nowy typ pracowni do bazy!');
    history.push('/admin/workshop_types');
  };
  return (
    <Container maxWidth='sm' component='main'>
      <CssBaseline />
      <Paper elevation={6} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Dodaj Typ Pracowni
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{ name: '', english_name: '', symbol: '' }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            newWorkshopType(data);
            setSubmitting(false);
          }}
          validationSchema={WorkshopTypeSchema}
        >
          {({ isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <MyTextField name='english_name' type='input' as={TextField} placeholder='Przetłumaczona nazwa' />
              <MyTextField name='symbol' type='input' as={TextField} placeholder='Symbol' />
              <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                Stwórz Typ Pracowni
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default NewWorkshopType;
