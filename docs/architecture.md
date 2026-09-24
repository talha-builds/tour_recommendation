# System Architecture

## Current Technology

The actual implementation uses:

-   Next.js
-   TypeScript
-   Tailwind CSS
-   Supabase Authentication
-   Supabase PostgreSQL

There is no Flask server and no separate MySQL database.

## High-Level Architecture

``` text
                    USER
                     |
                     v
              Next.js Web App
                     |
        +------------+-------------+
        |                          |
        v                          v
   UI / Components          Server-side Logic
        |                          |
        +------------+-------------+
                     |
                     v
                  Supabase
          +----------+----------+
          |                     |
          v                     v
    Supabase Auth        PostgreSQL Database
                               |
                +--------------+--------------+
                |              |              |
                v              v              v
          Destinations       Tours      User Preferences
                |
                v
        Recommendation Logic
                |
                v
         Ranked Results
```

## Application Layers

### 1. Presentation Layer

Next.js + Tailwind CSS.

Responsible for: - Pages - Components - Responsive layouts -
Animations - Forms - Loading/error/empty states - User interactions

### 2. Application Logic

Responsible for: - Search - Filtering - Recommendation calculations -
Validation - User workflows - Admin operations

Keep business logic separate from purely visual components where
practical.

### 3. Authentication

Supabase Auth handles: - Registration - Login - Session management -
Logout

Authorization should determine whether the current user can access
protected resources.

### 4. Database

Supabase PostgreSQL stores application data.

The exact schema should reflect implemented functionality rather than
copying every table from the original documentation.

## Recommendation Flow

``` text
User enters preferences
        |
        v
Validate preferences
        |
        v
Retrieve candidate destinations/tours
        |
        v
Apply hard filters
        |
        v
Calculate relevance
        |
        v
Rank candidates
        |
        v
Return recommendations
        |
        v
Display recommendations with useful context
```

## Security Principles

-   Keep secrets server-side.
-   Use Supabase RLS for database access where appropriate.
-   Do not trust client-side authorization checks alone.
-   Validate user input.
-   Protect admin functionality.
-   Never expose service-role credentials in browser code.

## Architecture Goal

The architecture should remain understandable enough for a final-year CS
project presentation and viva. Complexity should exist only when it
provides a real benefit.
