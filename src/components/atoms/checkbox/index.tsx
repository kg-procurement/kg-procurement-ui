'use client'

import { Check } from '@phosphor-icons/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

const Checkbox = () => (
  <CheckboxPrimitive.Root>
    <CheckboxPrimitive.Indicator>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
