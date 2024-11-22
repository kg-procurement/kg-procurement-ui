import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-button.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/table.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import { Footer } from '@/components/molecules/footer.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'

export const Route = createFileRoute('/vendor/evaluation-form')({
  component: EvaluationFormPage,
})

export default function EvaluationFormPage() {
  const kriteriaPenilaian: string[] = [
    'Kesesuaian produk/jasa dengan spesifikasi',
    'Kualitas produk/jasa',
    'Ketepatan waktu pengiriman/penyelesaian',
    'Kompetitifitas harga',
    'Responsivitas dan kemampuan komunikasi',
    'Kemampuan dalam menangani masalah/keluhan',
    'Kelengkapan Barang (Vendor Konvensional)',
    'Harga (Vendor Konvensional & Online)',
    'Term of Payment (Vendor Konvensional)',
    'Reputasi (Vendor Online)',
    'Ketersediaan Barang (Vendor Konvensional)',
    'Kualitas layanan after services* (jika ada?)',
  ]

  const [penilaianScores, setPenilaianScores] = useState<number[]>(kriteriaPenilaian.map(() => 0))

  // implemeneting a manual radio button group logic
  const handleSelectRadioButton = (index: number, value: string) => {
    const temp = [...penilaianScores]
    temp[index] = Number(value)
    setPenilaianScores(temp)
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-10">
      <PageHeader>
        <Typography variant="h2" className="text-white text-center">
          Vendor Performance
          <br />
          Evaluation Form
        </Typography>
        <Typography variant="body1" className="text-white">
          Vendor A
        </Typography>
      </PageHeader>
      <div className="flex justify-center w-full">
        <div className="flex w-2/3 flex-col gap-5 rounded-lg border p-6 shadow-xl">
          <div className="w-full rounded-lg border">
            <Table data-testid="vendor-evaluation-form-table">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    Kriterian penilaian
                  </TableHead>
                  <TableHead className="w-[100px] text-center">1</TableHead>
                  <TableHead className="w-[100px] text-center">2</TableHead>
                  <TableHead className="w-[100px] text-center">3</TableHead>
                  <TableHead className="w-[100px] text-center">4</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kriteriaPenilaian.map((kriteria, kriteriaIndex) => {
                  return (
                    <TableRow key={kriteria}>
                      <TableCell className="font-medium">
                        {kriteria}
                      </TableCell>
                      {[1, 2, 3, 4].map((value) => {
                        return (
                          <TableCell className="text-center" key={value}>
                            <RadioGroup
                              defaultValue="0"
                              className="flex justify-center"
                              onValueChange={(value) => {
                                handleSelectRadioButton(kriteriaIndex, value)
                              }}
                            >
                              <RadioGroupItem value={value} checked={penilaianScores[kriteriaIndex] === Number(value)} />
                            </RadioGroup>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
