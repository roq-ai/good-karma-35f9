import * as yup from 'yup';

export const unusualActivityValidationSchema = yup.object().shape({
  description: yup.string().required(),
  employee_id: yup.string().nullable().required(),
});
