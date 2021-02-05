import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { putData, getData, postImage } from '../../../../api/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { IMachine, IWorkshop } from '../../types';
import { MachineSchema } from '../../schemas';
import { Button, TextField, Container, InputLabel, Avatar, CssBaseline, FormHelperText, NativeSelect, Paper, FormControlLabel, FormControl, Checkbox, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import ImageUploadButton from '../../../Shared/Buttons/ImageUploadButton';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import { Params } from '../../../../utils/types';
import { API_URL, TimeUnit } from '../../../../utils/constants';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import useStyles from '../../styles';
import EditIcon from '@material-ui/icons/Edit';

const UpdateMachine: React.FC = () => {
  const context = useAlertContext();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const { id } = useParams<Params>();
  const [currentPhoto, setCurrentPhoto] = useState<string>('');
  const [workshopList, setWorkshopList] = useState<IWorkshop[]>([]);
  const inputImage = useRef<HTMLInputElement>(null);
  const [currentMachine, setCurrentMachine] = useState<IMachine>({ id: 0, name: '', english_name: '', timeUnit: '', maxUnit: 0, machineState: false, workshopId: 0 });
  useEffect(() => {
    getFormData();
  }, []);
  const getFormData = async () => {
    const [tempWorkshops, tempMachine] = await Promise.all([getData('workshops/list', getAccessToken()), getData('machines/' + id, getAccessToken())]);
    setCurrentMachine(tempMachine);
    setWorkshopList(tempWorkshops);
    setCurrentPhoto(API_URL + '/' + tempMachine.imagePath);
    setLoading(false);
  };
  const HandleFileUpload = () => {
    setCurrentPhoto(URL.createObjectURL(inputImage.current?.files![0]));
  };
  const updateMachine = async (values: any) => {
    const res = await putData('machines/' + id, getAccessToken(), values);
    const file = inputImage.current as HTMLInputElement;
    if (file.files![0] !== undefined) {
      await postImage('machines/upload_image', getAccessToken(), file.files![0], res?.data.id);
    }
    context.openAlert(AlertType.success, 'Pomyślnie zaktualizowano maszynę w bazie!');
    history.push('/admin/machines');
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
          <EditIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Edytuj Maszynę
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: currentMachine.name,
            english_name: currentMachine.english_name,
            timeUnit: currentMachine.timeUnit,
            maxUnit: currentMachine.maxUnit,
            machineState: currentMachine.machineState,
            workshopId: currentMachine.workshopId
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            updateMachine(data);
            setSubmitting(false);
          }}
          validationSchema={MachineSchema}
        >
          {({ values, isSubmitting, errors }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <MyTextField name='english_name' type='input' as={TextField} placeholder='Przetłumaczona nazwa' />
              <MyTextField name='maxUnit' type='number' as={TextField} min='1' max='20' placeholder=' Max. ilość jednostek czasu' />

              <FormControlLabel control={<Field name='machineState' type='checkbox' as={Checkbox} />} label='Aktywna?' />
              <FormControl error={!!errors.timeUnit}>
                <InputLabel htmlFor='timeUnit'>Jednostka Czasu</InputLabel>
                <Field name='timeUnit' as={NativeSelect} placeholder='Jednostka Czasu'>
                  <option value={TimeUnit[15]} key={TimeUnit[15]}>
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
              <FormControl>
                <InputLabel htmlFor='workshopId'>Pracownia</InputLabel>
                <Field name='workshopId' as={NativeSelect}>
                  {workshopList.map((workshop) => (
                    <option value={workshop.id} key={workshop.id}>
                      {workshop.name}
                    </option>
                  ))}
                </Field>
              </FormControl>
              <ImageUploadButton currentPhoto={currentPhoto} handleChange={HandleFileUpload} inputImage={inputImage} />
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

export default UpdateMachine;
