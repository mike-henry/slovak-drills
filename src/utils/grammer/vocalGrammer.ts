// Hard consonants in Slovak

import type Noun from "./declinations/Noun";

export const HARD_CONSONANTS: string[] = [
  "h",
  "ch",
  "k",
  "g",
  "d",
  "t",
  "n",
  "l",
  "r",
];

// Soft consonants in Slovak

export const SOFT_CONSONANTS: string[] = [
  "č",
  "dž",
  "š",
  "ž",
  "c",
  "dz",
  "j",
  "ď",
  "ť",
  "ň",
  "ľ",
];

// Neutral consonants in Slovak
// const NEUTRAL_CONSONANTS = [
//   'f', 'ch', 'h', 's', 'z', 'x'
// ];

export const NEUTRAL_CONSONANTS: string[] = ["b", "f", "m", "p", "v", "s", "z"];

// All consonants
export const CONSONANTS = [
  ...HARD_CONSONANTS,
  ...SOFT_CONSONANTS,
  ...NEUTRAL_CONSONANTS,
];

// Vowels in Slovak
export const VOWELS: string[] = [
  "a",
  "á",
  "e",
  "é",
  "i",
  "í",
  "o",
  "ó",
  "u",
  "ú",
  "y",
  "ý",
  "ä",
  "ô",
];

// Check if a word ends with a consonant
const endsWith = (word, consenent) => {
  if (!word || word.length === 0) return false;
  const lower = word.toLowerCase();
  for (const d of consenent) {
    if (word.endsWith(d)) {
      return true;
    }
  }
  return false;
};

export const endsWithHardConsonant = (w) => endsWith(w, HARD_CONSONANTS);
export const endsWithSoftConsonant = (w) => endsWith(w, SOFT_CONSONANTS);
export const endsWithNeutralConsonant = (w) => endsWith(w, NEUTRAL_CONSONANTS);
export const endsWithConsonant = (w) => endsWith(w, CONSONANTS);
export const endsWithVowel = (w) => endsWith(w, VOWELS);

export const IRREGULAR_STEMS = {
  dieťa: "dieťat",
  mláďa: "mláďat",
  kôň: "koň", // special class later
  // ... more later
};

function masculineStem(word: string): string {
  word = word.toLowerCase();

  if (IRREGULAR_STEMS[word]) return IRREGULAR_STEMS[word];

  // Masculines ending in -a → remove -a
  // Masculines ending in -o/-e → remove vowel
  if (word.endsWith("a") || word.endsWith("o") || word.endsWith("e")) {
    return word.slice(0, -1);
  }

  // Consonant-ending masculine → unchanged stem
  if (endsWithConsonant(word)) {
    if (word.endsWith("ec")) {
      return word.slice(0, -2) + "c";
    }
    return word;
  }

  return word;
}

function feminineStem(word: string): string {
  word = word.toLowerCase();

  if (IRREGULAR_STEMS[word]) return IRREGULAR_STEMS[word];

  // -ia → remove -ia, add -i
  if (word.endsWith("ia")) {
    return word.slice(0, -2);
  }

  // -ia → remove -ia, add -i
  if (word.endsWith("ie")) {
    return word.slice(0, -2);
  }

  // -a → remove -a
  if (word.endsWith("a")) {
    return word.slice(0, -1);
  }

  // Consonant-ending feminine → unchanged
  return word;
}

function neuterStem(word: string, isPlural: boolean) {
  word = word.toLowerCase();

  if (IRREGULAR_STEMS[word]) return IRREGULAR_STEMS[word];

  // -um → remove -um
  if (word.endsWith("um")) {
    return word.slice(0, -2);
  }

  // -ie → replace with -i
  if (word.endsWith("ie")) {
    return word.slice(0, isPlural ? -1 : -2);
  }

  // -o or -e → remove vowel
  if (word.endsWith("o") || word.endsWith("e")) {
    return word.slice(0, -1);
  }

  // -a → remove vowel add at
  if (word.endsWith("a")) {
    return word.slice(0, -1) + "at";
  }

  return word;
}


export function deriveVocalStem(noun:Noun):string {
  switch (noun.gender) {
    case "M":
      return masculineStem(noun.sk);
    case "F":
      return feminineStem(noun.sk);
    case "N":
      return neuterStem(noun.sk, noun.plural);
    default:
      throw new Error(
        `Invalid gender '${noun.gender}' — must be 'Masculine', 'Femanine', or 'Nueter'.`
      );
  }
}
