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
            product_category: {
              id: '59',
              category_name: 'Stationary',
              description: 'Kertas, Amplot, Balpen, Ordner, Binder, Staple...',
              modified_date: '2020-10-27T23:20:39Z',
              modified_by: '0',
            },
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
  http.get(`${API_BASE_URL}/product/vendor`, ({ request }) => {
    const url = new URL(request.url)
    const name = url.searchParams.get('name')
    if (name && !name.toLowerCase().includes('buku') && !name.toLowerCase().includes('koran') && !name.toLowerCase().includes('majalah')) {
      return HttpResponse.json({
        product_vendors: null,
        metadata: {
          total_page: 0,
          current_page: 0,
          total_entries: 0,
        },
      } satisfies GetProductsByVendorResponse)
    }
    else if (name && name.toLowerCase().includes('buku')) {
      return HttpResponse.json({
        product_vendors: [
          {
            id: '1',
            product: {
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
            price: {
              id: '1',
              price: 23000,
              currency_code: 'IDR',
              vendor_id: '1',
              modified_date: '2024-10-01T15:16:47Z',
              modified_by: '1075',
            },
            code: '',
            name: 'Buku',
            income_tax_id: '0',
            income_tax_name: '',
            income_tax_percentage: '0',
            description: 'Buku',
            uom_id: '26',
            sap_code: '',
            modified_date: '2020-11-11T13:22:16Z',
            modified_by: '151',
          },
        ],
        metadata: {
          total_page: 1,
          current_page: 1,
          total_entries: 1,
        },
      } satisfies GetProductsByVendorResponse)
    }

    return HttpResponse.json({
      product_vendors: [
        {
          id: '1',
          product: {
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
          price: {
            id: '1',
            price: 23000,
            currency_code: 'IDR',
            vendor_id: '1',
            modified_date: '2024-10-01T15:16:47Z',
            modified_by: '1075',
          },
          code: '',
          name: 'Buku',
          income_tax_id: '0',
          income_tax_name: '',
          income_tax_percentage: '0',
          description: 'Buku',
          uom_id: '26',
          sap_code: '',
          modified_date: '2020-11-11T13:22:16Z',
          modified_by: '151',
        },
        {
          id: '2',
          product: {
            id: '2',
            product_category_id: '1',
            uom_id: '26',
            income_tax_id: '0',
            product_type_id: '3',
            name: 'Koran',
            description: 'Koran',
            modified_date: '2020-11-02T07:44:58Z',
            modified_by: '0',
          },
          price: {
            id: '2',
            price: 290000,
            currency_code: 'IDR',
            vendor_id: '2',
            modified_date: '2024-10-01T14:47:46Z',
            modified_by: '166',
          },
          code: '',
          name: 'Koran',
          income_tax_id: '0',
          income_tax_name: '',
          income_tax_percentage: '0',
          description: 'Koran',
          uom_id: '26',
          sap_code: '',
          modified_date: '2020-11-02T14:49:06Z',
          modified_by: '0',
        },
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
        total_entries: 3,
      },
    } satisfies GetProductsByVendorResponse)
  }),
  http.put(`${API_BASE_URL}/product/:id`, ({ params }) => {
    const { id } = params
    return HttpResponse.json({
      id: Array.isArray(id) ? id[0] : id,
      product_category: {
        id: '59',
        category_name: 'Stationary',
        description: 'Kertas, Amplot, Balpen, Ordner, Binder, Staple...',
        modified_date: '2020-10-27T23:20:39Z',
        modified_by: '0',
      },
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
