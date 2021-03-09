import React, { useState, useEffect, useRef } from 'react';
import { getData, postData, postImage } from '../../../../api/index';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { CircularProgress, Button, Avatar, Container, TextField, Typography, Paper, CssBaseline } from '@material-ui/core';
import MyTextField from '../../../Shared/Inputs/MyTextField';
import MyTextArea from '../../../Shared/Inputs/MyTextArea';
import { IProfile } from '../../types';
import { ProfileSchema } from '../../schemas';
import { Formik, Form } from 'formik';
import { API_URL } from '../../../../utils/constants';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import useStyles from '../../styles';
import ImageIcon from '@material-ui/icons/Image';

const MyProfile: React.FC = () => {
  const classes = useStyles();
  const context = useAlertContext();
  const [loading, setLoading] = useState<boolean>(true);
  const inputImage = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState<IProfile>(() => {
    return { firstName: '', lastName: '', email: '' };
  });
  const [currentPhoto, setCurrentPhoto] = useState<string>('');
  useEffect(() => {
    getProfileInfo();
  }, []);
  const getProfileInfo = async () => {
    const data = await getData('user/my_profile', getAccessToken());
    setCurrentPhoto(API_URL + '/' + data.picturePath);
    setProfileData(data);
    setLoading(false);
  };
  const updateProfileInfo = async (values: any) => {
    const res = await postData('user/update_profile', getAccessToken(), values).catch((err) => console.error(err));
    context.openAlert(AlertType.info, 'Pomyślnie zaktualizowano profil!');
    getProfileInfo();
  };
  const HandleFileUpload = async () => {
    setCurrentPhoto(URL.createObjectURL(inputImage.current?.files![0]));
    const file = inputImage.current as HTMLInputElement;
    if (file.files![0] !== undefined) {
      await postImage('user/upload_picture', getAccessToken(), file.files![0], '0');
    }
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <Container maxWidth='sm'>
      <Paper elevation={6} className={classes.paper}>
        <Avatar src={currentPhoto} className={classes.avatarLarge} />
        <Button component='label' color='secondary' endIcon={<ImageIcon />}>
          Nowe zdjęcie
          <input type='file' style={{ display: 'none' }} accept='image/png' onChange={HandleFileUpload} ref={inputImage} />
        </Button>
        <Typography component='h1' variant='h5'>
          Edytuj Profil
        </Typography>
        <Formik
          validateOnBlur={true}
          validationSchema={ProfileSchema}
          initialValues={{
            firstName: profileData?.firstName,
            lastName: profileData?.lastName,
            email: profileData?.email,
            information: profileData.Employee ? profileData.Employee?.information : null,
            telephone: profileData.Employee ? profileData.Employee?.telephone : null,
            room: profileData.Employee ? profileData.Employee?.room : null
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            console.log(data);
            updateProfileInfo(data);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='form-grid'>
              <MyTextField name='firstName' type='input' as={TextField} placeholder='Imię' />
              <MyTextField name='lastName' type='input' as={TextField} placeholder='Nazwisko' />
              <MyTextField name='email' type='input' as={TextField} placeholder='E-mail' />
              {profileData.Employee && (
                <div>
                  <MyTextArea name='information' as={TextField} placeholder='Dodatkowe informacje' />
                  <MyTextField name='telephone' type='input' as={TextField} placeholder='Numer telefonu' />
                  <MyTextField name='room' type='input' as={TextField} placeholder='Numer pokoju' />
                </div>
              )}
              <Button variant='contained' color='primary' type='submit' disabled={isSubmitting}>
                Edytuj Profil
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default MyProfile;
