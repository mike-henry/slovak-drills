import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalStoragePersistance } from './LocalStoragePersistance';

describe('LocalStoragePersistance', () => {
  let persistance: LocalStoragePersistance<any>;
  let store: Record<string, string> = {};

  beforeEach(() => {
    // Reset mock storage
    store = {};

    // Mock window.localStorage
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    });

    // Mock window.addEventListener / removeEventListener
    const listeners: Record<string, Function[]> = {};
    vi.stubGlobal('window', {
      addEventListener: (event: string, cb: Function) => {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(cb);
      },
      removeEventListener: (event: string, cb: Function) => {
        if (listeners[event]) {
          listeners[event] = listeners[event].filter((l) => l !== cb);
        }
      },
      // helper for triggering storage events
      triggerStorage: (key: string, newValue: string) => {
        if (listeners['storage']) {
          const e = { key, newValue };
          listeners['storage'].forEach((cb) => cb(e));
        }
      },
    });

    persistance = new LocalStoragePersistance();
  });

  it('saves and loads data', () => {
    const key = 'test';
    const obj = { a: 1, b: { c: 2 } };

    persistance.save(key, obj);

    const loaded = persistance.read(key, () => ({ a: 0 }));
    expect(loaded).toEqual(obj);
  });

  it('returns default if nothing exists', () => {
    const key = 'missing';
    const defaultObj = () => ({ default: true });

    const loaded = persistance.read(key, defaultObj);
    expect(loaded).toEqual({ default: true });
  });

  it('triggers subscription on external storage changes', () => {
    const key = 'counter';
    const obj = { count: 1 };

    let lastValue: any = null;

    persistance.subscribe?.(key, (value) => {
      lastValue = value;
    });

    // Simulate cross-tab storage event
    (window as any).triggerStorage(key, JSON.stringify(obj));

    expect(lastValue).toEqual(obj);
  });

  it('read reflects updates from storage', () => {
    const key = 'counter';
    const initial = { count: 1 };
    persistance.save(key, initial);

    // Update underlying storage manually
    store[key] = JSON.stringify({ count: 42 });

    const loaded = persistance.read(key, () => ({ count: 0 }));
    expect(loaded.count).toBe(42);
  });
});
