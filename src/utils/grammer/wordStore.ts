import { ref, type Ref } from 'vue';
import Verb from './verbs/Verb';

const DEFAULT_VERBS: Verb[] = [];

/* --------------------------------------------
   Reactive store state
   -------------------------------------------- */

const verbs: Ref<Verb[]> = ref();

export const verbsLoaded = ref(false);

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

export const loadVocabulary = async () => {};
