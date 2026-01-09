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
import { capitalizeFirstOnly, getRandomPronoun, getRandomVerb } from './drillUtils.js';
import { CASE_TYPE } from '@/utils/grammer/WordTypes';

import GenericDrill from '@/components/GenericDrill.vue';
import type Verb from '@/utils/grammer/verbs/Verb.js';
import { type Pronoun, getPronounDeclension } from '@/utils/grammer/Pronoun.js';

const getCaseName = () => CASE_TYPE.NOMINATIVE;

class Item {
  verb: Verb;
  pronoun: Pronoun;
}

const buildNextItem: () => Item = () => ({
  verb: getRandomVerb(),
  pronoun: getRandomPronoun(),
});

const sk = (item: Item) => item.verb.sk;

const en = (item: Item) => `(${getPronounDeclension(item.pronoun).nominative}) ${item.verb.en}`;

const expected = (item: Item) => item.verb.conjugatePresent(item.pronoun);
const plural = (item: Item) => false;
const caseTitle = capitalizeFirstOnly(getCaseName());
const drillTitle = `Slovak Verb Conjigation Drill`;
const drillSubTitle = `Type the correct form of the verb.`;
</script>
