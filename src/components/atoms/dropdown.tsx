import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import * as React from 'react'

import { Button } from '@/components/atoms/button.tsx'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/atoms/command.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/popover.tsx'
import { cn } from '@/utils/cn.ts'

interface Option {
  value: string
  label: string
}

interface DropdownProps {
  options: ReadonlyArray<Option>
  onSelect: (value: string) => void
  name: string
}

export default function Dropdown({
  options,
  onSelect,
  name = 'Option',
}: Readonly<DropdownProps>) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? '' : currentValue
    setValue(newValue)
    onSelect(newValue)
    setOpen(false)
  }

  return (
    <div className="z-[80] flex items-center justify-between px-5">
      <div className="flex gap-10">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? options.find(option => option.value === value)?.label
                : `Select ${name}...`}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder={`Search ${name}...`} className="h-9" />
              <CommandList>
                <CommandEmpty>{`No ${name} found.`}</CommandEmpty>
                <CommandGroup>
                  {options.map(option => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          value === option.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
