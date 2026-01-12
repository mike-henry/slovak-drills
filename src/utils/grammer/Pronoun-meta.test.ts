import { describe, it, expect } from 'vitest';
import { Pronoun, getPronounDeclension, getPronounForm } from './Pronoun';
import { CASE_TYPE } from './WordTypes';

/**
 * These  tests are obsolete !!!  PRONOUN_META will be deprecated.
 */

describe('Pronoun metadata usage', () => {
  it('provides English and Slovak display values for each pronoun', () => {
    expect(getPronounDeclension(Pronoun.I).en).toBe('I');
    expect(getPronounDeclension(Pronoun.I).nominative.long).toBe('ja');

    expect(getPronounDeclension(Pronoun.WE).en).toBe('we');
    expect(getPronounDeclension(Pronoun.WE).nominative.long).toBe('my');
  });

  it('contains metadata for every Pronoun enum value', () => {
    const pronouns = Object.values(Pronoun);
    for (const pronoun of pronouns) {
      expect(getPronounDeclension(pronoun)).toBeDefined();
      expect(getPronounForm(pronoun)).toBeDefined();
      expect(getPronounForm(pronoun)).toEqual(getPronounForm(pronoun, CASE_TYPE.ACCUSATIVE, 'short'));
    }
  });

  it('correctly identifies grammatical person and number', () => {
    const I = getPronounDeclension(Pronoun.I);
    expect(getPronounDeclension(Pronoun.I).en).toBe('I');
    expect(I.person).toBe(1);
    expect(I.number).toBe('singular');
    const you = getPronounDeclension(Pronoun.YOU);
    expect(getPronounDeclension(Pronoun.YOU).en).toBe('you');
    expect(you.person).toBe(2);
    expect(you.number).toBe('singular');
    const he = getPronounDeclension(Pronoun.HE);
    expect(getPronounDeclension(Pronoun.HE).en).toBe('he');
    expect(he.person).toBe(3);
    expect(he.number).toBe('singular');
    const she = getPronounDeclension(Pronoun.SHE);
    expect(getPronounDeclension(Pronoun.SHE).en).toBe('she');
    expect(she.person).toBe(3);
    expect(she.number).toBe('singular');
    const It = getPronounDeclension(Pronoun.IT);
    expect(getPronounDeclension(Pronoun.IT).en).toBe('it');
    expect(It.person).toBe(3);
    expect(It.number).toBe('singular');
    const we = getPronounDeclension(Pronoun.WE);
    expect(getPronounDeclension(Pronoun.WE).en).toBe('we');
    expect(we.person).toBe(1);
    expect(we.number).toBe('plural');

    const youPlural = getPronounDeclension(Pronoun.YOU_PL);
    expect(getPronounDeclension(Pronoun.YOU_PL).en).toBe('you (plural)');
    expect(youPlural.person).toBe(2);
    expect(youPlural.number).toBe('plural');
    const they = getPronounDeclension(Pronoun.THEY);
    expect(getPronounDeclension(Pronoun.THEY).en).toBe('they');
    expect(they.person).toBe(3);
    expect(they.number).toBe('plural');

    /// special case THAT
    const that = getPronounDeclension(Pronoun.THAT);
    expect(getPronounDeclension(Pronoun.THAT).en).toBe('that');
    expect(that.person).toBe(3);
    expect(that.number).toBe('singular');
  });

  it('demonstrates how conjugation code uses Pronoun directly', () => {
    const person: Pronoun = Pronoun.YOU_PL;

    // This simulates how your conjugators work
    expect(person).toBe(Pronoun.YOU_PL);

    // UI layer uses metadata
    const display = getPronounDeclension(person);
    expect(display.en).toBe('you (plural)');
    expect(display.nominative.long).toBe('vy');
    expect(display.number).toBe('plural');
  });

  it('contains metadata for every Pronoun enum value', () => {
    const pronoun = Pronoun.I;

    expect(getPronounForm(pronoun).documentation).toContain(
      'pronoun://accusative?pronouns-introduction&pronouns-short-forms',
    );
  });

  it('contains metadata for every Pronoun enum value', () => {
    const pronoun = Pronoun.I;
    expect(getPronounForm(pronoun, CASE_TYPE.INSTRUMENTAL).documentation).toContain(
      'pronoun://instrumental?pronouns-introduction&pronouns-short-forms',
    );
  });

  it('contains metadata for every Pronoun enum value', () => {
    const pronoun = Pronoun.I;
    expect(getPronounForm(pronoun, CASE_TYPE.INSTRUMENTAL, 'long').documentation).toContain(
      'pronoun://instrumental?pronouns-introduction&pronouns-long-forms',
    );
  });
  it('contains metadata for every Pronoun enum value', () => {
    const pronoun = Pronoun.I;
    expect(getPronounForm(pronoun, CASE_TYPE.INSTRUMENTAL, 'afterPrep').documentation).toContain(
      'pronoun://instrumental?pronouns-introduction&pronouns-after-prep',
    );
  });

  it('contains metadata for every Pronoun enum value', () => {
    const pronoun = Pronoun.I;
    expect(getPronounForm(pronoun, CASE_TYPE.LOCATIVE).documentation).toContain(
      'pronoun://locative?pronouns-introduction&pronouns-short-forms',
    );
  });

  it('contains metadata for every Pronoun enum value', () => {
    const pronoun = Pronoun.I;
    expect(getPronounForm(pronoun, CASE_TYPE.NOMINATIVE).documentation).toContain(
      'pronoun://nominative?pronouns-introduction&pronouns-short-forms',
    );
  });
});
