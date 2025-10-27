[English version](README.en.md)

# @revilise/web-utils

Набор утилит для веб-разработки, включающий React хуки и полезные функции для оптимизации производительности.

## 📦 Установка

```bash
npm install @revilise/web-utils
```

## 🚀 Доступные функции

### React Hooks

#### `useBEM`
Хук для работы с BEM методологией в React компонентах. Позволяет легко создавать CSS классы по методологии БЭМ.

**Параметры:**
- `baseClass` - базовый класс блока

**Возвращает:**
- Объект с методом `bem` для генерации классов

**Пример использования:**
```tsx
import { useBEM } from '@revilise/web-utils/hooks';

const MyComponent = () => {
  const { bem } = useBEM('button');
  
  return (
    <button 
      className={bem({
        baseClass: 'button',
        extraClasses: { isRed: true },
        utilClasses: ['active']
      })}
    >
      Нажми на меня
    </button>
  );
};
```
Результат

```html
<button class="button button--isRed active">Нажми на меня</button>
```

### Утилиты

#### `debounce`
Создает обёртку для функции, которая откладывает её выполнение до тех пор, пока не пройдет заданное время после последнего вызова.

**Параметры:**
- `callback` - функция для выполнения
- `delay` - задержка в миллисекундах

**Пример использования:**
```tsx
import { debounce } from '@revilise/web-utils/libs';

const debouncedSearch = debounce((query: string) => {
  console.log('Поиск:', query);
}, 300);

// Использование в обработчике событий
input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

#### `throttle`
Ограничивает частоту вызовов функции. Вызывает исходную функцию не чаще одного раза в указанный интервал.

**Параметры:**
- `callback` - функция для выполнения
- `delay` - интервал в миллисекундах

**Пример использования:**
```tsx
import { throttle } from '@revilise/web-utils/libs';

const throttledScroll = throttle(() => {
  console.log('Событие прокрутки');
}, 100);

window.addEventListener('scroll', throttledScroll);
```

## 📁 Структура экспорта

Пакет экспортирует функции в двух форматах:

```tsx
// React хуки
import { useBEM } from '@revilise/web-utils/hooks';

// Утилиты
import { debounce, throttle } from '@revilise/web-utils/libs';
```

## 🛠 Технические детали

- **TypeScript**: Полная поддержка типов
- **Tree-shaking**: Оптимизирован для tree-shaking
- **ESM/CJS**: Поддержка модульных систем ES и CommonJS
- **Размер**: Только самое важное

## 📄 Лицензия

MIT

## 👥 Автор

Anastasia Mutnykh (mutnyh.ao@mail.ru)
