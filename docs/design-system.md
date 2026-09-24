# Design & Motion Direction

## Product Personality

The Tour Recommendation System should feel like a modern travel product.

Keywords: - Cinematic - Premium - Exploratory - Calm - Immersive -
Modern - Responsive - Smooth

Avoid: - Generic college-project appearance - Excessive dashboard
styling - Random gradients - Excessive glassmorphism - Unnecessary neon
effects - Overloaded screens

## Visual Hierarchy

Every screen should clearly communicate:

1.  Where am I?
2.  What can I do here?
3.  What is the primary action?
4.  What information matters most?
5.  What happens after I interact?

## Motion Principles

### Page Entry

Use subtle staggered entrance animations for major content groups.

### Navigation

Transitions should make movement between screens feel connected rather
than abrupt.

### Cards

Cards may use: - Image movement - Slight elevation - Content reveal -
Soft hover/tap response

Do not make cards bounce or move excessively.

### Filtering

When filters change: - Preserve context. - Animate result changes. -
Avoid unnecessary full-page reloads.

### Modals

Use scale/opacity/position transitions with sensible timing.

### Scroll

Use scroll-triggered animation selectively for important sections.

### Mobile

Animations must remain useful on touch devices.

Avoid relying on hover for essential information.

## Accessibility

-   Maintain readable contrast.
-   Ensure keyboard accessibility.
-   Provide visible focus states.
-   Respect `prefers-reduced-motion`.
-   Never communicate important information through animation alone.
-   Touch targets should be comfortable.

## Performance

Animation should not make the website feel slow.

Prefer: - Transform - Opacity - Efficient CSS transitions - Lightweight
animation libraries where justified

Avoid expensive continuous animations that consume resources
unnecessarily.

## Component Feel

Buttons: - Clear - Responsive - Strong feedback

Inputs: - Calm - Easy to understand - Clear validation

Cards: - Visual - Information-dense without being cluttered

Navigation: - Minimal - Clear - Smooth

## Mobile Philosophy

Mobile should receive deliberate design decisions.

Do not simply stack desktop components vertically.

Consider: - Bottom navigation where useful - Touch-friendly controls -
Full-screen mobile filters - Swipeable image galleries - Compact cards -
Appropriate animation distances - Sticky primary actions when useful
