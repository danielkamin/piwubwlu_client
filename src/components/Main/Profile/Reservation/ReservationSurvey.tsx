import React, { useEffect, useState } from 'react';
import { postData, getData } from '../../../../api/index';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Button, Paper, CircularProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import { Params } from '../../../../utils/types';

const ReservationSurvey: React.FC = () => {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(true);
  const alertContext = useAlertContext();
  const history = useHistory();
  useEffect(() => {
    checkReservationOwner();
  }, []);
  const checkReservationOwner = async () => {
    const res = await getData(`rental/${id}/survey`, getAccessToken())
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        alertContext.openAlert(AlertType.warning, 'Nie możessz wypełnić tej ankiety!');
        history.push(`/rezerwacje/${id}`);
      });
  };
  const sendSurvey = async (data: any) => {
    await postData(`rental/${id}/survey`, getAccessToken(), data)
      .then((res) => {
        alertContext.openAlert(AlertType.success, 'Dziękujemy za przesłanie ankiety');
      })
      .catch((err) => {
        alertContext.openAlert(AlertType.error, err.data);
      });
    history.push(`/rezerwacje/${id}`);
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Container maxWidth='md'>
      <div className='container-spacing'>
        <Paper>
          <Container maxWidth='xs'>
            <Formik
              initialValues={{ comment: '' }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                sendSurvey(data);
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting }) => (
                <Form style={{ display: 'grid' }}>
                  <Field name='comment' component='textarea' placeholder='Komentarz' rows='5' />
                  <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
                    Prześlij Ankietę
                  </Button>
                </Form>
              )}
            </Formik>
          </Container>
        </Paper>
      </div>
    </Container>
  );
};

export default ReservationSurvey;
