import mixpanel from 'mixpanel-browser'

export interface MixpanelStrategy {
  identify(id: string): void
  alias(id: string): void
  track(name: string, props?: Record<string, string>): void
  peopleSet(props: Record<string, string>): void
}

export class ProductionMixpanelStrategy implements MixpanelStrategy {
  identify(id: string): void {
    mixpanel.identify(id)
  }

  alias(id: string): void {
    mixpanel.alias(id)
  }

  track(name: string, props?: Record<string, string>): void {
    mixpanel.track(name, props)
  }

  peopleSet(props: Record<string, string>): void {
    mixpanel.people.set(props)
  }
}

// for development and testing purposes
export class NoOpMixpanelStrategy implements MixpanelStrategy {
  identify(_: string): void {
    // No operation in nonproduction
  }

  alias(_: string): void {
    // No operation in nonproduction
  }

  track(_: string, __?: Record<string, string>): void {
    // No operation in nonproduction
  }

  peopleSet(_: Record<string, string>): void {
    // No operation in nonproduction
  }
}

export class MixpanelContext {
  private strategy: MixpanelStrategy

  constructor(strategy: MixpanelStrategy) {
    this.strategy = strategy
  }

  public getStrategy(): MixpanelStrategy {
    return this.strategy
  }

  public setStrategy(strategy: MixpanelStrategy): void {
    this.strategy = strategy
  }

  public identify(id: string): void {
    this.strategy.identify(id)
  }

  public alias(id: string): void {
    this.strategy.alias(id)
  }

  public track(name: string, props?: Record<string, string>): void {
    this.strategy.track(name, props)
  }

  public peopleSet(props: Record<string, string>): void {
    this.strategy.peopleSet(props)
  }
}

export const strategy =
  process.env.NODE_ENV === 'production'
    ? new ProductionMixpanelStrategy()
    : new NoOpMixpanelStrategy()

const mixpanelClient = new MixpanelContext(strategy)

export { mixpanelClient }
