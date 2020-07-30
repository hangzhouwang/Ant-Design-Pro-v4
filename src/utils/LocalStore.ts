/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-07-30 10:36:50
 * @LastEditors: lixiaoyun
 * @LastEditTime: 2020-07-30 14:28:47
 * @Description: 存储
 */

import { message } from 'antd';

const store = window.localStorage;

class LocalStore {
  public static set(key: string, value: any): void {
    if (!store) {
      return;
    }

    let v = value;
    try {
      if (typeof value === 'object') {
        v = JSON.stringify(v);
      }
      store.setItem(key, v);
    } catch (error) {
      message.error(error);
    }
  }

  public static get(key: string): string {
    if (!store) {
      return '';
    }
    return store.getItem(key);
  }

  // 获取数据转换成json
  public static getToJson(key: string): any {
    if (!store) {
      return null;
    }
    const v = store.getItem(key);
    if (v) {
      try {
        return JSON.parse(v);
      } catch (error) {
        message.error(error);
      }
    }
    return null;
  }

  // 删除
  public static remove(key: string) {
    if (!store) {
      return;
    }
    try {
      store.removeItem(key);
    } catch (error) {
      message.error(error);
    }
  }
}

export default LocalStore;
