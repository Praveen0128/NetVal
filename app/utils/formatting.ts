/**
 * Utility functions for formatting and calculations
 */

export const formatCurrency = (value: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export const calculateCategoryTotal = (
  items: Array<{ value?: number; amount?: number }>,
  valueKey: 'value' | 'amount' = 'value'
): number => {
  return items.reduce((total, item) => {
    const amount = valueKey === 'value' ? item.value || 0 : item.amount || 0;
    return total + amount;
  }, 0);
};

export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const abbreviateNumber = (value: number): string => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toFixed(0);
};

export const getNetWorthStatus = (netWorth: number): 'positive' | 'negative' | 'neutral' => {
  if (netWorth > 0) return 'positive';
  if (netWorth < 0) return 'negative';
  return 'neutral';
};

export const getNetWorthStatusColor = (netWorth: number): string => {
  const status = getNetWorthStatus(netWorth);
  switch (status) {
    case 'positive':
      return 'text-green-600';
    case 'negative':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export const getNetWorthStatusBgColor = (netWorth: number): string => {
  const status = getNetWorthStatus(netWorth);
  switch (status) {
    case 'positive':
      return 'bg-green-50';
    case 'negative':
      return 'bg-red-50';
    default:
      return 'bg-gray-50';
  }
};
