import { EmployeeInterface } from 'interfaces/employee';
import { GetQueryInterface } from 'interfaces';

export interface BackgroundCheckInterface {
  id?: string;
  status: string;
  employee_id: string;
  created_at?: any;
  updated_at?: any;

  employee?: EmployeeInterface;
  _count?: {};
}

export interface BackgroundCheckGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  employee_id?: string;
}
