import { useEffect, useState } from 'react';

import { User } from '@/types/auth.types';

import { createClient } from '@/utils/supabase/client';

export const useUser = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setError(error);
          setUser(null);
        } else {
          setUser(data?.user as User);
        }
      } catch (err) {
        setError(err as Error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [supabase]);

  return { user, isLoading, error };
};
