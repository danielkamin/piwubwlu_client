import * as yup from 'yup';
export const ReservationSchema = yup.object({
    start_date:yup.date().required('wymagane'),
    unitCount:yup.number().required('Pole wymagane').min(1,'Wartość musi być większa od 0'),
})
export const LoginSchema = yup.object({
    email: yup.string().email('Aby się zalogować, wprowadź proszę swój adres e-mail zgodnie z formatem: yourname@example.com').required('E-mail jest wymagany'),
    password: yup.string().required('Hasło jest wymagane')
});
export const RegisterSchema = yup.object({
    firstName: yup.string().required('Imię jest wymagane'),
    lastName: yup.string().required('Nazwisko jest wymagane'),
    email: yup.string().email('Wprowadź swój adres e-mail zgodnie z formatem: yourname@example.com').required('E-Mail jest wymagany'),
    password: yup
      .string()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Hasło musi zawierać litery małe, duże oraz cyfry')
      .required('Hasło jest wymagane'),
    repeatPassword: yup
      .string()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,'Hasło musi zawierać litery małe, duże oraz cyfry')
      .required('Powtórz swoje hasło'),
      acceptRegulations:yup.bool().oneOf([true], 'W celu rejestracji musisz zaakceptować regulamin!')
});
export const EmailSchema = yup.object({
    email: yup.string().email('Wprowadź swój adres e-mail zgodnie z formatem: yourname@example.com').required('E-Mail jest wymagany'),
})
export const PasswordSchema = yup.object({
    password: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Hasło musi zawierać litery małe, duże oraz cyfry')
        .required('Hasło jest wymagane'),
      repeatPassword: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
})
export const ProfileSchema = yup.object({
  firstName:yup.string().required('Imię jest wymagane'),
  lastName:yup.string().required('Nazwisko jest wymagane'),
  email: yup.string().email('Wprowadź swój adres e-mail zgodnie z formatem: yourname@example.com').required('E-Mail jest wymagany'),
  name:yup.string(),
  information:yup.string().max(200,'Maksymalnie 200 znaków'),
})