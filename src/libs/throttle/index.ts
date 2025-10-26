/**
 * Ограничивает частоту вызовов функции.
 *
 * Возвращает новую обёртку, которая вызывает исходный `callback` не чаще,
 * чем один раз в указанный интервал `delay`. Если во время ожидания поступают
 * новые вызовы, они откладываются и выполняются после следующего разрешённого интервала.
 *
 * @template T
 * @param {T} callback - Исходная функция, которую нужно ограничить по частоте вызова.
 * @param {number} delay - Интервал в миллисекундах, определяющий, как часто можно вызывать `callback`.
 *
 * @returns {(...args: Parameters<T>) => void} Обёртка, выполняющая throttle‑логику.
 *
 * @example
 * const throttledScroll = throttle(() => {
 *   console.log('scroll event');
 * }, 1000);
 *
 * window.addEventListener('scroll', throttledScroll);
 */
export function throttle<T extends (...args: any[]) => void>(callback: T, delay: number) {
  let shouldWait = false;
  let pendingArgs: Parameters<T> | null = null;

  const timeoutFunc = () => {
    if (pendingArgs === null) {
      shouldWait = false;
    } else {
      callback(...pendingArgs);
      pendingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (shouldWait) {
      pendingArgs = args;
      return;
    }

    callback.apply(this, args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}
