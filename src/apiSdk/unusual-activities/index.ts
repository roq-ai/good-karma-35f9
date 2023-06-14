import axios from 'axios';
import queryString from 'query-string';
import { UnusualActivityInterface, UnusualActivityGetQueryInterface } from 'interfaces/unusual-activity';
import { GetQueryInterface } from '../../interfaces';

export const getUnusualActivities = async (query?: UnusualActivityGetQueryInterface) => {
  const response = await axios.get(`/api/unusual-activities${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUnusualActivity = async (unusualActivity: UnusualActivityInterface) => {
  const response = await axios.post('/api/unusual-activities', unusualActivity);
  return response.data;
};

export const updateUnusualActivityById = async (id: string, unusualActivity: UnusualActivityInterface) => {
  const response = await axios.put(`/api/unusual-activities/${id}`, unusualActivity);
  return response.data;
};

export const getUnusualActivityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/unusual-activities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUnusualActivityById = async (id: string) => {
  const response = await axios.delete(`/api/unusual-activities/${id}`);
  return response.data;
};
