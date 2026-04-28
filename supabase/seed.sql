insert into public.categories (slug, name, sort_order)
values
  ('eggs', 'Farm Eggs', 0),
  ('woodcraft', 'Handmade Woodcraft', 1),
  ('skincare', 'Lisa’s Skincare', 2)
on conflict (slug) do update set
  name = excluded.name,
  sort_order = excluded.sort_order;

insert into public.products (
  id,
  category_slug,
  slug,
  name,
  description,
  image_path,
  price_hint,
  external_url,
  is_active
)
values
  (
    'eggs-fresh-dozen',
    'eggs',
    'fresh-dozen-eggs',
    'Fresh Dozen Eggs',
    'Farm-fresh eggs collected in small batches. Call or text to check today’s availability.',
    '/photos/egg.jpg',
    'Pickup only · Availability varies',
    null,
    true
  ),
  (
    'eggs-weekly-reserve',
    'eggs',
    'weekly-egg-reserve',
    'Weekly Egg Reserve',
    'Prefer a regular pickup? Tell us how many dozen you want each week and we’ll do our best to set them aside.',
    '/photos/egg2.jpg',
    'Text to arrange',
    null,
    true
  ),
  (
    'eggs-coop-visit',
    'eggs',
    'coop-visit',
    'Chicken Coop Visit',
    'See the coop in action and meet the hens. Great for families and curious egg lovers.',
    '/photos/chicken.jpg',
    'By appointment · Local only',
    null,
    true
  ),
  (
    'eggs-hen-spotlight',
    'eggs',
    'hen-spotlight',
    'Hen Spotlight',
    'A fun add-on to your pickup—ask which hens are laying today and what we’re seeing in the coop.',
    '/photos/chicken1.jpg',
    'Included with pickup',
    null,
    true
  ),
  (
    'eggs-coop-morning',
    'eggs',
    'coop-morning',
    'Coop Morning Update',
    'A quick morning snapshot from the coop with availability notes for today’s egg pickups.',
    '/photos/chicken2.jpg',
    'Text to arrange',
    null,
    true
  ),
  (
    'woodcraft-cutting-board',
    'woodcraft',
    'cutting-board',
    'Hardwood Cutting Board',
    'Handmade by the family shop. Each board has unique grain and character.',
    '/photos/Wooden1.jpg',
    'Made to order · Local pickup',
    null,
    true
  ),
  (
    'woodcraft-decor-sign',
    'woodcraft',
    'farmhouse-sign',
    'Farmhouse Decor Sign',
    'Rustic wood signage for your kitchen, porch, or pantry. Custom text available.',
    '/photos/Wooden2.jpg',
    'Custom quotes via text',
    null,
    true
  ),
  (
    'woodcraft-wall-shelf',
    'woodcraft',
    'wall-shelf',
    'Wall Shelf',
    'A simple handmade shelf for entryways, kitchens, or anywhere you want a little extra charm.',
    '/photos/Wooden3.jpg',
    'Made to order · Local pickup',
    null,
    true
  ),
  (
    'woodcraft-stool',
    'woodcraft',
    'handmade-stool',
    'Thoma''s Handmade Stool',
    'A sturdy little stool with clean lines—great as a step, seat, or plant stand.',
    '/photos/Wooden.jpg',
    'Limited batches · Local pickup',
    null,
    true
  ),
  (
    'skincare-body-butter',
    'skincare',
    'body-butter',
    'Body Butter',
    'All-natural body butter designed to nourish and hydrate—especially for sensitive skin.',
    '/photos/background1.jpg',
    'Ships from Lisa’s shop',
    'https://beakergold.com/?srsltid=AfmBOoryko08_1LDeogRpEWca9eUNONUfYgzEcHan-g1G7SlziXYTyvR',
    true
  )
on conflict (id) do update set
  category_slug = excluded.category_slug,
  slug = excluded.slug,
  name = excluded.name,
  description = excluded.description,
  image_path = excluded.image_path,
  price_hint = excluded.price_hint,
  external_url = excluded.external_url,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.farm_regions (
  id,
  slug,
  title,
  description,
  image_path,
  cta_label,
  cta_href,
  x,
  y
)
values
  (
    'region-coop',
    'chicken-coop',
    'Chicken Coop',
    'Where the day starts: fresh eggs, feed time, and a lot of personality.',
    '/photos/chicken.jpg',
    'Explore Eggs',
    '/products/eggs',
    35,
    62
  ),
  (
    'region-woodshop',
    'woodshop',
    'Family Woodshop',
    'Our small shop where woodcraft gets sketched, cut, sanded, and finished by hand.',
    '/photos/Wooden1.jpg',
    'Explore Woodcraft',
    '/products/woodcraft',
    70,
    40
  )
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  image_path = excluded.image_path,
  cta_label = excluded.cta_label,
  cta_href = excluded.cta_href,
  x = excluded.x,
  y = excluded.y;
