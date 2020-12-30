import request from '@/utils/request';
import qs from 'qs';
import api from './api';

export const getOrderList = async (params) => {
  return request(`${api.orderList}?${qs.stringify(params)}`);
}

export const handleOrderStatus = async params => {
  return request(`${api.handleOrderStatus}?${qs.stringify(params)}`);
}

export const addClassify = async params => {
  return request.post(`${api.addClassify}`, {
    data: params
  })
}

export const updateExpressInfo = async (params) => {
  return request(`${api.updateExpressInfo}?${qs.stringify(params)}`);
}

export const updateServiceTime = async (params) => {
  return request(`${api.updateServiceTime}?${qs.stringify(params)}`);
}

export const updateTotalPrice = async (params) => {
  return request(`${api.updateTotalPrice}?${qs.stringify(params)}`);
}

export const updateActivity = async params => {
  return request.post(`${api.updateActivity}`, {
    data: params
  })
}

export const addOrder = async params => {
  return request.post(`${api.addOrder}`, {
    data: params
  })
}


