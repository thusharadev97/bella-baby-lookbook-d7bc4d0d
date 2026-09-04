import React, { useState } from 'react'

export function SubmissionForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Submitted: ${title}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg border">
      <div>
        <label className="block text-sm font-medium mb-1">Article Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Content / Body</label>
        <textarea
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
      >
        Submit Article
      </button>
    </form>
  )
}
