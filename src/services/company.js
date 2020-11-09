import request from '@/utils/request';
import qs from 'qs';
import api from './api';

export const getAllCompanyList = async (params) => {
  return request(`${api.allCompanyList}?${qs.stringify(params)}`);
}


export const getCompanyList = async params =>{
  return request(`${api.companyList}?${qs.stringify(params)}`);
}

export const handleCompany = async params =>{
  return request(`${api.handleCompany}?${qs.stringify(params)}`);
}

export const addCompany = async params =>{
  return request.post(`${api.addCompany}`,{
    data:params
  })
}

export const updateCompany = async params =>{
  return request.post(`${api.updateCompany}`,{
    data:params
  })
}