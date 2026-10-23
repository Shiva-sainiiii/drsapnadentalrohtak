-- Run once if you already created the tables with the first version (adds the 360 tour type)
alter table media drop constraint if exists media_kind_check;
alter table media add constraint media_kind_check check (kind in ('gallery','video','ba','doctor','site','youtube','pano'));
