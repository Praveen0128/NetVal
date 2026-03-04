'use client';

import React from 'react';
import { useNetWorthStore } from '@/hooks/useNetWorthStore';
import { Liability } from '@/types/index';
import { formatCurrency } from '@/utils/formatting';
import { LIABILITY_CATEGORIES } from '@/constants/index';

interface LiabilityListProps {
  onEdit?: (liability: Liability) => void;
}

const LiabilityList: React.FC<LiabilityListProps> = ({ onEdit }) => {
  const liabilities = useNetWorthStore((state) => state.liabilities);
  const deleteLiability = useNetWorthStore((state) => state.deleteLiability);

  if (liabilities.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 text-lg">No liabilities added yet. Click "Add Liability" to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {liabilities.map((liability) => {
        const category = LIABILITY_CATEGORIES[liability.category];
        return (
          <div key={liability.id} className="card flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{category?.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{liability.name}</h3>
                  <p className={`text-sm px-2 py-1 rounded w-fit ${category?.color}`}>
                    {category?.label}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                {liability.interestRate && (
                  <p className="text-sm text-gray-600">
                    Interest Rate: <span className="font-semibold">{liability.interestRate}%</span>
                  </p>
                )}
                {liability.description && (
                  <p className="text-sm text-gray-600">{liability.description}</p>
                )}
              </div>
            </div>
            
            <div className="text-right ml-4">
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(liability.amount)}
              </p>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit?.(liability)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => deleteLiability(liability.id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiabilityList;
