CREATE TABLE public.trending_keywords (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country text NOT NULL,
  keyword text NOT NULL,
  search_intent text NOT NULL,
  aesthetic_tag text NOT NULL,
  color_palette text NOT NULL,
  silhouette text NOT NULL,
  last_updated date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (country, keyword)
);

GRANT SELECT ON public.trending_keywords TO anon;
GRANT SELECT ON public.trending_keywords TO authenticated;
GRANT ALL ON public.trending_keywords TO service_role;

ALTER TABLE public.trending_keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trending keywords are publicly readable"
  ON public.trending_keywords FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX trending_keywords_country_idx ON public.trending_keywords (country);

INSERT INTO public.trending_keywords (country, keyword, search_intent, aesthetic_tag, color_palette, silhouette, last_updated) VALUES
('US','royal purple outfit ideas','informational','regal maximalism','royal purple','statement layering','2026-08-08'),
('US','chocolate brown outfit fall 2026','shopping','expensive brown quiet luxury','chocolate brown','tonal dressing','2026-08-08'),
('US','satin slip dress outfit','shopping','90s nostalgic minimalism','ivory/jewel tone','bias-cut slip','2026-08-08'),
('US','wide leg trousers outfit ideas','shopping','office siren tailoring','neutral/brown','wide-leg','2026-08-08'),
('UK','funnel neck jacket outfit UK','shopping','expressive tailoring','cobalt blue','funnel neck structured','2026-08-08'),
('UK','bubble hem skirt trend','informational','sculptural volume','punchy brights','bubble hem','2026-08-08'),
('UK','muted neutral outfit taupe khaki','informational','quiet neutral counter-trend','taupe/khaki/stone','relaxed tailoring','2026-08-08'),
('DE','nachhaltige Mode Herbst 2026','informational','sustainable minimalism','earth tones','timeless silhouette','2026-08-08'),
('DE','weite Hose Business Outfit','shopping','office tailoring','neutral/brown','wide-leg','2026-08-08'),
('FR','look parisien chic','informational','Parisian chic','black/neutral','tailored','2026-08-08'),
('FR','pantalon large tendance automne','shopping','office siren tailoring','neutral/brown','wide-leg','2026-08-08'),
('IT','eleganza sartoriale autunno','informational','sartorial luxury','neutral/camel','tailored','2026-08-08'),
('ES','moda otoño 2026 tendencias','informational','transitional layering','warm neutrals','layered','2026-08-08'),
('NL','minimalist capsule wardrobe','informational','scandi minimalism','muted neutrals','clean silhouette','2026-08-08');

CREATE TABLE public.newsletter_subscribers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.newsletter_subscribers TO anon;
GRANT INSERT ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to the newsletter"
  ON public.newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 255);