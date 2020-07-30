import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/users');
}

// 获取当前用户
export async function queryCurrent(): Promise<any> {
  return request('/currentAdmin');
}

export async function queryNotices(): Promise<any> {
  return request('/notices');
}
