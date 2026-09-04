GRANT SELECT ON public.article_submissions TO anon;

CREATE POLICY "Approved submissions are publicly readable"
ON public.article_submissions
FOR SELECT
TO anon, authenticated
USING (status = 'approved');