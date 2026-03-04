'use client';

import React, { useState } from 'react';
import { useNetWorthStore } from '@/hooks/useNetWorthStore';
import { AssetCategory } from '@/types/index';
import { ASSET_CATEGORIES } from '@/constants/index';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAssetModal: React.FC<AddAssetModalProps> = ({ isOpen, onClose }) => {
  const addAsset = useNetWorthStore((state) => state.addAsset);
  const [formData, setFormData] = useState({
    name: '',
    category: AssetCategory.CASH,
    value: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.value) {
      alert('Please fill in all required fields');
      return;
    }

    addAsset({
      name: formData.name,
      category: formData.category,
      value: parseFloat(formData.value),
      description: formData.description,
    });

    setFormData({
      name: '',
      category: AssetCategory.CASH,
      value: '',
      description: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Add Asset</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label-text">Asset Name *</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., Savings Account"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="label-text">Category *</label>
            <select
              className="input-field"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as AssetCategory })}
            >
              {Object.entries(ASSET_CATEGORIES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="label-text">Value ($) *</label>
            <input
              type="number"
              className="input-field"
              placeholder="0.00"
              step="0.01"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="label-text">Description</label>
            <textarea
              className="input-field"
              placeholder="Optional notes..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssetModal;
