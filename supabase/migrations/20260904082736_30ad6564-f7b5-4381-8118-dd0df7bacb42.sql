ALTER TABLE public.article_submissions
  ADD COLUMN IF NOT EXISTS author_name text,
  ADD COLUMN IF NOT EXISTS author_email text,
  ADD COLUMN IF NOT EXISTS backlinks jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS admin_notes text;

CREATE TABLE IF NOT EXISTS public.submission_notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id uuid NOT NULL REFERENCES public.article_submissions(id) ON DELETE CASCADE,
  recipient text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'queued',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.submission_notifications TO authenticated;
GRANT ALL ON public.submission_notifications TO service_role;

ALTER TABLE public.submission_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff read notification log"
ON public.submission_notifications
FOR SELECT
TO authenticated
USING (public.is_editorial_staff(auth.uid()));

CREATE POLICY "Authors log notifications for own submissions"
ON public.submission_notifications
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.article_submissions s
    WHERE s.id = submission_id AND s.author_id = auth.uid()
  )
);

GRANT INSERT ON public.submission_notifications TO authenticated;