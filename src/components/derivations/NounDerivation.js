
import { locativeNounDeriver } from "./LocativeNounDerivations.js";
import { accusativeNounDeriver } from "./AccusativeNounDerivations.js";
import { instrumentalNounDeriver } from "./InstrumentalNounDerivations";
import { nominativeNounDeriver } from "./NominativeNounDerivations.js";
import { instrumentalAdjectiveDeriver } from "./InstrumentalAdjectiveDerivations.js";
import { nominativeAdjectiveDeriver } from "./NominativeAdjectiveDerivations.js";   
import { accusativeAdjectiveDeriver } from "./AccusativeAdjectiveDerivations.js";
import { locativeAdjectiveDeriver } from "./LocativeAdjectiveDerivations.js";


export const  nounDeriver =    (vocalCase) => {
    switch(vocalCase) {
      case  CASE.LOCATIVE:
        return locativeNounDeriver; 
        case CASE.ACCUSATIVE:   
        return accusativeNounDeriver;
        case CASE.NOMINATIVE:
          return nominativeNounDeriver;
        case CASE.INSTRUMENTAL:
          return instrumentalNounDeriver;
        default:
          throw new Error(`Noun deriver for case ${vocalCase} not implemented yet`);  
    }
}



export const adjectiveDeriver =    (vocalCase) => {
    switch(vocalCase) {
      case  CASE.INSTRUMENTAL:      
        return instrumentalAdjectiveDeriver;
        case CASE.ACCUSATIVE:   
        return accusativeAdjectiveDeriver;
        case CASE.NOMINATIVE:
          return nominativeAdjectiveDeriver;
          case CASE.LOCATIVE:
            return locativeAdjectiveDeriver;                     
        default:        
          throw new Error(`Adjective deriver for case ${vocalCase} not implemented yet`);  
    }   
}


export const CASE = {
  NOMINATIVE: 'nominative',
  GENITIVE: 'genitive',
  DATIVE: 'dative', 
  ACCUSATIVE: 'accusative',
  INSTRUMENTAL: 'instrumental',
  LOCATIVE: 'locative',
  VOCATIVE: 'vocative'
}

export  const deriver = {
    noun: nounDeriver,
    adjective: adjectiveDeriver
}


