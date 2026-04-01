**Add your own guidelines here**

<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->

# Bhago Mobility — Super Admin Web UI Guidelines

Next.js + shadcn + Figma System Guide
Version: MVP v2
Theme: Light Mode

This document defines the UI and design system guidelines for the Bhago Mobility Super Admin dashboard.  
It is intended for Figma design generation and Next.js + shadcn implementation alignment.

The interface is an operations and governance dashboard — not a marketing or consumer UI.

Design must emphasize clarity, speed, and structured data workflows.

---

# 1. Product Context

Bhago Mobility Super Admin is a governance and operations dashboard used to manage:

- Users
- Roles & Permissions (RBAC)
- Hubs
- Vehicles & Fleet Registry
- Staff mapping
- Downtime & approvals
- Notifications
- System configuration

UI must prioritize:

- Fast scanning
- Data density
- Table + form workflows
- Operational clarity
- Low visual noise
- Reusable components
- Predictable interaction patterns

Tone: Professional, efficient, reliable, infrastructure-grade.

---

# 2. Platform Target

Design responsive web layouts usable across desktop, laptop, tablet, and smaller screens.

Primary focus:

- Desktop-first structure
- Responsive behavior supported
- Layout adapts without breaking hierarchy
- Sidebar can collapse on smaller widths
- Tables may become scrollable horizontally

---

# 3. Brand Expression in UI

Brand personality to reflect:

- Electric mobility
- Reliability
- Operational control
- Sustainability
- Productivity enablement

UI should feel:

- Clean
- Structured
- Confident
- Minimal
- Functional

Avoid playful or consumer-app visual language.

---

# 4. Layout Rules

## Main Layout

- Fixed left sidebar navigation
- Top header bar
- Scrollable main content area
- Max content width: 1200–1320px
- Sidebar width: ~240px
- Collapsed sidebar: icon-only mode
- Top bar height: ~64px

## Grid

- 12 column grid
- 24px margins
- 24px gutters
- Cards align to grid
- Tables may extend full width

---

# 5. Spacing System (4px Base)

Use strict spacing scale:

4  
8  
12  
16  
20  
24  
32  
40  
48

Match Tailwind spacing tokens wherever possible.

No arbitrary spacing values.

---

# 6. Typography

Font family: **Inter**

Readable, neutral, system-friendly.

## Type Scale

Page title → 24px semibold  
Section title → 18px semibold  
Card title → 16px medium  
Body → 14px regular  
Table text → 13–14px  
Helper text → 12px muted

Avoid oversized headings and decorative fonts.

---

# 7. Color Theme — Light Only

Create Figma color styles using these exact tokens.

## Base Colors

White → #FFFFFF  
Primary background

Light_bg → #F7F9FC  
Cards, table headers, hover zones

Dark → #111111  
Primary text

Gray → #6B7280  
Secondary text

Input_border → #E5E7EB  
Borders and dividers

Divider_soft → #F1F5F9  
Soft separators

---

## Brand Colors

Primary → #F24E1E  
Primary buttons, active nav, focus, links

Primary_hover → #D84315  
Primary button hover

Primary_soft → #FFF1EC  
Selected row / soft highlight background

Primary_Gradient → #F24E1E → #FF7A45  
Use only for KPI highlight cards — never for forms or tables

---

# 8. Semantic Status Colors

Success → #16A34A  
Warning → #F59E0B  
Error → #DC2626  
Info → #2563EB

Used for:

- Status badges
- Approval states
- Alerts
- Tags
- Operational signals

Status must include icon + label — not color alone.

---

# 9. Component Styling (shadcn Alignment)

Design components to map directly to shadcn primitives.

## Buttons

Height: 40px  
Radius: 8px

Primary → filled Primary  
Secondary → white + border  
Outline → border only  
Ghost → text + hover bg

No gradient buttons.

---

## Inputs

Height: 40px  
Radius: 8px  
Border: Input_border  
Background: white  
Focus ring: Primary color glow  
Label always visible above field

---

## Cards

Background: white  
Radius: 12px  
Border: 1px Input_border

Shadow subtle only:

0 1px 2px rgba(0,0,0,0.04)

No heavy shadows.

---

## Tables

Tables are primary admin components.

Rules:

- Header bg → Light_bg
- Row hover → soft gray
- Row height → 44–48px
- Numeric columns right-aligned
- Actions column right-aligned
- Status shown as badges
- Filters above table
- Pagination below table

---

# 10. Navigation Rules

Sidebar navigation supports:

- Icons + labels
- Expandable parent groups
- Nested sub-menus
- Chevron indicators
- Active state highlight
- Collapsible sidebar mode

Bottom sidebar block includes:

- Logged-in user name
- Avatar circle
- Role label (optional)
- Logout action

---

# 11. Icons

Use line-style icons (Lucide style).

- Thin stroke
- Size: 18–20px
- Consistent family
- No filled icon sets

---

# 12. Interaction States

All interactive elements must include:

- default
- hover
- active
- focus
- disabled
- error

Focus states must be visible and consistent.

---

# 13. Density Mode

Admin UI is moderately dense.

- Compact paddings preferred
- Avoid oversized cards
- Avoid tall rows
- Show more data per screen
- Support compact table variant

---

# 14. Accessibility

- Maintain WCAG AA contrast
- Text never below 12px
- Buttons never below 13px text
- Do not rely on color alone for meaning
- Use labels + icons

---

# 15. Avoid

Do NOT use:

- Glassmorphism
- Heavy gradients
- Neumorphism
- Cartoon styling
- Decorative illustrations
- Marketing hero layouts
- Oversized rounded blobs
- Fancy animation-heavy UI

This is an operations dashboard.

---

# 16. Build Compatibility

Design must map directly to:

- Next.js layout system
- shadcn components
- Tailwind spacing
- Data tables
- Dialogs
- Forms
- RBAC-driven screens

Prefer reusable component patterns over custom visuals.