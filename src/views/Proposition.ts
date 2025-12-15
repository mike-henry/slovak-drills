import { CASE_TYPE, WORD } from "@/utils/grammer/WordTypes";

export default class Proposition extends WORD {
    caseType: CASE_TYPE;
    private constructor(
        sk: string,
        en: string,
        caseType: CASE_TYPE
    ) {
        super();
        this.sk = sk;
        this.en = en;
        this.caseType = caseType
    }

    static fromRaw(params: {
        sk: string;
        en: string;
        case: CASE_TYPE
    }): Proposition {
        if (!params.case) console.warn('NO CASE in Proposition')
        return new Proposition(
            params.sk,
            params.en,
            params.case as CASE_TYPE
        );
    }
}