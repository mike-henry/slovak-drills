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
import { randomBoolean } from './drillUtils.js';
import { CASE_TYPE } from '@/utils/grammer/WordTypes';
import Noun from '@/utils/grammer/declinations/Noun.js';
import GenericDrill from '@/components/GenericDrill.vue';

const properties = defineProps<{ caseName: CASE_TYPE }>();

const getCaseName = () => properties.caseName;

class Item {
  noun: Noun;
  isPlural: boolean;
}

const buildNextItem: () => Item = () => ({
  noun: Noun.getRandom(),
  isPlural: randomBoolean(),
});

const sk = (item: Item) => item.noun.sk;
const en = (item: Item) => item.noun.en;

const expected = (item: Item) => item.noun.declinate(getCaseName(), item.isPlural);
const plural = (item: Item) => item.isPlural;

const drillTitle = `Slovak ${getCaseName()} nouns Case Drill`;
const drillSubTitle = `Type the correct ${getCaseName()} form of each noun.`;
</script>
