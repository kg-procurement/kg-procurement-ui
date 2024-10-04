import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/atoms/table";
import { Typography } from "@/components/atoms/typography";
import { Footer } from "@/components/molecules/footer";
import { Phone } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="relative flex h-80 w-full flex-col items-center justify-center gap-2 bg-primary">
        <img
          src="kompas-gramedia-logo-bg.svg"
          alt="Kompas Gramedia Logo Background"
          className="absolute left-0 top-0 w-96"
        />
        <Typography variant="h2" className="text-white">
          Vendor A
        </Typography>
        <Typography variant="subtitle1" className="text-white">
          Dashboard
        </Typography>
        <div className="mt-2 flex gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2">
            <Phone color="white" size={16} />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2">
            <Phone color="white" size={16} />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2">
            <Phone color="white" size={16} />
          </div>
        </div>
      </div>
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
  );
}
