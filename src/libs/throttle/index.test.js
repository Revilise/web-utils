import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { throttle } from "./index";

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it("Вызывает callback сразу и только один раз за период", () => {
    const cb = vi.fn();
    const throttled = throttle(cb, 100);

    throttled();
    throttled();
    throttled();

    expect(cb).toBeCalledTimes(1); // первый вызов немедленно
    vi.advanceTimersByTime(99);
    throttled();
    expect(cb).toBeCalledTimes(1);

    vi.advanceTimersByTime(1); // 100 мс прошло — должен вызваться второй раз (если был запрошен)
    expect(cb).toBeCalledTimes(2);
  });

  it("Callback вызывается с последними аргументами", () => {
    const cb = vi.fn();
    const throttled = throttle(cb, 200);

    throttled("a");
    throttled("b");
    throttled("last");
    vi.advanceTimersByTime(200);

    expect(cb).toBeCalledTimes(2);
    expect(cb).toHaveBeenLastCalledWith("last");
  });

  it("Callback корректно работает с this", () => {
    const obj = {
      val: 5,
      cb() {
        expect(this.val).toBe(5);
      }
    };
    const throttled = throttle(obj.cb, 50).bind(obj);

    throttled();
    vi.advanceTimersByTime(50);
    throttled();
    vi.advanceTimersByTime(50);
  });

  it("Если нет новых вызовов — каждрый раз функция вызывается единожды", () => {
    const cb = vi.fn();
    const throttled = throttle(cb, 150);

    throttled("a");
    vi.advanceTimersByTime(150);
    expect(cb).toBeCalledTimes(1);

    vi.advanceTimersByTime(150);
    expect(cb).toBeCalledTimes(1);
  });

  it("Много вызовов подряд, но отрабатывает только первый и последний", () => {
    const cb = vi.fn();
    const throttled = throttle(cb, 100);

    throttled("1");
    throttled("2");
    throttled("3");
    vi.advanceTimersByTime(99);
    throttled("4");
    throttled("5");
    vi.advanceTimersByTime(1);

    expect(cb).toBeCalledTimes(2);
    expect(cb).toHaveBeenLastCalledWith("5");
  });
});
