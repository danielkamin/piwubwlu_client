import { TextField } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React from 'react';

const MyTextArea: React.FC<FieldAttributes<{}>> = ({ placeholder, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} fullWidth margin='normal' variant='outlined' multiline rows={10} />;
};

export default MyTextArea;
