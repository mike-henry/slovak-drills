<template>

  <GenericDrill :caseName="getCaseName" :drillTitle=drillTitle :drillSubtitle=drillSubTitle :sk="sk" :en="en"
    :is-plural="plural" :build-next-item="buildNextItem" :expectedAnswer="expected" />

</template>


<script setup lang="ts">

import { capitalizeFirstOnly, getRandomNoun, randomBoolean } from './drillUtils.js'
import { CASE_TYPE } from '@/utils/grammer/WordTypes'
import type Noun from '@/utils/grammer/declinations/Noun.js'
import GenericDrill from '@/components/GenericDrill.vue'
import type Verb from '@/utils/grammer/verbs/Verb.js';


const properties = defineProps<{ caseName: CASE_TYPE }>()


const getCaseName = () => properties.caseName

class Item {
  verb: Verb
  isPlural: boolean
}

const buildNextItem: () => Item = () => ({ verb: getRandomVerb(), isPlural: randomBoolean() })

const sk = (item: Item) => item.verb.sk
const en = (item: Item) => item.verb.en

const expected = (item: Item) => item.verb.
const plural = (item: Item) => item.isPlural
const caseTitle = capitalizeFirstOnly(getCaseName())
const drillTitle = `Slovak ${caseTitle} Verb Conjigation Drill`
const drillSubTitle = `Type the correct ${caseTitle} form of the verb.`
</script>
