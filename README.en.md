[Русская версия](README.md)

# @revilise/web-utils

A collection of utilities for web development, including React hooks and performance optimization functions.

## 📦 Installation

```bash
npm install @revilise/web-utils
```

## 🚀 Available Functions

### React Hooks

#### `useBEM`
A hook for working with BEM methodology in React components. Allows easy creation of CSS classes following BEM methodology.

**Parameters:**
- `baseClass` - base block class

**Returns:**
- Object with `bem` method for class generation

**Usage example:**
```tsx
import { useBEM } from '@revilise/web-utils/hooks';

const MyComponent = () => {
  const { bem } = useBEM('button');
  
  return (
    <button
       className={bem("button", {
         extraCN: { isRed: true },
         utilCN: ['active']
       })}
    >
      Button
    </button>
  );
};
```

### Utilities

#### `debounce`
Creates a wrapper for a function that delays its execution until a specified time has passed since the last call.

**Parameters:**
- `callback` - function to execute
- `delay` - delay in milliseconds

**Usage example:**
```tsx
import { debounce } from '@revilise/web-utils/libs';

const debouncedSearch = debounce((query: string) => {
  console.log('Searching:', query);
}, 300);

// Usage in event handler
input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

#### `throttle`
Limits the frequency of function calls. Calls the original function no more than once per specified interval.

**Parameters:**
- `callback` - function to execute
- `delay` - interval in milliseconds

**Usage example:**
```tsx
import { throttle } from '@revilise/web-utils/libs';

const throttledScroll = throttle(() => {
  console.log('Scroll event');
}, 100);

window.addEventListener('scroll', throttledScroll);
```

## 📁 Export Structure

The package exports functions in two formats:

```tsx
// React hooks
import { useBEM } from '@revilise/web-utils/hooks';

// Utilities
import { debounce, throttle } from '@revilise/web-utils/libs';
```

## 🛠 Technical Details

- **TypeScript**: Full type support
- **Tree-shaking**: Optimized for tree-shaking
- **ESM/CJS**: Support for ES and CommonJS module systems
- **Size**: Minimal bundle size

## 📄 License

MIT

## 👥 Author

Anastasia Mutnykh (mutnyh.ao@mail.ru)
