import { describe, test, expect } from 'vitest';

import { CASE_TYPE, Gender } from '../WordTypes';
import Verb from './Verb';
import { Pronoun } from '../Pronoun';

// ---------------------------
// Regular verbs
// ---------------------------
const regularVerbs = {
  robit: new Verb('robiť', 'to do'),
  ucit: new Verb('učiť', 'to teach'),
  vidiet: new Verb('vidieť', 'to see'),
  telefonovat: new Verb('telefonovať', 'to call'),
  zabudnut: new Verb('zabudnúť', 'to forget', false, CASE_TYPE.ACCUSATIVE),
  padnut: new Verb('padnúť', 'to fall'),
  sadnutSi: new Verb('sadnúť si', 'to sit down', true), // reflexive
  letnut: new Verb('letnúť', 'to fly briefly'),
};

describe('Present tense — Regular verbs', () => {
  test('robiť (-ať) singular/plural', () => {
    expect(regularVerbs.robit.conjugatePresent(Pronoun.I).derived).toBe('robím');
    expect(regularVerbs.robit.conjugatePresent(Pronoun.YOU).derived).toBe('robíš');
    expect(regularVerbs.robit.conjugatePresent(Pronoun.HE).derived).toBe('robí');
    expect(regularVerbs.robit.conjugatePresent(Pronoun.WE).derived).toBe('robíme');
    expect(regularVerbs.robit.conjugatePresent(Pronoun.YOU_PL).derived).toBe('robíte');
    expect(regularVerbs.robit.conjugatePresent(Pronoun.THEY).derived).toBe('robia');
  });

  test('učiť (-iť) singular/plural', () => {
    expect(regularVerbs.ucit.conjugatePresent(Pronoun.I).derived).toBe('učím');
    expect(regularVerbs.ucit.conjugatePresent(Pronoun.THEY).derived).toBe('učia');
  });

  test('vidieť (-eť) singular/plural', () => {
    expect(regularVerbs.vidiet.conjugatePresent(Pronoun.I).derived).toBe('vidím');
    expect(regularVerbs.vidiet.conjugatePresent(Pronoun.THEY).derived).toBe('vidia');
  });

  test('telefonovať (-ovať) singular/plural', () => {
    expect(regularVerbs.telefonovat.conjugatePresent(Pronoun.I).derived).toBe('telefonujem');
    expect(regularVerbs.telefonovat.conjugatePresent(Pronoun.THEY).derived).toBe('telefonujú');
  });

  test('zabudnúť (-ut/-núť) singular/plural', () => {
    expect(regularVerbs.zabudnut.conjugatePresent(Pronoun.I).derived).toBe('zabudnem');
    expect(regularVerbs.zabudnut.conjugatePresent(Pronoun.THEY).derived).toBe('zabudnú');
  });

  test('sadnúť si (-núť reflexive) singular/plural', () => {
    expect(regularVerbs.sadnutSi.conjugatePresent(Pronoun.I).derived).toBe('sadnem si');
    expect(regularVerbs.sadnutSi.conjugatePresent(Pronoun.THEY).derived).toBe('sadnú si');
  });

  test('basic singular/plural forms', () => {
    expect(regularVerbs.letnut.conjugatePresent(Pronoun.I).derived).toBe('letnem');

    expect(regularVerbs.letnut.conjugatePresent(Pronoun.YOU).derived).toBe('letneš');

    expect(regularVerbs.letnut.conjugatePresent(Pronoun.HE).derived).toBe('letne');

    expect(regularVerbs.letnut.conjugatePresent(Pronoun.WE).derived).toBe('letneme');

    expect(regularVerbs.letnut.conjugatePresent(Pronoun.YOU_PL).derived).toBe('letnete');

    expect(regularVerbs.letnut.conjugatePresent(Pronoun.THEY).derived).toBe('letnú');
  });

  test('padnúť (-ut/-núť) singular/plural', () => {
    expect(regularVerbs.padnut.conjugatePresent(Pronoun.I).derived).toBe('padnem');
    expect(regularVerbs.padnut.conjugatePresent(Pronoun.THEY).derived).toBe('padnú');
  });
});

// ---------------------------
// Reflexive verbs
// ---------------------------
const reflexiveVerbs = {
  spravatSa: new Verb('správať sa', 'to behave', true),
  zasluzitSi: new Verb('zaslúžiť si', 'to deserve', true, undefined, undefined, undefined, ['it-short']),
  ucitSa: new Verb('učiť sa', 'to learn', true),
  rozhodnutSa: new Verb('rozhodnúť sa', 'to decide', true),
  stretnutSa: new Verb('stretnúť sa', 'to meet', true),
  sadnutSi: new Verb('sadnúť si', 'to sit down', true),
};

describe('Present tense — Reflexive verbs', () => {
  test('správať sa', () => {
    expect(reflexiveVerbs.spravatSa.conjugatePresent(Pronoun.I).derived).toBe('správam sa');
    expect(reflexiveVerbs.spravatSa.conjugatePresent(Pronoun.THEY).derived).toBe('správajú sa');
  });

  test('zaslúžiť si', () => {
    expect(reflexiveVerbs.zasluzitSi.conjugatePresent(Pronoun.I).derived).toBe('zaslúžim si');
    expect(reflexiveVerbs.zasluzitSi.conjugatePresent(Pronoun.THEY).derived).toBe('zaslúžia si');
  });

  test('učiť sa', () => {
    expect(reflexiveVerbs.ucitSa.conjugatePresent(Pronoun.I).derived).toBe('učím sa');
    expect(reflexiveVerbs.ucitSa.conjugatePresent(Pronoun.THEY).derived).toBe('učia sa');
  });

  test('sadnúť si', () => {
    expect(reflexiveVerbs.sadnutSi.conjugatePresent(Pronoun.I).derived).toBe('sadnem si');
    expect(reflexiveVerbs.sadnutSi.conjugatePresent(Pronoun.THEY).derived).toBe('sadnú si');
  });

  test('gender override', () => {
    expect(reflexiveVerbs.spravatSa.conjugatePresent(Pronoun.THEY, Gender.Femenine).derived).toBe('správajú sa');
  });
});

// ---------------------------
// Fully irregular verbs (presentMap)
// ---------------------------
const irregularVerbs = {
  byt: new Verb('byť', 'to be', false, CASE_TYPE.ACCUSATIVE, undefined, {
    [Pronoun.I]: 'som',
    [Pronoun.YOU]: 'si',
    [Pronoun.HE]: 'je',
    [Pronoun.SHE]: 'je',
    [Pronoun.IT]: 'je',
    [Pronoun.WE]: 'sme',
    [Pronoun.YOU_PL]: 'ste',
    [Pronoun.THEY]: 'sú',
  }),
  ist: new Verb(
    'ísť',
    'to go',
    false,
    CASE_TYPE.ACCUSATIVE,
    'id', // irregular stem
    {
      [Pronoun.I]: 'idem',
      [Pronoun.YOU]: 'ideš',
      [Pronoun.THEY]: 'idú',
    },
  ),
  dat: new Verb('dať', 'to give', false, CASE_TYPE.ACCUSATIVE, undefined, {
    [Pronoun.I]: 'dám',
    [Pronoun.YOU]: 'dáš',
    [Pronoun.HE]: 'dá',
    [Pronoun.WE]: 'dáme',
    [Pronoun.THEY]: 'dajú',
  }),
};

describe('Present tense — Irregular verbs', () => {
  test.skip('byť', () => {
    expect(irregularVerbs.byt.conjugatePresent(Pronoun.I).derived).toBe('som');
    expect(irregularVerbs.byt.conjugatePresent(Pronoun.THEY).derived).toBe('sú');
  });

  test.skip('ísť', () => {
    expect(irregularVerbs.ist.conjugatePresent(Pronoun.I).derived).toBe('idem');
    expect(irregularVerbs.ist.conjugatePresent(Pronoun.HE).derived).toBe('ide'); // stem + ending
    expect(irregularVerbs.ist.conjugatePresent(Pronoun.THEY).derived).toBe('idú');
  });

  test.skip('dať', () => {
    expect(irregularVerbs.dat.conjugatePresent(Pronoun.I).derived).toBe('dám');
    expect(irregularVerbs.dat.conjugatePresent(Pronoun.WE).derived).toBe('dáme');
    expect(irregularVerbs.dat.conjugatePresent(Pronoun.THEY).derived).toBe('dajú');
  });
});

// ---------------------------
// pozvať — stem-change (-vať → -ve-)
// ---------------------------
const stemChangeVerbs = {
  pozvat: new Verb(
    'pozvať',
    'to invite',
    false,
    CASE_TYPE.ACCUSATIVE,
    'pozve', // irregular present stem
    {
      [Pronoun.THEY]: 'pozvú', // override only 3rd plural
    },
    ['nut'],
  ),
};

describe('Present tense — Stem-changing verbs', () => {
  test('pozvať (-vať → -ve-) singular/plural', () => {
    const result = stemChangeVerbs.pozvat.conjugatePresent(Pronoun.I);

    expect(result.documentation.length).toBeGreaterThan(0);

    expect(stemChangeVerbs.pozvat.conjugatePresent(Pronoun.I).derived).toBe('pozvem');

    expect(stemChangeVerbs.pozvat.conjugatePresent(Pronoun.YOU).derived).toBe('pozveš');
    expect(stemChangeVerbs.pozvat.conjugatePresent(Pronoun.HE).derived).toBe('pozve');
    expect(stemChangeVerbs.pozvat.conjugatePresent(Pronoun.WE).derived).toBe('pozveme');
    expect(stemChangeVerbs.pozvat.conjugatePresent(Pronoun.YOU_PL).derived).toBe('pozvete');
    expect(stemChangeVerbs.pozvat.conjugatePresent(Pronoun.THEY).derived).toBe('pozvú');
  });
});

test('nájsť (-sť heuristic stem)', () => {
  const najst = new Verb('nájsť', 'to find');

  expect(najst.conjugatePresent(Pronoun.I).derived).toBe('nájdem');
  expect(najst.conjugatePresent(Pronoun.YOU).derived).toBe('nájdeš');
  expect(najst.conjugatePresent(Pronoun.THEY).derived).toBe('nájdu');
});

test('prísť (-sť heuristic fallback)', () => {
  const prist = new Verb('prísť', 'to come');

  expect(prist.conjugatePresent(Pronoun.I).derived).toBe('prídem');
  expect(prist.conjugatePresent(Pronoun.THEY).derived).toBe('prídu');
});
