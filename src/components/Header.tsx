import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          Bella & Baby <span className="text-xs uppercase bg-black text-white px-2 py-0.5 rounded ml-1">Lookbook</span>
        </Link>
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-black">Home</Link>
          <a href="#womens" className="hover:text-black">Women's Fashion</a>
          <a href="#beauty" className="hover:text-black">Beauty & Skincare</a>
          <a href="#baby" className="hover:text-black">Baby & Care</a>
          <a href="#maternity" className="hover:text-black">Mom & Mini</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            to="/contribute"
            className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Become a Contributor
          </Link>
        </div>
      </div>
    </header>
  )
}
