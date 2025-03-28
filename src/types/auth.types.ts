import { z } from 'zod';

import { SignUpSchema } from '@/utils/validators';

export type AuthFormTypes = {
  email: string;
  password: string;
};
export type SignUpFormData = z.infer<typeof SignUpSchema>;
