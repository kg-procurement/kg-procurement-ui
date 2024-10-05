import { Edit, EllipsisVertical, Phone } from 'lucide-react'

import { Button } from '@/components/atoms/button.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog.tsx'
import { Input } from '@/components/atoms/input.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/popover.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/table.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import { Footer } from '@/components/molecules/footer.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/molecules/pagination.tsx'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <PageHeader>
        <div className="relative">
          <Typography variant="h2" className="text-white">
            Vendor A
          </Typography>
          <Dialog>
            <DialogTrigger className="absolute -right-16 top-0">
              <Edit color="white" size={24} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Vendor</DialogTitle>
                <DialogDescription className="flex flex-col gap-4 pt-2">
                  <Typography variant="subtitle2">Name</Typography>
                  <input type="text" className="w-full rounded-md border p-2" />

                  <Typography variant="subtitle2">Description</Typography>
                  <textarea className="w-full rounded-md border p-2" rows={4} />

                  <div className="flex w-full items-center justify-end gap-6">
                    <DialogClose>Cancel</DialogClose>
                    <Button>Save</Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Typography variant="subtitle1" className="text-white">
          Dashboard
        </Typography>
        <div className="mt-2 flex gap-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2"
            >
              <Phone color="white" size={16} />
            </div>
          ))}
        </div>
      </PageHeader>
      <div className="flex flex-grow items-center justify-center bg-[#F8F8F8] p-16">
        <div className="grid h-full w-full flex-grow grid-cols-2 rounded-md bg-white p-4 shadow-md">
          <div className="col-span-1"></div>
          <div className="col-span-1 flex flex-col gap-4">
            <Typography variant="h6">Inventory List</Typography>
            <Input className="text-sm" placeholder="Filter vendor ..." />
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Lorem Ipsum</TableCell>
                  <TableCell>Lorem Ipsum Amer</TableCell>
                  <TableCell>Rp.25000</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button>
                          <EllipsisVertical size={16} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-fit p-2">
                        <Button
                          className="h-fit w-full px-3 py-1"
                          variant="ghost"
                        >
                          Edit
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lorem Ipsum2</TableCell>
                  <TableCell>Lorem Ipsum Amer2</TableCell>
                  <TableCell>Rp.30000</TableCell>
                  <TableCell>
                    <button>
                      <EllipsisVertical size={16} />
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lorem Ipsum3</TableCell>
                  <TableCell>Lorem Ipsum Amer3</TableCell>
                  <TableCell>Rp.35000</TableCell>
                  <TableCell>
                    <button>
                      <EllipsisVertical size={16} />
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lorem Ipsum4</TableCell>
                  <TableCell>Lorem Ipsum Amer4</TableCell>
                  <TableCell>Rp.40000</TableCell>
                  <TableCell>
                    <button>
                      <EllipsisVertical size={16} />
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lorem Ipsum5</TableCell>
                  <TableCell>Lorem Ipsum Amer5</TableCell>
                  <TableCell>Rp.45000</TableCell>
                  <TableCell>
                    <button>
                      <EllipsisVertical size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="py-2.5">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
