import { CASE_TYPE, WORD } from '@/utils/grammer/WordTypes';
import { loadWords } from './LoadingUtil';
import { bus } from '@/events/bus';

export default class Proposition extends WORD {
  caseType: CASE_TYPE;
  private constructor(sk: string, en: string, caseType: CASE_TYPE, labels?: string[]) {
    super();
    this.sk = sk;
    this.en = en;
    this.caseType = caseType;
    this.labels = labels || [];
  }

  static propositions: Proposition[] = [];
  static allLabels: string[] = [];

  static getLabels(): string[] {
    return Proposition.allLabels.values().toArray().sort();
  }

  static getRandom = (): Proposition => {
    while (!LOADED) {
      /* wait */
    } // no better way for now

    const filterFn: (item: Proposition) => boolean =
      filter.length == 0 ? (n) => true : (item: Proposition) => filter.some((label) => item.labels.includes(label));
    return WORD.getRandomWord<Proposition>(Proposition.propositions, filterFn);
  };

  static fromRaw(params: { sk: string; en: string; case: CASE_TYPE; labels?: string[] }): Proposition {
    if (!params.case) console.warn('NO CASE in Proposition');
    return new Proposition(params.sk, params.en, params.case as CASE_TYPE, params.labels);
  }
}

const DEFAULT_PROPOSITION: Proposition[] = [
  Proposition.fromRaw({
    sk: 'na',
    en: 'on',
    case: CASE_TYPE.LOCATIVE,
  }),
];

let filter: string[] = [];
bus.on('proposition-active-labels-updated', (labels) => {
  filter = labels;
});

const PROPOSITIONS = 'slovak-propositions-A1.json';
let LOADED = false;
loadWords(PROPOSITIONS, Proposition.propositions, DEFAULT_PROPOSITION, Proposition.fromRaw).then((result) => {
  LOADED = true;
  Proposition.propositions = result;
  bus.emit('proposition-all-labels-updated', Proposition.getLabels());
  console.info(`✅ propositions loaded: ${Proposition.propositions.length} from ${PROPOSITIONS}`);
});
