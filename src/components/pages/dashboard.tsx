import { Edit, EllipsisVertical, Phone } from 'lucide-react'
import { useEffect } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Button } from '@/components/atoms/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/atoms/card.tsx'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/atoms/chart.tsx'
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
import { useGetProductsByVendorQuery } from '@/lib/redux/features/product/api.ts'
import { useCommonStore } from '@/lib/zustand/common.ts'

import { Checkbox } from '../atoms/checkbox.tsx'

export default function DashboardPage() {
  const { products, isSuccess } = useGetProductsByVendorQuery(
    { id: '2550' },
    {
      selectFromResult: result => ({
        ...result,
        products: result.data?.products,
      }),
    },
  )

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig
  const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
  ]
  const { setShowLoadingOverlay } = useCommonStore()

  useEffect(() => {
    setShowLoadingOverlay(!isSuccess)
  }, [isSuccess, setShowLoadingOverlay])

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
        <div className="grid h-full w-full flex-grow items-center grid-cols-2 gap-2 rounded-md bg-white p-4 shadow-md">
          <div className="col-span-1 flex flex-col gap-4">
            {/* <Typography variant="h6">Vendor Performance</Typography> */}
            <Card className="border-none">
              <CardHeader>
                <CardDescription>
                  Showing vendor performance by .....
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6" role="charts-content">
                <ChartContainer config={chartConfig} className="">
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={value => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent indicator="dot" hideLabel />
                      }
                    />
                    <Area
                      dataKey="desktop"
                      type="linear"
                      fill="var(--color-desktop)"
                      fillOpacity={0.4}
                      stroke="var(--color-desktop)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <Typography variant="h6">Inventory List</Typography>
            <Input className="text-sm" placeholder="Filter vendor ..." />
            <Table className="border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Modified Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products ?
                  products.map((product, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.modified_date}</TableCell>
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
                    )
                  })
                  : <></>}
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
