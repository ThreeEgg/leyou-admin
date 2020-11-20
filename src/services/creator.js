import request from '@/utils/request';
import qs from 'qs';
import api from './api';

export const getList = async (params) => {
  return request(`${api.list}?${qs.stringify(params)}`);
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
