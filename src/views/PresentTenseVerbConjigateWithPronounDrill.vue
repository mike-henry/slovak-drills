<template>
  <GenericDrill
    :subjectArea="getCaseName"
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
import { CASE_TYPE } from '@/utils/grammer/WordTypes';

import GenericDrill from '@/components/GenericDrill.vue';
import Verb from '@/utils/grammer/verbs/Verb.js';
import { getPronounDeclension, getRandomPronoun } from '@/utils/grammer/Pronoun.js';
import type { PronounDeclension } from '@/utils/grammer/Pronoun.js';
import { conjugateWithPronoun } from '@/utils/grammer/verbs/VerbUtils.js';

const getCaseName = () => CASE_TYPE.NOMINATIVE;

class Item {
  verb: Verb;
  object: PronounDeclension;
  subject: PronounDeclension;
}

const buildNextItem: () => Item = () => {
  const verb = Verb.getRandom();
  const object = getPronounDeclension(getRandomPronoun());
  const subject = getPronounDeclension(getRandomPronoun());
  return {
    verb,
    object,
    subject,
  };
};

const sk = (item: Item) => `(${item.object.nominative.long}) ${item.verb.sk} ${item.subject.nominative.long} `;
const en = (item: Item) => `(${item.object.en}) ${item.verb.en} to ${item.subject.enObject}`;

const expected = (item: Item) => conjugateWithPronoun(item.object.pronoun, item.verb, item.subject.pronoun);
const plural = (item: Item) => false;

const drillTitle = `Slovak Verb Conjigation with pronouns Drill`;
const drillSubTitle = `Type the correct form of the verb.`;
</script>
