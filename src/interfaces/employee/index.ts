import { BackgroundCheckInterface } from 'interfaces/background-check';
import { FileAccessInterface } from 'interfaces/file-access';
import { RiskIndicatorInterface } from 'interfaces/risk-indicator';
import { UnusualActivityInterface } from 'interfaces/unusual-activity';
import { UserInterface } from 'interfaces/user';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface EmployeeInterface {
  id?: string;
  user_id: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  background_check?: BackgroundCheckInterface[];
  file_access?: FileAccessInterface[];
  risk_indicator?: RiskIndicatorInterface[];
  unusual_activity?: UnusualActivityInterface[];
  user?: UserInterface;
  company?: CompanyInterface;
  _count?: {
    background_check?: number;
    file_access?: number;
    risk_indicator?: number;
    unusual_activity?: number;
  };
}

export interface EmployeeGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  company_id?: string;
}
