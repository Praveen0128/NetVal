import { AssetCategory, LiabilityCategory } from '@/types/index';

export const ASSET_CATEGORIES = {
  [AssetCategory.CASH]: {
    label: 'Cash & Savings',
    icon: '💰',
    color: 'bg-blue-100 text-blue-800',
  },
  [AssetCategory.INVESTMENTS]: {
    label: 'Investments',
    icon: '📈',
    color: 'bg-green-100 text-green-800',
  },
  [AssetCategory.REAL_ESTATE]: {
    label: 'Real Estate',
    icon: '🏠',
    color: 'bg-purple-100 text-purple-800',
  },
  [AssetCategory.VEHICLES]: {
    label: 'Vehicles',
    icon: '🚗',
    color: 'bg-yellow-100 text-yellow-800',
  },
  [AssetCategory.RETIREMENT]: {
    label: 'Retirement',
    icon: '🏦',
    color: 'bg-indigo-100 text-indigo-800',
  },
  [AssetCategory.CRYPTOCURRENCY]: {
    label: 'Cryptocurrency',
    icon: '₿',
    color: 'bg-orange-100 text-orange-800',
  },
  [AssetCategory.OTHER]: {
    label: 'Other',
    icon: '📦',
    color: 'bg-gray-100 text-gray-800',
  },
};

export const LIABILITY_CATEGORIES = {
  [LiabilityCategory.MORTGAGE]: {
    label: 'Mortgage',
    icon: '🏠',
    color: 'bg-red-100 text-red-800',
  },
  [LiabilityCategory.CAR_LOAN]: {
    label: 'Car Loan',
    icon: '🚗',
    color: 'bg-orange-100 text-orange-800',
  },
  [LiabilityCategory.STUDENT_LOAN]: {
    label: 'Student Loan',
    icon: '🎓',
    color: 'bg-blue-100 text-blue-800',
  },
  [LiabilityCategory.CREDIT_CARD]: {
    label: 'Credit Card',
    icon: '💳',
    color: 'bg-pink-100 text-pink-800',
  },
  [LiabilityCategory.PERSONAL_LOAN]: {
    label: 'Personal Loan',
    icon: '💸',
    color: 'bg-yellow-100 text-yellow-800',
  },
  [LiabilityCategory.OTHER]: {
    label: 'Other',
    icon: '📋',
    color: 'bg-gray-100 text-gray-800',
  },
};

export const CHART_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
];

export const DEFAULT_CURRENCY = 'USD';

export const TABS = {
  DASHBOARD: 'dashboard',
  ASSETS: 'assets',
  LIABILITIES: 'liabilities',
  HISTORY: 'history',
  SETTINGS: 'settings',
};
