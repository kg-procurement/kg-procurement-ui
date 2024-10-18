import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import { UpdateProductResponse } from '@/lib/redux/features/product/validation.ts'

export const productHandlers = [
  http.put(`${API_BASE_URL}/product/:id`, ({ params }) => {
    const { id } = params
    return HttpResponse.json({
      id: Array.isArray(id) ? id[0] : id,
      product_category_id: '38',
      uom_id: '26',
      income_tax_id: '0',
      product_type_id: '3',
      name: 'Juicer',
      description: 'Best Juicer',
      modified_date: '2024-10-17T14:22:28.826745Z',
      modified_by: '0',
    } satisfies UpdateProductResponse)
  }),
]
