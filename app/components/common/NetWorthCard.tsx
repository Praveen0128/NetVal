'use client';

import React from 'react';
import { useNetWorthStore } from '@/hooks/useNetWorthStore';
import { formatCurrency, getNetWorthStatusColor, getNetWorthStatusBgColor } from '@/utils/formatting';

const NetWorthCard = () => {
  const { getTotalAssets, getTotalLiabilities, getNetWorth } = useNetWorthStore();
  
  const totalAssets = getTotalAssets();
  const totalLiabilities = getTotalLiabilities();
  const netWorth = getNetWorth();

  return (
    <div className={`card ${getNetWorthStatusBgColor(netWorth)}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-600 mb-2">Total Assets</p>
          <p className="text-3xl font-bold text-green-600">
            {formatCurrency(totalAssets)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-2">Total Liabilities</p>
          <p className="text-3xl font-bold text-red-600">
            {formatCurrency(totalLiabilities)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-2">Net Worth</p>
          <p className={`text-3xl font-bold ${getNetWorthStatusColor(netWorth)}`}>
            {formatCurrency(netWorth)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCard;
