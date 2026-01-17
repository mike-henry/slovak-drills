export default interface Persistance<T> {
  save(key: string, object: T): void;
  read(key: string, defaultItem: () => T): T;

  // Optional capability
  subscribe?(key: string, onChange: (value: T) => void): () => void;
}

export abstract class AbsractPersistance<T> implements Persistance<T> {
  save(key: string, object: T): void {
    this.persist(key, object);
  }

  read(key: string, defaultRead: () => T): T {
    const value = this.load(key);
    if (!value) {
      console.warn(`Item ${key}  not found  building from default`);
      const newItem = defaultRead();
      this.save(key, newItem);
      return newItem;
    }
    return value;
  }

  abstract persist(key: string, object: T): void;
  abstract load(key: string): T | undefined;
}
