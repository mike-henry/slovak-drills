// DeclinateAdjectiveWithNoun.mock.test.ts
import { describe, test, expect } from "vitest";
import { declinateAdjectiveWithNoun } from "./DeclinationUtils";
import DerivedWord from "../DerivedWord";
import type { CASE_TYPE } from "../WordTypes";

// Mock implementations
class MockNoun {
  declinate(caseType: CASE_TYPE, plural: boolean) {
    return new DerivedWord(
      "nounDerived",
      "nounExpl",
      ['noun-section1','noun-section2']
    );
  }
}

class MockAdjective {
  declinate(caseType: CASE_TYPE, noun: MockNoun, plural: boolean) {
     return new DerivedWord(
      "adjDerived",
      "adjExpl",
      ['adjective-section1','adjective-section2']
     );
  }
}

describe("declinateAdjectiveWithNoun (mocked)", () => {
  test("combines adjective and noun declinations into a DerivedWord", () => {
    const noun = new MockNoun();
    const adjective = new MockAdjective();

    const result = declinateAdjectiveWithNoun(
      adjective as any,
      noun as any,
      "GENITIVE" as CASE_TYPE,
      true
    );

    // Check type
    expect(result).toBeInstanceOf(DerivedWord);

    // Check derived string
    expect(result.derived).toBe("adjDerived nounDerived");

    // Check explanation string
    expect(result.explanation).toBe(
      "for adjective: adjExpl, for noun: nounExpl"
    );

    // Check the third field (array of documentation refs)
   expect(result.documentation.length).toBe(4)   
   expect(result.documentation.includes('adjective-section1')).toBe(true)
   expect(result.documentation.includes('adjective-section2')).toBe(true)
   expect(result.documentation.includes('noun-section1')).toBe(true)
   expect(result.documentation.includes('noun-section2')).toBe(true)
  
  });
});