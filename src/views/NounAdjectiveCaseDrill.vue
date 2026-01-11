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
import { declinateAdjectiveWithNoun } from '@/utils/grammer/declinations/DeclinationUtils.js';
import { capitalizeFirstOnly, getRandomNoun, getRandomAdjective, randomBoolean } from './drillUtils.js';
import { CASE_TYPE } from '@/utils/grammer/WordTypes';
import type Noun from '@/utils/grammer/declinations/Noun.js';
import GenericDrill from '@/components/GenericDrill.vue';
import type Adjective from '@/utils/grammer/declinations/Adjective.js';

const properties = defineProps<{ caseName: CASE_TYPE }>();
const caseName = properties.caseName;

const getCaseName = () => caseName;

class Item {
  noun: Noun;
  adjective: Adjective;
  isPlural: boolean;
}

const buildNextItem: () => Item = () => ({
  noun: getRandomNoun(),
  isPlural: randomBoolean(),
  adjective: getRandomAdjective(),
});
const sk = (item: Item) => `${item.adjective.sk} ${item.noun.sk}`;
const en = (item: Item) => `${item.adjective.en} ${item.noun.en}`;
const expected = (item: Item) =>
  declinateAdjectiveWithNoun(item.adjective, item.noun, caseName as CASE_TYPE, item.isPlural);
const plural = (item: Item) => item.isPlural;
const caseTitle = capitalizeFirstOnly(caseName);
const drillTitle = `Slovak ${caseTitle}  adjective with noun Case Drill`;
const drillSubTitle = `Type the correct ${caseTitle} form of each adjective`;
</script>
