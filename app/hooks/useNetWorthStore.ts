'use client';

import { useEffect, useState } from 'react';
import { default as NetWorthStoreImpl } from '@/store/useNetWorthStore';

export function useNetWorthStore() {
  const [isMounted, setIsMounted] = useState(false);
  const store = NetWorthStoreImpl();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return {
      assets: [],
      liabilities: [],
      history: [],
      addAsset: () => {},
      updateAsset: () => {},
      deleteAsset: () => {},
      addLiability: () => {},
      updateLiability: () => {},
      deleteLiability: () => {},
      getTotalAssets: () => 0,
      getTotalLiabilities: () => 0,
      getNetWorth: () => 0,
      getHistory: () => [],
      addHistoryEntry: () => {},
    };
  }

  return store;
}
