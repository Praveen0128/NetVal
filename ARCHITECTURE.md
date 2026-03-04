/**
 * Next.js Project Structure Guide
 * 
 * This document outlines the architecture and organization of the NetVal application
 */

// ============================================================================
// PROJECT STRUCTURE
// ============================================================================

/**
 * app/
 * - contains the application pages and layout
 * 
 * app/components/
 * - Reusable React components organized by feature
 * - common: General UI components used across the app
 * - assets: Components related to asset management
 * - liabilities: Components related to liability management
 * - dashboard: Dashboard-specific components
 * - layout: Layout wrapper components
 * 
 * app/hooks/
 * - Custom React hooks
 * - useNetWorthStore: Access to global state from Zustand
 * 
 * app/store/
 * - Zustand store configuration
 * - State management logic
 * - Persistence setup
 * 
 * app/types/
 * - TypeScript type definitions and interfaces
 * - Enum definitions for categories
 * - State shape definitions
 * 
 * app/utils/
 * - Utility functions
 * - Formatting functions (currency, dates)
 * - Calculation helpers
 * 
 * app/constants/
 * - Application-wide constants
 * - Category mappings
 * - UI configuration
 * 
 * app/layouts/
 * - Page template layouts
 * - Header and navigation components
 * 
 * app/pages/
 * - Page components (different from Next.js app router pages)
 * - Home page component
 */

// ============================================================================
// DATA FLOW
// ============================================================================

/**
 * USER ACTION
 *   ↓
 * COMPONENT (e.g., AddAssetModal)
 *   ↓
 * ZUSTAND STORE (useNetWorthStore)
 *   ↓
 * LOCAL STATE (in-memory + localStorage)
 *   ↓
 * COMPONENT RE-RENDER
 *   ↓
 * UI UPDATE
 */

// ============================================================================
// STATE MANAGEMENT (ZUSTAND)
// ============================================================================

/**
 * Store Structure:
 * 
 * assets: Asset[]
 * - Array of all assets
 * 
 * liabilities: Liability[]
 * - Array of all liabilities
 * 
 * history: HistoryEntry[]
 * - Automatic snapshots of net worth
 * 
 * Actions:
 * - addAsset(asset)
 * - updateAsset(id, updates)
 * - deleteAsset(id)
 * - addLiability(liability)
 * - updateLiability(id, updates)
 * - deleteLiability(id)
 * 
 * Calculations:
 * - getTotalAssets(): number
 * - getTotalLiabilities(): number
 * - getNetWorth(): number
 */

// ============================================================================
// COMPONENT HIERARCHY
// ============================================================================

/**
 * App (root layout)
 * └─ MainLayout
 *    ├─ Header
 *    ├─ Sidebar
 *    └─ HomePage
 *       ├─ NetWorthCard (Dashboard tab)
 *       ├─ AssetList + AddAssetModal (Assets tab)
 *       ├─ LiabilityList + AddLiabilityModal (Liabilities tab)
 *       └─ HistoryTable (History tab)
 */

// ============================================================================
// KEY PATTERNS
// ============================================================================

/**
 * CLIENT COMPONENTS
 * All interactive components use 'use client' directive
 * This enables:
 * - State management with hooks
 * - Event handlers
 * - Browser APIs access
 * 
 * ASYNC STORAGE
 * Zustand with persist middleware handles:
 * - Automatic localStorage sync
 * - Hydration on app load
 * - Type-safe persistence
 * 
 * TYPES AND SAFETY
 * Full TypeScript support ensures:
 * - Type checking at compile time
 * - Auto-completion in IDE
 * - Reduced runtime errors
 */

// ============================================================================
// ADDING NEW FEATURES
// ============================================================================

/**
 * 1. DEFINE TYPES
 *    - Add interfaces in app/types/index.ts
 *    - Maintain type consistency
 * 
 * 2. CREATE COMPONENTS
 *    - Add component in appropriate directory
 *    - Use 'use client' if interactive
 *    - Accept data props and callbacks
 * 
 * 3. UPDATE STORE
 *    - Add state and actions to Zustand store
 *    - Test state updates
 * 
 * 4. ADD CONSTANTS
 *    - Define categories/options in constants/index.ts
 *    - Reuse throughout components
 * 
 * 5. CREATE UTILITIES
 *    - Add helpers in utils/ directory
 *    - Export and use in components
 * 
 * 6. INTEGRATE COMPONENTS
 *    - Use in pages/home.tsx or create new pages
 *    - Wire through store actions
 */

// ============================================================================
// STYLING APPROACH
// ============================================================================

/**
 * TAILWIND CSS
 * - Utility-first styling
 * - Component classes in globals.css (.btn-primary, .card, etc.)
 * - Responsive design with breakpoints (sm, md, lg, xl)
 * 
 * DESIGN SYSTEM
 * - Colors: Blue (primary), Green (success), Red (danger)
 * - Spacing: xs (0.5rem), sm (1rem), md (1.5rem), lg (2rem), xl (3rem)
 * - Shadows and rounded corners for depth
 */

// ============================================================================
// BEST PRACTICES
// ============================================================================

/**
 * COMPONENT STRUCTURE
 * ✓ One component per file
 * ✓ Export default at end
 * ✓ Props interface defined above component
 * ✓ Comments for complex logic
 * 
 * STATE MANAGEMENT
 * ✓ Use store for global state
 * ✓ Use local state for UI-only state (modals, tabs)
 * ✓ Keep store lean and focused
 * 
 * NAMING CONVENTIONS
 * ✓ Components: PascalCase
 * ✓ Functions/vars: camelCase
 * ✓ Files: match component name (kebab-case for utils)
 * ✓ Types: PascalCase with T prefix or .ts file
 * 
 * DRY PRINCIPLE
 * ✓ Extract repeated code into utilities
 * ✓ Create shared components
 * ✓ Use constants for repeated values
 */

export {};
