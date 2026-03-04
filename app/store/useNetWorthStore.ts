'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Asset, 
  Liability, 
  NetWorthState, 
  HistoryEntry,
  AssetCategory,
  LiabilityCategory
} from '@/types/index';

const useNetWorthStore = create<NetWorthState>()(
  persist(
    (set, get) => ({
      assets: [],
      liabilities: [],
      history: [],

      // Asset operations
      addAsset: (asset) => {
        const newAsset: Asset = {
          ...asset,
          id: `asset-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          assets: [...state.assets, newAsset],
        }));
        get().addHistoryEntry({
          date: new Date(),
          netWorth: get().getNetWorth(),
          totalAssets: get().getTotalAssets(),
          totalLiabilities: get().getTotalLiabilities(),
        });
      },

      updateAsset: (id, updates) => {
        set((state) => ({
          assets: state.assets.map((asset) =>
            asset.id === id
              ? { ...asset, ...updates, updatedAt: new Date() }
              : asset
          ),
        }));
        get().addHistoryEntry({
          date: new Date(),
          netWorth: get().getNetWorth(),
          totalAssets: get().getTotalAssets(),
          totalLiabilities: get().getTotalLiabilities(),
        });
      },

      deleteAsset: (id) => {
        set((state) => ({
          assets: state.assets.filter((asset) => asset.id !== id),
        }));
        get().addHistoryEntry({
          date: new Date(),
          netWorth: get().getNetWorth(),
          totalAssets: get().getTotalAssets(),
          totalLiabilities: get().getTotalLiabilities(),
        });
      },

      // Liability operations
      addLiability: (liability) => {
        const newLiability: Liability = {
          ...liability,
          id: `liability-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          liabilities: [...state.liabilities, newLiability],
        }));
        get().addHistoryEntry({
          date: new Date(),
          netWorth: get().getNetWorth(),
          totalAssets: get().getTotalAssets(),
          totalLiabilities: get().getTotalLiabilities(),
        });
      },

      updateLiability: (id, updates) => {
        set((state) => ({
          liabilities: state.liabilities.map((liability) =>
            liability.id === id
              ? { ...liability, ...updates, updatedAt: new Date() }
              : liability
          ),
        }));
        get().addHistoryEntry({
          date: new Date(),
          netWorth: get().getNetWorth(),
          totalAssets: get().getTotalAssets(),
          totalLiabilities: get().getTotalLiabilities(),
        });
      },

      deleteLiability: (id) => {
        set((state) => ({
          liabilities: state.liabilities.filter((liability) => liability.id !== id),
        }));
        get().addHistoryEntry({
          date: new Date(),
          netWorth: get().getNetWorth(),
          totalAssets: get().getTotalAssets(),
          totalLiabilities: get().getTotalLiabilities(),
        });
      },

      // Calculation methods
      getTotalAssets: () => {
        return get().assets.reduce((total, asset) => total + asset.value, 0);
      },

      getTotalLiabilities: () => {
        return get().liabilities.reduce((total, liability) => total + liability.amount, 0);
      },

      getNetWorth: () => {
        return get().getTotalAssets() - get().getTotalLiabilities();
      },

      getHistory: () => {
        return get().history;
      },

      // History operations
      addHistoryEntry: (entry) => {
        set((state) => {
          const historyWithoutDuplicates = state.history.filter(
            (h) => h.date.getTime() !== entry.date.getTime()
          );
          return {
            history: [...historyWithoutDuplicates, entry].sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            ),
          };
        });
      },
    }),
    {
      name: 'networth-store',
      version: 1,
    }
  )
);

export default useNetWorthStore;
