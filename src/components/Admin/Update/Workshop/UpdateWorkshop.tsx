import React, { useState, useEffect, useRef } from 'react';
import { putData, getData, postImage } from '../../Api/index';
import { Params } from '../../Helpers/types';
import ImageUpload from '../Utils/Buttons/ImageUpload';
import { useHistory, useParams } from 'react-router-dom';
import { getAccessToken } from '../../Helpers/accessToken';
import { ILab, IWorkshopType, IEmployee, WorkshopSchema, WorkshopForm } from './types';
import { Button, TextField, Container, InputLabel, FormControl, Paper, FormGroup, IconButton, Avatar, Typography, CssBaseline, NativeSelect } from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import MyTextField from '../Utils/Inputs/MyTextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { API_URL } from '../../Helpers/constants';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import { useAlertContext, AlertType } from '../Context/AlertContext';
import useStyles from '../Login/styles';
const UpdateWorkshop: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<Params>();
  const classes = useStyles();
  const [labs, setLabs] = useState<ILab[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [wTypes, setWTypes] = useState<IWorkshopType[]>([]);
  const [currentWorkshop, setCurrenWorkshop] = useState<WorkshopForm>({ name: '', english_name: '', labId: 0, typeId: 0, room_number: 0, Employees: [] });
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const inputImage = useRef<HTMLInputElement>(null);
  const context = useAlertContext();
  useEffect(() => {
    getFormData();
  }, []);
  const getFormData = async () => {
    let token = getAccessToken();
    const [tempTypes, tempLabs, tempEmployees, tempWorkshop] = await Promise.all([
      getData('workshopTypes/list', token),
      getData('labs/list', token),
      getData('employees/list', token),
      getData('workshops/' + id, token)
    ]);
    setWTypes(tempTypes);
    setLabs(tempLabs);
    setEmployees(tempEmployees);
    console.log(tempEmployees);
    setCurrenWorkshop(tempWorkshop);
    setCurrentPhoto(API_URL + '/' + tempWorkshop.imagePath);
    setLoading(false);
  };
  const HandleFileUpload = () => {
    setCurrentPhoto(URL.createObjectURL(inputImage.current?.files![0]));
  };
  const putWorkshop = async (values: any) => {
    console.log(values);
    const res = await putData('workshops/' + id, getAccessToken(), values);
    const file = inputImage.current as HTMLInputElement;
    if (file.files![0] !== undefined) {
      await postImage('workshops/upload_image', getAccessToken(), file.files![0], res?.data.id);
    }
    context.openAlert(AlertType.success, 'Pomyślnie dodano nową pracownię do bazy!');
    history.push('/admin/workshops');
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
          Edytuj Pracownię
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: currentWorkshop.name,
            english_name: currentWorkshop.english_name,
            room_number: currentWorkshop.room_number,
            typeId: currentWorkshop.typeId,
            labId: currentWorkshop.labId,
            employees: currentWorkshop.Employees.map((emp) => {
              return { employeeId: emp.id };
            })
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            putWorkshop(data);
            setSubmitting(false);
          }}
          validationSchema={WorkshopSchema}
        >
          {({ values, isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='name' type='input' as={TextField} placeholder='Nazwa' />
              <MyTextField name='english_name' type='input' as={TextField} placeholder='Przetłumaczona nazwa' />
              <MyTextField name='room_number' type='input' as={TextField} placeholder='Numer Sali' />
              <FormControl>
                <InputLabel id='type-select'>Typ Pracowni</InputLabel>
                <Field id='type-select' name='typeId' type='select' as={NativeSelect}>
                  {wTypes !== null &&
                    wTypes.map((type) => (
                      <option value={type.id} key={type.id}>
                        {type.symbol}
                      </option>
                    ))}
                </Field>
              </FormControl>
              <FormControl>
                <InputLabel id='lab-select'>Laboratorium</InputLabel>
                <Field id='lab-select' name='labId' type='select' as={NativeSelect}>
                  {labs !== null &&
                    labs.map((lab) => (
                      <option value={lab.id} key={lab.id}>
                        {lab.name}
                      </option>
                    ))}
                </Field>
              </FormControl>
              <FormGroup>
                <FieldArray name='employees'>
                  {(arrayHelpers) => (
                    <div>
                      <Button
                        onClick={() =>
                          arrayHelpers.push({
                            employeeId: employees[0].Employee.id
                          })
                        }
                        variant='outlined'
                      >
                        Dodaj opiekuna
                      </Button>
                      {values.employees.map((employee, index) => {
                        return (
                          <div key={employee.employeeId} className='form-control'>
                            <Field name={`employees[${index}].employeeId`} type='select' as={NativeSelect}>
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
              <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                Aktualizuj Pracownię
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default UpdateWorkshop;
