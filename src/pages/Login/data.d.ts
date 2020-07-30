/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-07-29 15:59:18
 * @LastEditors: lixiaoyun
 * @LastEditTime: 2020-07-30 11:25:42
 * @Description:登录接口
 */
import { IResponse } from '@/typings';

export interface ISystemInfo extends IResponse {
  data: {
    site_name: string;
    site_title: string;
  };
}

export interface ILogin extends IResponse {
  data: {
    token?: string;
  };
}

export interface LoginParamsType {
  username?: string;
  password?: string;
  phone?: string;
  captcha?: string;
}
