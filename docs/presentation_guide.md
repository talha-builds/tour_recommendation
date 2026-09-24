# Wanderlust - Final Year Project Presentation & Viva Guide

This document is designed to help you confidently present your "Wanderlust" Tour Recommendation System and answer potential questions during your final viva.

---

## 1. Project Architecture Overview

**What is the tech stack?**
- **Frontend Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (SSR via Middleware)
- **Language**: TypeScript

**Why Next.js App Router?**
It allows us to mix Server Components and Client Components. Server Components fetch data securely on the backend (zero bundle size sent to the client, highly SEO optimized), while Client Components handle interactivity (like the Wishlist button and mobile navigation).

---

## 2. The Recommendation Engine (The Core Feature)

Your viva panel will ask how the recommendation engine works. 

**How does it work?**
It uses a **Weighted Scoring Algorithm** executed on the server.
1. When a user logs in, we fetch their `user_preferences` (Budget and Difficulty) from the database.
2. We fetch all available tours.
3. For each tour, we calculate a `score` starting at 0:
   - **Budget Match**: If the tour price is exactly the user's preferred budget category (e.g., Luxury, Budget), it gets **+5 points**. If the tour is cheaper than their maximum budget, it gets partial points (+3).
   - **Difficulty Match**: If the tour difficulty exactly matches the user's preference, it gets **+5 points**. If it is easier than their preference, it gets partial points (+2).
4. Tours are sorted in descending order based on their score.
5. Tours with high scores (e.g., 10 points) are labeled **"Perfect Match"**. Tours with good scores (7-9 points) are labeled **"Great Match"**.
6. The top 3 tours are sliced and displayed on the user's dashboard.

*Source Code Location:* `src/lib/recommendations.ts`

---

## 3. Database Schema & Security (Supabase)

**What tables exist?**
1. `profiles`: Extended user data (full name, role: 'user' or 'admin').
2. `destinations`: Countries and cities.
3. `tours`: The actual tour packages (price, difficulty, description). Links to destinations.
4. `user_preferences`: Stores the budget and difficulty answers from the questionnaire.
5. `wishlists`: A junction table linking `user_id` to `tour_id` so users can save favorites.

**How is the database secured?**
We use **Row Level Security (RLS)** in PostgreSQL. 
- *Public Data*: Anyone can view tours and destinations.
- *Private Data*: Users can only `SELECT`, `INSERT`, or `DELETE` their *own* rows in the `wishlists` and `user_preferences` tables. The database actively rejects unauthorized attempts based on the logged-in user's JWT token.

---

## 4. Role-Based Access Control (RBAC) & Admin Features

**How do you differentiate between regular users and admins?**
The `profiles` table has a `role` column defaulting to `'user'`. 
When a user logs in, the dashboard (`/admin/page.tsx`) queries their profile. 
- If `role === 'admin'`, an "Admin Panel" button appears.
- The Admin Panel (`/admin/manage`) allows the admin to Create and Delete tours using **Next.js Server Actions**. 
- Server Actions allow us to securely run backend code directly from a form submission without building a separate API endpoint.

---

## 5. Potential Viva Questions & Answers

**Q: Why didn't you use a separate backend like Node.js/Express?**
**A:** "By using Next.js with Server Components and Server Actions, the backend logic is seamlessly integrated into the same repository. This reduces latency, simplifies deployment, and provides end-to-end type safety with TypeScript, eliminating the need for a standalone REST API."

**Q: How do you handle authentication securely?**
**A:** "We use Supabase Auth coupled with Next.js Middleware. When a user logs in, Supabase issues a secure HTTP-only cookie. Our Middleware intercepts every request to protected routes (like `/admin`) and verifies the session token. If it's invalid, they are redirected to the login page."

**Q: What happens if a user saves the same tour to their wishlist twice?**
**A:** "The database prevents this. I implemented a `UNIQUE(user_id, tour_id)` constraint on the `wishlists` PostgreSQL table, ensuring absolute data integrity at the database level rather than just relying on the frontend."

**Q: How did you make the application responsive?**
**A:** "I used Tailwind CSS utility classes with mobile-first breakpoints (e.g., `md:flex-row`). For the navigation, I implemented a custom state-driven hamburger menu using Framer Motion to animate a mobile overlay when viewed on smaller screens."

**Q: If you had more time, how would you improve the recommendation engine?**
**A:** "I would integrate a collaborative filtering approach (like Amazon or Netflix), analyzing which tours similar users added to their wishlists, rather than just relying on hardcoded weighted scores."

---

## 6. Demonstration Flow (How to present it)

When showing your project to the panel, follow this exact flow:
1. **Homepage**: Show the beautiful UI, animations, and scrolling navbar.
2. **Destinations/Tours Listing**: Show the public catalog.
3. **Sign Up**: Create a brand new account live.
4. **Dashboard**: Show that it prompts the new user to "Take the Questionnaire".
5. **Questionnaire**: Fill out the preferences (e.g., Budget, Easy difficulty).
6. **Recommendations**: Show how the dashboard instantly updates with "Perfect Matches" based on your answers.
7. **Wishlist**: Go to a Tour Details page, click "Save to Wishlist", and show it appearing on the dashboard.
8. **Admin Panel**: (Have a secondary admin account ready). Log in to the admin account, show the "Admin Panel" button, create a dummy tour, and delete it to prove CRUD functionality.
