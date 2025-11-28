// Hard consonants in Slovak
// const HARD_CONSONANTS = [
//   'b', 'c', 'd', 'ď', 'g', 'h', 'ch', 'k', 'l', 'ĺ',
//   'm', 'n', 'ň', 'p', 'r', 'ŕ', 's', 'š', 't', 'ť',
//   'v', 'z', 'ž'
// ];

export const HARD_CONSONANTS = [
  "h", "ch", "k", "g",
  "d", "t", "n", "l", "r"
];

// Soft consonants in Slovak
// const SOFT_CONSONANTS = [
//   'č', 'ď', 'j', 'ľ', 'ň', 'ť', 'ď', 'š', 'ž', 'č', 'dž'
// ];

export const SOFT_CONSONANTS = [
  "č", "dž", "š", "ž",
  "c", "dz",
  "j",
  "ď", "ť", "ň", "ľ"
];


// Neutral consonants in Slovak
// const NEUTRAL_CONSONANTS = [
//   'f', 'ch', 'h', 's', 'z', 'x'
// ];

export const NEUTRAL_CONSONANTS = [
  "b", "f", "m", "p", "v", "s", "z"
];


// All consonants
export const CONSONANTS = [
  ...HARD_CONSONANTS,
  ...SOFT_CONSONANTS,
  ...NEUTRAL_CONSONANTS
];


// Vowels in Slovak
export const VOWELS = [
  'a', 'á', 'e', 'é', 'i', 'í', 'o', 'ó', 'u', 'ú', 'y', 'ý', 'ä', 'ô'
];

// Check if a word ends with a consonant
const endsWith = (word , consenent) => {
  if (!word || word.length === 0) return false;
  const lower = word.toLowerCase();
  for (const d of consenent) {
    if (lower.endsWith(d)) {
      return true;
    }
  }
  return false;
}

export const endsWithHardConsonant = (w) => endsWith(w, HARD_CONSONANTS);
export const endsWithSoftConsonant = (w) => endsWith(w, SOFT_CONSONANTS);
export const endsWithNeutralConsonant = (w) => endsWith(w, NEUTRAL_CONSONANTS);
export const endsWithConsonant = (w) => endsWith(w, CONSONANTS);
export const endsWithVowel = (w) => endsWith(w, VOWELS)



export const IRREGULAR_STEMS = {
  "dieťa": "dieťat",
  "mláďa": "mláďat",
  "kôň": "koň",   // special class later
  // ... more later
};

function masculineStem(word) {
  word = word.toLowerCase();

  if (IRREGULAR_STEMS[word]) return IRREGULAR_STEMS[word];

  // Masculines ending in -a → remove -a
  // Masculines ending in -o/-e → remove vowel
  if (word.endsWith("a")||word.endsWith("o") || word.endsWith("e")) {
    return word.slice(0, -1);
  }

  // Consonant-ending masculine → unchanged stem
  if (endsWithConsonant(word)) {
    return word;
  }

  return word;
}


function feminineStem(word) {
  word = word.toLowerCase();

  if (IRREGULAR_STEMS[word]) return IRREGULAR_STEMS[word];



  // -ia → remove -ia, add -i
  if (word.endsWith("ia")) {
    return word.slice(0, -2) ;
  }

    // -ia → remove -ia, add -i
  if (word.endsWith("ie")) {
    return word.slice(0, -2) ;
  }

  // -a → remove -a
  if (word.endsWith("a")) {
    return word.slice(0, -1);
  }

  // Consonant-ending feminine → unchanged
  return word;
}

function neuterStem(word,isPlural){
  word = word.toLowerCase();

  if (IRREGULAR_STEMS[word]) return IRREGULAR_STEMS[word];

  // -um → remove -um
  if (word.endsWith("um")) {
    return word.slice(0, -2);
  }

  // -ie → replace with -i
  if (word.endsWith("ie")) {
    return  word.slice(0, isPlural? -1: -2) ;
  }

  // -o or -e → remove vowel
  if (word.endsWith("o") || word.endsWith("e")) {
    return word.slice(0, -1);
  }

  return word;
}


export function deriveStem(word, gender, isPlural = false) {
  switch (gender) {
    case "M": return masculineStem(word,isPlural);
    case "F": return feminineStem(word,isPlural);
    case "N": return neuterStem(word,isPlural);
    default:
      throw new Error(`Invalid gender '${gender}' — must be 'Masculine', 'Femanine', or 'Nueter'.`);
  }
}




