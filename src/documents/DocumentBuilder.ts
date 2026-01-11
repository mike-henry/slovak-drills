import type DerivedWord from '@/utils/grammer/DerivedWord';
import { marked } from 'marked';

const mdFiles = import.meta.glob('./**/*.md', { query: '?raw', import: 'default' });
const DOCUMENT_MAP = new Map<string, string>();

const NOUN_MAP = new Map<string, string>();
const VERB_MAP = new Map<string, string>();
const ADJECTIVE_MAP = new Map<string, string>();

NOUN_MAP.set('nominative', 'nominals/nominative-nominals');
NOUN_MAP.set('accusative', 'nominals/accusative-nominals');
NOUN_MAP.set('instrumental', 'nominals/instrumental-nominals');
NOUN_MAP.set('genitive', 'nominals/genitive-nominals');
NOUN_MAP.set('dative', 'nominals/dative-nominals');
NOUN_MAP.set('locative', 'nominals/locative-nominals');
NOUN_MAP.set('vocative', 'nominals/vocative-nominals');

ADJECTIVE_MAP.set('nominative', 'nominals/nominative-nominals');
ADJECTIVE_MAP.set('accusative', 'nominals/accusative-nominals');
ADJECTIVE_MAP.set('instrumental', 'nominals/instrumental-nominals');
ADJECTIVE_MAP.set('genitive', 'nominals/genitive-nominals');
ADJECTIVE_MAP.set('dative', 'nominals/dative-nominals');
ADJECTIVE_MAP.set('locative', 'nominals/locative-nominals');
ADJECTIVE_MAP.set('vocative', 'nominals/vocative-nominals');

VERB_MAP.set('st', 'verbs/st-verbs');
VERB_MAP.set('at', 'verbs/at-verbs');
VERB_MAP.set('it', 'verbs/it-short-verbs');
VERB_MAP.set('it-long', 'verbs/it-long-verbs');
VERB_MAP.set('nut', 'verbs/nut-verbs');
VERB_MAP.set('nut', 'verbs/nut-verbs');

DOCUMENT_MAP.set('noun://accusative', 'Noun Accusative Stem Section');

type Scheme = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun';

interface DocURI {
  raw: string;
  scheme: Scheme;
  path: string;
  sections?: Set<string>;
}

export function parseDocURI(input: string): DocURI {
  const normalized = input.trim();
  const DOC_URI_RE = /^([a-zA-Z][a-zA-Z0-9+.-]*):\/\/([^?\/]+)(?:\?([^#]+))?$/;

  const match = normalized.match(DOC_URI_RE);
  if (!match) throw new Error(`Invalid Document URI: ${input}`);
  const [, scheme, path, sectionStr] = match;
  const sections = sectionStr ? new Set(sectionStr.split('&')) : undefined;
  return {
    raw: input,
    scheme: scheme as Scheme,
    path,
    sections,
  };
}

export const readDocSections = async (derivedWord: DerivedWord): Promise<string[]> => {
  const arrayOfArray = await Promise.all(derivedWord.documentation.map(parseDocURI).map(getDocumentSections));
  return arrayOfArray.flat();
};

function getMarkdownDocuments(uri: DocURI): Promise<string> {
  const grammarMap = getGrammerMap(uri);
  const file = grammarMap.get(uri.path);
  return loadMarkdown(file!);
}

async function getDocumentSections(uri: DocURI): Promise<string[]> {
  const htmlFileContents = await getMarkdownDocuments(uri).then(renderMarkdownToHTML);
  return uri.sections
    ? Array.from(uri.sections).map((section) => extractSection(htmlFileContents, section))
    : [htmlFileContents];
}

function getGrammerMap(uri: DocURI) {
  switch (uri.scheme) {
    case 'noun':
      return NOUN_MAP;
    case 'verb':
      return VERB_MAP;
    case 'adjective':
      return ADJECTIVE_MAP;
    default:
      throw new Error(`Unsupported scheme: ${uri.scheme}`);
  }
}

async function loadMarkdown(filename: string): Promise<string> {
  const key = `./${filename}.md`;
  if (!mdFiles[key]) throw new Error(`Document not found: ${filename}.md`);
  return (await mdFiles[key]()) as string; // returns raw markdown text
}

async function renderMarkdownToHTML(markdown: string): Promise<string> {
  return marked(markdown);
}

function extractSection(htmlFileContents: string, sectionId: string): string {
  const dom = parseHTML(htmlFileContents);
  const el = dom.getElementById(sectionId);
  return el ? el.outerHTML : `<p>No content found for ${sectionId}</p>`;
}
// function  extractSection(htmlFileContents: string, sectionId: string): string {
//   const dom = new JSDOM(htmlFileContents);
//   const el = dom.window.document.getElementById(sectionId);
//   return el ? el.outerHTML : `<p>No content found for ${sectionId}</p>`;
// }

function parseHTML(html: string): Document {
  if (typeof window !== 'undefined') {
    return new DOMParser().parseFromString(html, 'text/html');
  }

  const { JSDOM } = require('jsdom');
  return new JSDOM(html).window.document;
}
