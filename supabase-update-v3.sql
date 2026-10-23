-- Ek baar Supabase SQL Editor me chalao: feedback ko "website pe dikhao" ka switch deta hai.
-- Default false hai, matlab koi bhi naya feedback apne aap public nahi hota. Tum admin se approve karoge.
alter table feedback add column if not exists approved boolean not null default false;
