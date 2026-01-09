import DerivedWord from "./DerivedWord"
import { CASE_TYPE } from "./WordTypes"

export enum Pronoun {
    I = "I",
    YOU = "YOU",
    HE = "HE",
    SHE = "SHE",
    IT = "IT",
    THAT = "THAT",
    WE = "WE",
    YOU_PL = "YOU_PL",
    THEY = "THEY"
}

export interface PronounDeclension {
    pronoun: Pronoun

    // English forms
    en: string          // subject form: I, you, he, she...
    enObject: string    // object form: me, you, him, her...
    person: 1 | 2 | 3
    number: "singular" | "plural"

    // Slovak forms (all cases use a uniform object structure)
    nominative: {
        long: string
    }

    accusative: {
        short?: string
        long: string
        afterPrep?: string
    }

    dative: {
        short?: string
        long: string
        afterPrep?: string
    }

    locative: {
        long: string
    }

    instrumental: {
        long: string
    }
}

const PRONOUN_FORMS: Record<Pronoun, PronounDeclension> = {
    [Pronoun.I]: {
        pronoun: Pronoun.I,
        person: 1,
        number: 'singular',
        en: "I",
        enObject: "me",
        nominative: { long: "ja" },
        accusative: { short: "ma", long: "mňa" },
        dative: { short: "mi", long: "mne" },
        locative: { long: "mne" },
        instrumental: { long: "mnou" }
    },

    [Pronoun.YOU]: {
        pronoun: Pronoun.YOU,
        person: 2,
        number: 'singular',
        en: "you",
        enObject: "you",
        nominative: { long: "ty" },
        accusative: { short: "ťa", long: "teba" },
        dative: { short: "ti", long: "tebe" },
        locative: { long: "tebe" },
        instrumental: { long: "tebou" }
    },

    [Pronoun.HE]: {
        pronoun: Pronoun.HE,
        person: 3,
        number: 'singular',
        en: "he",
        enObject: "him",
        nominative: { long: "on" },
        accusative: { short: "ho", long: "jeho", afterPrep: "neho" },
        dative: { short: "mu", long: "jemu", afterPrep: "nemu" },
        locative: { long: "ňom" },
        instrumental: { long: "ním" }
    },

    [Pronoun.SHE]: {
        pronoun: Pronoun.SHE,
        person: 3,
        number: 'singular',
        en: "she",
        enObject: "her",
        nominative: { long: "ona" },
        accusative: { short: "ju", long: "ňu" },
        dative: { long: "jej", afterPrep: "nej" },
        locative: { long: "nej" },
        instrumental: { long: "ňou" }
    },

    [Pronoun.IT]: {
        pronoun: Pronoun.IT,
        person: 3,
        number: 'singular',
        en: "it",
        enObject: "it",
        nominative: { long: "ono" },
        accusative: { short: "ho", long: "jeho", afterPrep: "neho" },
        dative: { short: "mu", long: "jemu", afterPrep: "nemu" },
        locative: { long: "ňom" },
        instrumental: { long: "ním" }
    },

    [Pronoun.THAT]: {
        pronoun: Pronoun.THAT,
        person: 3,
        number: 'singular',
        en: "that",
        enObject: "that",
        nominative: { long: "to" },
        accusative: { long: "to" },
        dative: { long: "tomu" },
        locative: { long: "tom" },
        instrumental: { long: "tým" }
    },

    [Pronoun.WE]: {
        pronoun: Pronoun.WE,
        person: 1,
        number: 'plural',
        en: "we",
        enObject: "us",
        nominative: { long: "my" },
        accusative: { long: "nás" },
        dative: { long: "nám" },
        locative: { long: "nás" },
        instrumental: { long: "nami" }
    },

    [Pronoun.YOU_PL]: {
        pronoun: Pronoun.YOU_PL,
        person: 2,
        number: 'plural',
        en: "you (plural)",
        enObject: "you (plural)",
        nominative: { long: "vy" },
        accusative: { long: "vás" },
        dative: { long: "vám" },
        locative: { long: "vás" },
        instrumental: { long: "vami" }
    },

    [Pronoun.THEY]: {
        pronoun: Pronoun.THEY,
        person: 3,
        number: 'plural',
        en: "they",
        enObject: "them",
        nominative: { long: "oni" },
        accusative: { long: "ich", afterPrep: "nich" },
        dative: { long: "im", afterPrep: "nim" },
        locative: { long: "nich" },
        instrumental: { long: "nimi" }


    }
}

export function getPronounDeclension(pronoun: Pronoun): PronounDeclension {
    return PRONOUN_FORMS[pronoun]
}

export function getPronounForm(
    pronoun: Pronoun,
    caseType: CASE_TYPE = CASE_TYPE.ACCUSATIVE,
    form: "short" | "long" | "afterPrep" = "short"
): DerivedWord {
    const entry = getPronounDeclension(pronoun)
    const caseBlock = entry[caseType] as any
    let derived: string;
    let explanation: string;

    
    if (form === "short" && caseBlock.short) {// If the case has a short form and user wants short → return it
        derived = caseBlock.short
    } else if (form === "long" && caseBlock.long) {// If user wants long → return long
        derived = caseBlock.long
    } else if (form === "afterPrep" && caseBlock.afterPrep) {   // If user wants afterPrep → return it
        derived = caseBlock.afterPrep
    }
    else {
        // Fallback logic:
        // 1. short if available
        // 2. else long
        // 3. else error
        derived = caseBlock.short ?? caseBlock.long
    }

    explanation = `The ${form} form of '${entry.enObject}' (${pronoun}) in ${caseType} case is '${derived}'`
    return new DerivedWord(derived, explanation)
}