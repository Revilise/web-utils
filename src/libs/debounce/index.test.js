import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "./index";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it("Вызывает callback только один раз после паузы", () => {
    const cb = vi.fn();
    const debounced = debounce(cb, 100);

    debounced();
    debounced();
    debounced();

    // callback не должен быть вызван сразу
    expect(cb).not.toBeCalled();

    // двигаем таймер
    vi.advanceTimersByTime(99);
    expect(cb).not.toBeCalled();

    vi.advanceTimersByTime(1);
    expect(cb).toBeCalledTimes(1);
  });

  it("Передаёт аргументы в callback", () => {
    const cb = vi.fn();
    const debounced = debounce(cb, 50);

    debounced("a", 1, true);
    vi.advanceTimersByTime(50);

    expect(cb).toBeCalledWith("a", 1, true);
  });

  it("Корректно работает с this", () => {
    const obj = {
      value: 42,
      cb() {
        expect(this.value).toBe(42);
      }
    };

    const debounced = debounce(obj.cb, 20).bind(obj);

    debounced();
    vi.advanceTimersByTime(20);
  });

  it("Callback не вызывается, если не прошло delay", () => {
    const cb = vi.fn();
    const debounced = debounce(cb, 60);

    debounced();
    vi.advanceTimersByTime(59);
    expect(cb).not.toBeCalled();
  });

  it("Callback вызывается для последних аргументов", () => {
    const cb = vi.fn();
    const debounced = debounce(cb, 80);

    debounced("a");
    debounced("b");
    debounced("final");
    vi.advanceTimersByTime(80);

    expect(cb).toBeCalledTimes(1);
    expect(cb).toHaveBeenLastCalledWith("final");
  });
});
