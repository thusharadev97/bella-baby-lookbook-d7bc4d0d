import { createFileRoute } from '@tanstack/react-router'
import { SubmissionForm } from '../../components/SubmissionForm'

export const Route = createFileRoute('/contribute/submit')({
  component: SubmitArticlePage,
})

function SubmitArticlePage() {
  return (
    <div className="py-12 px-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Submit a New Article</h1>
      <SubmissionForm />
    </div>
  )
}
