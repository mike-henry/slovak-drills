import { describe, it, expect } from 'vitest';
import DerivedWord from '../utils/grammer/DerivedWord';
import { readDocSections } from './DocumentBuilder';

describe('Documentation  Builder Tests', () => {
  it('should handle empty documentation section', async () => {
    const derivedWord = new DerivedWord('result', 'explanation');
    const sections = await readDocSections(derivedWord);
    expect(sections.length).toBe(0);
  });

  it('should extract sections of the document', async () => {
    const derivedWord = new DerivedWord('result', 'explanation', ['noun://accusative?stems']);
    const sections = await readDocSections(derivedWord);
    expect(sections[0].startsWith('<section id="stems">')).toBe(true);
    expect(sections[0]).toContain('Adjectives keep their base stem');
  });

  it('should return multiple sections from at-verbs', async () => {
    const derivedWord = new DerivedWord('result', 'explanation', ['verb://at?verb-overview&verb-stem&verb-examples']);
    const sections = await readDocSections(derivedWord);
    expect(sections.length).toBe(3);
    expect(sections[0]).toContain('AT‑verbs are one of the most common');
    expect(sections[1]).toContain('How to derive the stem');
    expect(sections[2]).toContain('Example: <em>hľadať</em> (“to search”)');
  });

  it('should handle full markdown if no section specified', async () => {
    const derivedWord = new DerivedWord('result', 'explanation', ['verb://at']);

    const sections = await readDocSections(derivedWord);

    expect(sections.length).toBe(1);
    expect(sections[0]).toContain('AT‑verbs are one of the most common');
    expect(sections[0]).toContain('How to derive the stem');
    expect(sections[0]).toContain('Example: <em>hľadať</em> (“to search”)');
  });
});
