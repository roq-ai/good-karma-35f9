import axios from 'axios';
import queryString from 'query-string';
import { RiskIndicatorInterface, RiskIndicatorGetQueryInterface } from 'interfaces/risk-indicator';
import { GetQueryInterface } from '../../interfaces';

export const getRiskIndicators = async (query?: RiskIndicatorGetQueryInterface) => {
  const response = await axios.get(`/api/risk-indicators${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRiskIndicator = async (riskIndicator: RiskIndicatorInterface) => {
  const response = await axios.post('/api/risk-indicators', riskIndicator);
  return response.data;
};

export const updateRiskIndicatorById = async (id: string, riskIndicator: RiskIndicatorInterface) => {
  const response = await axios.put(`/api/risk-indicators/${id}`, riskIndicator);
  return response.data;
};

export const getRiskIndicatorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/risk-indicators/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRiskIndicatorById = async (id: string) => {
  const response = await axios.delete(`/api/risk-indicators/${id}`);
  return response.data;
};
