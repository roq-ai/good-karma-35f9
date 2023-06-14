import * as yup from 'yup';

export const riskIndicatorValidationSchema = yup.object().shape({
  type: yup.string().required(),
  value: yup.number().integer().required(),
  employee_id: yup.string().nullable().required(),
});
