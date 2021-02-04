import { NativeSelect, FormControlLabel, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React from 'react';

const MySelect: React.FC<FieldAttributes<{}>> = ({ placeholder, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <FormControl error={!!errorText}>
      <InputLabel htmlFor='name-native-error'>{placeholder}</InputLabel>
      <NativeSelect {...field} inputProps={{ id: 'name-native-error' }} />
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

export default MySelect;
