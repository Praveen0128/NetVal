'use client';

import React, { useState } from 'react';
import { useNetWorthStore } from '@/hooks/useNetWorthStore';
import { LiabilityCategory } from '@/types/index';
import { LIABILITY_CATEGORIES } from '@/constants/index';

interface AddLiabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddLiabilityModal: React.FC<AddLiabilityModalProps> = ({ isOpen, onClose }) => {
  const addLiability = useNetWorthStore((state) => state.addLiability);
  const [formData, setFormData] = useState({
    name: '',
    category: LiabilityCategory.CREDIT_CARD,
    amount: '',
    interestRate: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    addLiability({
      name: formData.name,
      category: formData.category,
      amount: parseFloat(formData.amount),
      interestRate: formData.interestRate ? parseFloat(formData.interestRate) : undefined,
      description: formData.description,
    });

    setFormData({
      name: '',
      category: LiabilityCategory.CREDIT_CARD,
      amount: '',
      interestRate: '',
      description: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Add Liability</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label-text">Liability Name *</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., Credit Card"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="label-text">Category *</label>
            <select
              className="input-field"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as LiabilityCategory })}
            >
              {Object.entries(LIABILITY_CATEGORIES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="label-text">Amount ($) *</label>
            <input
              type="number"
              className="input-field"
              placeholder="0.00"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="label-text">Interest Rate (%)</label>
            <input
              type="number"
              className="input-field"
              placeholder="0.00"
              step="0.01"
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
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
              Add Liability
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLiabilityModal;
