import request from '@/utils/request';
import qs from 'qs';
import api from './api';

export const getList = async (params) => {
  return request(`${api.list}?${qs.stringify(params)}`);
}
