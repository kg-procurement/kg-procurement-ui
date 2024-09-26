import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

export default function IndexPage() {
  return <div className="font-bold text-red-600">PPL KG Procurement</div>
}
