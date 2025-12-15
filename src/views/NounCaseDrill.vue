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
          {{ currentNoun.sk }}
          <span class="drill-plural" v-if="currentIsPlural"> in plural</span>
        </div>

        <div class="text-slate-400 mb-4">
          ({{ currentNoun.en }})
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
import { ref, onMounted,  computed, type Ref } from 'vue'
import {  loadVocabulary } from '../utils/grammer/wordStore.js'
import { history, addToHistory, totalAttempts, streakCount, getRandomNoun ,STREAK_TARGET, capitalizeFirstOnly,resetStreak} from './drillUtils.js'
import HistoryList from '@/components/HistoryList.vue'
import AnswerField from '@/components/AnswerField.vue'
import DrillProgress from '@/components/DrillProgress.vue'
import CongratsModal from '@/components/CongratsModal.vue'
import CaseHelp from '@/components/CaseHelp.vue'
import type Noun from '@/utils/grammer/declinations/Noun.js'


onMounted(() => loadVocabulary())

const properties = defineProps(['caseName'])
const caseName = properties.caseName

const caseHelp = ref(null)
const caseHelpSection:Ref<string[]> = ref()
const caseHelpShow = ref(false)


const caseTitle = computed(() => {
  return capitalizeFirstOnly(properties.caseName)
})



const hasStarted = ref(false)
const currentIsPlural = ref(false)
const currentNoun:Ref<Noun> = ref()
const userAnswer = ref('')
const showExplanation = ref(false)
const explanationText = ref('')
const showStreakDialog = ref(false)


const startQuiz = () => {
  hasStarted.value = true
  resetStreak()
  totalAttempts.value = 0
  history.value = []
  nextQuestion()
}

const nextQuestion = () => {
  currentNoun.value = getRandomNoun()
  currentIsPlural.value = Math.random() < 0.5
  userAnswer.value = currentNoun.value.sk
  showExplanation.value = false
  explanationText.value = ''
}

const submitAnswer = () => {
  const noun = currentNoun.value
  const expectedValue = noun.declinate(caseName,currentIsPlural.value)
  const answer = userAnswer.value.trim().toLowerCase()
  const correct = answer === expectedValue.derived.toLowerCase()
   caseHelpSection.value = expectedValue.documentation 

  totalAttempts.value++
  addToHistory(noun.sk, answer, correct, expectedValue.derived,caseName,expectedValue.documentation)
 
 
  if (correct) {
    streakCount.value++
    if (streakCount.value >= STREAK_TARGET) showStreakDialog.value = true
    nextQuestion()
  } else {
    resetStreak()

    explanationText.value = `❗ "for ${noun.sk}" : explanation "${expectedValue.explanation}".`

    showExplanation.value = true
  }
}




const handleContinue = () => {
  nextQuestion()
}



function openDocumentation() {
  caseHelpShow.value = true
}

</script>

