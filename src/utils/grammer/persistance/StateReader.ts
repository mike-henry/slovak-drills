import type Persistance from './Persistance';

export function readPersistentState<T extends object>({
  key,
  persistance,
  create,
  debounceMs = 50,
}: {
  key: string;
  persistance: Persistance<T>;
  create: () => T;
  debounceMs?: number;
}): T {
  let isApplyingRemoteUpdate = false;

  const persist = debounce(() => {
    if (!isApplyingRemoteUpdate) {
      persistance.save(key, state);
    }
  }, debounceMs);

  // Use your existing API
  const state = persistance.read(key, create);

  const proxy = createDeepProxy(state, persist);

  // Optional cross-tab sync (browser only)
  // 🔔 Capability check

  persistance.subscribe?.(key, (incoming) => {
    isApplyingRemoteUpdate = true;
    replaceState(state, incoming);
    isApplyingRemoteUpdate = false;
  });

  return proxy;
}

function replaceState(target: any, source: any): void {
  // 1. Remove keys that no longer exist
  for (const key of Object.keys(target)) {
    if (!(key in source)) {
      delete target[key];
    }
  }

  // 2. Add / update keys
  for (const key of Object.keys(source)) {
    const src = source[key];

    if (src && typeof src === 'object' && !Array.isArray(src)) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      replaceState(target[key], src); // fine as long as there's not reference loops
    } else {
      target[key] = src;
    }
  }
}

export function debounce(fn: () => void, ms: number): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return () => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = undefined;
      fn();
    }, ms);
  };
}

export function createDeepProxy<T extends object>(root: T, onChange: () => void): T {
  const proxyCache = new WeakMap<object, any>();

  const wrap = (target: any): any => {
    if (typeof target !== 'object' || target === null) {
      return target;
    }

    // Avoid double-proxying
    if (proxyCache.has(target)) {
      return proxyCache.get(target);
    }

    const proxy = new Proxy(target, {
      get(t, prop, receiver) {
        const value = Reflect.get(t, prop, receiver);
        return wrap(value);
      },

      set(t, prop, value, receiver) {
        if (t[prop] !== value) {
          Reflect.set(t, prop, wrap(value), receiver);
          onChange();
        }
        return true;
      },

      deleteProperty(t, prop) {
        if (prop in t) {
          Reflect.deleteProperty(t, prop);
          onChange();
        }
        return true;
      },
    });

    proxyCache.set(target, proxy);
    return proxy;
  };

  return wrap(root);
}
