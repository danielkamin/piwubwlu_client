import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getData, putData } from '../../../../api/index';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { IDegree } from '../../types';
import { DegreeSchema } from '../../schemas';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, TextField, Paper, Container, Avatar, Typography, CssBaseline } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import { Params } from '../../../../utils/types';
import useStyles from '../../styles';
import AddIcon from '@material-ui/icons/Add';
const UpdateDegree: React.FC = () => {
  const context = useAlertContext();
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentDegree, setCurrentDegree] = useState<IDegree>({ name: '', id: 0 });
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    getDegree();
  }, []);
  const updateDegree = async (values: IDegree) => {
    await putData('degrees/' + id, getAccessToken(), values)
      .then(() => {
        context.openAlert(AlertType.success, 'Pomyślnie zaktualizowano nowy tytuł w bazie!');
        history.push('/admin/degrees');
      })
      .catch((err) => context.openAlert(AlertType.warning, err));
  };
  const getDegree = async () => {
    const data = await getData('degrees/' + id, getAccessToken());
    setCurrentDegree(data);
    setLoading(false);
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
          Dodaj Katedrę
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{ name: currentDegree.name, id: currentDegree.id }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            updateDegree(data);
            setSubmitting(false);
          }}
          validationSchema={DegreeSchema}
        >
          {({ isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                Aktualizuj Tytuł naukowy
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default UpdateDegree;
