import request from '@/utils/request';
import { ILogin, ISystemInfo, LoginParamsType } from '@/pages/Login/data';

export async function fakeAccountLogin(params: LoginParamsType) {
  return request<ILogin>('/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getSystemInfo() {
  return request<ISystemInfo>('/system/info');
}
