# Quick Start Guide - NetVal

## 📦 Installation & Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Application Workflow

### Entry Point
- **URL**: `http://localhost:3000`
- **File**: [app/page.tsx](app/page.tsx)
- **Component**: HomePage from [app/pages/home.tsx](app/pages/home.tsx)

### Main Page Structure
The application uses a tabbed interface with four main sections:

#### 1. Dashboard Tab
- View total assets, liabilities, and net worth
- Quick access buttons to add assets/liabilities
- Summary statistics

#### 2. Assets Tab
- List all your assets
- Add new assets by clicking "Add Asset" button
- Edit or delete individual assets
- See categories and values at a glance

#### 3. Liabilities Tab
- List all your liabilities (debts)
- Add new liabilities by clicking "Add Liability" button
- Track interest rates for loans
- Edit or delete individual liabilities

#### 4. History Tab
- View snapshots of your net worth over time
- Table showing dates, assets, liabilities, and net worth
- Automatically updates when you add/modify entries

## 🔧 Tech Stack Breakdown

### Frontend Framework
- **Next.js 14**: React-based framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling

### State Management
- **Zustand**: Lightweight state management library
- **Persist Middleware**: Automatic localStorage persistence

### Key Libraries
- **Recharts**: Ready for charts (imported but not used yet)
- **clsx**: Conditional CSS class handling

## 📊 Data Storage

All data is stored in **browser localStorage** using Zustand's persist middleware:

- **Key Name**: `networth-store`
- **Format**: JSON serialization
- **Persistence**: Automatic on every change
- **Version**: v1

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hamburger menu on mobile (< 1024px)
- Full sidebar on desktop (≥ 1024px)

### Interactive Components
- Modal dialogs for adding assets/liabilities
- Form validation (required fields)
- Hover effects and transitions
- Color-coded categories with icons

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Warning**: Amber (#F59E0B)

## 🗂️ Important Files Reference

### Configuration Files
- [package.json](package.json) - Dependencies and scripts
- [tsconfig.json](tsconfig.json) - TypeScript configuration
- [next.config.js](next.config.js) - Next.js settings
- [tailwind.config.js](tailwind.config.js) - Tailwind setup

### Core Application
- [app/layout.tsx](app/layout.tsx) - Root layout
- [app/page.tsx](app/page.tsx) - Entry point
- [app/pages/home.tsx](app/pages/home.tsx) - Main application page
- [app/layouts/MainLayout.tsx](app/layouts/MainLayout.tsx) - Header & sidebar

### State Management
- [app/store/useNetWorthStore.ts](app/store/useNetWorthStore.ts) - Zustand store

### Types & Constants
- [app/types/index.ts](app/types/index.ts) - All TypeScript types
- [app/constants/index.ts](app/constants/index.ts) - Categories & constants

### Components
- [app/components/common/NetWorthCard.tsx](app/components/common/NetWorthCard.tsx) - Overview card
- [app/components/assets/](app/components/assets/) - Asset components
- [app/components/liabilities/](app/components/liabilities/) - Liability components

### Utilities
- [app/utils/formatting.ts](app/utils/formatting.ts) - Currency, date, and calc utilities
- [app/hooks/useNetWorthStore.ts](app/hooks/useNetWorthStore.ts) - Store hook with hydration

## 🚀 Building for Production

### Build
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

### Linting
```bash
npm run lint
```

## 💡 Tips & Best Practices

1. **Adding Data**: Always fill in required fields (marked with *)
2. **Categories**: Choose appropriate categories for better organization
3. **Descriptions**: Optional but helpful for tracking notes
4. **Interest Rates**: Only applicable for loans/debts
5. **History**: Check history tab to see your net worth progression

## 🔄 Common Tasks

### How to Add an Asset
1. Click on "Assets" tab
2. Click "Add Asset" button
3. Fill in: Name, Category, Value
4. Optionally add description
5. Click "Add Asset"

### How to Add a Liability
1. Click on "Liabilities" tab
2. Click "Add Liability" button
3. Fill in: Name, Category, Amount
4. Optionally add interest rate and description
5. Click "Add Liability"

### How to Delete an Item
1. Find the item in Assets or Liabilities tab
2. Click the "Delete" button
3. The item will be removed immediately

### How to View History
1. Click on "History" tab
2. See all snapshots of your net worth
3. Table shows dates, asset totals, liability totals, and net worth

## 🐛 Troubleshooting

### Data Not Persisting?
- Check browser's localStorage is enabled
- Open DevTools (F12) → Application → LocalStorage
- Look for `networth-store` entry

### Styles Not Loading?
- Run `npm install` to ensure Tailwind is installed
- Restart dev server: `npm run dev`
- Clear browser cache (Ctrl+Shift+Delete)

### Components Not Rendering?
- Ensure 'use client' directive is at the top of interactive components
- Check console for TypeScript or runtime errors
- Verify store hooks are being called correctly

## 📱 Mobile Optimization

The app is fully mobile-responsive with:
- Touch-friendly button sizes
- Optimized form inputs for mobile
- Responsive grid layouts
- Collapsible sidebar navigation
- Viewport meta tags configured

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

**Happy tracking! 💰**
