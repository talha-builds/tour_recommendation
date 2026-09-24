# Development Roadmap

## Phase 0 --- Repository Audit

Before writing new code: - Inspect the entire repository. - Identify the
Next.js version and routing approach. - Inspect package.json. - Inspect
the current Supabase setup. - Inspect existing components. - Inspect
existing pages/routes. - Inspect database schema/migrations. - Identify
what is already functional. - Run the application.

**Deliverable:** A short implementation audit before major changes.

------------------------------------------------------------------------

## Phase 1 --- Foundation & Design System

Build the visual foundation first.

### Tasks

-   Establish typography.
-   Establish color palette.
-   Establish spacing scale.
-   Establish border-radius conventions.
-   Establish shadows/glows where appropriate.
-   Create reusable buttons.
-   Create inputs/selects.
-   Create cards.
-   Create badges/chips.
-   Create modal/dialog patterns.
-   Create loading/skeleton patterns.
-   Create toast/feedback patterns.
-   Establish animation conventions.

### Animation Direction

Use: - Page entrance transitions - Scroll reveals - Hover/tap feedback -
Card transitions - Shared layout transitions where useful - Smooth
filtering transitions - Image transitions - Modal transitions -
Navigation transitions

Avoid: - Constant distracting movement - Slow animations that make the
app feel sluggish - Desktop-only interactions

------------------------------------------------------------------------

## Phase 2 --- Application Shell

Build the core navigation experience.

### User Side

-   Responsive navbar
-   Mobile navigation
-   Page transitions
-   Footer
-   Global loading states
-   Error states

### Admin Side

-   Admin layout
-   Protected routes
-   Navigation
-   Dashboard foundation

------------------------------------------------------------------------

## Phase 3 --- Authentication

Implement: - Registration - Login - Logout - Session handling -
Protected user routes - Admin authorization - Auth-related error states

Verify: - Invalid credentials - Existing account - Session persistence -
Unauthorized access - Logout behavior

------------------------------------------------------------------------

## Phase 4 --- Supabase Data Layer

Establish the actual data model.

Likely core entities: - Users/profiles - Destinations - Tours -
Categories/types - User preferences - Recommendations -
Wishlist/favorites - Reviews if included - Itinerary/activities if
included - Admin-related records where required

Create: - Tables - Relationships - Constraints - Indexes - RLS
policies - Seed/sample data

Do not create unnecessary tables just to make the architecture look
bigger.

------------------------------------------------------------------------

## Phase 5 --- Destination Discovery

Build the main discovery experience.

Features: - Destination browsing - Search - Budget filtering -
Destination-type filtering - Season-related filtering where supported -
Duration filtering where supported - Empty states - Loading states

The filtering experience should animate smoothly without making the user
wait unnecessarily.

------------------------------------------------------------------------

## Phase 6 --- Recommendation Engine

Implement the recommendation logic.

Inputs: - User preferences - Budget - Destination type - Season - Trip
duration

Possible approach: 1. Retrieve eligible destinations/tours. 2. Apply
hard constraints where appropriate. 3. Calculate relevance using
documented preference factors. 4. Rank results. 5. Return explainable
recommendations.

The algorithm should be simple enough to explain during a
final-year-project viva.

------------------------------------------------------------------------

## Phase 7 --- Destination & Tour Details

Build polished detail pages.

Include relevant information such as: - Destination overview - Images -
Budget - Duration - Attractions - Tour information - Itinerary where
available - Recommendation reasoning - Favorite action

Focus heavily on: - Image presentation - Scroll behavior - Section
transitions - Mobile layout - Clear primary actions

------------------------------------------------------------------------

## Phase 8 --- Wishlist / User Area

Implement: - Add/remove favorites - Saved destinations/tours - User
profile - Preference management - Relevant history if actually required

------------------------------------------------------------------------

## Phase 9 --- Admin

Implement: - Admin authentication/authorization - Destination CRUD -
Tour CRUD - Image/content management if required - Basic management
overview - Validation - Delete confirmation

Admin UI does not need the same visual storytelling as the public site,
but it should still be polished and usable.

------------------------------------------------------------------------

## Phase 10 --- Responsive & Motion Pass

Perform a dedicated pass across the entire product.

Test: - Small mobile screens - Large mobile screens - Tablet - Laptop -
Large desktop

Check: - Touch interactions - Scroll performance - Overflow -
Fixed/sticky elements - Animation timing - Reduced-motion behavior -
Image loading - Skeleton states

------------------------------------------------------------------------

## Phase 11 --- Testing & Hardening

Test: - Authentication - Authorization - Search - Filters -
Recommendations - Favorites - Destination details - Admin operations -
Invalid input - Empty data - Network errors - Database errors -
Responsive layouts

Run: - TypeScript checks - Lint - Production build

Fix issues before adding new features.

------------------------------------------------------------------------

## Phase 12 --- Final Presentation

Prepare: - Demo data - Clean user journey - Admin demo - Recommendation
demo - Mobile demo - Project screenshots - Architecture explanation -
Recommendation algorithm explanation - Database explanation - Viva
questions and answers

The final demo should show a complete flow rather than disconnected
features.
