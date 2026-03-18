---
name: generate-spec
description: Generates spec.md with pages and components needed for the system, each with a wireframe ID
argument-hint: '<path-to-requirements-file> <single|multi>'
disable-model-invocation: true
---

# Generate Spec

You are a frontend specification writer. Your task is to read a requirements document (markdown) and generate a structured `spec.md` file in the project root using the Wireframe Map format. The application type (`single` or `multi`) determines whether the output has one Page entry or multiple Page entries, but both always include Component entries. The spec can then be consumed by downstream skills such as `/generate-svg-wireframes` and `/generate-pencil-frames`.

## Instructions

1. **Parse arguments**:
   - First argument (required): Path to a markdown file containing requirement definitions or system requirements
   - Second argument (required): Application type — `single` or `multi`
     - `single`: Single-page application. Generates a spec with one Page entry plus Component entries. All features are consolidated into a single page, but reusable/complex UI elements are extracted as separate Components with their own wireframe IDs.
     - `multi`: Multi-page application. Generates a spec with multiple Page entries plus shared Component entries, each with its own wireframe ID.
   - If the first argument is missing, inform the user that a path to a requirements file is required
   - If the second argument is missing, inform the user that an application type (`single` or `multi`) is required

2. **Read the requirements file**:
   - Use the Read tool to read the file at the provided path
   - If the file does not exist, inform the user and stop
   - Understand the full scope of the requirements: what the system does, who the users are, what pages or screens are needed, and any functional or non-functional requirements

3. **Read the example spec** for reference:
   - Use the Read tool to read the appropriate example in this skill's directory (relative to the SKILL.md file):
     - For `multi`: read `examples/spec-multi.md` — a multi-page `spec.md` for an online learning platform (10 pages + 4 components)
     - For `single`: read `examples/spec-single.md` — a single-page `spec.md` for a team project dashboard (1 page + 5 components)
   - Use it as a reference for:
     - The overall document structure (Overview, Wireframe Map table, individual sections)
     - The level of detail expected in each section (Sections, Layout, Key Components, Notes)
     - How to reference Components within page Sections using `(Component {NNNN})`
     - How to write Component specs (Description with usage locations, Variants, Props/Data, Layout, Notes)
     - How to apply consistent page structure (e.g., Navigation Header + Sidebar repeated across all authenticated pages)
     - The appropriate threshold for extracting Components vs keeping Key Component bullets
   - **Do not copy the example content** — use it only as a style and structure reference for generating the new spec

4. **Analyze the requirements and identify pages and components** (refer to example spec for structure guidance):

   **For `single` (single-page application)**:
   - Treat the entire application as **one Page** — consolidate all features into sections of a single page (e.g., a dashboard with tabs, or a landing page with multiple sections)
   - **Also identify reusable components** used within that page (e.g., navigation bar, card components, data tables, form elements). Each distinct component gets its own wireframe ID.
   - Extract UI-relevant information: features, data displays, user actions, content hierarchy

   **For `multi` (multi-page application)**:
   - **Pages**: Identify every distinct page or screen the system needs (e.g., dashboard, login, data entry form, list view, detail view, settings, master management)
   - **Shared components**: Identify reusable UI components that appear across multiple pages (e.g., navigation header, sidebar, modal dialogs, data tables, form layouts)
   - For each page/component, extract:
     - User-facing features and functionality
     - Data that needs to be displayed
     - Actions users can perform
     - Navigation relationships to other pages
     - Content hierarchy
   - Infer pages and components from the requirements even if not explicitly listed — e.g., a "user authentication" feature implies a login page; a "master management" module implies CRUD pages for each master

   **For both types**:
   - **Authorization awareness**: If the requirements mention authorization, authentication, roles, permissions, or access control, reflect those specifications in the generated `spec.md`:
     - Add an `## Authorization` section after `## Overview` that summarizes the authorization model (roles, permissions, access levels) defined in the requirements
     - For each page, annotate the `### Notes` section with which roles can access it and any role-specific UI differences (e.g., "Visible to: Admin, Manager", "Edit button shown only for Admin role")
     - If role-based UI differences exist (e.g., admin sees extra controls, viewer sees read-only), describe these in the page's `### Sections` or `### Key Components` as conditional elements
     - For shared components like Navigation Header or Sidebar, note role-dependent menu items or controls in their `### Variants` or `### Notes`
     - If the requirements define a permission matrix or role hierarchy, include it as a markdown table in the `## Authorization` section
   - Infer components even if not explicitly stated in the requirements
   - Reference components within page specs using "(Component {NNNN})" notation in the Sections list
   - **Component vs Key Component**: Not every UI element needs its own wireframe ID. Use the following criteria to decide:
     - **Extract as a Component** (gets its own wireframe ID and `## {NNNN}:` section) when:
       - It is reused across 2+ pages (e.g., navigation header, sidebar, data table)
       - It is complex enough to have its own layout, variants, or states (e.g., a KPI card with positive/negative/neutral variants)
       - It is a core interaction pattern central to the system (e.g., a drag-and-drop task card)
     - **Keep as a Key Component bullet** (listed in the page's `### Key Components` without its own wireframe ID) when:
       - It is a simple, inline element (e.g., a button, a text link, a single chart)
       - It only appears on one page and has no variants
       - It is a standard HTML element that doesn't need a separate wireframe (e.g., dropdown selectors, toggle switches)
   - **Consistent page structure**: For `multi`, identify patterns that repeat across pages (e.g., all authenticated pages share the same Navigation Header + Sidebar). List these shared components in every page's Sections so the wireframe skill renders them consistently.
   - **Usage locations in Component descriptions**: In each Component's `### Description`, always state which pages use it (e.g., "Displayed on all authenticated pages (0002–0011)" or "Used in Dashboard (0002) and Variance Analysis (0007)")

5. **Assign wireframe IDs**:
   - Check the `docs/wireframes/` directory at the project root for existing wireframe IDs
   - Start from the next available 4-digit ID (e.g., if `0003/` exists, start from `0004`)
   - If no wireframes exist yet, start from `0001`
   - For `single`: assign one ID for the page, then additional IDs for each component
   - For `multi`: assign IDs sequentially — pages first (in logical navigation order), then shared components

6. **Generate `spec.md`** in the project root directory:
   - **IMPORTANT**: `spec.md` MUST be created at the **project root directory** — the top-level directory of the repository (where the main `CLAUDE.md` lives), NOT inside the `athena-design/` directory, skill directory, or any plugin directory. If this skill is located under `athena-design/skills/`, the project root is the **parent** of `athena-design/`. Always resolve the output path to the repository root.
   - **Both `single` and `multi` use the same Wireframe Map format.** The only difference is that `single` has exactly one Page entry, while `multi` has multiple Page entries. Both include Component entries.

   ```markdown
   # {System/Application Name}

   ## Overview
   {1-2 sentence summary of the system and its purpose}

   ## Authorization
   {Include this section only if the requirements mention authorization, roles, permissions, or access control.}

   | Role | Description | Access Level |
   |---|---|---|
   | {Role Name} | {Brief description} | {Pages/features accessible} |

   {Additional authorization rules, permission matrix, or role hierarchy as needed.}

   ## Screen Transition Diagram
   {ASCII box diagram showing navigation flow. For `multi`, show pages as boxes with labeled arrows between them. For `single`, show tabs/routes as boxes within a single page container, with arrows indicating in-page transitions. Include persistent components (e.g., player bars, sidebars, tab navigation) as shared elements. Below the diagram, add a Transitions table listing all navigation actions.}

   ```
   {For multi:}
   +-------------------+                  +-------------------+
   |  {Page Name}      | -- {action} -->  |  {Page Name}      |
   |  (NNNN) {path}    |                  |  (NNNN) {path}    |
   |                   | <-- {action} --  |                   |
   +-------------------+                  +-------------------+

   {For single:}
   +---------------------------------------------------------------+
   |                       {Page Name} (NNNN)                      |
   |  +-----------+  +-----------+  +-----------+  +-----------+   |
   |  | {Tab/     |  | {Tab/     |  | {Tab/     |  | {Tab/     |   |
   |  |  Route 1} |  |  Route 2} |  |  Route 3} |  |  Route 4} |   |
   |  +-----+-----+  +-----+-----+  +-----------+  +-----------+   |
   |        | {action}      |                                      |
   |        v               v                                      |
   |  +-----------+  +-----------+                                 |
   |  | {Tab/     |  | {Tab/     |                                 |
   |  |  Route X} |  |  Route Y} |                                 |
   |  +-----------+  +-----------+                                 |
   +---------------------------------------------------------------+
   ```

   ### Transitions
   | From | Action | To |
   |---|---|---|
   | {Page or Tab/Route} | {User action} | {Page or Tab/Route} |

   ## Wireframe Map
   | ID | Wireframe Type | Name | Description |
   |---|---|---|---|
   | 0001 | Page | {Page Name} | {Brief description} |
   | 0002 | Component | {Component Name} | {Brief description} |
   | ... | ... | ... | ... |

   ---

   ## 0001: {Page Name}

   ### Wireframe Type
   Page

   ### Sections
   - **{Section Name}**: {Brief description of contents and purpose}
   - **{Section Name}**: (Component {NNNN})
   - ...

   ### Layout
   - {Layout description for mobile}
   - {Layout description for desktop}
   - {Container/width constraints}
   - {Grid or column structure}

   ### Key Components
   - {Component description}
   - ...

   ### Notes
   - {Design considerations derived from requirements}
   - {Navigation relationships (for multi)}

   ---

   ## 00NN: {Component Name}

   ### Wireframe Type
   Component

   ### Description
   {What this component does. Always state which pages use it (e.g., "Used on all authenticated pages (0002–0011)").}

   ### Variants
   - {Variant or state description, if applicable}

   ### Props / Data
   - {Data or configuration the component receives}

   ### Layout
   - {Layout description}

   ### Notes
   - {Design considerations}
   ```

7. **Writing guidelines**:
   - **Be specific**: Translate abstract requirements into concrete UI elements. "User authentication" becomes a Login page with email/password fields, submit button, and forgot password link
   - **Be comprehensive within each page**: Include all sections visible on the page, from header to footer
   - **Be practical**: Include standard web page elements (header, navigation, footer) even if not explicitly mentioned in the requirements
   - **Preserve context**: If the requirements mention specific terminology, data fields, or business concepts, use them in the spec
   - **Infer intelligently**: Requirements like "display sales data" should translate into specific components like "Sales summary cards with KPI metrics" and "Bar chart showing monthly sales trends"
   - **Keep it concise per section**: Each section description should be 1-2 lines. The spec is a structural guide, not a full design document
   - **Extract components thoughtfully**: Apply the Component vs Key Component criteria from step 3. Complex, reusable, or multi-variant elements become Components with wireframe IDs. Simple, single-use elements stay as Key Component bullets.
   - **Reference components in Sections**: When a page uses a Component, reference it in the Sections list as `(Component {NNNN})`, not in Key Components. Key Components lists only inline elements without their own wireframe ID.
   - **State usage locations**: In every Component's Description, list which pages use it
   - **For both `single` and `multi`**:
     - **Include screen transition diagram**: Add an ASCII box diagram between Overview and Wireframe Map. For `multi`, show pages as boxes with labeled arrows for navigation actions. For `single`, show tabs/routes within a single page container with arrows for in-page transitions. Always include a Transitions table listing all From/Action/To relationships. Show persistent components (e.g., navigation bars, player bars, tab navigation) as shared elements.
   - For `multi` only:
     - **Be exhaustive**: List every page and component the system needs. Do not omit pages that are implied by the requirements (e.g., login, error pages, settings)
     - **Show navigation flow**: In each page's Notes, mention which pages link to/from it
     - **Maintain consistent structure**: If multiple pages share the same components (e.g., Navigation Header + Sidebar), list them in every page's Sections for consistency
   - For `single` only:
     - **Consolidate all features**: Combine all functionality into sections of a single page
     - **Consider tab/section navigation**: If the requirements describe distinct feature areas, represent them as tabs, sections, or panels within the single page

8. **Output**: After generating `spec.md`:
   - Confirm the file has been created
   - Show the Wireframe Map table as a summary
   - State the total number of pages and components identified
   - Suggest running `/generate-svg-wireframes` or `/generate-pencil-frames` as the next step

## Examples

### Example 1: Single-page application

```bash
/generate-spec docs/requirements.md single
```

**Input** (`docs/requirements.md`):
```markdown
# Portfolio Website

## Overview
A personal portfolio website to showcase projects and skills.

## Features
- Hero section with name and tagline
- Project gallery with filtering
- About section with bio
- Contact form
```

**Output** (`spec.md`):
```markdown
# Portfolio Website

## Overview
A personal portfolio website to showcase projects and skills, with a filterable project gallery and contact form.

## Wireframe Map
| ID | Wireframe Type | Name | Description |
|---|---|---|---|
| 0001 | Page | Portfolio | Single-page portfolio with hero, project gallery, about, and contact sections |
| 0002 | Component | Navigation Bar | Sticky top navigation with smooth scroll links and dark mode toggle |
| 0003 | Component | Project Card | Card displaying project thumbnail, title, tech tags, and description |
| 0004 | Component | Contact Form | Form with name, email, message fields and submit button |

---

## 0001: Portfolio

### Wireframe Type
Page

### Sections
- **Navigation Bar**: (Component 0002)
- **Hero**: Full-width section with name, tagline, short bio, and primary CTA ("View Projects")
- **Projects Gallery**: Filter button group (Web, Mobile, Design) + grid of Project Cards (Component 0003)
- **About**: Two-column layout with profile photo and bio text, skill tags, and experience timeline
- **Contact**: Contact Form (Component 0004) with social media links
- **Footer**: Copyright, social links, back-to-top button

### Layout
- Mobile: Single-column stacked, full-width sections
- Desktop: Hero full-width, projects in 3-column grid, about in 2 columns, contact centered (max-width: 600px)
- Container max-width: 1200px, horizontal padding 24px

### Key Components
- Filter button group for project categories
- Social media icon links

### Notes
- Clean, modern design with generous whitespace
- Smooth scroll navigation between sections

---

## 0002: Navigation Bar

### Wireframe Type
Component

### Description
Sticky top navigation bar with smooth scroll links to page sections (Projects, About, Contact) and a dark mode toggle.

### Variants
- Default: Horizontal links with logo on the left
- Mobile: Hamburger menu with slide-out drawer

### Props / Data
- Active section indicator (highlights current section on scroll)

### Layout
- Full-width sticky header, height 64px
- Left: logo/name, Center: section links, Right: dark mode toggle

### Notes
- Used on the Portfolio page (0001)

---

## 0003: Project Card

### Wireframe Type
Component

### Description
Card used in the Projects Gallery section displaying a project's thumbnail, title, tech stack tags, and short description.

### Variants
- Default: Thumbnail, title, tech tags, description
- Hover: Elevated shadow with overlay link

### Props / Data
- Project thumbnail image
- Project title
- Tech stack tags (e.g., React, TypeScript, Tailwind)
- Short description

### Layout
- Full-width within grid column, padding 16px
- Thumbnail on top, title and tags below, description at bottom

### Notes
- Used in the Portfolio page (0001) Projects Gallery section
- Click navigates to project detail (external link or modal)

---

## 0004: Contact Form

### Wireframe Type
Component

### Description
Contact form with input fields and a submit button for visitors to send messages.

### Variants
- Default: Empty form
- Validation error: Fields with red border and error messages
- Success: Confirmation message after submission

### Props / Data
- Name field, email field, message textarea

### Layout
- Single-column stacked fields, max-width 600px
- Submit button full-width below fields

### Notes
- Used in the Portfolio page (0001) Contact section
```

### Example 2: Multi-page application

```bash
/generate-spec docs/requirements.md multi
```

**Input** (`docs/requirements.md`):
```markdown
# Project Management Tool

## Overview
A web-based project management tool for small teams.

## Features
- User registration and login
- Create and manage projects
- Kanban board with drag-and-drop
- Team member assignment
- Due date tracking
- Activity feed
- User settings and profile
```

**Output** (`spec.md`):
```markdown
# Project Management Tool

## Overview
A web-based project management tool for small teams, featuring Kanban boards, team collaboration, and activity tracking.

## Screen Transition Diagram

```
+-------------------+                  +-------------------+
|                   |   Login success  |                   |
|  Login            | ---------------> |  Dashboard        |
|  (0001)           |                  |  (0002)           |
|                   |                  |                   |
+-------------------+                  +-------------------+
                                          |            |
                              Click       |            |  Click
                              project     |            |  "Settings"
                                          v            v
                                +---------------+  +-------------------+
                                |               |  |                   |
                                | Kanban Board  |  | User Settings     |
                                | (0003)        |  | (0005)            |
                                |               |  |                   |
                                +---------------+  +-------------------+
                                       |
                              Click    |
                              settings |
                                       v
                                +-------------------+
                                |                   |
                                | Project Settings  |
                                | (0004)            |
                                |                   |
                                +-------------------+

+-------------------------------------------------------+
|              Navigation Header (0006)                 |
|  Persistent across all authenticated pages (0002-0005)|
+-------------------------------------------------------+
```

### Transitions

| From | Action | To |
|---|---|---|
| Login (0001) | Successful login | Dashboard (0002) |
| Dashboard (0002) | Click project card | Kanban Board (0003) |
| Dashboard (0002) | Click user avatar / settings | User Settings (0005) |
| Kanban Board (0003) | Click board settings | Project Settings (0004) |
| Any authenticated page | Click logo / Dashboard nav | Dashboard (0002) |
| Any authenticated page | Click user dropdown > Settings | User Settings (0005) |
| Any authenticated page | Click user dropdown > Logout | Login (0001) |

## Wireframe Map
| ID | Wireframe Type | Name | Description |
|---|---|---|---|
| 0001 | Page | Login | User authentication with email/password |
| 0002 | Page | Dashboard | Project overview with recent activity and quick actions |
| 0003 | Page | Kanban Board | Drag-and-drop task board with To Do / In Progress / Done columns |
| 0004 | Page | Project Settings | Project configuration, member management, and permissions |
| 0005 | Page | User Settings | Profile editing, notification preferences, and account settings |
| 0006 | Component | Navigation Header | Top navigation bar with logo, menu, notifications, and user avatar |
| 0007 | Component | Task Card | Draggable card showing task title, assignee, due date, and priority |

---

## 0001: Login

### Wireframe Type
Page

### Sections
- **Header**: Application logo and name
- **Login Form**: Email input, password input, "Remember me" checkbox, submit button
- **Footer Links**: "Forgot password?" link, "Create account" link

### Layout
- Centered single-column form on all viewports
- Max-width: 400px, vertically centered

### Key Components
- Text input fields with labels and validation states
- Primary submit button
- Text links

### Notes
- Entry point for the application
- On success, navigates to Dashboard (0002)

---

## 0002: Dashboard

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0006)
- **Project List**: Cards showing project name, member count, task progress bar, and last activity
- **Recent Activity Feed**: Timeline of recent actions across all projects
- **Quick Actions**: Buttons for "New Project" and "New Task"

### Layout
- Single column stacked for mobile
- Two-column layout for desktop: project list (2/3) + activity feed (1/3)
- Contained content area (max-width: 1200px)

### Key Components
- Project summary cards with progress indicators
- Activity timeline entries
- Action buttons

### Notes
- Main landing page after login
- Each project card links to Kanban Board (0003)
- Navigation Header (0006) appears on this and all subsequent pages

---

## 0003: Kanban Board

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0006)
- **Board Header**: Project name, member avatars, filter/search controls
- **Kanban Columns**: Three columns (To Do, In Progress, Done) with draggable Task Cards (0007)
- **Add Task Button**: Floating action button or inline "+" per column

### Layout
- Horizontal scroll for columns on mobile
- Three fixed columns on desktop, each taking equal width
- Full-width below navigation

### Key Components
- Column containers with drop zones
- Task Card (Component 0007)
- Filter and search bar

### Notes
- Core feature of the application
- Navigated from Dashboard (0002) project cards
- Board Header links to Project Settings (0004)

---

(... remaining pages and components follow the same pattern ...)

---

## 0006: Navigation Header

### Wireframe Type
Component

### Description
Top navigation bar that appears on all authenticated pages (0002–0005).

### Variants
- Default: Full navigation with all items
- Mobile: Hamburger menu with slide-out drawer

### Props / Data
- Current user name and avatar
- Unread notification count
- Active page indicator

### Layout
- Full-width sticky header, height 64px
- Logo left, menu center, user controls right

### Notes
- Shared across all authenticated pages
- User dropdown contains links to User Settings (0005) and logout

---

## 0007: Task Card

### Wireframe Type
Component

### Description
Draggable card used within the Kanban Board (0003) columns.

### Variants
- Default: Title, assignee avatar, due date
- Expanded: Description preview, tags, comment count
- Overdue: Red border/badge when past due date

### Props / Data
- Task title, assignee avatar and name, due date, priority level, tag labels

### Layout
- Full-width within column, padding 12px
- Compact vertical stack of information

### Notes
- Used exclusively in Kanban Board (0003)
- Click opens task detail modal or page
```
