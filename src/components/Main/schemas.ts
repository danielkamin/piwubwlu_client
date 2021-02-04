import * as yup from 'yup';
export const ReservationSchema = yup.object({
    start_date:yup.date().required('wymagane'),
    unitCount:yup.number().required('Pole wymagane').min(1,'Wartość musi być większa od 0'),
  })