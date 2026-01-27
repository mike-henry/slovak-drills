export class WORD {
  sk: string;
  en: string;
  labels?: string[];

  static shuffleArray<T>(array: readonly T[]): T[] {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  static getRandomWord<T>(items: T[], filterFn: (arg: T) => boolean): T {
    const shuffled = WORD.shuffleArray(items).filter(filterFn);
    return shuffled[Math.floor(Math.random() * shuffled.length)];
  }
}

export enum Gender {
  Masculine = 'M',
  Femenine = 'F',
  Neutral = 'N',
}

export enum CASE_TYPE {
  NOMINATIVE = 'nominative',
  GENITIVE = 'genitive',
  DATIVE = 'dative',
  ACCUSATIVE = 'accusative',
  INSTRUMENTAL = 'instrumental',
  LOCATIVE = 'locative',
  VOCATIVE = 'vocative',
}
