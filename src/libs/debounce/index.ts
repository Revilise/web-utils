/**
 * Создает обёртку для функции, которая откладывает её выполнение
 * до тех пор, пока не пройдет заданное время `delay` после последнего вызова.
 *
 * Это полезно для оптимизации частых событий, например:
 * ввод текста, изменение размера окна, прокрутка или ресайз изображений.
 *
 * Например, если пользователь непрерывно вводит текст, обработчик срабатывает
 * только один раз — спустя `delay` миллисекунд после последнего нажатия клавиши.
 *
 * @template T
 * @param {T} callback - Функция, которую нужно выполнить после периода "тишины".
 * @param {number} delay - Время задержки (в миллисекундах) перед вызовом `callback`.
 *
 * @returns Возвращает новую функцию, которая реализует поведение debounce.
 *
 * @example
 * // Пример: выполнение запроса только после паузы в наборе текста
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Ищем:', query);
 * }, 300);
 *
 * document.querySelector('input')?.addEventListener('input', (e) => {
 *   debouncedSearch((e.target as HTMLInputElement).value);
 * });
 */
export function debounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delay);
  };
}
