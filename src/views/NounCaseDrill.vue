<template>
  <div class="drill-container">
    <h1 class="text-2xl font-bold mb-2">
      Slovak {{ caseTitle }} nouns Case Drill
    </h1>

    <p class="text-slate-400 mb-6">
      Type the correct <b>{{ caseTitle }}</b> form of each noun.
    </p>

    <!-- START BUTTON -->
    <div v-if="!hasStarted" class="text-center mt-8">
      <button @click="startQuiz" class="drill-button-primary px-6 py-3">
        Start / Reset
      </button>
    </div>

    <!-- ACTIVE QUIZ -->
    <div v-else>

      <div class="drill-panel">

        <div class="text-4xl font-bold mb-1">
          {{ currentItem.noun.sk }}
          <span class="drill-plural" v-if="currentItem && currentItem.isPlural"> in plural</span>
        </div>

        <div class="text-slate-400 mb-4">
          ({{ currentItem.noun.en }})
        </div>
        <answer-field v-model="userAnswer" :disabled="showExplanation" />

        <!-- ACTION BUTTONS -->
        <div class="mt-4 flex gap-3">
          <button v-if="!showExplanation" @click="submitAnswer" class="drill-button-primary">
            Submit
          </button>
          <div v-else>
          <button  @click="handleContinue" class="drill-button-secondary">
            Continue
          </button>
          <button @click="openDocumentation" class="drill-button-secondary">
            Explanation
          </button>
          </div>


        </div>

        <!-- EXPLANATION -->
        <div v-if="showExplanation" class="drill-explanation">
          <p class="text-lg">{{ explanationText }}</p>
        </div>
        <drill-progress />

      </div>
      <congrats-modal v-model="showStreakDialog" title="Streak Level Accomplished!" @confirm="resetStreak">
        <p> for {{ caseName }} Nouns You reached a streak of {{ streakCount }}!</p>
        <p>You should now try another  drill</p>
      </congrats-modal>
    <case-Help ref="caseHelp"
      v-if="caseHelpShow"
      :case-name=caseName
      :section=caseHelpSection
       @confirm="caseHelpShow = false"
    />
      <history-list :history="history" />

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadVocabulary } from '../utils/grammer/wordStore.js'
import { useDrill, getRandomNoun, resetStreak, history, streakCount, randomBoolean } from './drillUtils.js'
import { CASE_TYPE } from '@/utils/grammer/WordTypes'
import HistoryList from '@/components/HistoryList.vue'
import AnswerField from '@/components/AnswerField.vue'
import DrillProgress from '@/components/DrillProgress.vue'
import CongratsModal from '@/components/CongratsModal.vue'
import CaseHelp from '@/components/CaseHelp.vue'



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
  submitAnswer,
  handleContinue,
  openDocumentation
} = useDrill({
  caseName: () => caseName,
  getNextItem: () => ({ noun: getRandomNoun(), isPlural:randomBoolean() }),
  getExpected: (item) => item.noun.declinate(caseName as CASE_TYPE, item.isPlural),
  getInitialAnswer: (item) => item.noun.sk,
  getWordForHistory: (item) => item.noun.sk
})
</script>

