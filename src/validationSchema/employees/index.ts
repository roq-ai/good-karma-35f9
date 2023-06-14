import * as yup from 'yup';
import { backgroundCheckValidationSchema } from 'validationSchema/background-checks';
import { fileAccessValidationSchema } from 'validationSchema/file-accesses';
import { riskIndicatorValidationSchema } from 'validationSchema/risk-indicators';
import { unusualActivityValidationSchema } from 'validationSchema/unusual-activities';

export const employeeValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
  background_check: yup.array().of(backgroundCheckValidationSchema),
  file_access: yup.array().of(fileAccessValidationSchema),
  risk_indicator: yup.array().of(riskIndicatorValidationSchema),
  unusual_activity: yup.array().of(unusualActivityValidationSchema),
});
