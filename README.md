# Dr. Sapna's Advanced Microscopic Dental Care: drsapnadentalrohtak.com

Next.js 16 (App Router) website with admin panel, Gemini chatbot, local SEO pages, before/after slider, YouTube section, gallery and 4 switchable themes.

## Setup (pehli baar, is order mein)

1. **Supabase** (new project): SQL Editor mein `supabase.sql` paste karke Run karo. Phir Project Settings > API se `Project URL` aur **secret / service_role key** copy karo.
2. **Cloudinary**: Dashboard > API Keys se `cloud name`, `API key`, `API secret` copy karo.
3. **Gemini**: Google AI Studio se API key banao. Model: `gemini-3.1-flash-lite`.
4. `.env.example` ko `.env.local` naam se copy karke saari values bharo. `ADMIN_PASSWORD` apna strong password, `ADMIN_SECRET` koi lamba random text.
5. Terminal:
   ```
   npm install
   npm run seed     # starter photos Cloudinary pe upload + Supabase mein rows (sirf ek baar)
   npm run dev      # http://localhost:3000
   ```

## Deploy

1. Is folder ko GitHub repo mein push karo (`.env.local` push nahi hota, `.gitignore` mein hai).
2. Vercel > Add New Project > repo import. **Environment Variables** mein `.env.example` wali saari keys daalo (`NEXT_PUBLIC_SITE_URL=https://drsapnadentalrohtak.com` bhi).
3. Deploy. Phir Vercel > Settings > Domains mein `drsapnadentalrohtak.com` add karo (Vercel se buy kiya ho to DNS khud set ho jata hai). `www` ko main domain pe redirect rakhna.

## Admin panel: `/admin`

Password se login. Tabs: **Before / After**, **Gallery** (photos + videos), **YouTube** (link paste karo, Short ka checkbox), **Doctors** (photo badalna), **Site images** (hero / about photo), **Feedback** (patients ke bheje reviews).
Add, title edit, order number, Show/Hide aur Delete sab hota hai. Delete karne par Cloudinary se file bhi hat jati hai. Changes site pe ~1 minute mein dikhte hain.
Files seedha browser se Cloudinary pe upload hoti hain (video bade ho sakte hain), Supabase mein sirf list/details save hoti hain.

## Kya kahan edit karna hai

- `lib/site.js`: phone, address, hours, doctors ki bio, FAQ, reviews, **saari 15 service pages ka content**.
- `lib/bot.js`: chatbot ke fallback answers (jab Gemini key na ho ya error aaye).
- `app/api/chat/route.js`: Gemini ka system prompt (clinic ke rules).
- `app/globals.css`: colours/themes (`html[data-theme=...]` blocks).

## SEO (Rohtak ranking ke liye)

- Har treatment ki alag page (`/services/...-rohtak`) with FAQ + schema, plus Dentist/LocalBusiness, FAQ, Breadcrumb schema, `sitemap.xml`, `robots.txt`, canonical, OG image.
- Launch ke baad: Google Search Console mein domain add karke `https://drsapnadentalrohtak.com/sitemap.xml` submit karo. Google Business Profile mein website link ye domain karo. Naam, address aur phone har jagah same rakho (website, Google profile, Justdial, Instagram).
- Ranking guarantee nahi hoti. Local ranking mein Google reviews aur GBP ka bhi bada role hota hai.
