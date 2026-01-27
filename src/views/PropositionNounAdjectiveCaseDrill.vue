<template>
  <GenericDrill
    :subjectArea="caseName"
    drillTitle="Slovak proposition adjective with noun Case Drill"
    drillSubtitle="Slovak proposition adjective with noun Case Drill"
    :sk="sk"
    :en="en"
    :is-plural="plural"
    :build-next-item="buildNextItem"
    :expectedAnswer="getExpected"
  />
</template>

<script setup lang="ts">
import GenericDrill from '@/components/GenericDrill.vue';
import { ref, type Ref } from 'vue';
import { getRandomAdjective, getRandomProposition, randomBoolean } from '@/views/drillUtils';

import { declinatePropositionAdjectiveWithNoun } from '@/utils/grammer/declinations/DeclinationUtils';
import type Proposition from '../utils/grammer/Proposition';
import type Adjective from '@/utils/grammer/declinations/Adjective';
import Noun from '@/utils/grammer/declinations/Noun';

class Item {
  noun: Noun;
  adjective: Adjective;
  proposition: Proposition;
  isPlural: boolean;
}

const caseName = () => item.value?.proposition?.caseType;

const plural = (item: Item) => (item?.isPlural ? true : false);

const item: Ref<Item> = ref();

const buildNextItem: () => Item = () => {
  item.value = {
    noun: Noun.getRandom(),
    adjective: getRandomAdjective(),
    proposition: getRandomProposition(),
    isPlural: randomBoolean(),
  };
  return item.value;
};

const getExpected = (item: Item) =>
  declinatePropositionAdjectiveWithNoun(item.adjective, item.noun, item.proposition, item.isPlural);
const sk = (item: Item) => (item ? `${item.proposition.sk} ${item.adjective.sk} ${item.noun.sk}` : '');
const en: (item: Item) => string = (item: any) =>
  item ? `${item.proposition.en} ${item.adjective.en} ${item.noun.en}` : '';
</script>
