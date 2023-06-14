import * as yup from 'yup';

export const fileAccessValidationSchema = yup.object().shape({
  file_name: yup.string().required(),
  employee_id: yup.string().nullable().required(),
});
