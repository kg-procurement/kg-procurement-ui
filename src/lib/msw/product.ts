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
      product_vendors: [
        {
          id: '3',
          product: {
            id: '3',
            product_category_id: '1',
            uom_id: '26',
            income_tax_id: '0',
            product_type_id: '3',
            name: 'Majalah',
            description: 'Majalah',
            modified_date: '2020-11-02T07:44:58Z',
            modified_by: '0',
          },
          price: {
            id: '3',
            price: 450000,
            currency_code: 'IDR',
            vendor_id: '3',
            modified_date: '2024-10-01T14:47:46Z',
            modified_by: '166',
          },
          code: '',
          name: 'Majalah',
          income_tax_id: '0',
          income_tax_name: '',
          income_tax_percentage: '0',
          description: 'Majalah',
          uom_id: '35',
          sap_code: '',
          modified_date: '2020-11-04T11:23:28Z',
          modified_by: '1',
        },
      ],
      metadata: {
        total_page: 1,
        current_page: 1,
        total_entries: 1,
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
