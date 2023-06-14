import { EmployeeInterface } from 'interfaces/employee';
import { GetQueryInterface } from 'interfaces';

export interface UnusualActivityInterface {
  id?: string;
  description: string;
  employee_id: string;
  created_at?: any;
  updated_at?: any;

  employee?: EmployeeInterface;
  _count?: {};
}

export interface UnusualActivityGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  employee_id?: string;
}
