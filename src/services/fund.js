import request from '@/utils/request';
import qs from 'qs';
import api from './api';

export const getBeansList = async (params) => {
  return request(`${api.beansList}?${qs.stringify(params)}`);
}

export const updateCompany = async params =>{
  return request.post(`${api.updateCompany}`,{
    data:params
  })
}

