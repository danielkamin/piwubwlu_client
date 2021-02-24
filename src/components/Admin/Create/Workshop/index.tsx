import React, { useState, useEffect, useRef } from 'react';
import { postData, getData, postImage } from '../../../../api/index';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../../../utils/api/accessToken';
import ClearIcon from '@material-ui/icons/Clear';
import { ILab, IWorkshopType, IEmployee } from '../../types';
import { WorkshopSchema } from '../../schemas';
import {
  Button,
  TextField,
  Container,
  CssBaseline,
  FormHelperText,
  Paper,
  FormControl,
  NativeSelect,
  InputLabel,
  CircularProgress,
  IconButton,
  FormGroup,
  Avatar,
  Typography
} from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import MyTextArea from '../../../Shared/Inputs/MyTextArea';
import useStyles from '../../styles';
import AddIcon from '@material-ui/icons/Add';
import ImageUploadButton from '../../../Shared/Buttons/ImageUploadButton';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
const NewWorkshop: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const alertContext = useAlertContext();
  const [labs, setLabs] = useState<ILab[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [wTypes, setWTypes] = useState<IWorkshopType[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<string>('');
  const inputImage = useRef<HTMLInputElement>(null);
  useEffect(() => {
    getFormData();
  }, []);
  const getFormData = async () => {
    let token = getAccessToken();
    const [tempTypes, tempLabs, tempEmployees] = await Promise.all([getData('workshopTypes/list', token), getData('labs/list', token), getData('employees/list', token)]);
    setWTypes(tempTypes);
    setLabs(tempLabs);

    setEmployees(tempEmployees);
    setLoading(false);
  };

  const createWorkshop = async (values: any) => {
    console.log(values);
    await postData('workshops', getAccessToken(), values)
      .then(async (res) => {
        const file = inputImage.current as HTMLInputElement;
        if (file.files![0] !== undefined) {
          await postImage('workshops/upload_image', getAccessToken(), file.files![0], res?.data.id);
        }
        alertContext.openAlert(AlertType.success, 'Pomyślnie dodano nową pracownię do bazy!');
        history.push('/admin/workshops');
      })
      .catch((err) => alertContext.openAlert(AlertType.warning, 'Coś poszło nie tak.'));
  };
  const HandleFileUpload = () => {
    setCurrentPhoto(URL.createObjectURL(inputImage.current?.files![0]));
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
          Dodaj Pracownię
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: '',
            english_name: '',
            room_number: '',
            typeId: '',
            labId: '',
            employees: [{ employeeId: employees[0].Employee.id }],
            additionalInfo: ''
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            createWorkshop(data);
            setSubmitting(false);
          }}
          validationSchema={WorkshopSchema}
        >
          {({ values, isSubmitting, errors }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <MyTextField name='english_name' type='input' as={TextField} placeholder='Przetłumaczona nazwa' />
              <MyTextField name='room_number' type='input' as={TextField} placeholder='Numer Sali' />
              <FormControl error={!!errors.typeId} className={classes.formControlGap}>
                <InputLabel htmlFor='typeId'>Typ Pracowni</InputLabel>
                <Field name='typeId' as={NativeSelect} placeholder='Typ Pracowni'>
                  <option selected>wybierz z listy</option>
                  {wTypes !== null &&
                    wTypes.map((type) => (
                      <option value={type.id} key={type.id}>
                        {type.symbol}
                      </option>
                    ))}
                </Field>
                <FormHelperText>{errors.typeId && 'Laboratorium jest wymagane'}</FormHelperText>
              </FormControl>
              <FormControl error={!!errors.labId} className={classes.formControlGap}>
                <InputLabel htmlFor='labId'>Laboratorium</InputLabel>
                <Field name='labId' as={NativeSelect} placeholder='Laboratoria'>
                  <option selected>wybierz z listy</option>
                  {labs !== null &&
                    labs.map((lab) => (
                      <option value={lab.id} key={lab.id}>
                        {lab.name}
                      </option>
                    ))}
                </Field>
                <FormHelperText>{errors.typeId && 'Laboratorium jest wymagane'}</FormHelperText>
              </FormControl>
              <FormGroup className={classes.formControlGap}>
                <FieldArray name='employees'>
                  {(arrayHelpers) => (
                    <div>
                      <Button
                        onClick={() => {
                          arrayHelpers.push({
                            employeeId: employees[0].Employee.id
                          });
                        }}
                        endIcon={<AddIcon />}
                        variant='outlined'
                        color='secondary'
                      >
                        Dodaj opiekuna
                      </Button>
                      {values.employees.map((employee, index) => {
                        return (
                          <div key={employee.employeeId} className='form-control'>
                            <Field name={`employees[${index}].employeeId`} as={NativeSelect}>
                              {employees.map((emp) => (
                                <option value={emp.Employee.id} key={emp.Employee.id}>
                                  {emp.firstName}
                                  {emp.lastName}
                                </option>
                              ))}
                            </Field>
                            <IconButton onClick={() => arrayHelpers.remove(index)}>
                              <ClearIcon />
                            </IconButton>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FieldArray>
              </FormGroup>
              <MyTextArea name='additionalInfo' as={TextField} placeholder='Dodatkowe informacje' />
              <ImageUploadButton currentPhoto={currentPhoto} handleChange={HandleFileUpload} inputImage={inputImage} />
              <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
                Stwórz Pracownię
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default NewWorkshop;
