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

export const countEdit = async (params) => {
  return request(`${api.countEdit}?${qs.stringify(params)}`);
}

export const goodSort = async (params) => {
  return request.post(`${api.goodSort}`,{
    data:params
  });
}

export const getGoodDetail = async (params) => {
  return request(`${api.goodDetail}?${qs.stringify(params)}`);
}

export const updateCompany = async params =>{
  return request.post(`${api.updateCompany}`,{
    data:params
  })
}

export const addGood = async params =>{
  return request.post(`${api.addGood}`,{
    data:params
  })
}

export const updateGood = async params =>{
  return request.post(`${api.updateGood}`,{
    data:params
  })
}


