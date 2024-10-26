import { DialogClose } from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction, useState } from 'react'

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
import { useToast } from '@/hooks/use-toast.ts'
import { useBlastEmailMutation } from '@/lib/redux/features/vendor/api.ts'
import { EmailVendorsArgs } from '@/lib/redux/features/vendor/validation.ts'

import { Input } from '../atoms/input.tsx'
import { Label } from '../atoms/label.tsx'

interface EmailFormProps {
  vendorIds: string[]
  defaultContent?: string
  toggleDialog: boolean
  setToggleDialog: Dispatch<SetStateAction<boolean>>
}

export function EmailForm({
  vendorIds,
  defaultContent = '',
  toggleDialog,
  setToggleDialog,
}: Readonly<EmailFormProps>) {
  const [isConfirmation, setIsConfirmation] = useState<boolean>(false)
  const [emailBody, setEmailBody] = useState<string>(defaultContent)
  const [emailSubject, setEmailSubject] = useState<string>('')
  const [showPopover, setShowPopover] = useState(false)

  const [blastEmail] = useBlastEmailMutation()
  const { toast } = useToast()
  const handleEmailVendors = async () => {
    try {
      const args: EmailVendorsArgs = {
        vendor_ids: vendorIds,
        email_template: {
          body: emailBody,
          subject: emailSubject,
        },
      }
      toast({
        title: 'On Progress',
        description: 'Executing email blast',
        duration: 2000,
      })
      await blastEmail(args).unwrap()
      toast({
        title: 'Success',
        description: 'Email blast has successfully executed',
        duration: 2000,
      })
      setToggleDialog(false)
    }
    catch (_) {
      toast({
        title: 'Error',
        description: 'Email blast failed to be executed',
        duration: 2000,

      })
    }
  }

  const handleNext = () => {
    if (emailBody.trim() === '' || emailSubject.trim() === '') {
      setShowPopover(true)
      setTimeout(() => setShowPopover(false), 3000)
      return
    }
    setIsConfirmation(true)
  }

  return (
    <Dialog open={toggleDialog} onOpenChange={setToggleDialog}>
      <DialogContent onInteractOutside={() => setIsConfirmation(false)}>
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
                  <Button className="bg-red-500 hover:bg-red-600" onClick={() => setIsConfirmation(false)}>No, Go Back</Button>
                  <Button onClick={handleEmailVendors}>Yes, Send</Button>
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
                    {vendorIds.length}
                    {' '}
                    vendor(s).
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Email Subject</Label>
                    <Input data-testid="subject-input" placeholder="Type here...." onChange={event => setEmailSubject(event.target.value)} defaultValue={emailSubject} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Email Body</Label>
                    <RichTextEditor content={emailBody} setContent={setEmailBody} />
                  </div>
                </div>
                <Typography variant="body2" className="mt-2">
                  Note:
                  <br />
                  -
                  { '{{vendor}} '}
                  = Vendor Name
                </Typography>
                <DialogFooter>
                  <DialogClose>
                    <Button className="bg-red-500 hover:bg-red-600">Cancel</Button>
                  </DialogClose>
                  <Popover open={showPopover}>
                    <PopoverTrigger asChild>
                      <Button onClick={handleNext}>Next</Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-2">
                      <Typography variant="body2" className="text-red-600">
                        Email body or subject cannot be empty. Please write your email before proceeding.
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
