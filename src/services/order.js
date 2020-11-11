import request from '@/utils/request';
import qs from 'qs';
import api from './api';

export const getOrderList = async (params) => {
  return request(`${api.orderList}?${qs.stringify(params)}`);
}

export const handleOrderStatus = async params =>{
  return request(`${api.handleOrderStatus}?${qs.stringify(params)}`);
}

export const addClassify = async params =>{
  return request.post(`${api.addClassify}`,{
    data:params
  })
}