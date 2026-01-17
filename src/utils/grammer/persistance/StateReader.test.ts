import { describe, it, expect, beforeEach } from 'vitest';
import { readPersistentState } from './StateReader';
import MappedPersistance from './MappedPersistance';
import type Persistance from './Persistance';

describe('readPersistentState', () => {
  let persistance: Persistance<any>;

  beforeEach(() => {
    persistance = new MappedPersistance();
  });

  it('loads default object when storage is empty', () => {
    const state = readPersistentState({
      key: 'counter',
      persistance,
      create: () => ({ count: 0 }),
      debounceMs: 0,
    });

    expect(state.count).toBe(0);
    expect(persistance.read('counter', () => ({ count: 999 }))).toEqual({ count: 0 });
  });

  it('loads existing stored object', () => {
    persistance.save('counter', { count: 42 });

    const state = readPersistentState({
      key: 'counter',
      persistance,
      create: () => ({ count: 0 }),
      debounceMs: 0,
    });

    expect(state.count).toBe(42);
  });

  it('deep mutation updates storage', () => {
    const state = readPersistentState({
      key: 'settings',
      persistance,
      create: () => ({ ui: { theme: 'light' } }),
      debounceMs: 0,
    });

    state.ui.theme = 'dark';

    const stored = persistance.read('settings', () => ({ ui: { theme: 'none' } }));
    expect(stored.ui.theme).toBe('dark');
  });

  it('deleting a property triggers persistence', () => {
    const state = readPersistentState({
      key: 'obj',
      persistance,
      create: () => ({ foo: 'bar' }),
      debounceMs: 0,
    });

    delete state.foo;

    const stored = persistance.read('obj', () => ({}));
    expect(stored.foo).toBeUndefined();
  });

  it('applies cross-tab updates correctly', () => {
    let subscriber: ((value: any) => void) | undefined;

    persistance.subscribe = (key, cb) => {
      subscriber = cb;
      return () => {};
    };

    const state = readPersistentState({
      key: 'counter',
      persistance,
      create: () => ({ count: 0 }),
      debounceMs: 0,
    });

    state.count = 1;
    expect(state.count).toBe(1);

    // Simulate a cross-tab event
    subscriber!({ count: 42 });
    expect(state.count).toBe(42);
  });
});
