import { describe, it, expect } from 'vitest';
import DerivedWord from './DerivedWord';

describe('DerivedWord.combineDerivedWords', () => {
  it('combines an array of DerivedWord instances', () => {
    const a = new DerivedWord('run', 'to move fast', ['doc1']);
    const b = new DerivedWord('away', 'to go elsewhere', ['doc2', 'doc3']);

    const result = DerivedWord.combineDerivedWords([a, b]);

    expect(result.derived).toBe('run away');
    expect(result.explanation).toBe('to move fast, to go elsewhere');
    expect(result.documentation).toEqual(['doc1', 'doc2', 'doc3']);
  });

  it('handles an empty array', () => {
    const result = DerivedWord.combineDerivedWords([]);

    expect(result.derived).toBe('');
    expect(result.explanation).toBe('');
    expect(result.documentation).toEqual([]);
  });
});

describe('DerivedWord.combineDerivedWordMap', () => {
  it('combines a Map<string, DerivedWord>', () => {
    const map = new Map<string, DerivedWord>();
    map.set('item1', new DerivedWord('run', 'to move fast', ['doc1']));
    map.set('item2', new DerivedWord('away', 'to go elsewhere', ['doc2']));

    const result = DerivedWord.combineDerivedWordMap(map);

    expect(result.derived).toBe('run away');
    expect(result.explanation).toBe('item1: to move fast, item2: to go elsewhere');
    expect(result.documentation).toEqual(['doc1', 'doc2']);
  });

  it('handles an empty map', () => {
    const map = new Map<string, DerivedWord>();
    const result = DerivedWord.combineDerivedWordMap(map);

    expect(result.derived).toBe('');
    expect(result.explanation).toBe('');
    expect(result.documentation).toEqual([]);
  });
});
