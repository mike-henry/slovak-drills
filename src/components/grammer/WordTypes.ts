class WORD {
  sk: string;
  en: string;
}

export enum Gender {
  Masculine = "M",
  Femenine = "F",
  Neutral = "N",
}

export class Noun extends WORD {
  gender: Gender;
  animate?: boolean;
  plural?: boolean;
}

export class Adjective extends WORD {
    
}
