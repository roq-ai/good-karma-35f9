import { EmployeeInterface } from 'interfaces/employee';
import { GetQueryInterface } from 'interfaces';

export interface RiskIndicatorInterface {
  id?: string;
  type: string;
  value: number;
  employee_id: string;
  created_at?: any;
  updated_at?: any;

  employee?: EmployeeInterface;
  _count?: {};
}

export interface RiskIndicatorGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  employee_id?: string;
}
