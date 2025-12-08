// src/stores/nounStore.js
import { ref } from 'vue'

/* --------------------------------------------
   Default fallback nouns with accusative forms
   -------------------------------------------- */
const DEFAULT_NOUNS = [
  {
    sl: "žena",
    en: "woman",
    g: "F",
    number: {
      singular: { accusative: "ženu" }
    }
  },
  {
    sl: "chlap",
    en: "man",
    g: "M",
    number: {
      singular: { accusative: "chlapa" }
    }
  },
  {
    sl: "auto",
    en: "car",
    g: "N",
    number: {
      singular: { accusative: "auto" }
    }
  },
  {
    sl: "pes",
    en: "dog",
    g: "M",
    number: {
      singular: { accusative: "psa" }
    }
  },
  {
    sl: "mačka",
    en: "cat",
    g: "F",
    number: {
      singular: { accusative: "mačku" }
    }
  },
  {
    sl: "strom",
    en: "tree",
    g: "M",
    number: {
      singular: { accusative: "strom" }
    }
  },
  {
    sl: "mesto",
    en: "city",
    g: "N",
    number: {
      singular: { accusative: "mesto" }
    }
  },
  {
    sl: "dieťa",
    en: "child",
    g: "N",
    number: {
      singular: { accusative: "dieťa" }
    }
  },
  {
    sl: "muž",
    en: "man (adult male)",
    g: "M",
    number: {
      singular: { accusative: "muža" }
    }
  },
  {
    sl: "učiteľ",
    en: "teacher",
    g: "M",
    number: {
      singular: { accusative: "učiteľa" }
    }
  },
  {
    sl: "stôl",
    en: "table",
    g: "M",
    number: {
      singular: { accusative: "stôl" }
    }
  },
  {
    sl: "mama",
    en: "mother",
    g: "F",
    number: {
      singular: { accusative: "mamu" }
    }
  },
  {
    sl: "sestra",
    en: "sister",
    g: "F",
    number: {
      singular: { accusative: "sestru" }
    }
  },
  {
    sl: "chlapec",
    en: "boy",
    g: "M",
    number: {
      singular: { accusative: "chlapca" }
    }
  },
  {
    sl: "kniha",
    en: "book",
    g: "F",
    number: {
      singular: { accusative: "knihu" }
    }
  },
  {
    sl: "okno",
    en: "window",
    g: "N",
    number: {
      singular: { accusative: "okno" }
    }
  },
  {
    sl: "list",
    en: "letter",
    g: "M",
    number: {
      singular: { accusative: "list" }
    }
  },
  {
    sl: "vlak",
    en: "train",
    g: "M",
    number: {
      singular: { accusative: "vlak" }
    }
  },
  {
    sl: "ruka",
    en: "hand",
    g: "F",
    number: {
      singular: { accusative: "ruku" }
    }
  },
  {
    sl: "hlava",
    en: "head",
    g: "F",
    number: {
      singular: { accusative: "hlavu" }
    }
  }
];


const DEFAULT_ADJECTIVES = [

];

const DEFAULT_PROPOSITIONS = [

];

/* --------------------------------------------
   Reactive store state
   -------------------------------------------- */
export const nouns = ref(DEFAULT_NOUNS)
export const adjectives = ref(DEFAULT_ADJECTIVES)
export const propositions = ref(DEFAULT_PROPOSITIONS)
export const nounsLoaded = ref(false)
export const adjectivesLoaded = ref(false)
export const propositionsLoaded = ref(false)
const NOUNS = "slovak-nouns-A1.json"
const ADJECTIVES = "slovak-adjectives-A1.json"
const PROPOSITIONS = "slovak-propositions-A1.json"

/* --------------------------------------------
   Load from JSON (only once)
   -------------------------------------------- */


const loadWords = async (
  resourceName,
  wordsReference,
  loadedReference,
  defaultData,
  filterFn = null // optional: (item) => boolean
) => {
  if (loadedReference.value) return wordsReference.value;

  // Start with defaults (filtered if a filter function is provided)
  wordsReference.value = (typeof filterFn === 'function')
    ? defaultData.filter(filterFn)
    : defaultData;

  try {
    const res = await fetch(`/${resourceName}`);
    if (res.ok) {
      const data = await res.json();

      // Apply filter automatically if provided
      wordsReference.value = (typeof filterFn === 'function')
        ? data.filter(filterFn)
        : data;

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

export const  loadAdjectives = async ()=> {
  return loadWords(ADJECTIVES,adjectives,adjectivesLoaded,DEFAULT_ADJECTIVES)
}


export const  loadNouns = async ()=> {
 
    return loadWords(NOUNS,nouns,nounsLoaded,DEFAULT_NOUNS);
}

export const  loadPropistions = async ()=> {
  // const includedCases = ["instrumental","localative","accusative"]
  const includedCases = ["locative"]
  const filterFn = (item) => includedCases.includes(item.case);
  return loadWords(PROPOSITIONS,propositions,propositionsLoaded,DEFAULT_PROPOSITIONS,filterFn);
}

export const loadVocabulary = async () => {
  loadAdjectives()
  loadNouns()
  loadPropistions()
}
