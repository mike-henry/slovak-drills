<template>
  <GenericDrill :caseName="getCaseName"
   :drillTitle=drillTitle
    :drillSubtitle=drillSubTitle
    :sk="sk" :en="en" 
    :is-plural="plural"
    :build-next-item="buildNextItem" 
    :question="question"
    :expectedAnswer="expected" />
</template>


<script setup lang="ts">

import {  capitalizeFirstOnly, getRandomNoun ,getRandomAdjective,randomBoolean } from './drillUtils.js'
import { CASE_TYPE } from '@/utils/grammer/WordTypes'
import type Noun from '@/utils/grammer/declinations/Noun.js'
import GenericDrill from '@/components/GenericDrill.vue'
import type Adjective from '@/utils/grammer/declinations/Adjective.js'


const properties = defineProps(['caseName'])
const caseName = properties.caseName

const getCaseName = ()=> caseName

class Item {
  noun:Noun
  adjective:Adjective
  plural:boolean
}

// Computed for template
const currentGenderText = (item:Item) => {
  if (item.noun.gender === 'M') return "Masculine"
  if (item.noun.gender === 'F') return "Feminine"
  return "Neutral"
}



const buildNextItem: () => Item = () => ({ adjective: getRandomAdjective(), noun: getRandomNoun(), plural: randomBoolean()})

const  question= (item:Item) => `${item.adjective.sk}  (as `+( item.noun.animate ? 'Animate ': '') + currentGenderText(item)+')'

const  sk= (item:Item) => item.adjective.sk
const  en= (item:Item) => `${item.adjective.en} `

const expected = (item:Item) => item.adjective.declinate(caseName as CASE_TYPE, item.noun, item.plural);
const plural =(item:Item) => item.plural
const caseTitle = capitalizeFirstOnly(caseName)
const drillTitle =  `Slovak ${caseTitle}  adjective with noun Case Drill` 
const drillSubTitle = `Type the correct ${caseTitle} form of each adjective`



</script>

