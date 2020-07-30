/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-07-29 15:11:03
 * @LastEditors: lixiaoyun
 * @LastEditTime: 2020-07-30 11:25:23
 * @Description:
 */

import request from '@/utils/request';

import { LoginParamsType, ILogin, ISystemInfo } from './data';

export async function fakeAccountLogin(params: LoginParamsType) {
  return request<ILogin>('/api/v1/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function getSystemInfo() {
  return request<ISystemInfo>(`/api/v1/system/info`);
}
