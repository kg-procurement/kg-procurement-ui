import mixpanel from 'mixpanel-browser'

import { MixpanelContext, NoOpMixpanelStrategy, ProductionMixpanelStrategy } from '../index.ts'

vi.mock('mixpanel-browser', () => ({
  default: {
    init: vi.fn(),
    identify: vi.fn(),
    alias: vi.fn(),
    track: vi.fn(),
    people: {
      set: vi.fn(),
    },
  },
}))

describe('MixpanelClient Strategy Selection', () => {
  const originalEnv = process.env.NODE_ENV

  afterEach(() => {
    process.env.NODE_ENV = originalEnv
    vi.resetModules()
  })

  test('uses ProductionMixpanelStrategy when NODE_ENV is production', async () => {
    process.env.NODE_ENV = 'production'
    vi.resetModules()
    const { mixpanelClient } = await import('../index.ts')
    expect(mixpanelClient.getStrategy().constructor.name).toBe(
      'ProductionMixpanelStrategy',
    )
  })

  test('uses NoOpMixpanelStrategy when NODE_ENV is not production', async () => {
    process.env.NODE_ENV = 'development'
    vi.resetModules()
    const { mixpanelClient } = await import('../index.ts')
    expect(mixpanelClient.getStrategy().constructor.name).toBe(
      'NoOpMixpanelStrategy',
    )
  })
})

describe('MixpanelClient Method Delegation', () => {
  test('identify method delegates to strategy.identify', () => {
    const mockStrategy = {
      identify: vi.fn(),
      alias: vi.fn(),
      track: vi.fn(),
      peopleSet: vi.fn(),
    }

    const mixpanelClient = new MixpanelContext(mockStrategy)

    mixpanelClient.identify('user-id')
    expect(mockStrategy.identify).toHaveBeenCalledWith('user-id')
  })

  test('alias method delegates to strategy.alias', () => {
    const mockStrategy = {
      identify: vi.fn(),
      alias: vi.fn(),
      track: vi.fn(),
      peopleSet: vi.fn(),
    }

    const mixpanelClient = new MixpanelContext(mockStrategy)

    mixpanelClient.alias('new-user-id')
    expect(mockStrategy.alias).toHaveBeenCalledWith('new-user-id')
  })

  test('track method delegates to strategy.track', () => {
    const mockStrategy = {
      identify: vi.fn(),
      alias: vi.fn(),
      track: vi.fn(),
      peopleSet: vi.fn(),
    }

    const mixpanelClient = new MixpanelContext(mockStrategy)

    mixpanelClient.track('EventName', { property: 'value' })
    expect(mockStrategy.track).toHaveBeenCalledWith('EventName', {
      property: 'value',
    })
  })

  test('peopleSet method delegates to strategy.peopleSet', () => {
    const mockStrategy = {
      identify: vi.fn(),
      alias: vi.fn(),
      track: vi.fn(),
      peopleSet: vi.fn(),
    }

    const mixpanelClient = new MixpanelContext(mockStrategy)

    mixpanelClient.peopleSet({ prop: 'value' })
    expect(mockStrategy.peopleSet).toHaveBeenCalledWith({ prop: 'value' })
  })
})

describe('NoOpMixpanelStrategy', () => {
  const noOpStrategy = new NoOpMixpanelStrategy()

  test('identify method does not throw error', () => {
    expect(() => noOpStrategy.identify('user-id')).not.toThrow()
  })

  test('alias method does not throw error', () => {
    expect(() => noOpStrategy.alias('new-user-id')).not.toThrow()
  })

  test('track method does not throw error', () => {
    expect(() =>
      noOpStrategy.track('EventName', { property: 'value' }),
    ).not.toThrow()
  })

  test('peopleSet method does not throw error', () => {
    expect(() => noOpStrategy.peopleSet({ prop: 'value' })).not.toThrow()
  })
})

describe('ProductionMixpanelStrategy', () => {
  let strategy: ProductionMixpanelStrategy

  beforeEach(() => {
    vi.clearAllMocks()
    strategy = new ProductionMixpanelStrategy()
  })

  test('identify should call mixpanel.identify with correct id', () => {
    const testId = 'test-user-id'
    strategy.identify(testId)
    expect(mixpanel.identify).toHaveBeenCalledWith(testId)
  })

  test('alias should call mixpanel.alias with correct id', () => {
    const testId = 'test-alias-id'
    strategy.alias(testId)
    expect(mixpanel.alias).toHaveBeenCalledWith(testId)
  })

  test('track should call mixpanel.track with correct name and props', () => {
    const eventName = 'test-event'
    const eventProps = { key: 'value' }
    strategy.track(eventName, eventProps)
    expect(mixpanel.track).toHaveBeenCalledWith(eventName, eventProps)
  })

  test('peopleSet should call mixpanel.people.set with correct props', () => {
    const props = { name: 'Test User' }
    strategy.peopleSet(props)
    expect(mixpanel.people.set).toHaveBeenCalledWith(props)
  })
})

describe('MixpanelContext setStrategy', () => {
  let context: MixpanelContext
  let noOpStrategy: NoOpMixpanelStrategy
  let productionStrategy: ProductionMixpanelStrategy

  beforeEach(() => {
    vi.clearAllMocks()
    noOpStrategy = new NoOpMixpanelStrategy()
    productionStrategy = new ProductionMixpanelStrategy()
    context = new MixpanelContext(noOpStrategy)
  })

  test('should update strategy when setStrategy is called', () => {
    context.setStrategy(productionStrategy)
    expect(context['strategy']).toBe(productionStrategy)
  })

  test('should use new strategy for tracking after setStrategy', () => {
    context.track('test-event')
    expect(mixpanel.track).not.toHaveBeenCalled()

    context.setStrategy(productionStrategy)
    context.track('test-event')
    expect(mixpanel.track).toHaveBeenCalledWith('test-event', undefined)
  })

  test('should use new strategy for identify after setStrategy', () => {
    const userId = 'test-user'
    context.setStrategy(productionStrategy)
    context.identify(userId)
    expect(mixpanel.identify).toHaveBeenCalledWith(userId)
  })
})
