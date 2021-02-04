import React, { useState, useEffect, useRef } from 'react';
import { postData, getData, postImage } from '../../Api/index';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../Helpers/accessToken';
import { IMachine, MachineSchema, IWorkshop } from './types';
import { Button, TextField, Container, InputLabel, FormControlLabel, FormHelperText, Avatar, CssBaseline, NativeSelect, FormControl, Checkbox, Paper, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import MyTextField from '../Utils/Inputs/MyTextField';
import ImageUpload from '../Utils/Buttons/ImageUpload';
import { useAlertContext, AlertType } from '../Context/AlertContext';
import { TimeUnit } from '../../Helpers/types';
import useStyles from '../Login/styles';
import AddIcon from '@material-ui/icons/Add';

const NewMachine: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const context = useAlertContext();
  const [workshops, setWorkshops] = useState<IWorkshop[]>([]);
  const inputImage = useRef<HTMLInputElement>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string>('');
  useEffect(() => {
    getWorkshopList();
  }, []);
  const getWorkshopList = async () => {
    await getData('workshops/list', getAccessToken()).then((res) => setWorkshops(res));
  };
  const HandleFileUpload = () => {
    setCurrentPhoto(URL.createObjectURL(inputImage.current?.files![0]));
  };
  const createMachine = async (values: IMachine) => {
    const res = await postData('machines', getAccessToken(), values);
    const file = inputImage.current as HTMLInputElement;
    if (file.files![0] !== undefined) {
      await postImage('machines/upload_image', getAccessToken(), file.files![0], res?.data.id);
    }
    context.openAlert(AlertType.success, 'Pomyślnie dodano nową maszynę do bazy!');
    history.push('/admin/machines');
  };
  return (
    <Container maxWidth='sm' component='main'>
      <CssBaseline />
      <Paper elevation={6} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Dodaj Maszyne
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: '',
            english_name: '',
            timeUnit: '',
            maxUnit: 0,
            machineState: false,
            workshopId: ''
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            createMachine(data);
            setSubmitting(false);
          }}
          validationSchema={MachineSchema}
        >
          {({ isSubmitting, errors }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <MyTextField name='english_name' type='input' as={TextField} placeholder='Przetłumaczona nazwa' />

              <MyTextField name='maxUnit' type='number' as={TextField} min='1' max='20' placeholder=' Max. ilość jednostek czasu' />
              <FormControlLabel control={<Field name='machineState' type='checkbox' as={Checkbox} />} label='Aktywna?' />
              <FormControl error={!!errors.timeUnit}>
                <InputLabel htmlFor='timeUnit'>Jednostka Czasu</InputLabel>
                <Field name='timeUnit' as={NativeSelect} placeholder='Jednostka Czasu'>
                  <option selected value={TimeUnit[15]} key={TimeUnit[15]}>
                    15 minut
                  </option>
                  <option value={TimeUnit[30]} key={TimeUnit[30]}>
                    30 minut
                  </option>
                  <option value={TimeUnit[45]} key={TimeUnit[45]}>
                    45 minut
                  </option>
                  <option value={TimeUnit[60]} key={TimeUnit[60]}>
                    60 minut
                  </option>
                </Field>
                <FormHelperText>{errors.timeUnit}</FormHelperText>
              </FormControl>

              <FormControl error={!!errors.workshopId}>
                <InputLabel htmlFor='workshopId'>Pracownia</InputLabel>
                <Field name='workshopId' type='select' as={NativeSelect}>
                  <option value=''></option>
                  {workshops.map((workshop) => (
                    <option value={workshop.id} key={workshop.id}>
                      {workshop.name}
                    </option>
                  ))}
                </Field>
                <FormHelperText>{errors.workshopId}</FormHelperText>
              </FormControl>
              <ImageUpload currentPhoto={currentPhoto} handleChange={HandleFileUpload} inputImage={inputImage} />
              <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                Dodaj Maszynę
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default NewMachine;
