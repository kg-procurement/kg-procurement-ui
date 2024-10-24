import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { act } from 'react'
import { z } from 'zod'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

import { useQueryErrorHandler } from '../hooks.ts'
import { api } from '../services/api.ts'
import { toastForError } from '../utils.tsx'

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
    createPerson: builder.mutation<Person, Partial<Person>>({
      extraOptions: { responseValidator: personSchema },
      query: arg => ({
        url: '/person',
        method: 'POST',
        body: arg,
      }),
    }),
  }),
})

const { useGetPersonQuery, useThrowsSomethingQuery, useCreatePersonMutation } =
  testApi

describe('Redux integration tests', () => {
  it('should validate response with given schema', async () => {
    mswServer.use(
      http.get(`${API_BASE_URL}/person`, () =>
        HttpResponse.json({ name: 'Bob', age: 20 } satisfies Person),
      ),
    )
    render(
      withWrappers(<SomeQueryComponent useQuery={useGetPersonQuery} />, {
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
      withWrappers(<SomeQueryComponent useQuery={useGetPersonQuery} />, {
        withRoot: true,
      }),
    )
    await waitFor(async () => {
      expect(screen.queryByText('ZOD_PARSING_ERROR')).toBeInTheDocument()
    })
  })

  it('should show error toast if query throws something (specifically SerializedError)', async () => {
    // Disable stderr for this test since we know it will throw an error
    vi.spyOn(console, 'error').mockImplementationOnce(() => undefined)
    render(
      withWrappers(<SomeQueryComponent useQuery={useThrowsSomethingQuery} />, {
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
      withWrappers(<SomeQueryComponent useQuery={useGetPersonQuery} />, {
        withRoot: true,
      }),
    )
    await waitFor(async () => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('500')
      expect(toast.innerText).includes('Some error message here')
    })
  })

  it('should show error toast when toastForError is called', async () => {
    mswServer.use(
      http.post(`${API_BASE_URL}/person`, () =>
        HttpResponse.json({ error: 'what is happening' }, { status: 500 }),
      ),
    )
    render(withWrappers(<SomeMutationComponent />, { withRoot: true }))
    act(() => {
      fireEvent.click(screen.getByText('Trigger'))
    })
    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('500')
      expect(toast.innerText).includes('what is happening')
    })
  })
})

function SomeMutationComponent() {
  const [createPerson] = useCreatePersonMutation()

  const handler = async () => {
    try {
      await createPerson({ age: 15, name: 'Lil Bob' }).unwrap()
    }
    catch (err) {
      toastForError(err)
    }
  }

  return (
    <div>
      <button onClick={handler}>Trigger</button>
    </div>
  )
}

function SomeQueryComponent({
  useQuery,
}: {
  useQuery: typeof useGetPersonQuery | typeof useThrowsSomethingQuery
}) {
  const { data, error } = useQuery()
  useQueryErrorHandler(error)

  return (
    <div>
      <div>{data?.age}</div>
      <div>{data?.name}</div>
    </div>
  )
}
