import request from '@/utils/request';
import qs from 'qs';
import api from './api';

export const getGoodList = async (params) => {
  return request(`${api.goodList}?${qs.stringify(params)}`);
}

export const handleGood = async (params) => {
  return request(`${api.handleGood}?${qs.stringify(params)}`);
}

export const deleteGood = async (params) => {
  return request(`${api.deleteGood}?${qs.stringify(params)}`);
}

export const updateCompany = async params =>{
  return request.post(`${api.updateCompany}`,{
    data:params
  })
}