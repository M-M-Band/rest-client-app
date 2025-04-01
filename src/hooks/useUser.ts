import { useEffect, useState } from 'react';

import { User } from '@/types/auth.types';

import { createClient } from '@/utils/supabase/client';

export const useUser = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser((session?.user as User) || null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { user, signOut };
};
