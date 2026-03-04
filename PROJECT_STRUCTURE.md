# Project Structure Overview

## 🏗️ Complete Architecture

```
NetVal/
│
├── 📄 Core Configuration Files
│   ├── package.json              # Dependencies: Next.js, React, Zustand, Tailwind, etc.
│   ├── tsconfig.json             # TypeScript configuration with path aliases
│   ├── next.config.js            # Next.js configuration
│   ├── tailwind.config.js        # Tailwind CSS theme and plugins
│   ├── postcss.config.js         # PostCSS plugins
│   └── .eslintrc.json            # ESLint rules
│
├── 📁 app/                       # Next.js App Router Directory
│   │
│   ├── 📄 layout.tsx             # Root layout wrapper (HTML structure)
│   ├── 📄 page.tsx               # Entry point - loads HomePage
│   ├── 📄 globals.css            # Global styles + Tailwind layers
│   │
│   ├── 📁 components/            # React Components
│   │   ├── 📁 common/
│   │   │   └── NetWorthCard.tsx  # Summary card (Assets, Liabilities, Net Worth)
│   │   │
│   │   ├── 📁 assets/
│   │   │   ├── AddAssetModal.tsx   # Form modal for adding assets
│   │   │   └── AssetList.tsx       # List of all assets with edit/delete
│   │   │
│   │   ├── 📁 liabilities/
│   │   │   ├── AddLiabilityModal.tsx # Form modal for adding liabilities
│   │   │   └── LiabilityList.tsx     # List of all liabilities with edit/delete
│   │   │
│   │   ├── 📁 dashboard/         # Dashboard-specific components (empty - ready for expansion)
│   │   │
│   │   └── 📁 layout/            # Layout components (empty - ready for expansion)
│   │
│   ├── 📁 store/                 # State Management (Zustand)
│   │   └── useNetWorthStore.ts   # Global store with persistence
│   │
│   ├── 📁 hooks/                 # Custom React Hooks
│   │   └── useNetWorthStore.ts   # Hook wrapper with hydration handling
│   │
│   ├── 📁 types/                 # TypeScript Type Definitions
│   │   └── index.ts              # All interfaces and enums
│   │
│   ├── 📁 utils/                 # Utility Functions
│   │   └── formatting.ts         # Currency, date, and calculation helpers
│   │
│   ├── 📁 constants/             # Application Constants
│   │   └── index.ts              # Categories, chart colors, tabs config
│   │
│   ├── 📁 layouts/               # Page Templates
│   │   └── MainLayout.tsx        # Header, sidebar, main content wrapper
│   │
│   └── 📁 pages/                 # Application Pages
│       └── home.tsx              # Main dashboard with tabs (Dashboard, Assets, Liabilities, History)
│
├── 📄 Documentation
│   ├── README.md                 # Project overview and getting started
│   ├── QUICKSTART.md             # Quick reference guide
│   ├── ARCHITECTURE.md           # Detailed architecture explanation
│   └── PROJECT_STRUCTURE.md      # This file
│
├── 📄 Environment
│   ├── .env.local.example        # Environment variables template
│   └── .gitignore                # Git ignore rules
│
└── 📁 public/                    # Static assets (empty - ready for favicon, logos, etc.)

```

## 🔀 Data Flow

```
User Interaction
    ↓
Component Event Handler (e.g., onClick, onSubmit)
    ↓
Zustand Store Action (e.g., addAsset, updateAsset)
    ↓
Store State Update
    ↓
LocalStorage Sync (via persist middleware)
    ↓
Component Re-render
    ↓
UI Update
```

## 📦 Component Hierarchy

```
<html> (Root)
  └─ <body>
      └─ RootLayout (app/layout.tsx)
          └─ HomePage (app/pages/home.tsx)
              └─ MainLayout (app/layouts/MainLayout.tsx)
                  ├─ Header
                  │   ├─ Logo
                  │   └─ Menu Toggle (mobile)
                  │
                  ├─ Sidebar
                  │   └─ Navigation Links
                  │
                  └─ Main Content
                      ├─ NetWorthCard (Dashboard Tab)
                      │   ├─ Total Assets Display
                      │   ├─ Total Liabilities Display
                      │   └─ Net Worth Display
                      │
                      ├─ AssetList (Assets Tab)
                      │   └─ AssetCard[] (map)
                      │       ├─ Asset Info
                      │       ├─ Edit Button
                      │       └─ Delete Button
                      │
                      ├─ LiabilityList (Liabilities Tab)
                      │   └─ LiabilityCard[] (map)
                      │       ├─ Liability Info
                      │       ├─ Edit Button
                      │       └─ Delete Button
                      │
                      └─ HistoryTable (History Tab)
                          ├─ Date Column
                          ├─ Assets Column
                          ├─ Liabilities Column
                          └─ Net Worth Column
      
      └─ Modals
          ├─ AddAssetModal
          │   ├─ Name Input
          │   ├─ Category Dropdown
          │   ├─ Value Input
          │   ├─ Description Textarea
          │   └─ Action Buttons (Cancel, Add)
          │
          └─ AddLiabilityModal
              ├─ Name Input
              ├─ Category Dropdown
              ├─ Amount Input
              ├─ Interest Rate Input
              ├─ Description Textarea
              └─ Action Buttons (Cancel, Add)
```

## 🎯 State Shape (Zustand Store)

```typescript
{
  // Assets
  assets: Asset[],
  addAsset: (asset) => void,
  updateAsset: (id, updates) => void,
  deleteAsset: (id) => void,
  
  // Liabilities
  liabilities: Liability[],
  addLiability: (liability) => void,
  updateLiability: (id, updates) => void,
  deleteLiability: (id) => void,
  
  // History
  history: HistoryEntry[],
  addHistoryEntry: (entry) => void,
  
  // Computed Values
  getTotalAssets: () => number,
  getTotalLiabilities: () => number,
  getNetWorth: () => number,
  getHistory: () => HistoryEntry[]
}
```

## 📝 Type Definitions

```typescript
// Asset Categories
enum AssetCategory {
  CASH = 'CASH',
  INVESTMENTS = 'INVESTMENTS',
  REAL_ESTATE = 'REAL_ESTATE',
  VEHICLES = 'VEHICLES',
  RETIREMENT = 'RETIREMENT',
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
  OTHER = 'OTHER'
}

// Asset Interface
interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  value: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Liability Categories
enum LiabilityCategory {
  MORTGAGE = 'MORTGAGE',
  CAR_LOAN = 'CAR_LOAN',
  STUDENT_LOAN = 'STUDENT_LOAN',
  CREDIT_CARD = 'CREDIT_CARD',
  PERSONAL_LOAN = 'PERSONAL_LOAN',
  OTHER = 'OTHER'
}

// Liability Interface
interface Liability {
  id: string;
  name: string;
  category: LiabilityCategory;
  amount: number;
  interestRate?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// History Entry
interface HistoryEntry {
  date: Date;
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
}
```

## 🎨 Styling Organization

### Global Styles (globals.css)
- Tailwind directives (@tailwind)
- CSS reset and base styles
- Component layer classes (.btn-primary, .card, etc.)
- Typography and spacing foundations

### Tailwind Configuration
- Color palette (primary, secondary, danger, warning, success)
- Extended spacing scale (xs, sm, md, lg, xl)
- Responsive breakpoints (sm, md, lg, xl)
- Custom utilities and plugins

### Utility Classes Defined
- `.btn-primary` - Blue button with hover effect
- `.btn-secondary` - Gray button alternative
- `.btn-danger` - Red delete button
- `.btn-success` - Green success button
- `.card` - White card with shadow
- `.input-field` - Form input with focus ring
- `.label-text` - Form label styling

## 🗂️ Path Aliases (tsconfig.json)

```javascript
{
  "@/*": "./*",                    // Root directory
  "@/app/*": "./app/*",            // App directory
  "@/components/*": "./app/components/*",
  "@/layouts/*": "./app/layouts/*",
  "@/hooks/*": "./app/hooks/*",
  "@/store/*": "./app/store/*",
  "@/types/*": "./app/types/*",
  "@/utils/*": "./app/utils/*",
  "@/constants/*": "./app/constants/*"
}
```

## 🔧 Technology Stack

| Layer | Technologies |
|-------|---------------|
| **UI Framework** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS, PostCSS |
| **State Mgmt** | Zustand (with persist middleware) |
| **Storage** | Browser LocalStorage |
| **Linting** | ESLint with Next.js config |
| **Dev Tools** | TypeScript, Next.js CLI |

## 🚀 Key Features

### ✅ Implemented
- Dashboard with net worth summary
- Asset management (CRUD operations)
- Liability management (CRUD operations)
- Automatic history tracking
- Responsive design (mobile-friendly)
- Local data persistence
- Type-safe TypeScript throughout
- Interactive modal forms
- Category-based organization
- Icon and color-coded categories

### 🔜 Ready to Build
- Chart visualizations (Recharts imported)
- Trend analysis
- Budget planning
- Data export (PDF/CSV)
- Advanced filtering
- Search functionality
- Settings panel
- Mobile app (React Native)
- Cloud synchronization
- Multi-currency support

## 📋 Next Steps to Extend

1. **Add Charts**: Use Recharts for visualization
2. **Implement Edit**: Create edit modals for existing items
3. **Add Search/Filter**: Filter assets and liabilities
4. **Export Data**: Add PDF/CSV export
5. **Settings**: User preferences, currency selection
6. **Advanced Analytics**: Trends, projections, reports
7. **Mobile App**: React Native version
8. **Authentication**: User accounts, cloud sync

---

**Status**: ✅ Architecture Complete | Ready for Feature Development
