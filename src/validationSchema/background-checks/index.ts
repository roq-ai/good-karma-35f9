import * as yup from 'yup';

export const backgroundCheckValidationSchema = yup.object().shape({
  status: yup.string().required(),
  employee_id: yup.string().nullable().required(),
});
