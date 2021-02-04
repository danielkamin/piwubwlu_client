import { Checkbox, FormControlLabel, FormControl, FormLabel, FormHelperText } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React from 'react';

const MyCheckBox: React.FC<FieldAttributes<{}>> = ({ placeholder, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <FormControl error={!!errorText}>
      <FormControlLabel label={placeholder} control={<Checkbox {...field} />} />
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

export default MyCheckBox;
