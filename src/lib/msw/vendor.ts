import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import {
  GetLocationsResponse,
  GetVendorByIdResponse,
  GetVendorsResponse,
  UpdateVendorResponse,
} from '@/lib/redux/features/vendor/validation.ts'

export const vendorHandlers = [
  http.get(`${API_BASE_URL}/vendor`, () => {
    return HttpResponse.json({
      vendors: [
        {
          id: '2502',
          name: 'Adriza Nikmah, PT',
          description: 'Headset dll',
          bp_id: '2502',
          bp_name: 'Adriza Nikmah, PT',
          rating: 0,
          area_group_id: '1',
          area_group_name: 'Indonesia',
          sap_code: 'None',
          modified_date: '2020-10-29T13:39:12Z',
          modified_by: '0',
          dt: '2024-08-28T00:00:00Z',
        },
        {
          id: '2507',
          name: 'Toko Amazon',
          description: 'Menjual segala macam Kebutuhan Dapur/ Home App...',
          bp_id: '2507',
          bp_name: 'Amazon',
          rating: 0,
          area_group_id: '1',
          area_group_name: 'Indonesia',
          sap_code: 'None',
          modified_date: '2022-11-24T10:12:25Z',
          modified_by: '165',
          dt: '2024-08-28T00:00:00Z',
        },
        {
          id: '2508',
          name: 'Aneka Warna',
          description: 'Vendor Sablon dan Garment',
          bp_id: '2508',
          bp_name: 'Aneka Warna',
          rating: 0,
          area_group_id: '1',
          area_group_name: 'Indonesia',
          sap_code: 'None',
          modified_date: '2020-10-29T13:39:12Z',
          modified_by: '0',
          dt: '2024-08-28T00:00:00Z',
        },
        {
          id: '2509',
          name: 'Angkasa Buana Niaga Cipta, PT',
          description: 'Headset Plantronics',
          bp_id: '2509',
          bp_name: 'Angkasa Buana Niaga Cipta, PT',
          rating: 0,
          area_group_id: '1',
          area_group_name: 'Indonesia',
          sap_code: 'None',
          modified_date: '2020-10-29T13:39:12Z',
          modified_by: '0',
          dt: '2024-08-28T00:00:00Z',
        },
        {
          id: '2511',
          name: 'Apartement Permata Senayan',
          description: '0',
          bp_id: '2511',
          bp_name: 'Apartement Permata Senayan',
          rating: 0,
          area_group_id: '1',
          area_group_name: 'Indonesia',
          sap_code: 'None',
          modified_date: '2020-10-29T13:39:12Z',
          modified_by: '0',
          dt: '2024-08-28T00:00:00Z',
        },
        {
          id: '2512',
          name: 'Arta Muara',
          description: 'Mesin Barcode',
          bp_id: '2512',
          bp_name: 'Arta Muara',
          rating: 0,
          area_group_id: '1',
          area_group_name: 'Indonesia',
          sap_code: 'None',
          modified_date: '2020-10-29T13:39:12Z',
          modified_by: '0',
          dt: '2024-08-28T00:00:00Z',
        },
        {
          id: '2513',
          name: 'Asaba Computer Centre',
          description: 'Miscrosoft Gold Partner',
          bp_id: '2513',
          bp_name: 'Asaba Computer Centre',
          rating: 1,
          area_group_id: '1',
          area_group_name: 'Indonesia',
          sap_code: '102722',
          modified_date: '2022-12-05T11:47:24Z',
          modified_by: '7',
          dt: '2024-08-28T00:00:00Z',
        },
        {
          id: '2514',
          name: 'Astra Graphia TBK, PT',
          description: 'Distributor Xerox',
          bp_id: '2514',
          bp_name: 'Astra Graphia TBK, PT',
          rating: 0,
          area_group_id: '1',
          area_group_name: 'Indonesia',
          sap_code: 'None',
          modified_date: '2020-10-29T13:39:12Z',
          modified_by: '0',
          dt: '2024-08-28T00:00:00Z',
        },
        {
          id: '2515',
          name: 'Asus Service Center',
          description: 'Service Center dan Sales Spare Spart Asus',
          bp_id: '2515',
          bp_name: 'Asus Service Center',
          rating: 0,
          area_group_id: '1',
          area_group_name: 'Indonesia',
          sap_code: 'None',
          modified_date: '2020-10-29T13:39:12Z',
          modified_by: '0',
          dt: '2024-08-28T00:00:00Z',
        },
        {
          id: '2516',
          name: 'Atrindo Asia Global, PT',
          description: 'Penyemprotan Disinfectant',
          bp_id: '2516',
          bp_name: 'Atrindo Asia Global, PT',
          rating: 0,
          area_group_id: '1',
          area_group_name: 'Indonesia',
          sap_code: 'None',
          modified_date: '2020-10-29T13:39:12Z',
          modified_by: '0',
          dt: '2024-08-28T00:00:00Z',
        },
      ],
      metadata: {
        total_page: 10,
        current_page: 1,
        total_entries: 100,
      },
    } satisfies GetVendorsResponse)
  }),
  http.post(`${API_BASE_URL}/vendor/blast`, () => {
    return HttpResponse.json(
      {
        error: [
          '535 5.7.8 Username and Password not accepted. For more information, go to\n5.7.8  https://support.google.com/mail/?p=BadCredentials d2e1a72fcca58-72057931785sm150109b3a.50 - gsmtp',
          '535 5.7.8 Username and Password not accepted. For more information, go to\n5.7.8  https://support.google.com/mail/?p=BadCredentials d2e1a72fcca58-72057939b82sm152223b3a.81 - gsmtp',
        ],
      },
      { status: 207 },
    )
  }),
  http.get(`${API_BASE_URL}/vendor/:id`, (req) => {
    const { id } = req.params
    if (id === '-1') {
      return HttpResponse.json(null, { status: 200 })
    }

    return HttpResponse.json(
      {
        id: '2502',
        name: 'Adriza Nikmah, PT',
        description: 'Headset dll',
        bp_id: '2502',
        bp_name: 'Adriza Nikmah, PT',
        rating: 0,
        area_group_id: '1',
        area_group_name: 'Indonesia',
        sap_code: 'None',
        modified_date: '2020-10-29T13:39:12Z',
        modified_by: '0',
        dt: '2024-08-28T00:00:00Z',
      } satisfies GetVendorByIdResponse,
      { status: 200 },
    )
  }),
  http.put(`${API_BASE_URL}/vendor/:id`, ({ params }) => {
    const { id } = params
    return HttpResponse.json({
      id: Array.isArray(id) ? id[0] : id,
      name: 'Adriza Nikmah, PT',
      description: 'Headset dll',
      bp_id: '2502',
      bp_name: 'Adriza Nikmah, PT',
      rating: 0,
      area_group_id: '1',
      area_group_name: 'Indonesia',
      sap_code: 'None',
      modified_date: '2020-10-29T13:39:12Z',
      modified_by: '0',
      dt: '2024-08-28T00:00:00Z',
    } satisfies UpdateVendorResponse)
  }),
  http.get(`${API_BASE_URL}/vendor/location`, () => {
    return HttpResponse.json({
      locations: ['Jabodetabek', 'Indonesia'],
    } satisfies GetLocationsResponse)
  }),
]
