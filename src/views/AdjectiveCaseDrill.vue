<template>
  <div class="drill-container">
    
    <h1 class="text-2xl font-bold mb-2">
      Slovak {{ caseTitle }} adjective Case Drill
    </h1>

    <p class="text-slate-400 mb-6">
      Type the correct <b>{{ caseTitle }}</b> form of each adjective.
    </p>

    <div v-if="!hasStarted" class="text-center mt-8">
      <button @click="startQuiz" class="drill-button-primary px-6 py-3">
        Start / Reset
      </button>
    </div>

    <div v-else>
      <div class="drill-panel">

        <div class="text-4xl font-bold mb-1">
          {{ currentItem.adjective.sk }}:
          of <span v-if="currentItem.noun.animate">living </span>
          {{ currentGenderText }}
          <span class="drill-plural" v-if="currentItem && currentItem.plural"> in plural</span>
        </div>

        <div class="text-slate-400 mb-4">({{ currentItem.adjective.en }})</div>
        <answer-field v-model="userAnswer" :disabled="showExplanation" />

        <div class="mt-4 flex gap-3">
          <button
            v-if="!showExplanation"
            @click="submitAnswer"
            class="drill-button-primary"
          >
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

        <div v-if="showExplanation" class="drill-explanation">
          <p class="text-lg">{{ explanationText }}</p>
        </div>
        <drill-progress />
      </div>

      <congrats-modal v-model="showStreakDialog" title="Streak Level Accomplished!" @confirm="resetStreak">
        <p> for {{ caseName }} Adjectives You reached a streak of {{ streakCount }}!</p>
        <p>You should now try another drill</p>
      </congrats-modal>

      <case-Help ref="caseHelp"
        v-if="caseHelpShow"
        :case-name="caseName"
        :section="caseHelpSection"
        @confirm="caseHelpShow = false"
      />

      <div class="mt-6">
        <history-list :history="history" />
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted,computed } from 'vue'
import AnswerField from '@/components/AnswerField.vue'
import HistoryList from '@/components/HistoryList.vue'
import DrillProgress from '@/components/DrillProgress.vue'
import CaseHelp from '@/components/CaseHelp.vue'
import CongratsModal from '@/components/CongratsModal.vue'
import { loadVocabulary } from '@/utils/grammer/wordStore.js'
import { useDrill, getRandomNoun, getRandomAdjective, history, streakCount, resetStreak } from './drillUtils.js'
import { CASE_TYPE } from '@/utils/grammer/WordTypes'


onMounted(() => loadVocabulary())

const properties = defineProps(['caseName'])
const caseName = properties.caseName

const caseHelp = ref(null)

// Use the shared drill composable
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
  nextQuestion,
  submitAnswer,
  handleContinue,
  openDocumentation
} = useDrill({
  caseName,
  getNextItem: () => ({ adjective: getRandomAdjective(), noun: getRandomNoun(), plural: Math.random() < 0.5 }),
  getExpected: (item) => item.adjective.declinate(caseName as CASE_TYPE, item.noun, item.plural),
  getInitialAnswer: (item) => item.adjective.sk,
  getWordForHistory: (item) => item.adjective.sk
})

// Computed for template
const currentGenderText = computed(() => {
  if (currentItem.value?.noun?.gender === 'M') return "Masculine"
  if (currentItem.value?.noun?.gender === 'F') return "Femenine"
  return "Neutral"
})
</script>

