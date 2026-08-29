import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  component: BlogPage,
})

function BlogPage() {
  const posts = [
    {
      slug: '2026-08-29-test',
      title: 'test',
      date: 'Aug 29, 2026',
      author: 'Thushara Sanjeewa',
      image: '',
      excerpt: 'First test post from Decap CMS',
    }
  ]

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <header className="border-b border-neutral-200 py-6 px-8 flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-serif tracking-widest uppercase">
          Bella & Baby
        </Link>
        <nav className="space-x-6 text-sm tracking-wide uppercase">
          <Link to="/" className="hover:text-neutral-500">Home</Link>
          <Link to="/blog" className="font-semibold underline">Journal</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif mb-3 tracking-wide">The Journal</h1>
          <p className="text-neutral-500 text-sm tracking-wider uppercase">Stories, edits, and notes on childhood style.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <article key={post.slug} className="group cursor-pointer border border-neutral-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              {post.image && (
                <div className="aspect-[4/3] bg-neutral-100 mb-4 overflow-hidden rounded">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
              )}
              <div className="text-xs tracking-widest text-neutral-400 uppercase mb-2">{post.date} · By {post.author}</div>
              <h2 className="text-2xl font-serif mb-2 group-hover:text-neutral-600 transition">{post.title}</h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <span className="text-xs uppercase tracking-widest font-semibold border-b border-neutral-900 pb-1">Read the edit →</span>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-10 text-center text-xs text-neutral-400 uppercase tracking-widest mt-20">
        © 2026 Bella & Baby. All rights reserved.
      </footer>
    </div>
  )
}
