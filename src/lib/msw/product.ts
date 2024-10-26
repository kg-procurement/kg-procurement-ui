import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import {
  GetProductsByVendorResponse,
  UpdateProductResponse,
} from '@/lib/redux/features/product/validation.ts'

export const productHandlers = [
  http.get(`${API_BASE_URL}/product/vendor/:id`, ({ request }) => {
    const url = new URL(request.url)
    const name = url.searchParams.get('name')

    if (name && !'buku'.includes(name.toLowerCase())) {
      // If name doesn't match 'buku', return an empty array
      return HttpResponse.json({
        products: [],
      })
    }

    return HttpResponse.json({
      products: [
        {
          id: '30',
          product_category_id: '38',
          uom_id: '26',
          income_tax_id: '0',
          product_type_id: '3',
          name: 'Kipas Angin',
          description: 'Kipas Angin',
          modified_date: '2020-11-02T07:44:58Z',
          modified_by: '0',
        },
        {
          id: '37',
          product_category_id: '38',
          uom_id: '26',
          income_tax_id: '0',
          product_type_id: '3',
          name: 'Blender',
          description: 'Blender',
          modified_date: '2020-11-02T07:44:58Z',
          modified_by: '0',
        },
        {
          id: '85',
          product_category_id: '38',
          uom_id: '26',
          income_tax_id: '0',
          product_type_id: '3',
          name: 'Remote TV',
          description: 'Remote TV',
          modified_date: '2020-11-02T07:44:58Z',
          modified_by: '0',
        },
      ],
      metadata: {
        total_page: 1,
        current_page: 1,
        total_entries: 3,
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
