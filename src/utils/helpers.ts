export const filterString = (string: string) =>
  string.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
