import { createFileRoute } from '@tanstack/react-router'

import { vendorPageSearchSchema } from '@/schemas/vendor.ts'

export const Route = createFileRoute('/vendor')({
  validateSearch: vendorPageSearchSchema,
})
