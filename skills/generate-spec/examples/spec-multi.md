# Budget vs Actual Management System

## Overview
A budget-versus-actual management system for Keio Store's corporate planning department. Moving away from Excel dependency to centrally manage budgets, forecasts, and actuals. Automatically imports actual data via accounting system integration and provides real-time visualization of budget-vs-actual comparisons and variance analysis by store and account.

## Screen Transition Diagram

```
+-------------------+                  +-------------------+
|                   |   Login success  |                   |
|  Login            | ---------------> |  Dashboard        |
|  (0001)           |                  |  (0002)           |
|                   |                  |                   |
+-------------------+                  +-------------------+
                                          |
               +-------------+------------+------------+-------------------+
               |             |            |            |                   |
               v             v            v            v                   v
+--------------+  +----------+--+  +------+-------+  +-+---------------+  +------------------+
| Budget Entry |  | Budget      |  | Forecast     |  | Actuals Review |  | Variance         |
| (0003)       |  | Approval    |  | Management   |  | (0006)         |  | Analysis (0007)  |
|              |  | (0004)      |  | (0005)       |  |                |  |                  |
+------+-------+  +-------------+  +--------------+  +-------+--------+  +---------+--------+
       |                                                      |                    |
       | Submit                                    Drill-down |          Link from  |
       v                                                      v          KPI cards  |
+-------------+                                      +-------+--------+            |
| Budget      |                                      | Variance       | <----------+
| Approval    |                                      | Analysis       |
| (0004)      |                                      | (0007)         |
+-------------+                                      +----------------+

                    +-------------------+
                    | Report Export     |
                    | (0008)            |
                    +-------------------+

+---------+  +-----------------+  +----------------------+
| Master  |  | Master (Dept &  |  | User & Permission    |
| (Accts) |  | Stores) (0010)  |  | Management (0011)    |
| (0009)  |  |                 |  |                      |
+---------+  +-----------------+  +----------------------+

+-------------------------------------------------------+
|  Navigation Header (0012) + Sidebar (0013)            |
|  Persistent across all authenticated pages (0002-0011)|
+-------------------------------------------------------+
```

### Transitions

| From | Action | To |
|---|---|---|
| Login (0001) | Successful login | Dashboard (0002) |
| Dashboard (0002) | Click KPI card | Variance Analysis (0007) |
| Dashboard (0002) | Click store table row | Actuals Review (0006) |
| Dashboard (0002) | Click chart section | Report Export (0008) |
| Budget Entry (0003) | Submit budget | Budget Approval (0004) |
| Budget Approval (0004) | Approval complete | Dashboard (0002) |
| Actuals Review (0006) | Drill-down link | Variance Analysis (0007) |
| Variance Analysis (0007) | Drill-down link | Actuals Review (0006) |
| Sidebar (0013) | Click menu item | Any page (0002-0011) |
| Navigation Header (0012) | Click user dropdown > User Management | User & Permission Management (0011) |
| Navigation Header (0012) | Click user dropdown > Logout | Login (0001) |

## Wireframe Map
| ID | Wireframe Type | Name | Description |
|---|---|---|---|
| 0001 | Page | Login | User authentication screen (email / password) |
| 0002 | Page | Dashboard | Overview of key KPIs, monthly trends, and store-level budget vs actuals |
| 0003 | Page | Budget Entry | Per-store, per-account budget input by each department (annual / monthly) |
| 0004 | Page | Budget Approval | Budget approval workflow (department approval → corporate planning review → finalization) |
| 0005 | Page | Forecast Management | Per-store, per-account forecast data entry, updates, and history management |
| 0006 | Page | Actuals Review | Review and drill-down of actual data imported from the accounting system |
| 0007 | Page | Variance Analysis | Budget vs actuals / forecast vs actuals variance comparison with reason comments |
| 0008 | Page | Report Export | Report generation and download in PDF / Excel format |
| 0009 | Page | Master Management (Accounts) | Account hierarchy registration, editing, and accounting-account mapping |
| 0010 | Page | Master Management (Departments & Stores) | Department hierarchy and store information management |
| 0011 | Page | User & Permission Management | User registration and department-level view/edit permission settings |
| 0012 | Component | Navigation Header | Global navigation, fiscal year/month selector, notifications, user menu |
| 0013 | Component | Sidebar | Side navigation for page transitions |
| 0014 | Component | Data Table | General-purpose table with sorting, filtering, pagination, and row highlighting |
| 0015 | Component | KPI Summary Card | KPI display card with value, change badge, and progress bar |

---

## 0001: Login

### Wireframe Type
Page

### Sections
- **Header**: System logo (Keio Store Budget Management System)
- **Login Form**: Email input, password input, "Keep me signed in" checkbox, login button
- **Footer**: Password reset link, contact information

### Layout
- Centered single-column form on all devices
- Form max-width: 400px, vertically centered

### Key Components
- Text input fields with labels and validation states
- Primary button (Login)
- Text links

### Notes
- Application entry point
- On successful login, navigates to Dashboard (0002)
- Uses Keio Group brand color (pink/magenta) as accent

---

## 0002: Dashboard

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0012)
- **Sidebar**: (Component 0013)
- **KPI Summary**: Four KPI Summary Cards (Component 0015) for revenue, operating profit, expenses, and budget achievement rate. Each card displays a value, year-over-year change badge, and budget progress bar
- **Monthly Trend Chart**: Line chart showing three series (budget / forecast / actuals) over monthly progression. X-axis spans April to March (fiscal year), with legend and tooltips
- **Store Budget vs Actuals Table**: Data Table (Component 0014) listing all stores with budget, actuals, achievement rate, and variance. Rows exceeding the deviation threshold are highlighted
- **Account Variance Analysis Panel**: Horizontal bar chart showing budget vs actuals per account category. Top 5 accounts with the largest variance are highlighted
- **Recent Activity**: Timeline of recent operations (budget submissions, forecast updates, actuals import completions, approval status changes)

### Layout
- Mobile: Single-column stack. KPI cards in 2x2 grid, charts and tables full-width stacked vertically
- Desktop: Sidebar (240px) + main area. KPI cards in 4-column row, below that 2-column layout (left: monthly trend chart + store table, right: account variance panel + activity)
- Container max-width: 1440px, horizontal padding 24px

### Key Components
- Line chart (Recharts, 3 series: budget / forecast / actuals)
- Horizontal bar chart (account-level budget vs actuals comparison)
- Activity timeline (avatar + text + timestamp)

### Notes
- Main screen after login
- Link paths from each section to detail screens: KPI cards → Variance Analysis (0007), table rows → Actuals Review (0006), charts → Report Export (0008)
- Clean, trustworthy design appropriate for a business system

---

## 0003: Budget Entry

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0012)
- **Sidebar**: (Component 0013)
- **Filter Bar**: Fiscal year, month, department, and store selectors; budget version selector (initial budget / revised budget)
- **Budget Entry Table**: Data Table (Component 0014) with inline editing for per-store, per-account budget amounts. Rows: accounts, Columns: stores, Cells: amount input fields
- **Totals Row**: Auto-calculated department subtotals and company-wide totals
- **Action Bar**: Save draft, submit, and Excel import buttons

### Layout
- Mobile: Collapsible filter bar, horizontally scrollable table
- Desktop: Filter bar in horizontal row, full-width table below
- Container max-width: 1440px

### Key Components
- Inline-editable data table
- Dropdown selector group
- Excel file upload
- Save draft / submit buttons

### Notes
- Departments enter data directly into the system; aggregation is automated
- After submission, proceeds to Budget Approval (0004) workflow
- Excel import supports migration from existing formats

---

## 0004: Budget Approval

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0012)
- **Sidebar**: (Component 0013)
- **Pending Approval List**: Data Table (Component 0014) listing budgets awaiting approval. Columns: department name / submitter / submission date / status / total amount
- **Approval Detail Panel**: Detailed view of selected budget (per-account, per-store breakdown table)
- **Approval Actions**: Approve, reject, and comment input

### Layout
- Mobile: List → detail screen transition
- Desktop: Pending approval list on the left (1/3), detail panel on the right (2/3)
- Container max-width: 1440px

### Key Components
- Status badges (submitted / approved / rejected / finalized)
- Approve / reject buttons
- Comment input textarea
- Approval flow progress display (department approval → corporate planning review → finalization)

### Notes
- Displays budgets submitted from Budget Entry (0003)
- Approval flow: department approval → corporate planning review → finalization
- Upon approval completion, reflected in Dashboard (0002)

---

## 0005: Forecast Management

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0012)
- **Sidebar**: (Component 0013)
- **Filter Bar**: Fiscal year, month, department, and store selectors
- **Forecast Entry Table**: Data Table (Component 0014) with inline editing for per-store, per-account forecast data. Previous values and year-over-year values shown as reference
- **History Panel**: List and comparison view of monthly forecast update history
- **Action Bar**: Copy previous values, bulk edit, and save buttons

### Layout
- Mobile: Collapsible filter bar, horizontally scrollable table, history panel at bottom
- Desktop: Filter bar in horizontal row, full-width main table, collapsible side panel for history
- Container max-width: 1440px

### Key Components
- Inline-editable data table (with reference columns for previous and year-over-year values)
- Copy previous values button
- History comparison view (with diff highlighting)

### Notes
- Manages forecasts in a unified UI, eliminating person-dependent workflows
- Maintains the same table interaction feel as Budget Entry (0003)
- History panel enables comparison with past forecasts

---

## 0006: Actuals Review

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0012)
- **Sidebar**: (Component 0013)
- **Filter Bar**: Fiscal year, month, department, store, and account selectors
- **Actuals Summary Table**: Data Table (Component 0014) displaying aggregated actuals by account
- **Drill-Down Detail**: Clicking a summary row expands to show individual line items (transaction date / description / amount)
- **Import History**: List of data import execution history, status, and error logs

### Layout
- Mobile: Collapsible filter bar, horizontally scrollable table, details expand as accordion
- Desktop: Filter bar in horizontal row, full-width summary table, drill-down via row expansion
- Container max-width: 1440px

### Key Components
- Expandable data table (aggregated → individual line item drill-down)
- Import status badges (success / error / processing)
- Error log display

### Notes
- Enables drill-down from aggregated accounts to individual line items imported from the accounting system
- Linked from Dashboard (0002) table rows
- Link path to Variance Analysis (0007)

---

## 0007: Variance Analysis

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0012)
- **Sidebar**: (Component 0013)
- **Filter Bar**: Fiscal year, month, department, store, and comparison target (budget vs actuals / forecast vs actuals / year-over-year) selectors
- **Variance Summary**: Data Table (Component 0014) showing variances by store and account. Columns: item name / budget (or forecast) / actuals / variance amount / variance rate. Rows exceeding the deviation threshold are highlighted
- **Variance Chart**: Horizontal bar chart visualizing variance by account category
- **Comment Panel**: Panel for recording comments and reasons on items with variances

### Layout
- Mobile: Collapsible filter bar, table and chart stacked vertically, comments at bottom
- Desktop: Filter bar at top, 2-column layout (left: table + chart, right: comment panel)
- Container max-width: 1440px

### Key Components
- Data table with variance highlighting (red/orange alert display)
- Horizontal bar chart (variance visualization)
- Comment input and history display panel
- Comparison target toggle tabs

### Notes
- Linked from Dashboard (0002) KPI cards and charts
- Drill-down link to Actuals Review (0006)
- Alert notifications automatically triggered when deviation rate exceeds threshold

---

## 0008: Report Export

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0012)
- **Sidebar**: (Component 0013)
- **Report Type Selection**: Report template selection (executive summary / store-level actuals / account-level budget vs actuals comparison / monthly trends, etc.)
- **Condition Settings**: Fiscal year, month, department, and store filters
- **Preview**: Report preview display
- **Export Actions**: PDF export, Excel export, and save custom view buttons

### Layout
- Mobile: Vertical step flow: condition settings → preview → export
- Desktop: Condition settings panel on the left (1/3), preview on the right (2/3), export buttons at bottom
- Container max-width: 1440px

### Key Components
- Report template cards
- Condition settings form
- Report preview area
- Download buttons (PDF / Excel)

### Notes
- Linked from Dashboard (0002) chart section
- Custom views allow users to save display conditions per user

---

## 0009: Master Management (Accounts)

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0012)
- **Sidebar**: (Component 0013)
- **Account List Table**: Data Table (Component 0014) displaying account hierarchy in tree view. Columns: account code / account name / hierarchy level / status
- **Account Edit Form**: Modal or side panel for adding/editing accounts
- **Accounting Account Mapping**: Table for configuring the mapping between accounting system accounts and budget management accounts

### Layout
- Mobile: List → detail screen transition
- Desktop: Full-width account list table, edit via modal, mapping via tab switching
- Container max-width: 1440px

### Key Components
- Data table with tree structure display
- Add/edit modal form
- Mapping configuration table (drag-and-drop or selector)

### Notes
- Accessible only with admin permissions
- Account mapping directly impacts import accuracy of Actuals Review (0006)

---

## 0010: Master Management (Departments & Stores)

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0012)
- **Sidebar**: (Component 0013)
- **Tab Switcher**: Departments tab / Stores tab
- **Department List Table**: Data Table (Component 0014) displaying department and organizational hierarchy. Columns: department code / department name / parent department / status
- **Store List Table**: Data Table (Component 0014) displaying store information. Columns: store code / store name / business type (supermarket / convenience store / drugstore) / area / status
- **Add/Edit Form**: Modal for adding/editing departments and stores

### Layout
- Mobile: Tab switching, horizontally scrollable tables
- Desktop: Tab switching, full-width tables, edit via modal
- Container max-width: 1440px

### Key Components
- Tab component
- Data table (departments with tree structure display)
- Add/edit modal form

### Notes
- Accessible only with admin permissions
- Maintains UI pattern consistency with Account Master (0009)

---

## 0011: User & Permission Management

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0012)
- **Sidebar**: (Component 0013)
- **User List Table**: Data Table (Component 0014) displaying user information. Columns: name / email / department / permission role / status
- **User Add/Edit Form**: Modal for user registration/editing (name, email, department, permission role)
- **Permission Settings Panel**: Department-level view/edit permission matrix display

### Layout
- Mobile: Horizontally scrollable table, full-screen modal for editing
- Desktop: Full-width table, edit via modal, permission matrix via tab switching
- Container max-width: 1440px

### Key Components
- Data table (with status badges)
- User add/edit modal form
- Permission matrix table (checkbox-based)

### Notes
- Accessible only with admin permissions
- Permission matrix enables bulk setting of view/edit permissions per department x function

---

## 0012: Navigation Header

### Wireframe Type
Component

### Description
Global navigation bar displayed on all authenticated pages (0002-0011). Contains the system logo, fiscal year/month selector, notification bell, and user avatar with dropdown menu.

### Variants
- Default: Full navigation with all items
- Mobile: Hamburger menu + slide-out drawer

### Props / Data
- Current user name and avatar
- Unread notification count (alert notifications)
- Selected fiscal year and month

### Layout
- Full-width sticky header, height 64px
- Left: logo, Center: fiscal year/month selector, Right: notification bell + user avatar
- Mobile: logo on left, hamburger menu on right

### Notes
- Shared across all authenticated pages
- User dropdown includes link to User & Permission Management (0011) and logout
- Notification bell click displays alert list (linked with Variance Analysis (0007) alert notifications)

---

## 0013: Sidebar

### Wireframe Type
Component

### Description
Side navigation for page transitions. Displayed on all authenticated pages (0002-0011), providing links to major features.

### Variants
- Expanded: Icon + text label (width 240px)
- Collapsed: Icon only (width 64px)
- Mobile: Hidden (expanded from Navigation Header hamburger menu)

### Props / Data
- Menu items: Dashboard / Budget Entry / Budget Approval / Forecast Management / Actuals Review / Variance Analysis / Report Export / Master Management / User Management
- Current active page
- Visibility control based on user permissions (Master Management and User Management visible to admins only)

### Layout
- Desktop: Fixed on the left, positioned to the left of main content
- Mobile: Overlay drawer

### Notes
- Shared across all authenticated pages
- Includes collapse toggle button
- Active page highlighting

---

## 0014: Data Table

### Wireframe Type
Component

### Description
General-purpose data table component used across the entire system. Features sorting, filtering, pagination, and row highlighting. Based on TanStack Table. Used on Dashboard (0002), Budget Entry (0003), Budget Approval (0004), Forecast Management (0005), Actuals Review (0006), Variance Analysis (0007), Master Management (0009, 0010), and User & Permission Management (0011).

### Variants
- Read-only: Standard table (Dashboard, Actuals Review, approval lists, etc.)
- Inline editing: Direct cell input on click (Budget Entry, Forecast Management)
- Tree view: Expandable/collapsible hierarchy (account master, department master)
- Drill-down: Click row to expand detail rows (Actuals Review)

### Props / Data
- Column definitions (header name, data type, sortable flag, filterable flag)
- Row data array
- Highlight conditions (deviation rate threshold, etc.)
- Page size

### Layout
- Full-width, horizontal scroll support (mobile)
- Sticky header (on vertical scroll)
- Pagination bar at bottom

### Notes
- Supports large datasets via virtual scrolling or pagination
- Rows exceeding deviation threshold highlighted in red/orange
- CSV/Excel export button included

---

## 0015: KPI Summary Card

### Wireframe Type
Component

### Description
KPI display card used on the Dashboard (0002). Consolidates a key metric's value, year-over-year change badge, and budget progress bar into a single card.

### Variants
- Positive: Green badge with up arrow when change rate is positive
- Negative: Red badge with down arrow when change rate is negative
- Neutral: Gray badge when no change

### Props / Data
- KPI name (Revenue, Operating Profit, Expenses, Budget Achievement Rate)
- Value (monetary amount or percentage)
- Year-over-year change rate
- Budget progress rate (0-100%)

### Layout
- Card interior: KPI name (top), value (large, centered), change badge (beside value), progress bar (bottom)
- Padding 16px

### Notes
- Displayed as 4 cards in a row on Dashboard (0002)
- Click links to the corresponding metric in Variance Analysis (0007)
