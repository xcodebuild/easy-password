// @flow
import md5 from 'md5';

export default function encrypt(password: string, code: string): string {
  const SALT = 'replace-this-with-your-salt';
  const LENGTH = 12;
  const key = md5(SALT + code);
  const result = md5(key + password);
  return result.slice(0, LENGTH);
}
