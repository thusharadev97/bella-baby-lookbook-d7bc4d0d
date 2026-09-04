import { createFileRoute } from '@tanstack/react-router'
import { SubmissionQueue } from '../../components/SubmissionQueue'

export const Route = createFileRoute('/admin/queue')({
  component: AdminQueuePage,
})

function AdminQueuePage() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Editorial Review Queue</h1>
      <SubmissionQueue />
    </div>
  )
}
