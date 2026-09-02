-- Roles enum + roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'contributor');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  contact_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_editorial_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'editor')
  )
$$;

-- Submissions
CREATE TYPE public.submission_status AS ENUM ('draft', 'submitted', 'in_review', 'needs_revision', 'approved', 'rejected');

CREATE TABLE public.article_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT,
  category TEXT NOT NULL,
  region_focus TEXT,
  excerpt TEXT,
  body TEXT NOT NULL,
  cover_image_url TEXT,
  keywords TEXT,
  word_count INTEGER NOT NULL DEFAULT 0,
  status public.submission_status NOT NULL DEFAULT 'submitted',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  decided_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.article_submissions TO authenticated;
GRANT ALL ON public.article_submissions TO service_role;
ALTER TABLE public.article_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authors read own submissions" ON public.article_submissions FOR SELECT TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Staff read all submissions" ON public.article_submissions FOR SELECT TO authenticated USING (public.is_editorial_staff(auth.uid()));
CREATE POLICY "Authors create own submissions" ON public.article_submissions FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors edit editable submissions" ON public.article_submissions FOR UPDATE TO authenticated
  USING (auth.uid() = author_id AND status IN ('draft', 'needs_revision', 'submitted'))
  WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Staff update submissions" ON public.article_submissions FOR UPDATE TO authenticated
  USING (public.is_editorial_staff(auth.uid()))
  WITH CHECK (public.is_editorial_staff(auth.uid()));

CREATE TABLE public.submission_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES public.article_submissions(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  decision public.submission_status NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.submission_reviews TO authenticated;
GRANT ALL ON public.submission_reviews TO service_role;
ALTER TABLE public.submission_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authors read reviews of own submissions" ON public.submission_reviews FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.article_submissions s WHERE s.id = submission_id AND s.author_id = auth.uid()));
CREATE POLICY "Staff read all reviews" ON public.submission_reviews FOR SELECT TO authenticated USING (public.is_editorial_staff(auth.uid()));
CREATE POLICY "Staff create reviews" ON public.submission_reviews FOR INSERT TO authenticated
  WITH CHECK (public.is_editorial_staff(auth.uid()) AND reviewer_id = auth.uid());

-- updated_at maintenance
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER submissions_touch BEFORE UPDATE ON public.article_submissions
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- New-user bootstrap
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, contact_email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'contributor')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();