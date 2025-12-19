<template>

  <GenericDrill :caseName="getCaseName"
   :drillTitle=drillTitle
    :drillSubtitle=drillSubTitle 
    :sk="sk" 
    :en="en" 
    :is-plural="plural"
    :build-next-item="buildNextItem" 
    :expectedAnswer="expected" />
  
</template>


<script setup lang="ts">

import {  capitalizeFirstOnly, getRandomNoun ,randomBoolean } from './drillUtils.js'
import { CASE_TYPE } from '@/utils/grammer/WordTypes'
import type Noun from '@/utils/grammer/declinations/Noun.js'
import GenericDrill from '@/components/GenericDrill.vue'

const properties = defineProps(['caseName'])
const caseName = properties.caseName

const getCaseName = ()=> caseName

class Item {
  noun:Noun
  isPlural:boolean
}

const buildNextItem: () => Item = () => ({ noun: getRandomNoun(), isPlural: randomBoolean() })

const  sk= (item:Item) => item.noun.sk
const  en= (item:Item) => item.noun.en

const expected = (item:Item) => item.noun.declinate(caseName as CASE_TYPE, item.isPlural)
const plural =(item:Item) => item.isPlural
const caseTitle = capitalizeFirstOnly(caseName)
const drillTitle =  `Slovak ${caseTitle} nouns Case Drill`
const drillSubTitle = `Type the correct ${caseTitle} form of each noun.`
</script>

