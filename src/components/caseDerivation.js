
import { adjectiveDeriver,nounDeriver } from './derivations/NounDerivation';


//TODO: refine hard/soft consonant handling and definitions
// Hard consonants in Slovak
const hardConsonants = [
  'b', 'c', 'd', 'ď', 'g', 'h', 'ch', 'k', 'l', 'ĺ',
  'm', 'n', 'ň', 'p', 'r', 'ŕ', 's', 'š', 't', 'ť',
  'v', 'z', 'ž'
];

// Soft consonants in Slovak
const softConsonants = [
  'č', 'ď', 'j', 'ľ', 'ň', 'ť', 'ď', 'š', 'ž', 'č', 'dž'
];






/**
 * Slovak Noun Stem Extraction
 * ---------------------------
 * Given a noun, its gender ("M", "F", "N") and animacy (for masculine nouns),
 * return the morphological stem used to generate cases such as genitive, locative, etc.
 *
 * This file implements the rules for:
 *  - Masculine nouns: hard, soft, and neuter-like masculine
 *  - Feminine nouns: -a, -ia, consonant-ending
 *  - Neuter nouns: -o, -e/-ie, -um
 *
 * Notes:
 *  - Slovak stem rules contain exceptions; this implementation handles 95% of productive patterns.
 *  - You can add irregular overrides into the IRREGULAR_STEMS map.
 */

// Add irregular nouns as needed
const IRREGULAR_STEMS = {
  "človek": "ľud",   // človek → ľud-
  "dieťa": "det",    // dieťa → det-
  // add more as needed
};

/**
 * Utility: is vowel?
 */
function isVowel(ch) {
  return "aeiouáéíóúýä".includes(ch.toLowerCase());
}

/**
 * Utility: endsWithAny("kábel", ["el","er","ec"]) => true
 */
function endsWithAny(word, endings) {
  return endings.some(end => word.endsWith(end));
}

/**
 * Extract stem for masculine nouns (M)
 * - Hard consonant endings (most common)
 * - Soft masculine nouns (mäkčeň endings)
 * - Nouns ending in -a but masculine (e.g., "hrdina")
 */
function masculineStem(noun) {
  const word = noun.sk
  // irregular lookup

  if (IRREGULAR_STEMS[word]) return IRREGULAR_STEMS[word];

  // masculine ending in -a (hrdina, turista)
  if (word.endsWith("a")) {
    return word.slice(0, -1);
  }

  // masculine ending in -o (rare: "ujo", "strýko")
  if (word.endsWith("o")) {
    return word.slice(0, -1);
  }

  const lastChar = word.slice(-1);




  // Common hard consonants
  const hardEndings = ["b","d","ď","g","h","ch","k","l","m","n","p","r","s","t","v","z"];

  if (!isVowel(lastChar)) {
    // nasal masculine: syn → syn-, muž → muž-
    return word;
  }

  return word; // fallback
}

/**
 * Extract stem for feminine nouns (F)
 * - Most end in -a → remove -a
 * - Those in -ia → remove -a → stem in -i-
 * - Consonant-ending feminine nouns stay unchanged (kosť, dedosť)
 */
function feminineStem(word) {
  // irregular
  if (IRREGULAR_STEMS[word]) return IRREGULAR_STEMS[word];

  // -a nouns: žena → žen-
  if (word.endsWith("a")) {
    return word.slice(0, -1);
  }

  // -ia nouns: ulica → ulic-, stanica → stanic-
  if (word.endsWith("ia")) {
    return word.slice(0, -2) + "i"; // e.g., "ulica" → "ulic" but "kaviareň" is special
  }

  // -osť, -eň, -ieň etc. → unchanged stem
  return word;
}

/**
 * Extract stem for neuter nouns (N)
 * - -o nouns: mesto → mest-
 * - -e/-ie nouns: more → mor-, srdce → srdc-, vysvedčenie → vysvedčeni-
 * - -um nouns (Latin origin): minimum → minim-
 */
function neuterStem(word) {
  // irregular
  if (IRREGULAR_STEMS[word]) return IRREGULAR_STEMS[word];

  if (word.endsWith("o")) {
    return word.slice(0, -1);
  }

  if (word.endsWith("e")) {
    return word.slice(0, -1);
  }

  if (word.endsWith("ie")) {
    return word.slice(0, -2) + "i"; // vysvedčenie → vysvedčeni-
  }

  if (word.endsWith("um")) {
    return word.slice(0, -2);
  }

  return word;
}

/**
 * MAIN FUNCTION
 * -------------
 * getStem(noun, gender, animate)
 *
 * @param {string} noun — noun in nominative singular
 * @param {"M"|"F"|"N"} gender — grammatical gender
 * @param {boolean} [animate] — only used for masculine nouns
 *
 * @returns {string} stem
 */
function getStem(noun  ) {
  switch (noun.gender) {
    case "M":
      return masculineStem(noun);
    case "F":
      return feminineStem(noun);
    case "N":
      return neuterStem(noun);
    default:
      throw new Error("Invalid gender: use 'M', 'F', or 'N'");
  }
}


function getLastConsonant(word) {
  // Handle digraph 'ch'
  if (word.endsWith('ch')) return 'ch';

  // Loop backwards through the word to find the last consonant
  for (let i = word.length - 1; i >= 0; i--) {
    const char = word[i];
    if (hardConsonants.includes(char) || softConsonants.includes(char)) {
      return char;
    }
  }

  // If no consonant found (vowel ending), return null
  return null;
}

function generateNomPlural(noun) {
  const word = noun.sk;

  // ======================
  // MASCULINE
  // ======================
  if (noun.gender === "M") {
    if (noun.animate) {
      // Animate masculine plural
       return word + "i"; // simple default
    }
    const lastCons = getLastConsonant(word);
    if (hardConsonants.includes(lastCons)) return word + "y";
    if (softConsonants.includes(lastCons)) return word + "e";
    //     // neutral ending → default -y for inanimate
    return word + "y";
  }

  // ======================
  // FEMININE
  // ======================
  if (noun.gender === "F") {
    if (word.endsWith("a")) {
      const stem = word.slice(0, -1);
      // soft stem → -e
      if (/[cčďľňšťžj]$/.test(stem)) return stem + "e";
      return stem + "y";
    }

    // dlaň-type endings
    if (/[dďľňť]$/.test(word)) return word + "e";

    // kosť-type endings
    if (/[cčjšžx]$/.test(word)) return word + "i";

    // fallback
    return word + "e";
  }

  // ======================
  // NEUTER
  // ======================
  if (noun.gender === "N") {
    // -um → -á
    if (word.endsWith("um")) return word.slice(0, -2) + "á";

    // -ie → -ia
    if (word.endsWith("ie")) return word.slice(0, -2) + "ia";

    // -o or -e → -á
    if (/[oe]$/.test(word)) return word.slice(0, -1) + "á";

    return word;
  }
}


const instrumentalRules = {
  M: [
    (noun) => noun.sk.endsWith('ec')
      ? { form: noun.sk.slice(0, -2) + 'com', explanation: 'M -ec → -com.' }
      : null,
    (noun) => ({ form: noun.sk + 'om', explanation: 'M → add -om.' })
  ],
  F: [
    (noun) => noun.sk.endsWith('a')
      ? { form: noun.sk.slice(0, -1) + 'ou', explanation: 'F -a → -ou.' }
      : null,
    (noun) => noun.sk.endsWith('ia')
      ? { form: noun.sk.slice(0, -2) + 'iou', explanation: 'F -ia → -iou.' }
      : null,
    (noun) => ({ form: noun.sk + 'ou', explanation: 'F → add -ou.' })
  ],
  N: [
    (noun) => noun.sk.endsWith('ie')
      ? { form: noun.sk.slice(0, -2) + 'ím', explanation: 'N -ie → -ím.' }
      : null,
    (noun) => noun.sk.endsWith('o')
      ? { form: noun.sk.slice(0, -1) + 'om', explanation: 'N -o → -om.' }
      : null,
    (noun) => ({ form: noun.sk + 'om', explanation: 'N → add -om.' })
  ]
};

const instrumentalPluralRules = {
  M: [ (noun) => ({ form: noun.sk + 'mi', explanation: 'M → add -mi for instrumental plural.' }) ],
  F: [ (noun) => ({ form: noun.sk + 'mi', explanation: 'F → add -mi for instrumental plural.' }) ],
  N: [ (noun) => ({ form: noun.sk + 'mi', explanation: 'N → add -mi for instrumental plural.' }) ]
};

const kinshipExceptions = ['dedko','otec','syn','brat'];


const accusativeRules = {
  M: [
    // 1. Animate masculine ending in -a  -> replace -a with -u
    (noun) => noun.animate && noun.sk.endsWith("a")
      ? {
          form: noun.sk.slice(0, -1) + 'u',
          explanation: 'Masculine animate ending in -a → replace -a with -u.',
        }
      : null,

    // 2. Animate masculine ending in -o -> replace -o with -a
    (noun) =>  noun.animate  && noun.sk.endsWith("o") ? {
          form: noun.sk.slice(0, -1) + 'a',
          explanation: 'Masculine animate ending in -o → replace -o with -a.',
        }
      : null,

    // 3. Other animate masculine (consonant or other vowel endings) -> add -a
    (noun) => noun.animate
      ? {
          form: noun.sk + 'a',
          explanation: 'Masculine animate (other endings) → add -a.',
        }
      : null,

    // 4. Inanimate masculine -> unchanged
    (noun) => !noun.animate
      ? {
          form: noun.sk,
          explanation: 'Masculine inanimate → same as nominative.',
        }
      : null,
  ],
  F: [
    (noun) => noun.sk.endsWith('a')
      ? { form: noun.sk.slice(0, -1) + 'u', explanation: 'F -a → -u.' }
      : null,
    (noun) => noun.sk.endsWith('ia')
      ? { form: noun.sk.slice(0, -2) + 'iu', explanation: 'F -ia → -iu.' }
      : null,
    (noun) => ({ form: noun.sk, explanation: 'Femanine consonant-ending → same as Nominative.' })
  ],
  N: [ (noun) => ({ form: noun.sk, explanation: 'Neutral → same as Nominative.' }) ]
};

const accusativePluralRules = {
  M: [
    (noun) => noun.animate && {
      form: getStem(noun) + 'ov',
      explanation: 'Masculine animate → add -ov for accusative plural.'
    },
    (noun) => !noun.animate && {
      form: generateNomPlural(noun),
      explanation: 'Masculine inanimate → accusative plural = nominative plural.'
    }
  ],
  F: [ (noun) => ({ form: generateNomPlural(noun), explanation: 'Feminine → accusative plural = nominative plural.' }) ],
  N: [ (noun) => ({ form: generateNomPlural(noun), explanation: 'Neuter → accusative plural = nominative plural.' }) ]
};

const locativeRules = {
  M: [
    (noun) => noun.animate === "true"
      ? { form: noun.sk + 'ovi', explanation: 'Masculine animate → add -ovi.' }
      : null,
    (noun) => ['k', 'g', 'h', 'ch'].some(c => noun.sk.endsWith(c))
      ? { form: noun.sk + 'u', explanation: 'Masculine inanimate ending in k/g/h/ch → add -u.' }
      : null,
    (noun) => ['d', 'l', 'r'].some(c => noun.sk.endsWith(c))
      ? { form: noun.sk + 'e', explanation: 'Masculine inanimate ending in d/l/r → add -e.' }
      : null,
    (noun) => !noun.animate
      ? { form: noun.sk + 'i', explanation: 'Masculine inanimate → add -i.' }
      : null
  ],
  F: [
    (noun) => noun.sk.endsWith('a')
      ? { form: noun.sk.slice(0, -1) + 'e', explanation: 'Feminine -a → -e.' }
      : null,
    (noun) => noun.sk.endsWith('ia')
      ? { form: noun.sk.slice(0, -2) + 'ii', explanation: 'Feminine -ia → -ii.' }
      : null,
    (noun) => ({ form: noun.sk + 'i', explanation: 'Feminine consonant-ending → add -i.' })
  ],
  N: [
    (noun) => noun.sk.endsWith('o')
      ? { form: noun.sk.slice(0, -1) + 'e', explanation: 'Neuter -o → -e.' }
      : null,
    (noun) => noun.sk.endsWith('ie')
      ? { form: noun.sk.slice(0, -2) + 'í', explanation: 'Neuter -ie → -í.' }
      : null,
    (noun) => ({ form: noun.sk + 'e', explanation: 'Neuter → add -e.' })
  ]
};

const locativePluralRules = {
  M: [
    (noun) => ({ form: noun.sk + 'och', explanation: 'M hard stem → -och.' })
  ],

  F: [
    // Feminine nouns ending in -a
    (noun) => noun.sk.endsWith('a')
      ? { form: noun.sk.slice(0, -1) + 'ách', explanation: 'F -a → -ách.' }
      : null,
    (noun) => noun.sk.endsWith("ia")
      ? { form: noun.sk.slice(0, -2) + "iách", explanation: "F ending -ia → locative plural -iách." }
      : null,  
    // Feminine nouns ending in a consonant (e.g., pláž → plážach)
    (noun) => /[bcčdďfghjklľmnňprsštťvzž]$/.test(noun.sk)
      ? { form: noun.sk + 'ach', explanation: 'F consonant-ending (e.g., pláž) → -ach.' }
      : null
  ],

  N: [
    (noun) => noun.sk.endsWith('o')
      ? { form: noun.sk.slice(0, -1) + 'ách', explanation: 'N -o → -ách.' }
      : null,
        // Neuter nouns ending in -e → -ách
    (noun) => noun.sk.endsWith("e")
      ? { form: noun.w.slice(0, -1) + "ách",explanation: "N ending -e → locative plural -ách." }
      : null,  
        // Neuter nouns ending in -ie → -iach
    (noun) => noun.sk.endsWith("ie")
      ? { form: noun.w.slice(0, -2) + "iach", explanation: "N ending -ie → locative plural -iach." }
      : null    
  ]
};


export const deriveNounCaseForm = (noun, caseName, plural = false) => {
  const override = plural
    ? noun.number?.plural?.[caseName]
    : noun.number?.singular?.[caseName];

  if (override) {
    return {
      form: override,
      explanation: `Explicit ${caseName} ${plural ? 'plural' : 'singular'} form provided.`
    };
  }

  const ruleMaps = {
    accusative: plural ? accusativePluralRules : accusativeRules,
    instrumental: plural ? instrumentalPluralRules : instrumentalRules,
    localative: plural ? locativePluralRules : locativeRules
  };

  const rules = ruleMaps[caseName]?.[noun.gender];
  if (!rules) {
    return {
      form: noun.sk,
      explanation: `No ${plural ? 'plural' : 'singular'} rules for case '${caseName}' and gender '${noun.gender}'.`
    };
  }

  console.log(`is animate ...${noun.animate}` )
  console.log("end with o "+noun.sk.endsWith("o"))

  for (const rule of rules) {
    const result = rule(noun);
    
    if (result) { 
    
      return result;}
  }

  return {
    form: noun.sk,
    explanation: `No matching ${plural ? 'plural' : 'singular'} rule for case '${caseName}'.`
  };


};




const analyzeAdjective = (adj) => {
  // HARD adjectives (pekný / pekná / pekné)
  if (adj.endsWith("ý")||  adj.endsWith("y") || adj.endsWith("á") || adj.endsWith("é")) {
    return {
      cls: "HARD",
      stem: adj.slice(0, -1)
    };
  }

  // SOFT adjectives (cudzí / boží)
  if (adj.endsWith("í") || adj.endsWith("ia") || adj.endsWith("ie")) {
    return {
      cls: "SOFT",
      stem: adj.slice(0, -1)
    };
  }

  // fallback (irregular)
  return {
    cls: "OTHER",
    stem: adj
  };
}




export const adjectiveEndings = {
  accusative: {
    singular: {
      M: (cls, animate) => {
        if (cls === "HARD")
          return animate ? "ého" : "ý";   // no change for inanimate

        if (cls === "SOFT")
          return animate ? "ieho" : "ý";  // soft class

        return "ý"; // fallback
      },
      F: (cls) => {
        if (cls === "HARD") return "ú";
        if (cls === "SOFT") return "iu";
        return "";
      },
      N: () =>  "é" // neuter = no change
    },

    plural: {
      M: (cls, animate) => {
        if (cls === "HARD")
          return animate ? "ých" : "é";

        if (cls === "SOFT")
          return animate ? "ich" : "ie";

        return "";
      },
      F: (cls) => cls === "SOFT" ? "ie" : "é",  
      N: (cls) => cls === "SOFT" ? "ie" : "é"
    }
  },

  instrumental: {
    singular: {
      M: (cls) => cls === "SOFT" ? "ím" : "ým",
      F: () => "ou",
      N: (cls) => cls === "SOFT" ? "ím" : "ým"
    },
    plural: {
      M: (cls) => cls === "SOFT" ? "imi" : "ými",
      F: (cls) => cls === "SOFT" ? "imi" : "ými",
      N: (cls) => cls === "SOFT" ? "imi" : "ými"
    }
  },

  localative : {
    singular: {
      M: (cls) => cls === "SOFT" ? "om" : "om",
      F: (cls) => cls === "SOFT" ? "ej" : "ej",
      N: (cls) => cls === "SOFT" ? "om" : "om"
    },
    plural: {
      M: (cls) => cls === "SOFT" ? "ich" : "ých",
      F: (cls) => cls === "SOFT" ? "ich" : "ých",
      N: (cls) => cls === "SOFT" ? "ich" : "ých"
    }
  }
};


export const deriveAdjectiveCaseForm = (adj, caseName, gender, plural = false, animate = false) => {
  const override = plural
    ? adj.number?.plural?.[caseName]
    : adj.number?.singular?.[caseName];

  if (override) {
    return {
      form: override,
      explanation: `Explicit ${caseName} ${plural ? 'plural' : 'singular'} form provided.`
    };
  }

  const numberKey = plural ? 'plural' : 'singular';
  const rule = adjectiveEndings[caseName]?.[numberKey]?.[gender];

  if (!rule) {
    return {
      form: adj.sk,
      explanation: `No rule for ${caseName} ${numberKey} (${gender}).`
    };
  }
  
  const adjectiveStem = analyzeAdjective(adj.sk)
  const form = adjectiveStem.stem + rule(adjectiveStem.cls, animate);


  return {
    form,
    explanation: `Derived ${caseName} ${numberKey} form for ${gender}${animate ? ' animate' : ''}.`
  };
};

export const deriveAdjectiveNounCaseForm = (adjective,noun,caseName, plural = false) => {
  const adjectiveForm = deriveAdjectiveCaseForm (adjective, caseName, noun.gender, plural, noun.animate)
  const nounForm =  deriveNounCaseForm (noun, caseName, plural)
  return {
    form : adjectiveForm.form + ' ' + nounForm.form,
    explanation: `adjective:${adjectiveForm.explanation}, noun:${nounForm.explanation}`
  }
}


export const deriveAdjectiveNounCase = (adjective,noun,caseName, plural = false) => {

  const nounInCasederiver =  plural ? nounDeriver(caseName).plural: nounDeriver(caseName).singular
  const adjectiveInCasederiver =  plural ? adjectiveDeriver(caseName).plural: adjectiveDeriver(caseName).singular

  const nounInCase =  nounInCasederiver (noun)
  const adjectiveInCase =  adjectiveInCasederiver (adjective,noun)

  return {
    derived : `${adjectiveInCase.derived} ${nounInCase.derived}`,
    explanation: `adjective:${adjectiveInCase.explanation}, noun:${nounInCase.explanation}`
  }
}