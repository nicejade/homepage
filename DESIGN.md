# DESIGN.md

> Project Design System & Anti-Slop Rules  
> This file is the primary source of truth for visual design decisions in this project.  
> All AI agents and developers MUST read and follow these rules before implementing or modifying UI.

---

# 0. Core Philosophy

## Design before implementation

Do not start by writing components.

Before designing or modifying a page, first understand:

- What kind of page is this?
- Who is the target audience?
- What is the primary user action?
- What emotional impression should the interface create?
- What level of visual density is appropriate?
- How much motion is actually useful?
- What visual patterns would feel generic or AI-generated?

Every page must have an intentional design direction.

Do not default to:

- Purple gradients
- Centered hero + three cards
- Generic SaaS layouts
- Random glassmorphism
- Bento grids without structural purpose
- Fake dashboards
- Decorative UI noise

The goal is not to make the interface look "AI-designed".

The goal is to make the interface feel deliberately art-directed.

---

# 1. Design Read Before Coding

Before implementing a new page or major section, declare a concise design read.

Use this format:

```text
Design Read:
[One sentence describing the intended visual direction.]

DESIGN_VARIANCE: X/10
Reason: ...

MOTION_INTENSITY: X/10
Reason: ...

VISUAL_DENSITY: X/10
Reason: ...
```

Example:

```text
Design Read:
A calm editorial product interface with strong typography, generous whitespace,
restrained color, and subtle interaction feedback.

DESIGN_VARIANCE: 7/10
Reason: Avoid repetitive SaaS card layouts and use asymmetric compositions.

MOTION_INTENSITY: 3/10
Reason: Motion should support hierarchy rather than become the visual identity.

VISUAL_DENSITY: 4/10
Reason: The product benefits from focus, breathing room, and clear scanning.
```

These three parameters must influence the actual implementation.

Never declare a high value without expressing it visually.

---

# 2. Brief → Design Direction

Infer the design direction from the actual product and context.

Consider:

## Product

What is being designed?

Examples:

- Developer tool
- Financial product
- Knowledge platform
- AI product
- Portfolio
- Editorial site
- Consumer application
- Productivity software
- Gaming product
- Documentation

## Audience

Who is using it?

Avoid vague descriptions such as:

```text
Everyone
Developers
Businesses
```

Prefer concrete descriptions:

```text
Independent developers building AI tools
Design-conscious founders
Financially literate long-term investors
Professional engineers who prefer dense information
Casual users seeking a calm experience
```

## Desired feeling

Translate adjectives into visual decisions.

Examples:

| Desired feeling | Design implication |
| --- | --- |
| Minimal | Strong whitespace, fewer elements, restrained decoration |
| Editorial | Typography-led hierarchy, asymmetric composition |
| Premium | Controlled spacing, fewer colors, high-quality imagery |
| Technical | Dense information, structured hierarchy, precise alignment |
| Playful | Expressive shapes, stronger interaction, visual surprises |
| Brutalist | Raw structure, sharp contrast, unapologetic typography |
| Calm | Soft contrast, generous spacing, restrained motion |
| Experimental | Higher layout variance and stronger visual concepts |

Never treat adjectives as decoration.

They must affect:

- Typography
- Layout
- Color
- Spacing
- Motion
- Imagery
- Component structure

---

# 3. Design System Selection

Do not recreate a design system when an established one is clearly appropriate.

When the brief explicitly references a system or ecosystem, prefer its official implementation or visual language.

Possible systems include:

- Material
- Fluent
- Carbon
- Polaris
- Atlassian
- Primer
- GOV.UK
- USWDS
- Bootstrap
- Radix
- shadcn/ui
- Tailwind UI patterns

If the reference is purely aesthetic, describe the result honestly as:

```text
Visual approximation inspired by [reference]
```

Do not claim that a UI follows an official design system unless it actually does.

---

# 4. Visual Locks

Every page must establish and preserve three locks.

## 4.1 Color Consistency Lock

Choose one primary accent strategy.

The page must not randomly introduce new accent colors in later sections.

Good:

```text
Neutral base
+
One dominant accent
+
Optional semantic colors
```

Avoid:

```text
Blue hero
Purple cards
Green CTA
Orange footer
```

Use additional colors only when they communicate semantic meaning.

Examples:

- Success
- Warning
- Error
- Financial gain/loss
- Status

Decoration alone is not sufficient justification.

---

## 4.2 Shape Consistency Lock

Choose a consistent corner-radius system.

Examples:

### Sharp

```text
0px to 4px
```

### Controlled

```text
8px to 12px
```

### Soft

```text
16px to 24px
```

### Pill-based

Use intentionally for compact controls and tags.

Do not mix:

```text
Sharp navigation
24px cards
999px buttons
Random circular panels
```

unless the contrast is intentional and documented.

---

## 4.3 Page Theme Lock

Choose the page-level theme intentionally:

```text
light
dark
auto
```

Do not randomly switch between light and dark sections unless the contrast itself serves a clear structural purpose.

Theme changes must feel architectural, not decorative.

---

# 5. Layout Principles

## Avoid repetitive section structures

A long page must not repeat:

```text
Heading
Paragraph
Three equal cards
```

for every section.

For substantial pages, intentionally vary layout families.

Use combinations such as:

1. Editorial split layout
2. Asymmetric grid
3. Sticky content stack
4. Horizontal narrative
5. Large visual statement
6. Comparison layout
7. Timeline
8. Alternating zig-zag
9. Full-width feature
10. Dense information module
11. Scroll-pinned storytelling

For pages with 8+ major sections:

```text
Use at least 4 distinct layout families.
```

---

## Avoid symmetry by default

Symmetry is useful, but excessive symmetry creates generic output.

Prefer visual tension where appropriate:

- 40/60 columns
- 30/70 columns
- Large content beside compact metadata
- Offset imagery
- Unequal card sizes
- One dominant element with supporting elements

Do not create asymmetry randomly.

The visual weight must still feel balanced.

---

## Bento rule

Use Bento grids only when the information naturally benefits from modular scanning.

If there are N pieces of content:

```text
N meaningful items = N meaningful cells
```

Do not add empty cells merely to make a grid look fashionable.

Every cell must communicate something useful.

---

# 6. Hero Discipline

The hero must communicate immediately.

## Headline

Desktop maximum:

```text
2 lines
```

Avoid headlines that wrap into 3 or 4 weak lines.

## Supporting text

Default maximum:

```text
20 words
4 lines
```

Write with compression.

Do not explain the entire product in the hero.

## Primary CTA

The primary action must be visible without scrolling.

## Navigation

Desktop navigation should:

- Stay on one line
- Remain compact
- Avoid excessive menu items
- Usually remain within 80px height

## Hero priority

The hero should establish:

```text
What is this?
Why should I care?
What should I do next?
```

Anything else is secondary.

---

# 7. Typography

Typography is structure, not decoration.

## Hierarchy

Every page should have a clear distinction between:

```text
Display
H1
H2
H3
Body
Small text
Metadata
```

Avoid arbitrary font-size jumps.

Use a deliberate scale.

## Headlines

Headlines should carry visual weight through:

- Size
- Weight
- Width
- Line-height
- Letter spacing

Do not rely on:

- Gradients
- Random colored words
- Excessive italics
- Multiple font families

to make headlines interesting.

## Body text

Optimize for reading.

Prefer:

- Comfortable line-height
- Reasonable line length
- Clear paragraph spacing
- Strong contrast

Avoid:

- Extremely wide paragraphs
- Tiny low-contrast text
- Long blocks without structure

## Italics

If using italic typography, ensure enough vertical clearance for descenders.

Do not allow glyphs to appear visually clipped.

---

# 8. Spacing and Density

Spacing should communicate hierarchy.

Use more space to separate:

- Major sections
- Major concepts
- Primary groups

Use less space to separate:

- Closely related controls
- Labels and values
- Items inside a component

Do not use identical spacing everywhere.

A page where every gap is `24px` often feels mechanically generated.

Think in spacing relationships:

```text
4
8
12
16
24
32
48
64
96
128
```

The exact scale may vary by project.

Consistency matters more than any specific number.

---

# 9. Motion Principles

Motion must serve a purpose.

Possible purposes:

- Reveal hierarchy
- Explain spatial relationships
- Provide interaction feedback
- Create continuity
- Direct attention
- Show state changes

Do not add animation simply because animation is available.

## Motion intensity

### 0 to 2

Minimal.

Use:

- Hover
- Focus
- Small transitions

### 3 to 4

Subtle narrative motion.

Use:

- Section reveals
- Controlled transitions
- Occasional emphasis

### 5 to 7

Motion becomes part of the experience.

Use:

- Scroll storytelling
- Sticky sequences
- Layered transitions
- Horizontal narratives

### 8 to 10

Highly expressive.

Only appropriate when the product or brand justifies it.

High motion requires strong art direction.

---

## Implementation rules

Do not implement scroll behavior with raw:

```js
window.addEventListener('scroll')
```

Prefer appropriate mechanisms such as:

- IntersectionObserver
- CSS scroll-driven animations
- Motion
- GSAP ScrollTrigger

Do not run unnecessary animation loops.

Do not continuously update application state from scroll position unless absolutely necessary.

---

## Reduced motion

When motion is significant:

```text
MOTION_INTENSITY > 3
```

a reduced-motion experience must be supported.

Respect:

```css
prefers-reduced-motion
```

The interface should remain fully understandable without animation.

---

# 10. Anti-Slop Rules

The following patterns are banned by default.

Use them only when the product specifically requires them.

## 10.1 Generic feature rows

Avoid:

```text
Three equal cards
Icon
Heading
Two lines of copy
```

repeated across the page.

Prefer:

- Asymmetric layouts
- Editorial sequences
- Zig-zag composition
- Different card sizes
- Interactive comparisons
- Horizontal narratives

---

## 10.2 AI gradients

Avoid default:

- Purple gradients
- Blue-purple gradients
- Mesh blobs
- Random glowing backgrounds

Prefer:

```text
Neutral base
+
One intentional accent
```

Use gradients only when they belong to the brand or concept.

---

## 10.3 Fake product screenshots

Do not create fake dashboards using dozens of styled `<div>` elements.

If the page needs to show the actual product:

1. Use a real screenshot
2. Use an approved mockup
3. Use a generated visual reference when appropriate

Fake UI is especially discouraged when pretending to demonstrate a real product.

---

## 10.4 Decorative SVG illustrations

Do not default to hand-drawn SVG blobs or random abstract illustrations.

Use custom SVG only when:

- It is part of the brand system
- It represents a real concept
- The brief explicitly requires it
- A simple geometric mark is needed

For icons, use a consistent icon library already established by the project.

Do not mix multiple icon families casually.

---

## 10.5 Section-numbering decoration

Avoid meaningless labels such as:

```text
00 / INTRO
01 · FEATURES
002 / SYSTEM
```

Use plain, meaningful labels instead.

Good:

```text
How it works
Built for teams
Why it matters
```

---

## 10.6 Decorative status information

Avoid decorative:

```text
● ONLINE
Lisbon 14:23
18°C
Last sync 4s ago
Build 0048
```

unless the information has real semantic value.

Status should communicate actual state.

---

## 10.7 Scroll cues

Do not add:

```text
Scroll
Scroll to explore
↓
```

by default.

Users understand that pages scroll.

Use a scroll affordance only when the interaction model genuinely requires it.

---

## 10.8 Pills on images

Do not overlay random pills, tags, or floating labels on imagery.

Prefer:

- Caption below
- Metadata beside
- Explicit annotation when necessary

---

## 10.9 Version labels as decoration

Avoid hero labels such as:

```text
V0.6
BETA
BUILD 0048
INVITE ONLY
```

unless the page is explicitly about a product launch, release, or experimental program.

---

## 10.10 Decorative text strips

Avoid:

```text
DESIGN. MOTION. SYSTEM.
TYPE / FORM / SPACE
BUILD. SHIP. SCALE.
```

when they exist only to fill visual space.

Text should communicate.

Do not use typography as meaningless wallpaper.

---

## 10.11 Excessive borders

Avoid placing:

```text
border-top
+
border-bottom
```

on every row of a long list.

For long information structures, consider:

- Cards
- Tabs
- Grouped sections
- Scroll-snap
- Carousel
- Expandable groups
- Stronger whitespace hierarchy

---

# 11. Dark Mode

Dark mode must not be an inverted afterthought.

## Use off-black

Avoid pure:

```text
#000000
```

as the default page background.

Prefer a carefully selected near-black.

## Use off-white

Avoid pure:

```text
#FFFFFF
```

for every large light surface.

Prefer subtle neutral whites where appropriate.

## Hierarchy parity

The information hierarchy must remain clear in both themes.

Do not simply invert colors.

Check:

- Headline prominence
- Secondary text
- Borders
- Interactive states
- Cards
- Shadows
- Images
- Brand accent

Maintain WCAG AA contrast where applicable.

---

# 12. Component Design

Components should represent meaningful interface patterns.

Avoid creating components only because the code is becoming repetitive.

Good candidates:

```text
PageHeader
FeatureHighlight
PricingComparison
DataMetric
SectionIntro
MediaCard
ContentRail
NavigationMenu
```

Weak candidates:

```text
BlueBox
FancyCard
SectionTwo
GradientThing
LeftComponent
```

Name components by their purpose.

---

## Component consistency

For repeated component families, standardize:

- Padding
- Radius
- Typography
- Hover behavior
- Focus behavior
- Shadow behavior
- Border behavior

Do not create multiple nearly identical visual systems on the same page.

---

# 13. Real Content First

Use real content whenever possible.

Avoid:

```text
Lorem ipsum
Feature title
Amazing description
John Doe
Company Name
```

If real content is unavailable, create believable content that matches the product.

Do not leave placeholders in completed UI.

Before shipping, search for:

```text
TODO
FIXME
Lorem
Placeholder
Coming soon
...
```

Remove anything not intentionally part of the product.

---

# 14. Existing Project Redesign Protocol

When redesigning an existing project, audit before changing.

## Step 1: Audit

Identify:

### Brand

- Primary colors
- Accent colors
- Typography
- Logo treatment
- Radius system

### Information architecture

- URL structure
- Navigation labels
- Page hierarchy
- Conversion paths
- Important anchors

### Preserve

Identify recognizable patterns worth keeping.

Examples:

- Signature interaction
- Distinctive hero
- Existing copy voice
- Product-specific visual pattern

### Retire

Identify:

- Generic layouts
- Broken hierarchy
- Repeated patterns
- Dead interactions
- Visual noise
- AI slop

### SEO baseline

Identify elements that should not silently change:

- URLs
- Titles
- Headings
- Anchors
- Structured content
- Important keywords

---

## Step 2: Choose a redesign mode

Choose one:

```text
PRESERVE
OVERHAUL
GREENFIELD_WITH_CONTENT_PRESERVED
```

### PRESERVE

Keep the existing visual identity.

Modernize implementation and details.

### OVERHAUL

Keep the product and content.

Significantly change the visual system.

### GREENFIELD_WITH_CONTENT_PRESERVED

Treat the project as a new design while preserving important information architecture and content constraints.

---

## Step 3: Never silently change

Do not change the following without explicit approval:

- URL structure
- Primary navigation labels
- Form field names
- Brand logo
- Legal copy
- SEO-critical anchors

---

# 15. Page Construction Strategy

For substantial pages, construct the experience as a sequence.

Do not think:

```text
Hero
Features
Features
Features
CTA
Footer
```

Think:

```text
Attention
→ Understanding
→ Evidence
→ Exploration
→ Deepening
→ Differentiation
→ Conversion
```

Each section should have a job.

Before adding a section, ask:

```text
What new understanding does this section create?
```

If the answer is unclear, remove or merge it.

---

# 16. Imagery

Images must have a purpose.

Use imagery to provide:

- Product evidence
- Atmosphere
- Scale
- Human context
- Conceptual understanding
- Brand personality

Do not add stock imagery merely to fill empty space.

If an image is decorative, it should still strengthen the art direction.

Never use:

- Watermarked images
- Low-quality screenshots
- Duplicate visuals
- Random unrelated stock photos

---

# 17. Accessibility

Every finished interface must support:

- Keyboard navigation
- Visible focus states
- Sufficient contrast
- Meaningful labels
- Semantic HTML
- Accessible form controls
- Reduced motion where needed

Do not sacrifice usability for visual minimalism.

Minimal does not mean invisible.

---

# 18. Responsive Design

Do not design desktop first and simply shrink everything.

Reconsider the hierarchy for smaller screens.

Ask:

- What can be removed?
- What can stack?
- What can become horizontally scrollable?
- What interaction needs simplification?
- What information should appear earlier?

Avoid blindly converting every desktop grid into:

```text
One
Card
Per
Row
```

Sometimes the correct mobile design is structurally different.

---

# 19. Pre-Flight Check

Before considering UI work complete, verify every item.

## Design Direction

- [ ] A clear design direction exists
- [ ] The three design parameters were intentionally chosen
- [ ] The final UI reflects those parameters
- [ ] The design does not default to generic AI patterns

## Consistency

- [ ] Accent color strategy is consistent
- [ ] Radius system is consistent
- [ ] Theme is coherent
- [ ] Typography hierarchy is clear
- [ ] Spacing relationships are consistent

## Layout

- [ ] Major sections do not repeat the same layout mechanically
- [ ] Bento grids have no meaningless empty cells
- [ ] Every major section has a clear purpose
- [ ] Visual density matches the product

## Hero

- [ ] Headline fits within 2 lines on desktop
- [ ] Supporting copy is concise
- [ ] Primary CTA is visible without scrolling
- [ ] Navigation remains compact

## Anti-Slop

- [ ] No default purple or mesh gradient
- [ ] No repetitive three-equal-card sections
- [ ] No fake product UI built from decorative divs
- [ ] No meaningless section numbers
- [ ] No decorative status dots
- [ ] No unnecessary scroll cues
- [ ] No decorative version labels
- [ ] No meaningless typography strips
- [ ] No random pills over images

## Motion

- [ ] Motion supports understanding or feedback
- [ ] Motion intensity matches the declared value
- [ ] No unnecessary scroll listeners
- [ ] Reduced motion is supported when significant animation exists

## Quality

- [ ] No placeholder content remains
- [ ] No broken layout at common breakpoints
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Contrast is sufficient
- [ ] Images are intentional and high quality

If a critical item fails:

```text
Do not mark the work as complete.
Fix it first.
```

---

# 20. Final Rule

When uncertain between:

```text
Adding more
```

and:

```text
Making what already exists more intentional
```

prefer the second option.

Good design is not the accumulation of visual effects.

It is the disciplined removal of everything that does not strengthen:

- Meaning
- Hierarchy
- Usability
- Identity
- Emotion

Every interface should look like someone made a decision.

Not like a model filled a template.
