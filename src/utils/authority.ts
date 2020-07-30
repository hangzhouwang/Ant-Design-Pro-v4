import { reloadAuthorized } from './Authorized';
import LocalStore from './LocalStore';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function setAuthority({
  authority,
  token,
}: {
  authority: string | string[];
  token: string;
}): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('authority', JSON.stringify(proAuthority));
  LocalStore.set('authority', proAuthority);
  LocalStore.set('token', token);
  // auto reload
  reloadAuthorized();
}
