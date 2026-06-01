import { useState, useEffect } from 'react';
import { blink } from '@/lib/blink';
import { useQuery } from '@tanstack/react-query';

export type Role = 'admin' | 'cleaner' | 'customer';

export interface Profile {
  user_id: string;
  full_name: string;
  role: Role;
  phone: string;
  avatar_url: string;
}

export function useProfile() {
  const [userId, setUserId] = useState<string | null>('u1'); // Defaulting to admin for demo

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      const result = await blink.db.profiles.get(userId);
      return result as unknown as Profile;
    },
    enabled: !!userId,
  });

  return { profile, isLoading, setUserId };
}
