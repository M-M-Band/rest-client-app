export const HTTP_METHODS = [
  { value: 'GET', label: 'GET', color: '#61affe' },
  { value: 'POST', label: 'POST', color: '#49cc90' },
  { value: 'PUT', label: 'PUT', color: '#fca130' },
  { value: 'DELETE', label: 'DELETE', color: '#f93e3e' },
  { value: 'PATCH', label: 'PATCH', color: '#50e3c2' },
  { value: 'HEAD', label: 'HEAD', color: '#9012fe' },
  { value: 'OPTIONS', label: 'OPTIONS', color: '#0d5aa7' },
];

export type Header = { key: string; value: string };
export type ResponseData = {
  status: number;
  headers: Record<string, string>;
  data: unknown;
  time: string;
};

export type State = {
  status: 'idle' | 'success' | 'error';
  response: ResponseData | null;
  error: string | null;
};

export const initialState: State = {
  status: 'idle',
  response: null,
  error: null,
};
