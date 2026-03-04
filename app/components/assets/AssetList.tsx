'use client';

import React from 'react';
import { useNetWorthStore } from '@/hooks/useNetWorthStore';
import { Asset } from '@/types/index';
import { formatCurrency } from '@/utils/formatting';
import { ASSET_CATEGORIES } from '@/constants/index';

interface AssetListProps {
  onEdit?: (asset: Asset) => void;
}

const AssetList: React.FC<AssetListProps> = ({ onEdit }) => {
  const assets = useNetWorthStore((state) => state.assets);
  const deleteAsset = useNetWorthStore((state) => state.deleteAsset);

  if (assets.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 text-lg">No assets added yet. Click "Add Asset" to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {assets.map((asset) => {
        const category = ASSET_CATEGORIES[asset.category];
        return (
          <div key={asset.id} className="card flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{category?.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{asset.name}</h3>
                  <p className={`text-sm px-2 py-1 rounded w-fit ${category?.color}`}>
                    {category?.label}
                  </p>
                </div>
              </div>
              {asset.description && (
                <p className="text-sm text-gray-600 mt-2">{asset.description}</p>
              )}
            </div>
            
            <div className="text-right ml-4">
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(asset.value)}
              </p>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit?.(asset)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => deleteAsset(asset.id)}
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

export default AssetList;
