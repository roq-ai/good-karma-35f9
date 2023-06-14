import axios from 'axios';
import queryString from 'query-string';
import { BackgroundCheckInterface, BackgroundCheckGetQueryInterface } from 'interfaces/background-check';
import { GetQueryInterface } from '../../interfaces';

export const getBackgroundChecks = async (query?: BackgroundCheckGetQueryInterface) => {
  const response = await axios.get(`/api/background-checks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBackgroundCheck = async (backgroundCheck: BackgroundCheckInterface) => {
  const response = await axios.post('/api/background-checks', backgroundCheck);
  return response.data;
};

export const updateBackgroundCheckById = async (id: string, backgroundCheck: BackgroundCheckInterface) => {
  const response = await axios.put(`/api/background-checks/${id}`, backgroundCheck);
  return response.data;
};

export const getBackgroundCheckById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/background-checks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBackgroundCheckById = async (id: string) => {
  const response = await axios.delete(`/api/background-checks/${id}`);
  return response.data;
};
