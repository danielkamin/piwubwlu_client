import { TextField } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React from 'react';

const MyTextField: React.FC<FieldAttributes<{}>> = ({ placeholder, type, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return <TextField placeholder={placeholder} type={type} {...field} helperText={errorText} error={!!errorText} fullWidth margin='normal' variant='outlined' />;
};

export default MyTextField;
