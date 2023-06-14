import * as yup from 'yup';
import { employeeValidationSchema } from 'validationSchema/employees';

export const companyValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  employee: yup.array().of(employeeValidationSchema),
});
