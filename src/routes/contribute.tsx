import { createFileRoute } from '@tanstack/react-router'
import { ContributorAuthForm } from '~/components/ContributorAuthForm'

export const Route = createFileRoute('/contribute')({
  component: ContributePage,
})

function ContributePage() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Contributor Portal</h1>
      <ContributorAuthForm />
    </div>
  )
}
