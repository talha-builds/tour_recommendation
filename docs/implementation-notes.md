# Implementation Notes

## Important Source Update

The original project documentation describes an older implementation
using HTML/CSS/JavaScript, Python Flask, and MySQL.

The current implementation has changed to:

-   Next.js
-   Tailwind CSS
-   Supabase
-   Supabase PostgreSQL

Treat the current repository as the source of truth for implementation
details.

## Scope From Original Project

The project documentation defines these main functions: - User
registration - User login - Destination search - Budget filtering -
Destination details - Recommendations - Admin login - Destination/tour
management

It also lists favorites as a lower-priority feature and AI itinerary
generation as an optional feature.

The original documentation excludes: - Hotel booking - Flight booking -
Online payments - GPS navigation - Travel insurance

## AI Agent Instructions

When implementing a feature: 1. Check the existing code first. 2. Check
the existing Supabase schema. 3. Reuse existing components. 4. Implement
the feature end-to-end. 5. Test the feature. 6. Only then move to the
next feature.

If the repository contradicts this document, inspect the repository and
preserve working functionality. Update this documentation only when the
project decision has actually changed.
