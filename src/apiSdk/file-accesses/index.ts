import axios from 'axios';
import queryString from 'query-string';
import { FileAccessInterface, FileAccessGetQueryInterface } from 'interfaces/file-access';
import { GetQueryInterface } from '../../interfaces';

export const getFileAccesses = async (query?: FileAccessGetQueryInterface) => {
  const response = await axios.get(`/api/file-accesses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFileAccess = async (fileAccess: FileAccessInterface) => {
  const response = await axios.post('/api/file-accesses', fileAccess);
  return response.data;
};

export const updateFileAccessById = async (id: string, fileAccess: FileAccessInterface) => {
  const response = await axios.put(`/api/file-accesses/${id}`, fileAccess);
  return response.data;
};

export const getFileAccessById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/file-accesses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFileAccessById = async (id: string) => {
  const response = await axios.delete(`/api/file-accesses/${id}`);
  return response.data;
};
