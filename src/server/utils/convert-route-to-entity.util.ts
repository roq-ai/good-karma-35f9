const mapping: Record<string, string> = {
  'background-checks': 'background_check',
  companies: 'company',
  employees: 'employee',
  'file-accesses': 'file_access',
  'risk-indicators': 'risk_indicator',
  'unusual-activities': 'unusual_activity',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
