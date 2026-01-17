import type Persistance from './Persistance';
import { AbsractPersistance } from './Persistance';

export default class MappedPersistance<T> extends AbsractPersistance<T> implements Persistance<T> {
  private map = new Map<string, T>();

  persist(key: string, object: T): void {
    this.map.set(key, object);
  }

  load(key: string): T {
    return this.map.get(key);
  }
}
