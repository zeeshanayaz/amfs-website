# AMFS website

This is a [Next.js](https://nextjs.org) project.




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Supabase setup

1. Create a Supabase project.
2. In the project settings, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_URL`
   - `Anon Key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `Service Role Key` → `SUPABASE_SERVICE_ROLE_KEY`
3. Create a `.env.local` file at the repo root and add these values.
4. Run the SQL schema in `supabase/schema.sql` using the Supabase SQL editor.
5. Start the app with `npm run dev`.

## Cloudinary setup

Job images are compressed in the browser and uploaded through the authenticated server route. Add these server-only values to `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Find all three values in the Cloudinary dashboard under **Product Environment Settings**. Do not prefix them with `NEXT_PUBLIC_` or expose the API secret in client-side code.

## Admin workflow

- Visit `/admin/login`
- After login, use the admin dashboard to create, edit, activate, and delete job posts.

## Careers page

- The careers page loads active job posts from `job_posts`.
- Job posts must have `is_active = true` to appear on `/careers`.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.