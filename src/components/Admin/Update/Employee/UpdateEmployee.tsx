import React, { useEffect, useState } from 'react';
import { putData, getData } from '../../../Api/index';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../../Helpers/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IEmployeeForm, GuestSchema, Department } from '../types';
import { Button, TextField, Paper, Container, Grid, Checkbox, FormControlLabel, Typography, FormControl, InputLabel, NativeSelect, CssBaseline, Avatar } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import MyTextField from '../../Utils/Inputs/MyTextField';
import { Params } from '../../../Helpers/types';
import useStyles from '../../Login/styles';
import EditIcon from '@material-ui/icons/Edit';
import { useAlertContext, AlertType } from '../../Context/AlertContext';
const UpdateEmployee: React.FC = () => {
  const classes = useStyles();
  const context = useAlertContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [currentEmp, setCurrentEmp] = useState<IEmployeeForm>({ firstName: '', lastName: '', password: '', repeatPassword: '', email: '', setEmployee: true, departmentId: '' });
  const history = useHistory();
  const { id } = useParams<Params>();
  useEffect(() => {
    getEmp();
  }, []);
  const getEmp = async () => {
    const [emp, depList] = await Promise.all([getData('employees/' + id, getAccessToken()), getData('departments/list', getAccessToken())]);
    setDepartmentList(depList);
    setCurrentEmp({ firstName: emp.User.firstName, lastName: emp.User.lastName, email: emp.User.email, password: '', repeatPassword: '', setEmployee: true, departmentId: emp.departmentId });
    setLoading(false);
  };
  const updateEmp = async (values: IEmployeeForm) => {
    await putData('employees/' + id, getAccessToken(), values)
      .then(() => {
        context.openAlert(AlertType.success, 'Pomyślnie zaktualizowano pracownika');
        history.push('/admin/employees');
      })
      .catch((err) => context.openAlert(AlertType.warning, err));
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
          Edytuj Profil Pracownika
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{
            firstName: currentEmp.firstName,
            lastName: currentEmp.lastName,
            email: currentEmp.email,
            password: currentEmp.password,
            repeatPassword: currentEmp.repeatPassword,
            setEmployee: currentEmp.setEmployee,
            departmentId: currentEmp.departmentId
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            updateEmp(data);
            setSubmitting(false);
          }}
          validationSchema={GuestSchema}
        >
          {({ values, isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='firstName' type='input' as={TextField} placeholder='Imię' />
              <MyTextField name='lastName' type='input' as={TextField} placeholder='Nazwisko' />
              <MyTextField name='email' type='input' as={TextField} placeholder='Email' />
              <MyTextField name='password' type='input' as={TextField} placeholder='Nowe Hasło' />
              <MyTextField name='repeatPassword' type='input' as={TextField} placeholder='Powtórz Hasło' />
              <FormControlLabel label='Pracownik?' control={<Field name='setEmployee' as={Checkbox} type='checkbox' />} />
              <FormControl>
                <InputLabel htmlFor='departmentId'>Katedra</InputLabel>
                <Field name='departmentId' type='select' as={NativeSelect}>
                  <option value=''></option>
                  {departmentList?.map((department) => (
                    <option value={department.id} key={department.id}>
                      {department.name}
                    </option>
                  ))}
                </Field>
              </FormControl>
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
export default UpdateEmployee;
