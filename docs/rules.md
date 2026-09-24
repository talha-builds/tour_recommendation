# AI Development Rules

These rules apply to every AI agent working on the Tour Recommendation
System.

## 1. Technology Rules

-   Use Next.js for the application.
-   Use TypeScript.
-   Use Tailwind CSS for styling.
-   Use Supabase for authentication and database functionality.
-   Use Supabase PostgreSQL as the database.
-   Do NOT use Flask.
-   Do NOT use MySQL.
-   Do NOT introduce another backend framework unless explicitly
    requested.
-   Reuse the existing project structure and dependencies whenever
    possible.
-   Do not replace working architecture just because another technology
    is preferred.

## 2. Functional Rules

-   Functionality comes before visual decoration.
-   Never break an existing working feature while implementing another
    feature.
-   Every user-facing interaction should have a clear loading, success,
    empty, and error state where applicable.
-   Forms must have validation.
-   Destructive actions must require appropriate confirmation.
-   Authentication and authorization must be enforced server-side where
    required; hiding UI elements is not security.
-   Never expose Supabase service-role credentials or other secrets to
    the client.
-   Use environment variables for secrets.
-   Do not hardcode credentials, API keys, or private configuration.

## 3. UI/UX Rules

The product direction is:

**Highly animated + smooth + premium + functional.**

-   Animations should feel intentional.
-   Prefer subtle motion over random motion.
-   Use animation to communicate hierarchy, navigation, state changes,
    and feedback.
-   Avoid animation that delays basic actions.
-   Never sacrifice readability for visual effects.
-   Mobile is a first-class experience, not a reduced desktop version.
-   Every animation must work sensibly on touch devices.
-   Respect `prefers-reduced-motion`.
-   Avoid excessive blur, giant shadows, unnecessary gradients, and
    visual noise.
-   Maintain consistent spacing, typography, radii, and interaction
    patterns.
-   Interactive elements must look interactive.
-   Buttons must provide visible feedback.
-   Loading states should feel designed rather than displaying plain
    text whenever practical.

## 4. Responsive Rules

Design for: - Mobile - Tablet - Laptop - Large desktop

Do not simply shrink the desktop layout.

On mobile: - Avoid horizontal overflow. - Keep touch targets
comfortable. - Keep important actions reachable. - Preserve the visual
identity and animation quality. - Use mobile-specific layout decisions
when necessary.

## 5. Component Rules

-   Prefer reusable components.
-   Avoid creating giant components that contain unrelated
    responsibilities.
-   Keep data fetching, business logic, and presentation reasonably
    separated.
-   Use clear component and variable names.
-   Avoid unnecessary abstraction.
-   Do not create a new dependency when an existing project dependency
    can solve the problem.

## 6. Database Rules

-   Use Supabase PostgreSQL.
-   Follow a clear relational structure.
-   Use foreign keys where appropriate.
-   Add appropriate indexes for frequently queried fields.
-   Keep sensitive data protected with Supabase Row Level Security where
    applicable.
-   Users should only access data they are authorized to access.
-   Admin operations must be protected.
-   Do not store derived information unnecessarily if it can reliably be
    calculated.

## 7. Recommendation Rules

The recommendation system must be understandable.

Potential preference inputs include: - Budget - Destination type -
Season - Trip duration

If a scoring/ranking system is used: - Keep the logic deterministic
unless randomness is explicitly required. - Document the factors used. -
Avoid pretending that a simple rule-based recommender is a sophisticated
AI model. - Show useful recommendation reasoning in the UI where
appropriate.

## 8. Development Workflow

Before changing code: 1. Inspect the existing project. 2. Understand the
current architecture. 3. Identify reusable components. 4. Check whether
the requested functionality already exists. 5. Make the smallest
sensible change.

After changing code: 1. Check TypeScript errors. 2. Check lint/build
issues where available. 3. Verify affected user flows. 4. Check
responsive behavior. 5. Check animation behavior. 6. Do not claim a
feature works without actually verifying it.

## 9. AI Agent Behavior

-   Do not rewrite the whole project without a clear reason.
-   Do not invent files, APIs, database tables, or existing
    functionality.
-   If something is unclear, inspect the repository before assuming.
-   If a requirement conflicts with the existing architecture, explain
    the conflict before making a large architectural change.
-   Keep changes focused.
-   Do not add unnecessary features just to make the project look more
    complex.
-   Prefer a polished small feature set over many unfinished features.

## 10. Visual Quality Rule

The final result must NOT look like a generic: - Bootstrap template -
Admin dashboard - Basic college CRUD project - Plain form-and-table
website

The interface should have a recognizable travel-product identity, strong
visual hierarchy, smooth transitions, and thoughtful interaction design.
