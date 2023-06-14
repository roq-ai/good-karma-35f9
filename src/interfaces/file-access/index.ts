import { EmployeeInterface } from 'interfaces/employee';
import { GetQueryInterface } from 'interfaces';

export interface FileAccessInterface {
  id?: string;
  file_name: string;
  employee_id: string;
  created_at?: any;
  updated_at?: any;

  employee?: EmployeeInterface;
  _count?: {};
}

export interface FileAccessGetQueryInterface extends GetQueryInterface {
  id?: string;
  file_name?: string;
  employee_id?: string;
}
