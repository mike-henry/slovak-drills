import { ref, type Ref } from 'vue';
import Verb from './verbs/Verb';

import Adjective from './declinations/Adjective';
import Proposition from '@/utils/grammer/Proposition';

const DEFAULT_ADJECTIVES: Adjective[] = [];

const DEFAULT_PROPOSITIONS: Proposition[] = [];

const DEFAULT_VERBS: Verb[] = [];

/* --------------------------------------------
   Reactive store state
   -------------------------------------------- */
//export const nouns: Ref<Noun[]> = ref(DEFAULT_NOUNS);
export const adjectives: Ref<Adjective[]> = ref(DEFAULT_ADJECTIVES);
export const propositions: Ref<Proposition[]> = ref(DEFAULT_PROPOSITIONS);
export const verbs: Ref<Verb[]> = ref();
export const nounsLoaded = ref(false);
export const adjectivesLoaded = ref(false);
export const propositionsLoaded = ref(false);
export const verbsLoaded = ref(false);
// const NOUNS = 'slovak-nouns-A1.json';
const ADJECTIVES = 'slovak-adjectives-A1.json';
const PROPOSITIONS = 'slovak-propositions-A1.json';
const VERBS = 'slovak-verbs-A1.json';

/* --------------------------------------------
   Load from JSON (only once)
   -------------------------------------------- */

const loadWords = async (
  resourceName,
  wordsReference,
  loadedReference,
  defaultData,
  filterFn = null, // optional: (item) => boolean
) => {
  if (loadedReference.value) return wordsReference.value;

  // Start with defaults (filtered if a filter function is provided)
  wordsReference.value = typeof filterFn === 'function' ? defaultData.filter(filterFn) : defaultData;

  try {
    const res = await fetch(`/${resourceName}`);
    if (res.ok) {
      const data = await res.json();

      // Apply filter automatically if provided
      wordsReference.value = typeof filterFn === 'function' ? data.filter(filterFn) : data;

      console.info(`✅ Loaded ${wordsReference.value.length} words from ${resourceName}`);
      loadedReference.value = true;
    } else {
      console.warn(`⚠️ Could not load ${resourceName}, using defaults.`);
    }
  } catch (err) {
    console.error(`❌ Error loading ${resourceName}:`, err);
  }

  return wordsReference.value;
};

export const loadPropistions = async () => {
  //TODO fix this !!!
  // const includedCases = ["instrumental","localative","accusative"]
  const includedCases = ['locative'];
  const filterFn = (item) => includedCases.includes(item.case);
  return loadWords(PROPOSITIONS, propositions, propositionsLoaded, DEFAULT_PROPOSITIONS, filterFn);
};

// Generic loader
export async function loadTypedWords<T>(
  key: string,
  targetRef: Ref<T[]>,
  loadedFlag: Ref<boolean>,
  defaults: T[],
  fromRaw: (raw: any) => T,
  filterFn: (raw: any) => boolean = () => true,
): Promise<T[]> {
  return loadWords(key, targetRef, loadedFlag, defaults, filterFn)
    .then((raws) => raws.map(fromRaw))
    .then((value) => {
      targetRef.value = value;
      return value;
    });
}

// Usage examples
export const loadAdjectives = () =>
  loadTypedWords(ADJECTIVES, adjectives, adjectivesLoaded, DEFAULT_ADJECTIVES, Adjective.fromRaw);

export const loadVerbs = () => loadTypedWords(VERBS, verbs, verbsLoaded, DEFAULT_VERBS, Verb.fromRaw);

export const loadPropositions = () => {
  const includedCases = ['locative'];
  const filterFn = (raw: any): boolean => includedCases.includes(raw.case);
  return loadTypedWords(
    PROPOSITIONS,
    propositions,
    propositionsLoaded,
    DEFAULT_PROPOSITIONS,
    Proposition.fromRaw,
    filterFn,
  );
};

export const loadVocabulary = async () => {
  loadVerbs();
  loadAdjectives();
  loadPropositions();
};
