# Keio Store Budget Management System

## Overview
A budget-vs-actual management system for Keio Store's corporate planning department. A single-page dashboard that moves away from Excel dependency to centrally manage budgets, forecasts, and actuals. Integrates all functions — budget entry, forecast management, actuals review, variance analysis, report export, and master management — via tab navigation, with automatic actuals import through accounting system integration and real-time budget-vs-actual comparison.

## Screen Transition Diagram

```
+-----------------------------------------------------------------------+
|                    Budget Management Dashboard (0001)                  |
|                                                                       |
|  +------------+  +-----------+  +----------+  +---------+             |
|  | Dashboard  |  | Budget    |  | Forecast |  | Actuals |             |
|  | (default)  |  | Entry     |  | Mgmt     |  | Review  |             |
|  +-----+------+  +-----+-----+  +----------+  +----+----+             |
|        |               |                            |                 |
|        | Click KPI      | Submit          Drill-down |                 |
|        v               v                            v                 |
|  +------------+  +-----------+              +-------------+           |
|  | Variance   |  | Budget    |              | Variance    |           |
|  | Analysis   |  | Approval* |              | Analysis    |           |
|  +------------+  +-----------+              +-------------+           |
|                                                                       |
|  +----------+  +-----------+  +-------------------+                   |
|  | Reports  |  | Master    |  | (Admin only)      |                   |
|  |          |  | Mgmt      |  |                   |                   |
|  +----------+  +-----------+  +-------------------+                   |
|                                                                       |
|  * Budget Approval is handled within the Budget Entry tab             |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
|  Navigation Header (0002) + Tab Navigation (0003)                     |
|  Persistent — always visible at top of page                           |
+-----------------------------------------------------------------------+
```

### Transitions

| From | Action | To |
|---|---|---|
| Dashboard tab | Click KPI card | Variance Analysis tab |
| Dashboard tab | Click store table row | Actuals Review tab |
| Dashboard tab | Click chart section | Reports tab |
| Budget Entry tab | Submit budget | Budget approval flow (within tab) |
| Actuals Review tab | Click drill-down row | Variance Analysis tab |
| Any tab | Click tab in Tab Navigation (0003) | Corresponding tab |
| Navigation Header (0002) | Click notification bell | Variance Analysis tab (alert items) |
| Navigation Header (0002) | Click user dropdown > Logout | Login (external) |

## Wireframe Map
| ID | Wireframe Type | Name | Description |
|---|---|---|---|
| 0001 | Page | Budget Management Dashboard | Tab-based integrated dashboard consolidating KPI summary, budget entry, forecast management, actuals review, variance analysis, reports, and master management into a single screen |
| 0002 | Component | Navigation Header | Global header with system logo, fiscal year/month selector, notification bell, and user menu |
| 0003 | Component | Tab Navigation | Tab navigation switching between Dashboard, Budget Entry, Forecast, Actuals, Variance Analysis, Reports, and Master Management |
| 0004 | Component | Data Table | General-purpose table with sorting, filtering, pagination, row highlighting, and inline editing support |
| 0005 | Component | KPI Summary Card | Card displaying KPI value, year-over-year change badge, and progress bar |
| 0006 | Component | Filter Bar | Condition filter bar with fiscal year, month, department, store, account selectors |

---

## 0001: Budget Management Dashboard

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0002)
- **Tab Navigation**: (Component 0003) 7 tabs — Dashboard / Budget Entry / Forecast Management / Actuals Review / Variance Analysis / Reports / Master Management
- **[Tab: Dashboard] KPI Summary**: Four KPI Summary Cards (Component 0005) — displaying revenue, operating profit, expenses, and budget achievement rate. Each card includes amount, year-over-year change badge, and budget progress bar
- **[Tab: Dashboard] Monthly Trend Chart**: Line chart with 3 series (budget / forecast / actuals) showing fiscal year progression (April–March). Includes legend and tooltips
- **[Tab: Dashboard] Store Budget vs Actuals Table**: Data Table (Component 0004) listing all stores with budget, actuals, achievement rate, and variance. Rows exceeding the deviation threshold are highlighted
- **[Tab: Dashboard] Account Variance Panel**: Horizontal bar chart showing budget vs actuals by account category. Top 5 accounts with the largest variance are highlighted
- **[Tab: Dashboard] Recent Activity**: Timeline of recent operations (budget submissions, forecast updates, actuals import completions, approval status changes)
- **[Tab: Budget Entry] Filter Bar**: (Component 0006) Fiscal year, month, department, store, and budget version selectors
- **[Tab: Budget Entry] Budget Entry Table**: Data Table (Component 0004) with inline editing. Rows: accounts, Columns: stores, Cells: amount input fields
- **[Tab: Budget Entry] Totals Row**: Auto-calculated department subtotals and company-wide totals
- **[Tab: Budget Entry] Action Bar**: Save draft, submit, and Excel import buttons
- **[Tab: Forecast Management] Filter Bar**: (Component 0006) Fiscal year, month, department, and store selectors
- **[Tab: Forecast Management] Forecast Entry Table**: Data Table (Component 0004) with inline editing. Previous values and year-over-year values shown as reference columns
- **[Tab: Forecast Management] History Panel**: List and comparison view of monthly forecast update history (with diff highlighting)
- **[Tab: Forecast Management] Action Bar**: Copy previous values, bulk edit, and save buttons
- **[Tab: Actuals Review] Filter Bar**: (Component 0006) Fiscal year, month, department, store, and account selectors
- **[Tab: Actuals Review] Actuals Summary Table**: Data Table (Component 0004) displaying aggregated actuals by account
- **[Tab: Actuals Review] Drill-Down Detail**: Clicking a summary row expands to show individual line items (transaction date / description / amount)
- **[Tab: Actuals Review] Import History**: List of data import execution history, status, and error logs
- **[Tab: Variance Analysis] Filter Bar**: (Component 0006) Fiscal year, month, department, store, and comparison target (budget vs actuals / forecast vs actuals / year-over-year) selectors
- **[Tab: Variance Analysis] Variance Summary Table**: Data Table (Component 0004) showing variances by store and account. Columns: item name / budget (or forecast) / actuals / variance amount / variance rate. Rows exceeding the deviation threshold are highlighted
- **[Tab: Variance Analysis] Variance Chart**: Horizontal bar chart visualizing variance by account category
- **[Tab: Variance Analysis] Comment Panel**: Panel for recording comments and reasons on items with variances
- **[Tab: Reports] Report Type Selection**: Report template selection (executive summary / store-level actuals / account-level budget vs actuals comparison / monthly trends)
- **[Tab: Reports] Condition Settings**: (Component 0006) Fiscal year, month, department, and store filters
- **[Tab: Reports] Preview**: Report preview display area
- **[Tab: Reports] Export Actions**: PDF export, Excel export, and save custom view buttons
- **[Tab: Master Management] Sub-Tab Navigation**: Sub-tabs for Account Master / Department & Store Master / User & Permissions
- **[Tab: Master Management] Master Data Table**: Data Table (Component 0004) CRUD list for each master. Accounts displayed as tree structure, departments and stores via tab switching
- **[Tab: Master Management] Edit Modal**: Modal form for adding/editing master data
- **[Tab: Master Management] Account Mapping Table**: Table configuring the mapping between accounting system accounts and budget management accounts
- **[Tab: Master Management] Permission Matrix**: View/edit permission matrix for User x Department x Function

### Layout
- Mobile: Navigation header fixed at top, tabs as horizontally scrollable bar, tab content in single-column stack, tables with horizontal scroll support
- Desktop: Navigation header fixed at top (full width), tab navigation positioned below, main content area centered with max-width 1440px and 24px padding. Dashboard tab: KPI cards in 4-column row, then 2-column layout (left: monthly trend chart + store table, right: account variance panel + activity). Other tabs: filter bar in horizontal row, then full-width table
- Container max-width: 1440px, horizontal padding 24px

### Key Components
- Line chart (3 series: budget / forecast / actuals)
- Horizontal bar chart (account-level budget vs actuals comparison)
- Activity timeline (avatar + text + timestamp)
- Status badges (submitted / approved / rejected / finalized)
- Import status badges (success / error / processing)
- Comparison target toggle tabs
- Report template cards
- Report preview area
- Tab component (Master Management sub-tabs)
- Tree structure table (account master, department master)
- Permission matrix table (checkbox-based)

### Notes
- All functions consolidated into a single page via tab switching. Covers the entire budget management workflow without page navigation
- Dashboard tab is the default view. Clicking KPI cards navigates to the Variance Analysis tab; clicking table rows navigates to the Actuals Review tab
- Uses Keio Group brand color (pink/magenta) as accent
- Clean, trustworthy design appropriate for a business system
- Simple, easy-to-use UI design for all departments
- Master Management tab is only visible to users with admin permissions

---

## 0002: Navigation Header

### Wireframe Type
Component

### Description
Global navigation header containing the system logo, fiscal year/month selector, notification bell, and user avatar menu. Always displayed at the top of the Budget Management Dashboard (0001).

### Variants
- Default: All elements displayed in a horizontal row
- Mobile: Logo left-aligned, hamburger menu on the right (expanding a drawer that integrates with tab navigation)

### Props / Data
- Current user name and avatar
- Unread notification count (alert notifications)
- Selected fiscal year and month

### Layout
- Full-width fixed header, height 64px
- Left: system logo (Keio Store Budget Management), Center: fiscal year/month selector, Right: notification bell + user avatar
- Mobile: logo on left, hamburger menu on right

### Notes
- Displayed on the Budget Management Dashboard (0001)
- User dropdown includes logout and user settings links
- Notification bell click displays the alert list from the Variance Analysis tab

---

## 0003: Tab Navigation

### Wireframe Type
Component

### Description
Tab navigation for switching between the 7 major functions: Dashboard / Budget Entry / Forecast Management / Actuals Review / Variance Analysis / Reports / Master Management. Positioned directly below the Navigation Header on the Budget Management Dashboard (0001).

### Variants
- Default: All tabs displayed horizontally, active tab with underline and accent color
- Mobile: Horizontally scrollable tabs (left/right swipe)
- Admin: Master Management tab visible (admin users only)
- Non-admin: Master Management tab hidden (regular users)

### Props / Data
- Tab item list: Dashboard / Budget Entry / Forecast Management / Actuals Review / Variance Analysis / Reports / Master Management
- Active tab
- User permission level (controls Master Management tab visibility)

### Layout
- Full width, fixed directly below Navigation Header
- Tab height 48px, each tab equally spaced or content-width
- Mobile: horizontal scroll, minimum tab width 100px

### Notes
- Displayed on the Budget Management Dashboard (0001)
- Supports tab-to-tab navigation triggered by KPI card clicks and table row clicks
- Master Management tab visible only with admin permissions

---

## 0004: Data Table

### Wireframe Type
Component

### Description
General-purpose data table component used across the entire system. Features sorting, filtering, pagination, and row highlighting as standard. Based on TanStack Table. Used across all tabs of the Budget Management Dashboard (0001).

### Variants
- Read-only: Standard table (Dashboard, Actuals Review, approval lists, etc.)
- Inline editing: Direct cell input on click (Budget Entry, Forecast Management)
- Tree view: Expandable/collapsible hierarchy display (account master, department master)
- Drill-down: Click row to expand detail rows (Actuals Review)

### Props / Data
- Column definitions (header name, data type, sortable flag, filterable flag)
- Row data array
- Highlight conditions (deviation rate threshold, etc.)
- Page size

### Layout
- Full width, horizontal scroll support (mobile)
- Sticky header (on vertical scroll)
- Pagination bar at bottom

### Notes
- Handles large datasets via virtual scrolling or pagination
- Rows exceeding the deviation threshold highlighted in red/orange
- Includes CSV/Excel export button

---

## 0005: KPI Summary Card

### Wireframe Type
Component

### Description
KPI display card shown on the Dashboard tab. Consolidates a key metric's value, year-over-year change badge, and budget progress bar into a single card. Used on the Dashboard tab of the Budget Management Dashboard (0001).

### Variants
- Positive: Green badge with up arrow when change rate is positive
- Negative: Red badge with down arrow when change rate is negative
- Neutral: Gray badge when no change

### Props / Data
- KPI name (Revenue, Operating Profit, Expenses, Budget Achievement Rate)
- Value (monetary amount or percentage)
- Year-over-year change rate
- Budget progress rate (0–100%)

### Layout
- Card interior: KPI name (top), value (large, centered), change badge (beside value), progress bar (bottom)
- Padding 16px

### Notes
- Displayed as 4 cards in a row on the Dashboard tab
- Click navigates to the corresponding metric in the Variance Analysis tab

---

## 0006: Filter Bar

### Wireframe Type
Component

### Description
Condition filter bar displayed at the top of each tab. Arranges dropdown selectors for fiscal year, month, department, store, account, etc. in a horizontal row. Used on the Budget Entry, Forecast Management, Actuals Review, Variance Analysis, and Reports tabs of the Budget Management Dashboard (0001).

### Variants
- Budget: Fiscal year + month + department + store + budget version selector
- Forecast: Fiscal year + month + department + store
- Actuals: Fiscal year + month + department + store + account
- Variance: Fiscal year + month + department + store + comparison target (budget vs actuals / forecast vs actuals / year-over-year)
- Report: Fiscal year + month + department + store

### Props / Data
- Filter item definitions (label, options, default value)
- Selected values
- Department and store hierarchy data

### Layout
- Desktop: Selectors displayed horizontally, reset button on the right end
- Mobile: Collapsible. Toggle button to expand/collapse, vertical stack when expanded

### Notes
- Used on the Budget Entry, Forecast Management, Actuals Review, Variance Analysis, and Reports tabs
- Variant differs per tab (different combination of selectors displayed)
- Tables and charts update in real-time on filter change
