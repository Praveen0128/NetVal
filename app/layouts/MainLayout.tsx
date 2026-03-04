'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div>
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">NetVal</span>
              </Link>
              <p className="text-xs text-gray-500">Net Worth Tracker</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static w-64 h-[calc(100vh-80px)] bg-white shadow-lg transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:flex flex-col z-30
        `}>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <NavLink href="#" label="📊 Dashboard" />
            <NavLink href="#assets" label="💰 Assets" />
            <NavLink href="#liabilities" label="💳 Liabilities" />
            <NavLink href="#history" label="📈 History" />
          </nav>
          
          <div className="px-4 py-6 border-t">
            <button className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 text-left">
              ⚙️ Settings
            </button>
            <button className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 text-left">
              ℹ️ About
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => (
  <a
    href={href}
    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors hover:text-blue-600 font-medium"
  >
    {label}
  </a>
);

export default MainLayout;
