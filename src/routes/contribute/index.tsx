import { createFileRoute } from '@tanstack/react-router'
import { ContributorAuthForm } from '~/components/ContributorAuthForm'

export const Route = createFileRoute('/contribute/')({
  component: ContributeIndex,
})

function ContributeIndex() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <ContributorAuthForm />
    </div>
  )
}
