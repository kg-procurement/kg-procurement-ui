import { createFileRoute, useParams } from '@tanstack/react-router'
import { Edit, Phone } from 'lucide-react'
import { useEffect } from 'react'
import { useState } from 'react'
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
import { Typography } from '@/components/atoms/typography.tsx'
import VendorProductTable from '@/components/features/vendor-product-table.tsx'
import { Footer } from '@/components/molecules/footer.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'
import { useGetProductsByVendorQuery } from '@/lib/redux/features/product/api.ts'
import { useQueryErrorHandler } from '@/lib/redux/hooks.ts'
import { useCommonStore } from '@/lib/zustand/common.ts'

export const Route = createFileRoute('/dashboard/vendor/$vendorId')({
  component: () => <VendorDetailPage />,
})

export default function VendorDetailPage() {
  const { vendorId } = useParams({ from: '/dashboard/vendor/$vendorId' })
  const [page, setPage] = useState<number>(1)
  const { products, isSuccess, error, metadata } = useGetProductsByVendorQuery(
    { id: vendorId, limit: 1, page },
    {
      selectFromResult: result => ({
        ...result,
        products: result.data?.products,
        metadata: result.data?.metadata,
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

  useQueryErrorHandler(error)
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
        <div className="grid h-full w-full flex-grow grid-cols-2 items-center gap-2 rounded-md bg-white p-4 shadow-md">
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
            {products && metadata && isSuccess && (
              <VendorProductTable
                current_page={metadata.current_page}
                products={products}
                setPage={setPage}
                total_page={metadata.total_page}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
