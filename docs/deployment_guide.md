# Deployment Guide (Vercel)

Deploying a Next.js App Router project is incredibly straightforward if you use **Vercel** (the creators of Next.js). Because we have already verified that the app builds successfully (`npm run build` returned exit code 0), your code is 100% ready for the cloud!

Follow these exact steps to get your project live on the internet.

---

## Step 1: Push your code to GitHub
Vercel connects directly to your GitHub repository to enable CI/CD (Continuous Integration/Continuous Deployment). Every time you push code to GitHub in the future, Vercel will automatically rebuild and deploy the new version!

1. Go to [GitHub](https://github.com/) and create a new repository (e.g., `tour-recommendation-app`).
2. Open a terminal in your project folder (`TOUR_RECOMMENDATION`) and run the following commands (replace `YOUR_USERNAME` and `YOUR_REPO` with your actual details):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M master
git push -u origin master
```
*(Note: I have already run `git add .` and `git commit` for you locally, so your code is ready to push!)*

---

## Step 2: Import the Project to Vercel

1. Go to [Vercel](https://vercel.com/) and log in (or sign up) using your GitHub account.
2. From your Vercel Dashboard, click the **"Add New..."** button and select **"Project"**.
3. You will see a list of your GitHub repositories. Find the `tour-recommendation-app` repository you just created and click **"Import"**.

---

## Step 3: Configure Environment Variables (CRITICAL)

Before you click Deploy, you *must* provide Vercel with your Supabase credentials. Otherwise, the app won't be able to connect to the database!

1. On the Vercel configuration screen, leave the Framework Preset as `Next.js` and the Root Directory blank.
2. Open the **Environment Variables** accordion.
3. Open your local `.env.local` file and copy the variables exactly as they appear there into Vercel:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | *Your Supabase Project URL* |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *Your Supabase Anon Key* |

4. Click **Add** for each variable.

---

## Step 4: Deploy!

1. Once the Environment Variables are added, click the big **Deploy** button.
2. Vercel will now run the exact same `npm run build` command we just ran locally.
3. Wait about 1-2 minutes. Once it completes, you will see a screen raining confetti! 🎉
4. Vercel will provide you with a live URL (e.g., `https://tour-recommendation-app.vercel.app`). 

**You can now share this URL with your viva examiners!**

### Troubleshooting Auth Redirects (Supabase)
If you try to log in on your live Vercel URL and it redirects you to `localhost:3000`, you need to update Supabase.
1. Go to your Supabase Dashboard -> **Authentication** -> **URL Configuration**.
2. Change the **Site URL** from `http://localhost:3000` to your new `https://tour-recommendation-app.vercel.app` URL.
3. Add `https://tour-recommendation-app.vercel.app/**` to the **Redirect URLs**.
