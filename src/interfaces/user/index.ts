import { EmployeeInterface } from 'interfaces/employee';

import { GetQueryInterface } from '../get-query.interface';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roq_user_id: string;
  tenant_id: string;

  employee: EmployeeInterface[];
}

export interface UserGetQueryInterface extends GetQueryInterface {
  filter: {
    roq_user_id?: string;
    tenant_id?: string;
  };
}
