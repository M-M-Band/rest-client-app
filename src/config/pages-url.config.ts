class DASHBOARD {
  private root = '/dashboard';

  ROOT = `/`;
  HOME = this.root;
  REST = `${this.root}/rest`;
  HISTORY = `${this.root}/history`;
  ABOUT = `${this.root}/about`;
}

export const DASHBOARD_PAGES = new DASHBOARD();

export const AUTH_PATH = '/auth';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const ERROR_PATH = '/error';
