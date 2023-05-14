import { useState } from 'react';
import { auth } from '../../../firebase';

export const useRefreshToken = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToken, setRefreshToken] = useState(null);

  const refresh = async () => {
    setIsRefreshing(true);

    try {
      const newRefreshToken = await auth.currentUser?.getIdToken(true);
      setRefreshToken(newRefreshToken);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return {
    isRefreshing,
    refresh,
    refreshToken,
  };
};
