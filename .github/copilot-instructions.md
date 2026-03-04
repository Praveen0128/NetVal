# NetVal Copilot Instructions

## Project Overview
**NetVal** is a Next.js 16 net worth tracker application for manual financial data entry. It's a client-side web app using Zustand for state management with browser localStorage persistence. No backend API exists—all data is local.

## Core Architecture Patterns

### Data Flow
```
User Action → Component Event → Zustand Store Action → localStorage Sync → Component Re-render
```

### State Management (Zustand)
- **Store file**: `app/store/useNetWorthStore.ts` (default export)
- **Hook wrapper**: `app/hooks/useNetWorthStore.ts` (handles SSR hydration with `useState` + `useEffect`)
- **Pattern**: All store actions automatically trigger `addHistoryEntry()` to track changes
- **Persistence**: Uses `persist` middleware to auto-sync to localStorage under key `networth-store`

### Key Data Structures
```typescript
// Assets & Liabilities both have: id, name, category, value/amount, description?, timestamps
Asset { id, name, category: AssetCategory, value: number, createdAt, updatedAt }
Liability { id, name, category: LiabilityCategory, amount: number, interestRate?, createdAt, updatedAt }

// Automatic history snapshots
HistoryEntry { date, netWorth, totalAssets, totalLiabilities }
```

## Critical Development Workflows

### Running Dev Server
```bash
# On Windows with PowerShell execution policy issues:
cmd.exe /c npm run dev
# Server runs on http://localhost:3000 or 3001 if port in use
```

### Build & Production
```bash
npm run build    # Compiles Next.js app
npm start        # Runs production build
```

### Common Issues & Fixes
- **Lock file conflicts**: `taskkill /F /IM node.exe` then `rmdir /s /q .next`
- **next.config.js**: Avoid deprecated options (`swcMinify` removed in Next.js 14+)
- **Path aliases must match tsconfig.json**: Always use `@/hooks`, `@/store`, `@/components`, etc.

## Component Conventions

### All Components Must Start With 'use client'
Interactive components in `app/components/**` need `'use client'` directive for:
- Event handlers
- useState/useEffect hooks
- Store access via `useNetWorthStore()`

### Import Patterns
```typescript
// ✅ CORRECT - Use path aliases from tsconfig.json
import { useNetWorthStore } from '@/hooks/useNetWorthStore';
import { formatCurrency } from '@/utils/formatting';
import { ASSET_CATEGORIES } from '@/constants/index';

// ❌ WRONG - Don't use @/app/hooks (alias already includes app/)
import { useNetWorthStore } from '@/app/hooks/useNetWorthStore';
```

### Component Structure Template
1. Props interface at top `interface ComponentProps { ... }`
2. 'use client' directive
3. Imports
4. Component function
5. Default export at end

## Store Actions & Patterns

### Asset Operations (All Auto-Track History)
```typescript
const store = useNetWorthStore();
store.addAsset({ name, category, value, description? });
store.updateAsset(id, { name, value }); // Partial update
store.deleteAsset(id);
store.getTotalAssets(); // Returns number
```

### ID Generation
- Auto-generated: `asset-${Date.now()}` or `liability-${Date.now()}`
- Don't manually create IDs

### History Tracking (Automatic)
Every store action automatically creates `HistoryEntry` with current totals. Accessing `history` array shows all snapshots.

## Form & Modal Patterns

### Modal Pattern (see `AddAssetModal.tsx`)
- State: `isOpen` prop controls visibility
- Submit: Parse form values, call `store.addAction()`, reset form, call `onClose()`
- Validation: Check required fields before submission
- Structure: Fixed overlay + centered dialog box

### Form Fields
- Currency inputs: `type="number"` with `step="0.01"`
- Categories: Use Enum keys as select `value`
- Descriptions: Optional textarea fields

## Styling Approach

### Tailwind CSS + Component Classes
- Global classes defined in `app/globals.css`
- Button classes: `.btn-primary`, `.btn-secondary`, `.btn-danger`
- Card class: `.card` (white bg, shadow, padding)
- Input class: `.input-field` (focus ring, border)
- Label class: `.label-text` (gray, bold, margin-bottom)

### Color System
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Danger: Red (#EF4444)
- Status colors: Use `getNetWorthStatusColor()` from utils for conditional styling

## Utility Functions

### String Formatting (from `app/utils/formatting.ts`)
```typescript
formatCurrency(value: number) → "$1,234.56"
formatDate(date: Date | string) → "Mar 04, 2026, 02:30 PM"
calculatePercentage(value, total) → number
getNetWorthStatus(netWorth) → 'positive' | 'negative' | 'neutral'
getNetWorthStatusColor(netWorth) → 'text-green-600' | 'text-red-600' | 'text-gray-600'
```

### Constants (from `app/constants/index.ts`)
```typescript
ASSET_CATEGORIES[AssetCategory.CASH] → { label, icon: '💰', color: 'bg-blue-100 text-blue-800' }
LIABILITY_CATEGORIES[LiabilityCategory.MORTGAGE] → { label, icon, color }
```

## Feature Development Checklist

When adding features:
1. **Define Types** in `app/types/index.ts` (enums, interfaces)
2. **Add Constants** in `app/constants/index.ts` (mappings, labels)
3. **Create Components** in `app/components/**/` (organize by domain)
4. **Add Store Actions** in `app/store/useNetWorthStore.ts` for state changes
5. **Write Utilities** in `app/utils/` if reusable logic needed
6. **Integrate in Pages** in `app/pages/home.tsx` or create new page file
7. **Test**: `npm run dev` and verify in browser

## Page Structure

### Home Page (`app/pages/home.tsx`)
- Tab-based UI: Dashboard, Assets, Liabilities, History
- Tab state: Local `useState`, not global
- Components per tab: NetWorthCard, AssetList, AddAssetModal, etc.
- Modals: `isOpen` state controls visibility

### Entry Point
- Root: `app/layout.tsx` → `app/page.tsx`
- Page loads: `app/pages/home.tsx` wrapped in `MainLayout`

## Next.js Specifics

- **App Router**: Using Next.js 16 with `app/` directory structure
- **Turbopack**: Dev server uses Turbopack (shows non-critical "Persisting failed" warnings on Windows)
- **TypeScript**: Full type checking enabled, strict mode
- **No API Routes**: All logic is client-side

## Common Mistakes to Avoid

❌ Importing from store directly in components (causes hydration issues)  
✅ Always import from `@/hooks/useNetWorthStore()`

❌ Manually managing history  
✅ Store action automatically adds history entries

❌ Creating components without 'use client' when using state/hooks  
✅ Add 'use client' at top of interactive components

❌ Using wrong import paths like `@/app/hooks`  
✅ Use alias mapping from tsconfig: `@/hooks`

## References
- **Architecture deep-dive**: `ARCHITECTURE.md`
- **Quick reference**: `QUICKSTART.md`
- **Project structure**: `PROJECT_STRUCTURE.md`
- **Store implementation**: `app/store/useNetWorthStore.ts`
- **Types reference**: `app/types/index.ts`
