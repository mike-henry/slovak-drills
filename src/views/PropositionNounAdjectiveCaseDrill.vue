<template>
  <div class="drill-container">
    <h1 class="title">
      Slovak proposition adjective with noun Case Drill
    </h1>

    <p class="subtitle">
      Type the correct form of each adjective and noun
    </p>

    <div v-if="!hasStarted" class="text-center mt-8">
      <button @click="startQuiz" class="drill-button-primary">
        Start / Reset
      </button>
    </div>

    <div v-else>
      <div class="drill-panel">
        <div class="text-4xl font-bold mb-1">
          {{ currentItem.proposition.sk }} {{ currentItem.adjective.sk }} {{ currentItem.noun.sk }}

          <span class="drill-plural" v-if="currentItem.isPlural"> in plural</span>
        </div>

        <div class="prompt-subtext">
          {{ currentItem.proposition.en }} {{ currentItem.adjective.en }} {{ currentItem.noun.en }}
        </div>
        <answer-field v-model="userAnswer" :disabled="showExplanation" />
        <div class="mt-4 flex gap-3">
          <button v-if="!showExplanation" @click="submitAnswer" class="drill-button-primary">
            Submit
          </button>

          <div v-else>
            <button @click="handleContinue" class="drill-button-secondary">
              Continue
            </button>
            <button @click="openDocumentation" class="drill-button-secondary">
              Explanation
            </button>
          </div>
        </div>

        <div v-if="showExplanation" class="explanation-box">
          <p class="text-lg">{{ explanationText }}</p>
        </div>
        <drill-progress />
      </div>

      <case-Help ref="caseHelp" v-if="caseHelpShow" :case-name="caseName" :section="caseHelpSection"
        @confirm="caseHelpShow = false" />

      <div class="mt-6">
        <history-list :history="history" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed, type Ref } from 'vue'
import { loadVocabulary } from '@/utils/grammer/wordStore.js'
import DrillProgress from '@/components/DrillProgress.vue'
import AnswerField from '@/components/AnswerField.vue'
import HistoryList from '@/components/HistoryList.vue'
import CaseHelp from '@/components/CaseHelp.vue'
import { useDrill, history, getRandomAdjective, getRandomNoun, getRandomProposition, randomBoolean } from '@/views/drillUtils'

import type Noun from '@/utils/grammer/declinations/Noun'
import type Adjective from '@/utils/grammer/declinations/Adjective'
import { declinateAdjectiveWithNoun } from '@/utils/grammer/declinations/DeclinationUtils'
import type Proposition from './Proposition'


onMounted(() => loadVocabulary())

const properties = defineProps(['caseName'])
const caseName = computed(() => {
  return currentProposition.value.caseType
})




const currentPlural = ref(false)


const currentProposition: Ref<Proposition> = ref()




let proposition: Proposition;
const getAndSetProposition = (): Proposition => {
  proposition = getRandomProposition();
  return proposition;
}




const buildNextItem = (): any => ({
  noun: getRandomNoun(),
  adjective: getRandomAdjective(),
  proposition: getAndSetProposition(),
  isPlural: randomBoolean(),
});



const {
  caseTitle,
  hasStarted,
  currentItem,
  userAnswer,
  showExplanation,
  explanationText,
  showStreakDialog,
  caseHelpSection,
  caseHelpShow,
  startQuiz,
  submitAnswer,
  handleContinue,
  openDocumentation
} = useDrill({
  caseName: () => proposition.caseType,
  getNextItem: buildNextItem,
  getExpected: (item) => declinateAdjectiveWithNoun(item.adjective, item.noun, item.proposition.caseType, currentPlural.value),
  getInitialAnswer: (item) => `${item.proposition.sk} ${item.adjective.sk} ${item.noun.sk}`,
  getWordForHistory: (item) => `${item.proposition.sk} ${item.adjective.sk} ${item.noun.sk}`
})


</script>