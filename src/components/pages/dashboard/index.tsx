import { Phone } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/table/index.tsx'
import { Typography } from '@/components/atoms/typography/index.tsx'
import { Footer } from '@/components/molecules/footer/index.tsx'
import PageHeader from '@/components/molecules/page-header/index.tsx'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <PageHeader>
        <Typography variant="h2" className="text-white">
          Vendor A
        </Typography>
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
                </TableRow>
                <TableRow>
                  <TableCell>Lorem Ipsum2</TableCell>
                  <TableCell>Lorem Ipsum Amer2</TableCell>
                  <TableCell>Rp.30000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lorem Ipsum3</TableCell>
                  <TableCell>Lorem Ipsum Amer3</TableCell>
                  <TableCell>Rp.35000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lorem Ipsum4</TableCell>
                  <TableCell>Lorem Ipsum Amer4</TableCell>
                  <TableCell>Rp.40000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lorem Ipsum5</TableCell>
                  <TableCell>Lorem Ipsum Amer5</TableCell>
                  <TableCell>Rp.45000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
