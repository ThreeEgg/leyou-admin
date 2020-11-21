import request from '@/utils/request';
import qs from 'qs';
import api from './api';

export const getCreatorList = async (params) => {
  return request(`${api.creatorList}`);
}

export const fileUpload = async (params) => {
  const form = new FormData();
  console.log('form', form)
  form.append('file', params.file);
  form.append('type', 1);
  console.log('form', form)

  return request.post(api.fileUpload, {
    params,
    data: form,
  });
}

export const handleH5Status = async (params) => {
  return request(`${api.handleH5Status}?${qs.stringify(params)}`);
}

export const deleteLink = async (params) => {
  return request(`${api.deleteLink}?${qs.stringify(params)}`);
}

export const addLink = async params => {
  return request.post(`${api.addLink}`, {
    data: params
  })
}

export const updateLink = async params => {
  return request.post(`${api.updateLink}`, {
    data: params
  })
}

export const getLinkDetail = async (params) => {
  return request(`${api.getLinkDetail}?${qs.stringify(params)}`);
}

