import type Persistance from './Persistance';
import { AbsractPersistance } from './Persistance';

export class LocalStoragePersistance<T> extends AbsractPersistance<T> implements Persistance<T> {
  persist(key: string, object: T): void {
    localStorage.setItem(key, JSON.stringify(object));
  }
  load(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  subscribe(key: string, onChange: (value: T) => void) {
    const handler = (e: StorageEvent) => {
      if (e.key !== key || !e.newValue) return;
      onChange(JSON.parse(e.newValue));
    };

    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  }
}
