import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { z } from 'zod'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { useErrorToast } from '@/lib/redux/hooks.ts'
import { api } from '@/lib/redux/services/api.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

const personSchema = z.object({
  name: z.string(),
  age: z.number(),
})

type Person = z.infer<typeof personSchema>

const testApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    getPerson: builder.query<Person, void>({
      extraOptions: {
        responseValidator: personSchema,
      },
      query: () => ({
        url: '/person',
        method: 'GET',
      }),
    }),
    throwsSomething: builder.query<Person, void>({
      query: () => {
        throw Error('Dummy Error thrown by test')
      },
    }),
  }),
})

const { useGetPersonQuery, useThrowsSomethingQuery } = testApi

describe('Redux integration tests', () => {
  it('should validate response with given schema', async () => {
    mswServer.use(
      http.get(`${API_BASE_URL}/person`, () =>
        HttpResponse.json({ name: 'Bob', age: 20 } satisfies Person),
      ),
    )
    render(
      withWrappers(<SomeComponent useQuery={useGetPersonQuery} />, {
        withRoot: true,
      }),
    )
    await waitForNoLoadingOverlay()
    expect(screen.queryByText('Bob')).toBeInTheDocument()
  })

  it('should show error toast if response does not match responseValidator', async () => {
    mswServer.use(
      http.get(`${API_BASE_URL}/person`, () => HttpResponse.json({ age: 20 })),
    )
    render(
      withWrappers(<SomeComponent useQuery={useGetPersonQuery} />, {
        withRoot: true,
      }),
    )
    await waitFor(async () => {
      expect(screen.queryByText('PARSING_ERROR')).toBeInTheDocument()
    })
  })

  it('should show error toast if query throws something (specifically SerializedError)', async () => {
    // Disable stderr for this test since we know it will throw an error
    vi.spyOn(console, 'error').mockImplementationOnce(() => undefined)
    render(
      withWrappers(<SomeComponent useQuery={useThrowsSomethingQuery} />, {
        withRoot: true,
      }),
    )
    await waitFor(async () => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('Dummy Error thrown by test')
    })
  })

  it('should show error toast when API returns non 2xx status code', async () => {
    mswServer.use(
      http.get(`${API_BASE_URL}/person`, () =>
        HttpResponse.json(
          { error: 'Some error message here' },
          { status: 500 },
        ),
      ),
    )
    render(
      withWrappers(<SomeComponent useQuery={useGetPersonQuery} />, {
        withRoot: true,
      }),
    )
    await waitFor(async () => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('500')
      expect(toast.innerText).includes('Some error message here')
    })
  })
})

function SomeComponent({
  useQuery,
}: {
  useQuery: typeof useGetPersonQuery | typeof useThrowsSomethingQuery
}) {
  const { data, error } = useQuery()
  useErrorToast(error)

  return (
    <div>
      <div>{data?.age}</div>
      <div>{data?.name}</div>
    </div>
  )
}
