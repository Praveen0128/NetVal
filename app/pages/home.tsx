'use client';

import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import NetWorthCard from '@/components/common/NetWorthCard';
import AssetList from '@/components/assets/AssetList';
import LiabilityList from '@/components/liabilities/LiabilityList';
import AddAssetModal from '@/components/assets/AddAssetModal';
import AddLiabilityModal from '@/components/liabilities/AddLiabilityModal';
import { useNetWorthStore } from '@/hooks/useNetWorthStore';
import { Asset, Liability } from '@/types/index';

type TabType = 'dashboard' | 'assets' | 'liabilities' | 'history';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [isAddLiabilityOpen, setIsAddLiabilityOpen] = useState(false);
  
  const assets = useNetWorthStore((state) => state.assets);
  const liabilities = useNetWorthStore((state) => state.liabilities);
  const history = useNetWorthStore((state) => state.history);

  return (
    <MainLayout>
      <div className="max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Net Worth Tracker</h1>
          <p className="text-gray-600">Manage and track your finances at a glance</p>
        </div>

        {/* Net Worth Overview */}
        {activeTab === 'dashboard' && (
          <div className="mb-8">
            <NetWorthCard />
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-0 border-b border-gray-200 mb-6 overflow-x-auto">
          <TabButton
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            label="📊 Dashboard"
          />
          <TabButton
            active={activeTab === 'assets'}
            onClick={() => setActiveTab('assets')}
            label={`💰 Assets (${assets.length})`}
          />
          <TabButton
            active={activeTab === 'liabilities'}
            onClick={() => setActiveTab('liabilities')}
            label={`💳 Liabilities (${liabilities.length})`}
          />
          <TabButton
            active={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
            label="📈 History"
          />
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Stats */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsAddAssetOpen(true)}
                    className="btn-primary w-full"
                  >
                    ➕ Add Asset
                  </button>
                  <button
                    onClick={() => setIsAddLiabilityOpen(true)}
                    className="btn-secondary w-full"
                  >
                    ➕ Add Liability
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Summary</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span>Total Assets:</span>
                    <span className="font-semibold">{assets.length} items</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Total Liabilities:</span>
                    <span className="font-semibold">{liabilities.length} items</span>
                  </p>
                  <p className="flex justify-between">
                    <span>History Records:</span>
                    <span className="font-semibold">{history.length} entries</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Assets Tab */}
          {activeTab === 'assets' && (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Assets</h2>
                <button
                  onClick={() => setIsAddAssetOpen(true)}
                  className="btn-primary"
                >
                  ➕ Add Asset
                </button>
              </div>
              <AssetList />
            </div>
          )}

          {/* Liabilities Tab */}
          {activeTab === 'liabilities' && (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Liabilities</h2>
                <button
                  onClick={() => setIsAddLiabilityOpen(true)}
                  className="btn-primary"
                >
                  ➕ Add Liability
                </button>
              </div>
              <LiabilityList />
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Net Worth History</h2>
              {history.length === 0 ? (
                <div className="card text-center py-12">
                  <p className="text-gray-500 text-lg">No history data yet. Add some assets or liabilities to get started!</p>
                </div>
              ) : (
                <div className="card overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-right py-3 px-4 font-semibold">Assets</th>
                        <th className="text-right py-3 px-4 font-semibold">Liabilities</th>
                        <th className="text-right py-3 px-4 font-semibold">Net Worth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((entry, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            {new Date(entry.date).toLocaleDateString()}
                          </td>
                          <td className="text-right py-3 px-4 text-green-600">
                            ${entry.totalAssets.toFixed(2)}
                          </td>
                          <td className="text-right py-3 px-4 text-red-600">
                            ${entry.totalLiabilities.toFixed(2)}
                          </td>
                          <td className={`text-right py-3 px-4 font-semibold ${entry.netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${entry.netWorth.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddAssetModal isOpen={isAddAssetOpen} onClose={() => setIsAddAssetOpen(false)} />
      <AddLiabilityModal isOpen={isAddLiabilityOpen} onClose={() => setIsAddLiabilityOpen(false)} />
    </MainLayout>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
      active
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-600 hover:text-gray-900'
    }`}
  >
    {label}
  </button>
);

export default HomePage;
