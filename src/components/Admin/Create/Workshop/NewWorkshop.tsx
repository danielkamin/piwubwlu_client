import React, { useState, useEffect, useRef } from 'react';
import { postData, getData, postImage } from '../../Api/index';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../Helpers/accessToken';
import ClearIcon from '@material-ui/icons/Clear';
import { ILab, IWorkshopType, IEmployee, WorkshopSchema } from './types';
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
import MyTextField from '../Utils/Inputs/MyTextField';
import useStyles from '../Login/styles';
import AddIcon from '@material-ui/icons/Add';
import ImageUpload from '../Utils/Buttons/ImageUpload';
import { useAlertContext, AlertType } from '../Context/AlertContext';
const NewWorkshop: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const context = useAlertContext();
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
    const res = await postData('workshops', getAccessToken(), values);
    const file = inputImage.current as HTMLInputElement;
    if (file.files![0] !== undefined) {
      await postImage('workshops/upload_image', getAccessToken(), file.files![0], res?.data.id);
    }
    context.openAlert(AlertType.success, 'Pomyślnie dodano nową pracownię do bazy!');
    history.push('/admin/workshops');
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
            employees: [{ employeeId: employees[0].Employee.id }]
          }}
          onSubmit={(data, { setSubmitting, setErrors }) => {
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
                        onClick={() =>
                          arrayHelpers.push({
                            employeeId: values.employees[0].employeeId
                          })
                        }
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
              <ImageUpload currentPhoto={currentPhoto} handleChange={HandleFileUpload} inputImage={inputImage} />
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
