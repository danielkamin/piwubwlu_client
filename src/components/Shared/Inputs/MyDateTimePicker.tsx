import { FieldAttributes, useField, useFormikContext } from 'formik';
import { DateTimePicker } from '@material-ui/pickers';
import React from 'react';

const MyDateTimePicker: React.FC<FieldAttributes<{}>> = ({ disabled, ...props }) => {
  const formik = useFormikContext();
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <DateTimePicker
      {...field}
      disablePast
      helperText={errorText}
      error={!!errorText}
      disabled={disabled}
      format='yyyy/MM/dd HH:mm'
      clearable
      ampm={false}
      onChange={(value) => {
        formik.setFieldValue(field.name, value);
      }}
    />
  );
};

export default MyDateTimePicker;
