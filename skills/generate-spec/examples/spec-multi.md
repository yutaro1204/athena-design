# Online Learning Platform

## Overview
A web-based online learning platform where instructors can create and manage courses, and students can browse, enroll, and complete courses with video lessons, quizzes, and progress tracking. Includes an admin panel for platform management.

## Authorization

| Role | Description | Access Level |
|---|---|---|
| Student | Learners who browse and take courses | Course Catalog, Course Detail, Lesson Viewer, Quiz, My Learning, Profile Settings |
| Instructor | Course creators and managers | All Student pages + Instructor Dashboard, Course Editor |
| Admin | Platform administrators | All pages including Admin Panel |

- Students can only access courses they have enrolled in (free courses auto-enroll on click)
- Instructors can only edit their own courses
- Admins have full access to all courses, users, and platform settings

## Screen Transition Diagram

```
+-------------------+                  +-------------------+
|                   |   Login success  |                   |
|  Login            | ---------------> |  Course Catalog   |
|  (0001)           |                  |  (0002)           |
|                   |                  |                   |
+-------------------+                  +-------------------+
                                          |            |
                              Click       |            |  Click
                              course      |            |  "My Learning"
                                          v            v
                                +---------------+  +-------------------+
                                |               |  |                   |
                                | Course Detail |  | My Learning       |
                                | (0003)        |  | (0006)            |
                                |               |  |                   |
                                +-------+-------+  +-------------------+
                                        |
                               Enroll / |
                               Start    |
                                        v
                                +---------------+
                                |               |
                                | Lesson Viewer |
                                | (0004)        |
                                |               |
                                +-------+-------+
                                        |
                               Complete |
                               lesson   |
                                        v
                                +---------------+
                                |               |
                                | Quiz          |
                                | (0005)        |
                                |               |
                                +---------------+

+-------------------+     +-------------------+
|  Instructor       |     |  Course Editor    |
|  Dashboard (0007) | --> |  (0008)           |
+-------------------+     +-------------------+

+-------------------+     +-------------------+
|  Admin Panel      |     |  Profile Settings |
|  (0009)           |     |  (0010)           |
+-------------------+     +-------------------+

+-------------------------------------------------------+
|  Navigation Header (0011) + Sidebar (0012)            |
|  Persistent across all authenticated pages (0002-0010)|
+-------------------------------------------------------+
```

### Transitions

| From | Action | To |
|---|---|---|
| Login (0001) | Successful login | Course Catalog (0002) |
| Course Catalog (0002) | Click course card | Course Detail (0003) |
| Course Detail (0003) | Click "Enroll" or "Start Learning" | Lesson Viewer (0004) |
| Lesson Viewer (0004) | Complete lesson + quiz available | Quiz (0005) |
| Lesson Viewer (0004) | Click next/previous lesson | Lesson Viewer (0004) |
| Quiz (0005) | Submit quiz | Lesson Viewer (0004) next lesson or Course Detail (0003) if course complete |
| My Learning (0006) | Click enrolled course | Lesson Viewer (0004) resume |
| Instructor Dashboard (0007) | Click "Edit Course" | Course Editor (0008) |
| Instructor Dashboard (0007) | Click "New Course" | Course Editor (0008) |
| Sidebar (0012) | Click menu item | Any page (0002-0010) |
| Navigation Header (0011) | Click user dropdown > Profile | Profile Settings (0010) |
| Navigation Header (0011) | Click user dropdown > Logout | Login (0001) |

## Wireframe Map
| ID | Wireframe Type | Name | Description |
|---|---|---|---|
| 0001 | Page | Login | User authentication screen with email/password and social login options |
| 0002 | Page | Course Catalog | Browsable catalog of all available courses with search and category filters |
| 0003 | Page | Course Detail | Course overview with syllabus, instructor info, reviews, and enrollment action |
| 0004 | Page | Lesson Viewer | Video/content viewer with lesson navigation sidebar and progress tracking |
| 0005 | Page | Quiz | Interactive quiz with multiple question types and instant feedback |
| 0006 | Page | My Learning | Student's enrolled courses with progress indicators and resume links |
| 0007 | Page | Instructor Dashboard | Instructor's course management with enrollment stats and revenue overview |
| 0008 | Page | Course Editor | Course creation and editing with curriculum builder and content upload |
| 0009 | Page | Admin Panel | Platform administration with user management, course moderation, and analytics |
| 0010 | Page | Profile Settings | User profile editing, notification preferences, and account settings |
| 0011 | Component | Navigation Header | Top navigation bar with logo, search, notifications, and user menu |
| 0012 | Component | Sidebar | Side navigation with role-based menu items |
| 0013 | Component | Course Card | Card displaying course thumbnail, title, instructor, rating, and price |
| 0014 | Component | Data Table | General-purpose table with sorting, filtering, and pagination |

---

## 0001: Login

### Wireframe Type
Page

### Sections
- **Header**: Platform logo and name
- **Login Form**: Email input, password input, "Remember me" checkbox, login button
- **Social Login**: Google and GitHub OAuth buttons
- **Footer Links**: "Forgot password?" link, "Create account" link

### Layout
- Centered single-column form on all devices
- Form max-width: 400px, vertically centered
- Two-column on desktop: left side with branding illustration, right side with form

### Key Components
- Text input fields with labels and validation states
- Primary button (Login)
- Social login buttons with provider icons
- Text links

### Notes
- Application entry point
- On successful login, navigates to Course Catalog (0002)
- New users are directed to a registration flow (not separately wireframed)

---

## 0002: Course Catalog

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0011)
- **Sidebar**: (Component 0012)
- **Search and Filters**: Search bar, category dropdown, difficulty level filter (Beginner / Intermediate / Advanced), sort selector (Popular / Newest / Highest Rated / Price)
- **Featured Courses Banner**: Carousel of 3-4 featured/promoted courses with large images and CTAs
- **Course Grid**: Grid of Course Cards (Component 0013) showing all available courses
- **Pagination**: Page navigation at the bottom

### Layout
- Mobile: Single-column stack. Search bar full-width, filters collapsible, course cards in single column
- Desktop: Sidebar (240px) + main area. Search bar and filters in horizontal row, courses in 3-column grid
- Container max-width: 1280px, horizontal padding 24px

### Key Components
- Search bar with autocomplete suggestions
- Category filter chips
- Difficulty level badges
- Pagination controls

### Notes
- Main landing page after login
- Each Course Card (0013) links to Course Detail (0003)
- Navigation Header (0011) and Sidebar (0012) appear on this and all subsequent pages
- Visible to: All roles (Student, Instructor, Admin)

---

## 0003: Course Detail

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0011)
- **Sidebar**: (Component 0012)
- **Course Hero**: Large banner with course thumbnail, title, short description, instructor name/avatar, rating stars, enrollment count, and price
- **Action Bar**: "Enroll Now" / "Start Learning" / "Resume" button (depending on enrollment state), "Add to Wishlist" button
- **Course Description**: Full course description with learning objectives (bullet list)
- **Curriculum/Syllabus**: Expandable accordion of modules and lessons with duration and completion checkmarks for enrolled students
- **Instructor Profile**: Instructor avatar, bio, course count, and average rating
- **Reviews Section**: Average rating display, rating distribution bar chart, and individual review cards (avatar, name, rating, comment, date)

### Layout
- Mobile: Single-column stack, hero image full-width, accordion sections
- Desktop: Two-column layout — main content (2/3: hero, description, curriculum, reviews) + sidebar panel (1/3: action bar, instructor profile, course stats)
- Container max-width: 1280px

### Key Components
- Star rating display (read-only and interactive for review submission)
- Expandable accordion (modules with nested lessons)
- Review cards
- Enrollment state button (context-dependent label)

### Notes
- Navigated from Course Catalog (0002) course cards
- "Start Learning" button navigates to Lesson Viewer (0004) at the first lesson
- "Resume" button (for enrolled students) navigates to Lesson Viewer (0004) at last incomplete lesson
- Visible to: All roles

---

## 0004: Lesson Viewer

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0011)
- **Lesson Sidebar**: Collapsible sidebar listing all modules and lessons with completion status icons, current lesson highlighted
- **Content Area**: Video player (for video lessons) or rich text content (for text lessons), with auto-advance to next lesson
- **Lesson Info Bar**: Lesson title, module name breadcrumb, progress bar showing completion within module
- **Notes Section**: Personal notes textarea for the student to save per-lesson notes
- **Navigation Controls**: "Previous Lesson" and "Next Lesson" buttons, "Mark as Complete" button

### Layout
- Mobile: Full-width content area, lesson sidebar hidden (accessible via toggle button), navigation controls fixed at bottom
- Desktop: Lesson sidebar (280px) on the left, content area taking remaining width, navigation controls below content
- Video player maintains 16:9 aspect ratio

### Key Components
- Video player with playback controls (play/pause, speed, fullscreen, subtitles)
- Lesson completion checkmark icons
- Progress bar (module-level)
- Personal notes textarea with auto-save

### Notes
- Core learning experience of the platform
- Navigated from Course Detail (0003) enrollment/resume action
- On lesson completion, if quiz is available, navigates to Quiz (0005)
- If no quiz, auto-advances to next lesson or shows course completion screen
- Visible to: Enrolled students, Instructors (preview mode), Admin

---

## 0005: Quiz

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0011)
- **Quiz Header**: Quiz title, associated lesson/module name, question count, time limit (if applicable)
- **Question Area**: Question text with answer options. Supports multiple choice (radio), multi-select (checkbox), and true/false question types
- **Progress Indicator**: "Question X of Y" with progress bar
- **Navigation Controls**: "Previous" and "Next" buttons, "Submit Quiz" button on last question
- **Results Screen**: Score display, pass/fail status, correct answers review, "Continue to Next Lesson" button

### Layout
- Mobile: Single-column centered, full-width question cards
- Desktop: Centered content area (max-width: 800px), generous whitespace for readability
- Results screen: centered score card with answer review below

### Key Components
- Radio button groups (single choice)
- Checkbox groups (multi-select)
- Progress bar
- Score display with pass/fail indicator
- Answer review cards (correct/incorrect highlighting)

### Notes
- Navigated from Lesson Viewer (0004) after completing a lesson with an associated quiz
- On quiz completion, navigates to Lesson Viewer (0004) for the next lesson, or Course Detail (0003) if course is complete
- Passing threshold is configured per quiz by the instructor
- Visible to: Enrolled students, Instructors (preview mode), Admin

---

## 0006: My Learning

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0011)
- **Sidebar**: (Component 0012)
- **Tab Switcher**: "In Progress" / "Completed" / "Wishlist" tabs
- **Course Progress Cards**: Grid of enrolled courses showing thumbnail, title, instructor, progress bar (percentage), and "Resume" button
- **Completed Courses**: Grid of completed courses with completion date and certificate download link
- **Wishlist**: Grid of wishlisted Course Cards (Component 0013) with "Enroll" button

### Layout
- Mobile: Single-column stack, tabs as horizontal scroll, course cards full-width
- Desktop: Sidebar (240px) + main area. Tabs as horizontal bar, courses in 3-column grid
- Container max-width: 1280px

### Key Components
- Progress bar (percentage complete per course)
- Tab component
- Certificate download button
- "Resume" action button

### Notes
- Student's personal learning hub
- "Resume" button navigates to Lesson Viewer (0004) at last incomplete lesson
- Visible to: Student, Instructor (their enrolled courses), Admin

---

## 0007: Instructor Dashboard

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0011)
- **Sidebar**: (Component 0012)
- **Stats Summary**: Four metric cards — total courses, total students, average rating, total revenue
- **My Courses Table**: Data Table (Component 0014) listing instructor's courses with columns: title, status (Draft / Published / Archived), enrolled students, average rating, revenue
- **Recent Enrollments**: List of recent student enrollments with student name, course name, and enrollment date
- **Action Bar**: "Create New Course" button

### Layout
- Mobile: Single-column stack, metric cards in 2x2 grid, table with horizontal scroll
- Desktop: Sidebar (240px) + main area. Metric cards in 4-column row, then full-width courses table, recent enrollments in side panel (1/3)
- Container max-width: 1280px

### Key Components
- Metric summary cards (count + trend indicator)
- Status badges (Draft / Published / Archived)
- "Create New Course" primary action button

### Notes
- Visible to: Instructor, Admin
- "Edit Course" action in table navigates to Course Editor (0008)
- "Create New Course" navigates to Course Editor (0008) with empty form
- Admin sees all instructors' courses with an instructor filter

---

## 0008: Course Editor

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0011)
- **Sidebar**: (Component 0012)
- **Course Info Form**: Title, description (rich text editor), category dropdown, difficulty level selector, price input, thumbnail upload
- **Curriculum Builder**: Drag-and-drop list of modules, each containing an ordered list of lessons. "Add Module" and "Add Lesson" buttons. Each lesson item shows type (video/text/quiz), title, and duration
- **Lesson Editor Panel**: Side panel or modal for editing a specific lesson — content upload (video file or rich text), quiz builder (add questions with answer options and correct answer marking)
- **Publishing Controls**: Save draft, preview, and publish buttons. Status indicator (Draft / Published)

### Layout
- Mobile: Single-column stack, curriculum as vertical accordion, lesson editor as full-screen modal
- Desktop: Two-column layout — left (2/3): course info form + curriculum builder, right (1/3): lesson editor panel (contextual)
- Container max-width: 1280px

### Key Components
- Rich text editor
- File upload (video, images, thumbnail)
- Drag-and-drop sortable list (modules and lessons)
- Quiz builder (question + options + correct answer)
- Status toggle (Draft / Published)

### Notes
- Navigated from Instructor Dashboard (0007)
- Supports saving drafts and publishing
- Visible to: Instructor (own courses only), Admin (all courses)
- Instructors can only edit courses they own; Admin can edit any course

---

## 0009: Admin Panel

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0011)
- **Sidebar**: (Component 0012)
- **Sub-Tab Navigation**: Users / Courses / Categories / Platform Settings
- **[Sub-Tab: Users] User List Table**: Data Table (Component 0014) with columns: name, email, role, status (Active / Suspended), join date. Includes role change dropdown and suspend/activate toggle
- **[Sub-Tab: Courses] Course Moderation Table**: Data Table (Component 0014) with columns: title, instructor, status, enrolled students, rating, reported count. Includes approve/reject/remove actions
- **[Sub-Tab: Categories] Category Management**: CRUD list of course categories with name, description, icon, and display order (drag-and-drop)
- **[Sub-Tab: Platform Settings] Configuration Form**: Platform name, logo upload, default currency, enrollment policies, email templates

### Layout
- Mobile: Sub-tabs as horizontal scroll, tables with horizontal scroll, forms in single column
- Desktop: Sidebar (240px) + main area. Sub-tabs as horizontal bar, full-width tables and forms
- Container max-width: 1280px

### Key Components
- Sub-tab component
- Role selector dropdown
- Status toggle (Active / Suspended)
- Drag-and-drop sortable list (categories)
- Configuration form with sections

### Notes
- Accessible only to Admin role
- User management includes ability to change roles and suspend accounts
- Course moderation handles reported or flagged content

---

## 0010: Profile Settings

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0011)
- **Sidebar**: (Component 0012)
- **Profile Info Form**: Avatar upload, display name, bio, email (read-only), timezone selector
- **Password Change**: Current password, new password, confirm password fields with strength indicator
- **Notification Preferences**: Toggle switches for email notifications per event type (new enrollment, course update, quiz results, marketing)
- **Account Actions**: "Delete Account" button with confirmation dialog

### Layout
- Mobile: Single-column stack, full-width forms
- Desktop: Sidebar (240px) + centered form area (max-width: 600px)
- Container max-width: 1280px

### Key Components
- Avatar upload with preview
- Password strength indicator
- Toggle switches
- Danger zone section (delete account)

### Notes
- Accessible to all authenticated users
- Navigated from Navigation Header (0011) user dropdown
- Email field is read-only (changed through separate verification flow)

---

## 0011: Navigation Header

### Wireframe Type
Component

### Description
Global navigation bar displayed on all authenticated pages (0002-0010). Contains the platform logo, search bar, notification bell, and user avatar with dropdown menu.

### Variants
- Default: Full navigation with all items
- Mobile: Hamburger menu + slide-out drawer

### Props / Data
- Current user name, avatar, and role
- Unread notification count
- Search query

### Layout
- Full-width sticky header, height 64px
- Left: logo, Center: search bar, Right: notification bell + user avatar
- Mobile: logo on left, hamburger menu on right

### Notes
- Shared across all authenticated pages
- User dropdown includes links to Profile Settings (0010) and logout
- Search bar searches courses globally
- Notification bell shows enrollment confirmations, quiz results, and system announcements

---

## 0012: Sidebar

### Wireframe Type
Component

### Description
Side navigation for page transitions. Displayed on all authenticated pages (0002-0010), providing links to major features. Menu items are role-dependent.

### Variants
- Expanded: Icon + text label (width 240px)
- Collapsed: Icon only (width 64px)
- Mobile: Hidden (expanded from Navigation Header hamburger menu)
- Student: Shows Catalog, My Learning, Profile
- Instructor: Shows Catalog, My Learning, Instructor Dashboard, Profile
- Admin: Shows all items including Admin Panel

### Props / Data
- Menu items: Course Catalog / My Learning / Instructor Dashboard / Admin Panel / Profile Settings
- Current active page
- User role (controls menu item visibility)

### Layout
- Desktop: Fixed on the left, positioned to the left of main content
- Mobile: Overlay drawer

### Notes
- Shared across all authenticated pages
- Includes collapse toggle button
- Active page highlighting
- Role-based menu filtering: Instructor Dashboard visible to Instructor and Admin only; Admin Panel visible to Admin only

---

## 0013: Course Card

### Wireframe Type
Component

### Description
Card used to display a course in grid layouts. Shows the course thumbnail, title, instructor name, star rating, enrollment count, and price. Used in Course Catalog (0002), My Learning (0006), and Instructor Dashboard (0007).

### Variants
- Default: Thumbnail, title, instructor, rating, price
- Enrolled: Adds progress bar and "Resume" button (used in My Learning)
- Instructor: Adds status badge and "Edit" link (used in Instructor Dashboard)

### Props / Data
- Course thumbnail image
- Course title
- Instructor name
- Average rating (stars)
- Enrollment count
- Price (or "Free" badge)
- Progress percentage (for enrolled variant)
- Status (for instructor variant)

### Layout
- Full-width within grid column, padding 16px
- Thumbnail on top (16:9 ratio), content below (title, instructor, rating row, price)

### Notes
- Used in Course Catalog (0002), My Learning (0006), and Instructor Dashboard (0007)
- Click navigates to Course Detail (0003)
- Hover state: subtle elevation/shadow

---

## 0014: Data Table

### Wireframe Type
Component

### Description
General-purpose data table component used across instructor and admin pages. Features sorting, filtering, pagination, and action buttons per row. Used in Instructor Dashboard (0007), Course Editor (0008), and Admin Panel (0009).

### Variants
- Read-only: Standard table (Instructor Dashboard course list)
- Actionable: Row-level action buttons — edit, delete, approve/reject (Admin Panel)
- Inline editing: Dropdown selectors within cells (Admin Panel role change)

### Props / Data
- Column definitions (header name, data type, sortable flag, filterable flag)
- Row data array
- Action button definitions per row
- Page size

### Layout
- Full-width, horizontal scroll support (mobile)
- Sticky header (on vertical scroll)
- Pagination bar at bottom

### Notes
- Supports row-level actions (edit, delete, status change)
- Includes search/filter input above the table
- CSV export option for admin reports
