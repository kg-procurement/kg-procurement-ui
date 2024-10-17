import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'

import { GetProductsByVendorResponse } from '../redux/features/product/validation.ts'

export const productHandlers = [
  http.get(`${API_BASE_URL}`, () => {
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
    } satisfies GetProductsByVendorResponse)
  }),
]
