import React, { useEffect, useState } from 'react';
import { putData, getData } from '../../../../api/index';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IWorkshopType } from '../../types';
import { WorkshopTypeSchema } from '../../schemas';
import { Button, TextField, Container, Avatar, Typography, CssBaseline, Paper } from '@material-ui/core';
import { Formik, Form } from 'formik';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import { Params } from '../../../../utils/types';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import useStyles from '../../styles';
import AddIcon from '@material-ui/icons/Add';

const NewWorkshopType: React.FC = () => {
  const context = useAlertContext();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentWorkshopType, setCurrentWorkshopType] = useState<IWorkshopType>({ id: 0, name: '', english_name: '', symbol: '' });
  const { id } = useParams<Params>();
  useEffect(() => {
    getWorkshopType();
  }, []);
  const getWorkshopType = async () => {
    const data = await getData('workshopTypes/' + id, getAccessToken());
    setCurrentWorkshopType(data);
    setLoading(false);
  };
  const history = useHistory();
  const newWorkshopType = async (values: IWorkshopType) => {
    await putData('workshopTypes/' + id, getAccessToken(), values);
    context.openAlert(AlertType.success, 'Pomyślnie zaktualizowano typ pracowni w bazy!');
    history.push('/admin/workshop_types');
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
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
          initialValues={{ id: 0, name: currentWorkshopType.name, english_name: currentWorkshopType.english_name, symbol: currentWorkshopType.symbol }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            newWorkshopType(data);
            setSubmitting(false);
          }}
          validationSchema={WorkshopTypeSchema}
        >
          {({ values, isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <MyTextField name='english_name' type='input' as={TextField} placeholder='Przetłumaczona nazwa' />
              <MyTextField name='symbol' type='input' as={TextField} placeholder='Symbol' />
              <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                Aktualizuj
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default NewWorkshopType;
