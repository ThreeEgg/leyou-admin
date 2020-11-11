import request from '@/utils/request';
import qs from 'qs';
import api from './api';

export const getClassifyList = async (params) => {
  return request(`${api.classifyList}?${qs.stringify(params)}`);
}

export const handleClassify = async (params) => {
  return request(`${api.handleClassify}?${qs.stringify(params)}`);
}

export const addClassify = async params =>{
  return request.post(`${api.addClassify}`,{
    data:params
  })
}

export const updateClassify = async params =>{
  return request.post(`${api.updateClassify}`,{
    data:params
  })
}

export const deleteClassify = async (params) => {
  return request(`${api.deleteClassify}?${qs.stringify(params)}`);
}

export const getFirstClassifyList = async ()=>{
  return request(`${api.firstClassifyList}`)
}