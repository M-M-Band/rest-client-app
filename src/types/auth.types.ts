export type AuthFormTypes = {
  email: string;
  password: string;
};

interface Identity {
  id: string;
  user_id: string;
  identity_id: string;
  email: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string;
  provider: string;
  identity_data: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
}

interface UserMetadata {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  confirmation_sent_at: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string;
  is_anonymous: boolean;
  phone: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
}
