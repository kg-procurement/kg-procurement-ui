import { useState } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover.tsx'
import { RichTextEditor } from '@/components/atoms/rich-text-editor.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import { Vendor } from '@/schemas/vendor.ts'

interface EmailFormProps {
  selectedVendors: Vendor[]
  onClose: () => void
  defaultContent?: string
}

export function EmailForm({ selectedVendors, onClose, defaultContent = '' }: EmailFormProps) {
  const [isConfirmation, setIsConfirmation] = useState(false)
  const [emailContent, setEmailContent] = useState(defaultContent)
  const [showPopover, setShowPopover] = useState(false)

  const handleSendEmail = () => { // TODO: Replace the simulated email sending logic with a real implementation
    selectedVendors.forEach((vendor) => {
      console.log(`Sending email to ${vendor.name}:`, emailContent)
    })

    onClose()
  }

  const handleNext = () => {
    if (emailContent.trim() === '') {
      setShowPopover(true)
      setTimeout(() => setShowPopover(false), 3000)
      return
    }
    setIsConfirmation(true)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        {isConfirmation ?
            (
              <>
                <DialogHeader>
                  <DialogTitle>Confirm Send Email</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to send the following email to the selected vendors? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => setIsConfirmation(false)}>No, Go Back</Button>
                  <Button onClick={handleSendEmail}>Yes, Send</Button>
                </DialogFooter>
              </>
            )
          :
            (
              <>
                <DialogHeader>
                  <DialogTitle>Compose Email</DialogTitle>
                  <DialogDescription>
                    Compose your email to
                    {' '}
                    {selectedVendors.length}
                    {' '}
                    vendor(s).
                  </DialogDescription>
                </DialogHeader>
                <RichTextEditor content={emailContent} setContent={setEmailContent} />
                <Typography variant="body2" className="mt-2">
                  Note:
                  <br />
                  -
                  { '{{vendor}} '}
                  = Vendor Name
                </Typography>
                <DialogFooter>
                  <Button onClick={onClose}>Cancel</Button>
                  <Popover open={showPopover}>
                    <PopoverTrigger asChild>
                      <Button onClick={handleNext}>Next</Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-2">
                      <Typography variant="body2" className="text-red-600">
                        Email content cannot be empty. Please write your email before proceeding.
                      </Typography>
                    </PopoverContent>
                  </Popover>
                </DialogFooter>
              </>
            )}
      </DialogContent>
    </Dialog>
  )
}
