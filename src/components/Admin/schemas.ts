import * as yup from 'yup';
export const WorkshopSchema = yup.object({
    name: yup.string().required('Nazwa jest wymagana'),
    english_name: yup.string().required('Name is required'),
    room_number: yup.string().required('Numer sali jest wymagany'),
    typeId: yup.number().required(),
    labId: yup.number().required(),
    additionalInfo: yup.string().max(600,'Maksymalna ilość znaków to 600'),
  });
export const UserSchema = yup.object({
    firstName:yup.string().required('Imię jest wymagane'),
    lastName:yup.string().required('Nazwisko jest wymagane'),
    email: yup.string().email('Wprowadź swój adres e-mail zgodnie z formatem: yourname@example.com').required('E-Mail jest wymagany'),
    password: yup
      .string()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Hasło musi zawierać litery małe, duże oraz cyfry'),
    repeatPassword: yup
      .string()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .oneOf([yup.ref('password')], 'Hasła muszą się zgadzać'),
    isVerified:yup.boolean(),
    setEmployee:yup.boolean(),
    telephone:yup.string().min(7).max(15),
    room:yup.string().min(1).max(5)
})  
export const MachineSchema = yup.object({
    name: yup.string().required('Nazwa jesst wymagana'),
    english_name: yup.string().required('Name is required'),
    timeUnit: yup.string().required('Wybierz jednostkę czasu pracy'),
    maxUnit: yup.number().required('Podaj wartość pomiędzy 1 - 20').min(1,'Za mała wartość').max(20,'Za duża wartość'),
    machineState: yup.string().required(),
    workshopId: yup.number().required('Pracownia jest wymagana'),
    additionalInfo: yup.string().max(600,'Maksymalna ilość znaków to 600'),
});
export const LabSchema = yup.object({
    name: yup.string().required('Nazwa jest wymagana'),
    english_name: yup.string().required('Name is required'),
});
export const WorkshopTypeSchema = yup.object({
    name:yup.string().min(3).required('Nazwa jest wymagana'),
    english_name:yup.string().min(3).required('Name is required'),
    symbol:yup.string().required('Symbol (skrót) jest wymagany')
});
export const DepartmentSchema = yup.object({
    name: yup.string().required('Nazwa jest wymagana'),
    english_name: yup.string().required('Name is required')
  });
export const LoginSchema = yup.object({
  email: yup.string().email('Wprowadź swój adres e-mail zgodnie z formatem: yourname@example.com').required('E-Mail jest wymagany'),
    password: yup.string().required('Hasło jest wymagane')
  });
export const DegreeSchema = yup.object({
  name: yup.string().max(20).required('Nazwa jest wymagana'),
});