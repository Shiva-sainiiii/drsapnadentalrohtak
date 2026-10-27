-- Ek baar Supabase SQL Editor me chalao: "Conferences" photos ke liye media table me naya type 'conference' allow karta hai.
alter table media drop constraint if exists media_kind_check;
alter table media add constraint media_kind_check check (kind in ('gallery','video','ba','doctor','site','youtube','pano','conference'));
