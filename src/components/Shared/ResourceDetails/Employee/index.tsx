import React, { useState, useEffect } from 'react';
import { getData } from '../../../../api/index';
import { Avatar, Container, Paper, Typography } from '@material-ui/core';
import { getAccessToken } from '../../../../utils/api/accessToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import { Params } from '../../../../utils/types';
import { IEmployee } from '../../../Main/types';
import useStyles from '../../styles';
import { API_URL } from '../../../../utils/constants';
import ReCAPTCHA from 'react-google-recaptcha';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import customAxios from '../../../../utils/api/customAxios';
const EmployeeDetails: React.FC = () => {
  const { id } = useParams<Params>();
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(true);
  const [empEmail, setEmpEmail] = useState<String | null>(() => {
    return null;
  });
  const [employeeDetails, setEmployeeDetails] = useState<IEmployee>();
  useEffect(() => {
    getWorkshop();
  }, []);
  const getWorkshop = async () => {
    const data = await getData(`employees/${id}`, getAccessToken());
    setEmployeeDetails(data);
    setLoading(false);
  };
  const verifyCaptcha = async (value: string | null) => {
    console.log(value);
    const newUrl = API_URL + '/api/utils/verify_captcha';
    const res = await customAxios(newUrl, {
      method: 'POST',
      data: { userId: id, captcha: value }
    }).then((res) => {
      setEmpEmail(res.data.email);
    });
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <Container maxWidth='xs'>
      <div className='container-spacing'>
        <Paper className={classes.paper}>
          <div>
            {employeeDetails?.picturePath ? <Avatar src={API_URL + '/' + employeeDetails?.picturePath} className={classes.largeAvatar} /> : <Avatar className={classes.largeAvatar} />}
            <Typography variant='h4' color='secondary'>
              {employeeDetails?.lastName} {employeeDetails?.firstName}
            </Typography>
          </div>
          <br></br>

          {employeeDetails?.Employee?.Department !== null ? (
            <div>
              <Typography variant='subtitle1' color='textSecondary' paragraph={false}>
                Katedra:
              </Typography>
              <Typography variant='h6'>{employeeDetails?.Employee?.Department.name}</Typography>
              <Typography variant='subtitle1' color='textSecondary' paragraph={false}>
                Department:
              </Typography>
              <Typography variant='h6'>{employeeDetails?.Employee?.Department.english_name}</Typography>
            </div>
          ) : (
            <div>
              <Typography variant='subtitle1' color='textSecondary'>
                Katedra:
              </Typography>
              <Typography variant='h6'>Brak</Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                Department:
              </Typography>
              <Typography variant='h6'>None</Typography>
            </div>
          )}
          <div className='employee-info'>
            <Typography variant='body2' color='textSecondary'>
              Dodatkowe Informacje:
            </Typography>
            <Typography variant='body1'>Dodatkowe Informacje:</Typography>
          </div>
          <div className='email-link'>
            {empEmail !== null ? (
              <a href={`mailto:${empEmail}`}>
                <Typography variant='body1'>
                  <MailOutlineIcon /> {empEmail}
                </Typography>
              </a>
            ) : (
              <ReCAPTCHA sitekey='6Ldq9AUaAAAAACwhrbXsfRh0kEEbIeAk-SdOQ8M_' onChange={verifyCaptcha} />
            )}
          </div>
        </Paper>
      </div>
    </Container>
  );
};
export default EmployeeDetails;