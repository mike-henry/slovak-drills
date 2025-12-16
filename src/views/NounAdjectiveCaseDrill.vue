<template>
  <div class="drill-container">
    <h1 class="title">
      Slovak {{ caseTitle }} adjective with noun Case Drill
    </h1>

    <p class="subtitle">
      Type the correct <b>{{ caseTitle }}</b> form of each adjective.
    </p>

    <div v-if="!hasStarted" class="text-center mt-8">
      <button @click="startQuiz" class="drill-button-primary">
        Start / Reset
      </button>
    </div>

    <div v-else>
      <div class="drill-panel">
        <div class="text-4xl font-bold mb-1">
          {{ currentItem.adjective.sk }} {{ currentItem.noun.sk }}
          <span class="drill-plural" v-if="currentItem && currentItem.plural"> in plural</span>
        </div>

        <div class="text-slate-400 mb-4">
          ({{ currentItem.adjective.en }} {{ currentItem.noun.en }})
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

        <div v-if="showExplanation" class="drill-explanation">
          <p class="text-lg">{{ explanationText }}</p>
        </div>
        <drill-progress />
      </div>
      <congrats-modal v-model="showStreakDialog" title="Streak Level Accomplished!" @confirm="resetStreak">
        <p> for {{ caseName }} Nouns with adjectives you reached a streak of {{ streakCount }}!</p>
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
import { ref, onMounted } from 'vue'
import { loadVocabulary } from '@/utils/grammer/wordStore.js'
import DrillProgress from "@/components/DrillProgress.vue"
import AnswerField from '@/components/AnswerField.vue'
import HistoryList from '@/components/HistoryList.vue'
import CongratsModal from '@/components/CongratsModal.vue'
import CaseHelp from '@/components/CaseHelp.vue'
import { useDrill, getRandomAdjective, getRandomNoun, history, streakCount, resetStreak, normalizeSpaces } from './drillUtils.js'
import { declinateAdjectiveWithNoun } from '@/utils/grammer/declinations/DeclinationUtils.js'
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
  submitAnswer: baseSubmitAnswer,
  handleContinue,
  openDocumentation
} = useDrill({
  caseName: ()=>caseName(),
  getNextItem: () => ({ adjective: getRandomAdjective(), noun: getRandomNoun(), plural: Math.random() < 0.5 }),
  getExpected: (item) => declinateAdjectiveWithNoun(item.adjective, item.noun, caseName as CASE_TYPE, item.plural),
  getInitialAnswer: (item) => `${item.adjective.sk} ${item.noun.sk}`,
  getWordForHistory: (item) => `${item.adjective.sk} ${item.noun.sk}`
})

// Override submitAnswer for normalizeSpaces and custom explanation
const submitAnswer = () => {
  const item = currentItem.value
  const expected = declinateAdjectiveWithNoun(item.adjective, item.noun, caseName as CASE_TYPE, item.plural)
  const answer = normalizeSpaces(userAnswer.value).toLowerCase()
  const correct = answer === expected.derived.toLowerCase()

  caseHelpSection.value = expected.documentation

  // Custom logic for this drill
  if (correct) {
    streakCount.value++
    if (streakCount.value >= 10) showStreakDialog.value = true
    handleContinue()
  } else {
    resetStreak()
    explanationText.value = `❗"${expected.derived} ${expected.explanation}"`
    showExplanation.value = true
  }
}
</script>
