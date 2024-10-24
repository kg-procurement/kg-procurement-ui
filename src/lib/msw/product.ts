import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import { GetProductsByVendorResponse, UpdateProductResponse } from '@/lib/redux/features/product/validation.ts'

export const productHandlers = [
  http.get(`${API_BASE_URL}/product/vendor/:id`, (req) => {
    const { id } = req.params

    if (id === '-1') {
      return HttpResponse.json(null, { status: 200 })
    }

    return HttpResponse.json({
      products: [
        {
          id: '1',
          product_category_id: '59',
          uom_id: '26',
          income_tax_id: '0',
          product_type_id: '3',
          name: 'Buku',
          description: 'Buku',
          modified_date: '2023-08-11T10:39:47Z',
          modified_by: '1008',
        },
      ],
      metadata: {
        total_page: 1,
        current_page: 1,
        total_entries: 4,
      },
    } satisfies GetProductsByVendorResponse)
  }),
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
