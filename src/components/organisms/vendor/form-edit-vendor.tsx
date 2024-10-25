import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import { Input } from '@/components/atoms/input.tsx'
import { Label } from '@/components/atoms/label.tsx'
import { useUpdateVendorMutation } from '@/lib/redux/features/vendor/api.ts'
import { Vendor } from '@/schemas/vendor.ts'

export interface VendorFormProps {
  initialData: Vendor
  onDone?: () => void
}

export default function EditVendorForm({
  initialData,
  onDone,
}: VendorFormProps) {
  const onDoneRef = useRef<() => void>()

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  const [updateVendor, { isLoading }] = useUpdateVendorMutation()

  const [data, setData] = useState<
    Pick<Vendor, 'name' | 'description' | 'rating'>
  >({
    name: initialData.name,
    description: initialData.description,
    rating: initialData.rating,
  })

  const handleSave = useCallback(async () => {
    try {
      await updateVendor({
        id: initialData.id,
        payload: { ...initialData, ...data },
      }).unwrap()
    }
    catch (e) {
      console.error('Something went wrong when trying to update vendor:', e)
    }
    finally {
      onDoneRef.current?.()
    }
  }, [data, initialData, updateVendor])

  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="id" className="mb-1 mt-3">
            ID
          </Label>
          <Input
            data-testid="id-input"
            name="id"
            value={initialData.id}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="bp_id" className="mb-1 mt-3">
            BP ID
          </Label>
          <Input
            data-testid="bp_id-input"
            name="bp_id"
            value={initialData.bp_id}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="bp_name" className="mb-1 mt-3">
            BP Name
          </Label>
          <Input
            data-testid="bp_name-input"
            name="bp_name"
            value={initialData.bp_name}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="area_group_id" className="mb-1 mt-3">
            Area Group ID
          </Label>
          <Input
            data-testid="area_group_id-input"
            name="area_group_id"
            value={initialData.area_group_id}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="area_group_name" className="mb-1 mt-3">
            Area Group Name
          </Label>
          <Input
            data-testid="area_group_name-input"
            name="area_group_name"
            value={initialData.area_group_name}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="sap_code" className="mb-1 mt-3">
            SAP Code
          </Label>
          <Input
            data-testid="sap_code-input"
            name="sap_code"
            value={initialData.sap_code}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="rating" className="mb-1 mt-3">
            Rating
          </Label>
          <Input
            data-testid="rating-input"
            name="rating"
            type="number"
            value={data.rating}
            onChange={e =>
              setData(prev => ({
                ...prev,
                rating: parseFloat(e.target.value),
              }))}
          />
        </div>
        <div>
          <Label htmlFor="name" className="mb-1 mt-3">
            Name
          </Label>
          <Input
            data-testid="name-input"
            name="name"
            value={data.name}
            onChange={e =>
              setData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="description" className="mb-1 mt-3">
            Description
          </Label>
          <Input
            data-testid="description-input"
            name="description"
            value={data.description}
            onChange={e =>
              setData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="dt" className="mb-1 mt-3">
            DT
          </Label>
          <Input
            data-testid="dt-input"
            name="dt"
            type="date"
            value={initialData.dt}
            disabled
          />
        </div>
      </div>

      <div className="mt-5">
        <Button
          data-testid="save-button"
          className="w-full"
          isLoading={isLoading}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
