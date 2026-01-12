// Loads ALL markdown files inside /src/docs/

import { adjectives } from '@/utils/grammer/wordStore';

// const mdFiles = import.meta.glob("./*.md", { as: "raw" });
const mdFiles = import.meta.glob('./*.md', { query: '?raw', import: 'default' });

/**
 * Load a markdown file by name: e.g., "nominative"
 */
export async function loadMarkdown(caseName) {
  const key = `./${caseName}.md`;
  if (!mdFiles[key]) throw new Error(`Document not found: ${caseName}.md`);
  return await mdFiles[key](); // returns raw markdown text
}

export const STANDARD_SECTIONS = {
  nounIntroduction: 'noun-introduction',
  nounEndings: 'noun-endings',
  nounEndingsSingular: 'noun-endings-singular',
  nounEndingsPlural: 'noun-endings-plural',
  nounStems: 'noun-stems',
  adjectiveEndings: 'adjective-endings',
  adjectiveStems: 'adjective-stems',
  adjectivesIntroduction: 'adjective-introduction',
};
