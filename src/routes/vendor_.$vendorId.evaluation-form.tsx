import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover.tsx'
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
import PageHeader from '@/components/molecules/page-header.tsx'
import { useLoadingOverlay } from '@/hooks/use-loading-overlay.ts'
import { toast } from '@/hooks/use-toast.ts'
import { useCreateVendorEvaluationMutation, useGetVendorByIdQuery } from '@/lib/redux/features/vendor/api.ts'
import { useQueryErrorHandler } from '@/lib/redux/hooks.ts'
import { toastForError } from '@/lib/redux/utils.tsx'

export const Route = createFileRoute('/vendor/$vendorId/evaluation-form')({
  component: EvaluationFormPage,
})

export default function EvaluationFormPage() {
  const { vendorId } = useParams({ from: '/vendor/$vendorId/evaluation-form' })

  const navigate = useNavigate()

  const {
    data: vendorData,
    error: vendorError,
    isSuccess: isVendorSuccess,
  } = useGetVendorByIdQuery({
    id: vendorId,
  })

  useQueryErrorHandler(vendorError)
  useLoadingOverlay(!isVendorSuccess)

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

  const [penilaianScores, setPenilaianScores] = useState<number[]>(
    kriteriaPenilaian.map(() => 0),
  )

  // implemeneting a manual radio button group logic
  const handleSelectRadioButton = (index: number, value: string) => {
    const temp = [...penilaianScores]
    temp[index] = Number(value)
    setPenilaianScores(temp)
  }

  const handleSubmitEvaluationForm = () => {
    if (penilaianScores.includes(0)) {
      console.log(penilaianScores)
      setTogglePopover(true)
      setTimeout(() => setTogglePopover(false), 2000)
      return
    }
    handleCreateEvaluation()
  }
  const [createVendorEvaluation] = useCreateVendorEvaluationMutation()

  const [togglePopover, setTogglePopover] = useState(false)

  const handleCreateEvaluation = async () => {
    try {
      toast({
        title: 'On Progress',
        description: 'Executing email blast',
        duration: 2000,
      })
      const response = await createVendorEvaluation({
        kesesuaian_produk: penilaianScores[0],
        kualitas_produk: penilaianScores[1],
        ketepatan_waktu_pengiriman: penilaianScores[2],
        kompetitifitas_harga: penilaianScores[3],
        responsivitas_kemampuan_komunikasi: penilaianScores[4],
        kemampuan_dalam_menangani_masalah: penilaianScores[5],
        kelengkapan_barang: penilaianScores[6],
        harga: penilaianScores[7],
        term_of_payment: penilaianScores[8],
        reputasi: penilaianScores[9],
        ketersediaan_barang: penilaianScores[10],
        kualitas_layanan_after_services: penilaianScores[11],
        vendor_id: vendorId,
      }).unwrap()
      console.log(response)
      toast({
        title: 'Success',
        description: 'Email blast has successfully executed',
        duration: 2000,
      })
      navigate({
        to: '/vendor',
        search: {
          page: 1,
          location: '',
          product_name: '',
        },
      })
    }
    catch (err) {
      toastForError(err)
    }
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <PageHeader>
        <Typography variant="h2" className="text-center text-white">
          Vendor Performance
          <br />
          Evaluation Form
        </Typography>
        <Typography variant="body1" className="text-white">
          {vendorData?.name}
        </Typography>
      </PageHeader>
      <div className="flex w-full justify-center">
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
                      <TableCell className="font-medium">{kriteria}</TableCell>
                      {[1, 2, 3, 4].map((value) => {
                        return (
                          <TableCell className="text-center" key={value}>
                            <RadioGroup
                              value={penilaianScores[kriteriaIndex].toString()}
                              className="flex justify-center"
                              onValueChange={(value) => {
                                handleSelectRadioButton(kriteriaIndex, value)
                              }}
                            >
                              <RadioGroupItem
                                value={value.toString()}
                                checked={
                                  penilaianScores[kriteriaIndex] ===
                                  Number(value)
                                }
                              />
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
          <Popover open={togglePopover}>
            <PopoverTrigger asChild>
              <Button onClick={handleSubmitEvaluationForm}>Submit Evaluation</Button>
            </PopoverTrigger>
            <PopoverContent className="p-2">
              <Typography variant="body2" className="text-red-600">
                Some assessment criteria not yet filled
              </Typography>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
