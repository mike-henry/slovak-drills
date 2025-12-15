import DerivedWord from "../DerivedWord";
import type { CASE_TYPE } from "../WordTypes";
import type Adjective from "./Adjective";
import type Noun from "./Noun";


export const declinateAdjectiveWithNoun = (adjective: Adjective, noun: Noun, caseType: CASE_TYPE, plural = false): DerivedWord => {
    const nounDeclination = noun.declinate(caseType, plural);
    const adjectiveDeclination = adjective.declinate(caseType, noun, plural);
    return new DerivedWord(
        `${adjectiveDeclination.derived} ${nounDeclination.derived}`,
        `for noun ${nounDeclination.explanation}, for adjective ${adjectiveDeclination.explanation}`,
        [...nounDeclination.documentation, ...adjectiveDeclination.documentation]
    );
};
