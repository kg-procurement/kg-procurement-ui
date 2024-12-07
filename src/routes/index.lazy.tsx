import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: IndexPage,
})

export default function IndexPage() {
  return (
    <div className="text-center text-2xl font-bold">
      Welcome! The app is working :D
    </div>
  )
}
