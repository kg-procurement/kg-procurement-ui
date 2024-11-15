import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import { Input } from '@/components/atoms/input.tsx'
import { Label } from '@/components/atoms/label.tsx'
import { useUpdateProductMutation } from '@/lib/redux/features/product/api.ts'
import { Product } from '@/schemas/product.ts'

export interface ProductFormProps {
  initialData: Product
  onDone?: () => void
}

export default function ProductForm({ initialData, onDone }: ProductFormProps) {
  const onDoneRef = useRef<() => void>()

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const [data, setData] = useState<Pick<Product, 'name' | 'description'>>({
    ...initialData,
  })

  const handleSave = useCallback(async () => {
    try {
      await updateProduct({
        id: initialData.id,
        payload: { ...initialData, ...data },
      }).unwrap()
    }
    catch (e) {
      console.log('something went when trying to update product', e)
    }
    finally {
      onDoneRef.current?.()
    }
  }, [data, initialData, updateProduct])

  return (
    <div className="flex w-full flex-col">
      <Label htmlFor="id" className="mb-1 mt-3">
        ID
      </Label>
      <Input data-testid="id-input" name="id" value={initialData.id} disabled />
      <Label htmlFor="income_tax_id" className="mb-1 mt-3">
        Income Tax ID
      </Label>
      <Input name="income_tax_id" value={initialData.income_tax_id} disabled />
      <Label htmlFor="uom_id" className="mb-1 mt-3">
        UOM ID
      </Label>
      <Input name="uom_id" value={initialData.uom_id} disabled />
      <Label htmlFor="product_type_id" className="mb-1 mt-3">
        Product Type ID
      </Label>
      <Input
        name="product_type_id"
        value={initialData.product_type_id}
        disabled
      />
      <Label htmlFor="product_category_id" className="mb-1 mt-3">
        Product Category ID
      </Label>
      <Input
        name="product_category_id"
        value={initialData.product_category.id}
        disabled
      />
      <Label htmlFor="name" className="mb-1 mt-3">
        Name
      </Label>
      <Input
        data-testid="name-input"
        name="name"
        value={data.name}
        onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
      />
      <Label htmlFor="description" className="mb-1 mt-3">
        Description
      </Label>
      <Input
        name="description"
        value={data.description}
        onChange={e =>
          setData(prev => ({ ...prev, description: e.target.value }))}
      />
      <Button
        className="mt-5 w-full"
        isLoading={isLoading}
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  )
}
