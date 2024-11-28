import { DialogClose } from '@radix-ui/react-dialog'
import { Dispatch, lazy, SetStateAction, Suspense, useState } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog.tsx'
import { Input } from '@/components/atoms/input.tsx'
import { Label } from '@/components/atoms/label.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/popover.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import { useToast } from '@/hooks/use-toast.ts'
import { useBlastEmailMutation } from '@/lib/redux/features/vendor/api.ts'
import { toastForError } from '@/lib/redux/utils.tsx'

const RichTextEditor = lazy(
  () => import('@/components/atoms/rich-text-editor.tsx'),
)

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

  // Default values for subject and body
  const defaultSubject = 'Request for products'
  const defaultBody =
    'Kepada Yth {{name}},\n\nKami mengajukan permintaan untuk pengadaan produk tertentu yang dibutuhkan oleh perusahaan kami. Mohon informasi mengenai ketersediaan, harga, dan waktu pengiriman untuk produk tersebut.\n\nTerima kasih atas perhatian dan kerjasamanya.\n\nHormat kami'

  const [emailBody, setEmailBody] = useState<string>(
    defaultContent || defaultBody,
  )
  const [attachments, setAttachments] = useState<File[]>([])
  const [emailSubject, setEmailSubject] = useState<string>(defaultSubject)
  const [showPopover, setShowPopover] = useState(false)

  const [blastEmail] = useBlastEmailMutation()
  const { toast } = useToast()
  const handleEmailVendors = async () => {
    try {
      toast({
        title: 'On Progress',
        description: 'Executing email blast',
        duration: 2000,
      })
      await blastEmail({
        vendor_ids: vendorIds,
        body: emailBody,
        subject: emailSubject,
        attachments,
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Email blast has successfully executed',
        duration: 2000,
      })
      setToggleDialog(false)
    }
    catch (err) {
      toastForError(err)
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
    <Dialog
      open={toggleDialog}
      onOpenChange={(open) => {
        if (!open) {
          setAttachments([])
          setIsConfirmation(false)
        }
        setToggleDialog(open)
      }}
    >
      <DialogContent
        onInteractOutside={() => setIsConfirmation(false)}
        className="max-h-[calc(100vh-100px)] overflow-auto"
      >
        {isConfirmation
          ? (
              <>
                <DialogHeader>
                  <DialogTitle>Confirm Send Email</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to send the following email to the
                    selected vendors? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => setIsConfirmation(false)}
                  >
                    No, Go Back
                  </Button>
                  <Button onClick={handleEmailVendors}>Yes, Send</Button>
                </DialogFooter>
              </>
            )
          : (
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
                    <Input
                      data-testid="subject-input"
                      placeholder="Type here...."
                      onChange={event => setEmailSubject(event.target.value)}
                      defaultValue={emailSubject}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Email Body</Label>
                    <Suspense fallback="Loading Rich Text Editor ...">
                      <RichTextEditor
                        content={emailBody}
                        setContent={setEmailBody}
                      />
                    </Suspense>
                  </div>
                </div>
                <div>
                  <Label htmlFor="attachments">Attachments</Label>
                  <Input
                    id="attachments"
                    type="file"
                    multiple
                    onChange={e =>
                      e.target.files && setAttachments([...e.target.files])}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {attachments.map(attachment => (
                    <img
                      key={attachment.name}
                      src={URL.createObjectURL(attachment)}
                      alt={attachment.name}
                      className="w-full"
                    />
                  ))}
                </div>
                <Typography variant="body2" className="mt-2">
                  Note:
                  <br />
                  -
                  {'{{name}} '}
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
                        Email body or subject cannot be empty. Please write your
                        email before proceeding.
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
