/**
 * Core type definitions for the Net Worth Tracker application
 */

export enum AssetCategory {
  CASH = 'CASH',
  INVESTMENTS = 'INVESTMENTS',
  REAL_ESTATE = 'REAL_ESTATE',
  VEHICLES = 'VEHICLES',
  RETIREMENT = 'RETIREMENT',
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
  OTHER = 'OTHER',
}

export enum LiabilityCategory {
  MORTGAGE = 'MORTGAGE',
  CAR_LOAN = 'CAR_LOAN',
  STUDENT_LOAN = 'STUDENT_LOAN',
  CREDIT_CARD = 'CREDIT_CARD',
  PERSONAL_LOAN = 'PERSONAL_LOAN',
  OTHER = 'OTHER',
}

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  value: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Liability {
  id: string;
  name: string;
  category: LiabilityCategory;
  amount: number;
  interestRate?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NetWorthSnapshot {
  id: string;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  date: Date;
  assets: Asset[];
  liabilities: Liability[];
}

export interface HistoryEntry {
  date: Date;
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
}

export interface NetWorthState {
  // Assets
  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAsset: (id: string, asset: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  
  // Liabilities
  liabilities: Liability[];
  addLiability: (liability: Omit<Liability, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLiability: (id: string, liability: Partial<Liability>) => void;
  deleteLiability: (id: string) => void;
  
  // Calculations
  getTotalAssets: () => number;
  getTotalLiabilities: () => number;
  getNetWorth: () => number;
  getHistory: () => HistoryEntry[];
  
  // History
  history: HistoryEntry[];
  addHistoryEntry: (entry: HistoryEntry) => void;
}
