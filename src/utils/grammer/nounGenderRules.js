// --- Slovak noun gender rules (simplified for nominative form only) ---
export const GENDER_RULES = [
  {
    pattern: /[bcčdďfghjklľmnňprsštvwxzž]$/,
    g: 'M',
    text: 'Ends in a consonant → usually masculine.',
  },
  {
    pattern: /a$/,
    g: 'F',
    text: 'Ends in -a → usually feminine.',
  },
  {
    pattern: /(osť|esť|ieň|eň)$/,
    g: 'F',
    text: 'Ends in -osť / -esť / -ieň / -eň → usually feminine.',
  },
  {
    pattern: /o$/,
    g: 'N',
    text: 'Ends in -o → usually neuter.',
  },
  {
    pattern: /e$/,
    g: 'N',
    text: 'Ends in -e → usually neuter.',
  },
  {
    pattern: /ie$/,
    g: 'N',
    text: 'Ends in -ie → usually neuter.',
  },
  {
    pattern: /um$/,
    g: 'N',
    text: 'Ends in -um → usually neuter (loanwords).',
  },
];

// --- Guess gender by word ending ---
export function guessGender(word) {
  for (const rule of GENDER_RULES) {
    if (rule.pattern.test(word)) return rule.g;
  }
  // Default fallback
  return 'M';
}

// --- Explain which rule applied ---
export function explainGenderRule(word) {
  const rule = GENDER_RULES.find((r) => r.pattern.test(word));
  return rule ? rule.text : 'Default: ends in a consonant → usually masculine.';
}

// --- Create question object ---
export function createGenderQuestion(noun) {
  const correctGender = noun.gender || guessGender(noun.sk);

  return {
    word: noun.sk,
    english: noun.en,
    correctGender,
    options: ['M', 'F', 'N'], // fixed order, not randomized
    rule: explainGenderRule(noun.sk),
  };
}
