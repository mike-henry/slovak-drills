<template>
  <GenericDrill
    :caseName="getCaseName"
    :drillTitle="drillTitle"
    :drillSubtitle="drillSubTitle"
    :sk="sk"
    :en="en"
    :is-plural="plural"
    :build-next-item="buildNextItem"
    :expectedAnswer="expected"
  />
</template>

<script setup lang="ts">
import { capitalizeFirstOnly, getRandomNoun, getRandomPronoun, getRandomVerb, randomBoolean } from './drillUtils.js';
import { CASE_TYPE } from '@/utils/grammer/WordTypes';

import GenericDrill from '@/components/GenericDrill.vue';
import type Verb from '@/utils/grammer/verbs/Verb.js';
import { getPronounDeclension, getPronounForm } from '@/utils/grammer/Pronoun.js';
import type { PronounDeclension } from '@/utils/grammer/Pronoun.js';

const getCaseName = () => CASE_TYPE.NOMINATIVE;

class Item {
  verb: Verb;
  object: PronounDeclension;
  subject: PronounDeclension;
}

const buildNextItem: () => Item = () => {
  const verb = getRandomVerb();
  const object = getPronounDeclension(getRandomPronoun());
  const subject = getPronounDeclension(getRandomPronoun());
  return {
    verb,
    object,
    subject,
  };
};

const sk = (item: Item) => `(${item.object.nominative}) ${item.verb.sk} ${item.subject.nominative} `;
const en = (item: Item) => `(${item.object.enObject}) ${item.verb.en} to ${item.subject.en}`;

const question = (item: Item) => `(${item.object.nominative}) ${item.verb.sk} ${item.subject.nominative} `;

const expected = (item: Item) => {
  const conjugatedVerb =item.verb.conjugatePresent(item.object.pronoun); /// FIX-ME
  const formedSubject = getPronounForm( item.subject.pronoun,item.verb.caseType);
  return `${conjugatedVerb} ${formedSubject}`
};
const plural = (item: Item) => false;
const caseTitle = capitalizeFirstOnly(getCaseName());
const drillTitle = `Slovak Verb Conjigation Drill`;
const drillSubTitle = `Type the correct form of the verb.`;
</script>
