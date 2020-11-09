import request from '@/utils/request';
import qs from 'qs';
import api from './api';

export const getClientList = async (params) => {
  return request(`${api.clientList}?${qs.stringify(params)}`);
}

export const addClient = async params =>{
  return request.post(`${api.addClient}`,{
    data:params
  })
}

export const updateClient = async params =>{
  return request.post(`${api.updateClient}`,{
    data:params
  })
}