import React, { useState } from 'react'

export function SubmissionForm() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('womens-style')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Article submitted successfully for editorial review!')
    setTitle('')
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg border shadow-sm">
      {status && <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">{status}</div>}
      <div>
        <label className="block text-sm font-medium mb-1">Article Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., 10 Minimalist Capsule Wardrobe Essentials"
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="womens-style">Women's Fashion & Style</option>
          <option value="beauty-skincare">Beauty & Botanical Skincare</option>
          <option value="baby-toddler">Baby & Toddler Essentials</option>
          <option value="maternity-mom">Maternity & Mom Style</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Article Content / Draft</label>
        <textarea
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your fashion guide, skincare routine, or baby care tips here..."
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition"
      >
        Submit for Review
      </button>
    </form>
  )
}
