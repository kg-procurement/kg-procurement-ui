// mixpanelClient.test.ts
import { MixpanelContext, NoOpMixpanelStrategy } from "../index";
import { describe, test, expect, afterEach, vi } from "vitest";

describe("MixpanelClient Strategy Selection", () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.resetModules();
  });

  test("uses ProductionMixpanelStrategy when NODE_ENV is production", async () => {
    process.env.NODE_ENV = "production";
    vi.resetModules();
    const { mixpanelClient } = await import("../index");
    expect(mixpanelClient.getStrategy().constructor.name).toBe(
      "ProductionMixpanelStrategy",
    );
  });

  test("uses NoOpMixpanelStrategy when NODE_ENV is not production", async () => {
    process.env.NODE_ENV = "development";
    vi.resetModules();
    const { mixpanelClient } = await import("../index");
    expect(mixpanelClient.getStrategy().constructor.name).toBe(
      "NoOpMixpanelStrategy",
    );
  });
});

describe("MixpanelClient Method Delegation", () => {
  test("identify method delegates to strategy.identify", () => {
    const mockStrategy = {
      identify: vi.fn(),
      alias: vi.fn(),
      track: vi.fn(),
      peopleSet: vi.fn(),
    };

    const mixpanelClient = new MixpanelContext(mockStrategy);

    mixpanelClient.identify("user-id");
    expect(mockStrategy.identify).toHaveBeenCalledWith("user-id");
  });

  test("alias method delegates to strategy.alias", () => {
    const mockStrategy = {
      identify: vi.fn(),
      alias: vi.fn(),
      track: vi.fn(),
      peopleSet: vi.fn(),
    };

    const mixpanelClient = new MixpanelContext(mockStrategy);

    mixpanelClient.alias("new-user-id");
    expect(mockStrategy.alias).toHaveBeenCalledWith("new-user-id");
  });

  test("track method delegates to strategy.track", () => {
    const mockStrategy = {
      identify: vi.fn(),
      alias: vi.fn(),
      track: vi.fn(),
      peopleSet: vi.fn(),
    };

    const mixpanelClient = new MixpanelContext(mockStrategy);

    mixpanelClient.track("EventName", { property: "value" });
    expect(mockStrategy.track).toHaveBeenCalledWith("EventName", {
      property: "value",
    });
  });

  test("peopleSet method delegates to strategy.peopleSet", () => {
    const mockStrategy = {
      identify: vi.fn(),
      alias: vi.fn(),
      track: vi.fn(),
      peopleSet: vi.fn(),
    };

    const mixpanelClient = new MixpanelContext(mockStrategy);

    mixpanelClient.peopleSet({ prop: "value" });
    expect(mockStrategy.peopleSet).toHaveBeenCalledWith({ prop: "value" });
  });
});

describe("NoOpMixpanelStrategy", () => {
  const noOpStrategy = new NoOpMixpanelStrategy();

  test("identify method does not throw error", () => {
    expect(() => noOpStrategy.identify("user-id")).not.toThrow();
  });

  test("alias method does not throw error", () => {
    expect(() => noOpStrategy.alias("new-user-id")).not.toThrow();
  });

  test("track method does not throw error", () => {
    expect(() =>
      noOpStrategy.track("EventName", { property: "value" }),
    ).not.toThrow();
  });

  test("peopleSet method does not throw error", () => {
    expect(() => noOpStrategy.peopleSet({ prop: "value" })).not.toThrow();
  });
});