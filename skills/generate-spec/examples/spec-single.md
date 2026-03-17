# Team Project Dashboard

## Overview
A single-page project management dashboard that consolidates task tracking, team activity, timeline visualization, and reporting into a tab-based interface for small-to-medium teams.

## Screen Transition Diagram

```
+-----------------------------------------------------------------------+
|                    Project Dashboard (0001)                            |
|                                                                       |
|  +------------+  +-----------+  +----------+  +---------+             |
|  | Overview   |  | Tasks     |  | Timeline |  | Team    |             |
|  | (default)  |  |           |  |          |  |         |             |
|  +-----+------+  +-----+-----+  +----------+  +----+----+             |
|        |               |                            |                 |
|        | Click metric   | Click task       View      |                 |
|        v               v               member tasks  v                 |
|  +------------+  +-----------+              +-------------+           |
|  | Tasks      |  | Task      |              | Tasks       |           |
|  | (filtered) |  | Detail*   |              | (filtered)  |           |
|  +------------+  +-----------+              +-------------+           |
|                                                                       |
|  +----------+  +-----------+                                          |
|  | Reports  |  | Settings  |                                          |
|  |          |  |           |                                          |
|  +----------+  +-----------+                                          |
|                                                                       |
|  * Task Detail is handled as a modal within the Tasks tab             |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
|  Navigation Header (0002) + Tab Navigation (0003)                     |
|  Persistent — always visible at top of page                           |
+-----------------------------------------------------------------------+
```

### Transitions

| From | Action | To |
|---|---|---|
| Overview tab | Click metric card | Tasks tab (filtered by status) |
| Overview tab | Click activity item | Tasks tab (scrolled to task) |
| Overview tab | Click timeline bar | Timeline tab |
| Tasks tab | Click task row | Task detail modal (within tab) |
| Team tab | Click member name | Tasks tab (filtered by assignee) |
| Any tab | Click tab in Tab Navigation (0003) | Corresponding tab |
| Navigation Header (0002) | Click notification bell | Tasks tab (showing due-soon items) |
| Navigation Header (0002) | Click user dropdown > Logout | Login (external) |

## Wireframe Map
| ID | Wireframe Type | Name | Description |
|---|---|---|---|
| 0001 | Page | Project Dashboard | Tab-based dashboard consolidating project overview, task management, timeline, team view, reports, and settings into a single screen |
| 0002 | Component | Navigation Header | Global header with project name, search bar, notification bell, and user menu |
| 0003 | Component | Tab Navigation | Tab bar switching between Overview, Tasks, Timeline, Team, Reports, and Settings |
| 0004 | Component | Data Table | General-purpose table with sorting, filtering, pagination, and row selection support |
| 0005 | Component | Metric Card | Card displaying a key metric value, trend indicator, and sparkline chart |
| 0006 | Component | Filter Bar | Horizontal filter bar with status, assignee, priority, and date range selectors |

---

## 0001: Project Dashboard

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0002)
- **Tab Navigation**: (Component 0003) 6 tabs — Overview / Tasks / Timeline / Team / Reports / Settings
- **[Tab: Overview] Metric Cards**: Four Metric Cards (Component 0005) — total tasks, completed tasks, in-progress tasks, and overdue tasks. Each card includes count, percentage change from last week, and sparkline
- **[Tab: Overview] Progress Chart**: Stacked bar chart showing task distribution by status (To Do / In Progress / In Review / Done) over the past 8 weeks
- **[Tab: Overview] Recent Activity Feed**: Timeline of recent actions (task created, status changed, comment added, file uploaded) with avatar, description, and timestamp
- **[Tab: Overview] Upcoming Deadlines**: List of tasks due within the next 7 days, sorted by due date, with assignee avatar and priority badge
- **[Tab: Tasks] Filter Bar**: (Component 0006) Status, assignee, priority, label, and date range selectors
- **[Tab: Tasks] Task List Table**: Data Table (Component 0004) with columns: title, status, assignee, priority, due date, labels. Supports inline status updates and multi-select for bulk actions
- **[Tab: Tasks] Task Detail Modal**: Slide-over panel showing full task details (description, subtasks checklist, comments thread, attachments, activity log)
- **[Tab: Tasks] Quick Add Bar**: Inline input for quickly creating new tasks with title and optional assignee
- **[Tab: Timeline] Filter Bar**: (Component 0006) Assignee, priority, and label selectors
- **[Tab: Timeline] Gantt Chart**: Horizontal timeline displaying tasks as bars with start/end dates, dependencies shown as arrows, and milestone markers
- **[Tab: Timeline] Zoom Controls**: Week / Month / Quarter zoom level toggle
- **[Tab: Team] Member Grid**: Grid of team member cards showing avatar, name, role, and task counts (assigned / completed / overdue)
- **[Tab: Team] Workload Chart**: Horizontal bar chart showing number of assigned tasks per member, color-coded by status
- **[Tab: Team] Member Detail Panel**: Clicking a member shows their assigned tasks as a filtered Data Table (Component 0004)
- **[Tab: Reports] Report Type Selector**: Toggle between report templates (weekly summary / status breakdown / team workload / overdue analysis)
- **[Tab: Reports] Date Range Picker**: Custom date range selector for report scope
- **[Tab: Reports] Report Display Area**: Charts and tables based on selected report type
- **[Tab: Reports] Export Actions**: PDF export, CSV export, and share link buttons
- **[Tab: Settings] Project Info**: Project name, description, and default settings form
- **[Tab: Settings] Label Management**: CRUD list of custom labels (name + color)
- **[Tab: Settings] Notification Preferences**: Toggle switches for email and in-app notifications per event type
- **[Tab: Settings] Member Management**: Data Table (Component 0004) of members with role selector and remove button (admin only)

### Layout
- Mobile: Navigation header fixed at top, tabs as horizontally scrollable bar, tab content in single-column stack, tables with horizontal scroll support
- Desktop: Navigation header fixed at top (full width), tab navigation positioned below, main content area centered with max-width 1280px and 24px padding. Overview tab: metric cards in 4-column row, then 2-column layout (left: progress chart + activity feed, right: upcoming deadlines). Other tabs: filter bar in horizontal row, then full-width content
- Container max-width: 1280px, horizontal padding 24px

### Key Components
- Stacked bar chart (task status distribution over time)
- Gantt chart with dependency arrows and milestone markers
- Activity timeline (avatar + text + timestamp)
- Status badges (To Do / In Progress / In Review / Done)
- Priority badges (Low / Medium / High / Urgent)
- Subtask checklist (checkbox + text)
- Comment thread (avatar + text + timestamp + reply)
- Zoom level toggle (Week / Month / Quarter)
- Report template cards

### Notes
- All functions consolidated into a single page via tab switching. Covers the full project management workflow without page navigation
- Overview tab is the default view. Clicking metric cards navigates to the Tasks tab (filtered); clicking activity items also navigates to Tasks
- Settings tab member management section is only visible to users with admin role
- Clean, functional design with focus on data density and quick actions

---

## 0002: Navigation Header

### Wireframe Type
Component

### Description
Global navigation header containing the project name/logo, search bar, notification bell, and user avatar menu. Always displayed at the top of the Project Dashboard (0001).

### Variants
- Default: All elements displayed in a horizontal row
- Mobile: Logo left-aligned, hamburger menu on the right (expanding a drawer that integrates with tab navigation)

### Props / Data
- Current user name and avatar
- Unread notification count
- Project name

### Layout
- Full-width fixed header, height 64px
- Left: project name/logo, Center: search bar, Right: notification bell + user avatar
- Mobile: logo on left, hamburger menu on right

### Notes
- Displayed on the Project Dashboard (0001)
- User dropdown includes profile link, preferences, and logout
- Notification bell click shows list of due-soon and overdue tasks

---

## 0003: Tab Navigation

### Wireframe Type
Component

### Description
Tab navigation for switching between the 6 major sections: Overview / Tasks / Timeline / Team / Reports / Settings. Positioned directly below the Navigation Header on the Project Dashboard (0001).

### Variants
- Default: All tabs displayed horizontally, active tab with underline and accent color
- Mobile: Horizontally scrollable tabs (left/right swipe)
- Admin: Settings tab shows member management section
- Non-admin: Settings tab hides member management section

### Props / Data
- Tab item list: Overview / Tasks / Timeline / Team / Reports / Settings
- Active tab
- User role (controls Settings tab content visibility)

### Layout
- Full width, fixed directly below Navigation Header
- Tab height 48px, each tab equally spaced or content-width
- Mobile: horizontal scroll, minimum tab width 100px

### Notes
- Displayed on the Project Dashboard (0001)
- Supports tab-to-tab navigation triggered by metric card clicks and activity item clicks
- Badge on Tasks tab shows count of overdue tasks

---

## 0004: Data Table

### Wireframe Type
Component

### Description
General-purpose data table component used across multiple tabs of the Project Dashboard (0001). Features sorting, filtering, pagination, and row selection. Used in the Tasks tab, Team tab (member detail), Reports tab, and Settings tab (member management, label management).

### Variants
- Read-only: Standard table (Reports, Team member detail)
- Interactive: Inline status updates and row selection (Tasks)
- Editable: Inline editing with role selectors (Settings member management)

### Props / Data
- Column definitions (header name, data type, sortable flag, filterable flag)
- Row data array
- Selectable rows flag
- Page size

### Layout
- Full width, horizontal scroll support (mobile)
- Sticky header (on vertical scroll)
- Pagination bar at bottom

### Notes
- Supports multi-select for bulk actions (e.g., bulk status change, bulk delete)
- Row click can trigger detail view (e.g., task detail modal)
- Includes CSV export option

---

## 0005: Metric Card

### Wireframe Type
Component

### Description
Metric display card shown on the Overview tab. Consolidates a key metric's value, trend indicator (up/down from last period), and sparkline mini-chart into a single card. Used on the Overview tab of the Project Dashboard (0001).

### Variants
- Positive: Green trend indicator with up arrow when metric improves
- Negative: Red trend indicator with down arrow when metric declines
- Neutral: Gray indicator when no significant change

### Props / Data
- Metric name (e.g., Total Tasks, Completed, In Progress, Overdue)
- Value (count or percentage)
- Trend percentage (week-over-week change)
- Sparkline data (last 8 data points)

### Layout
- Card interior: metric name (top), value (large, centered), trend badge (beside value), sparkline (bottom)
- Padding 16px

### Notes
- Displayed as 4 cards in a row on the Overview tab
- Click navigates to the Tasks tab filtered by the corresponding status

---

## 0006: Filter Bar

### Wireframe Type
Component

### Description
Horizontal filter bar displayed at the top of tab content areas. Arranges dropdown selectors for status, assignee, priority, labels, and date range in a horizontal row. Used on the Tasks tab, Timeline tab, and Reports tab of the Project Dashboard (0001).

### Variants
- Tasks: Status + assignee + priority + label + date range selectors
- Timeline: Assignee + priority + label selectors
- Reports: Report type + date range selectors

### Props / Data
- Filter item definitions (label, options, default value)
- Selected values
- Team member list (for assignee selector)

### Layout
- Desktop: Selectors displayed horizontally, reset button on the right end
- Mobile: Collapsible. Toggle button to expand/collapse, vertical stack when expanded

### Notes
- Used on the Tasks, Timeline, and Reports tabs
- Variant differs per tab (different combination of selectors displayed)
- Content updates in real-time on filter change
