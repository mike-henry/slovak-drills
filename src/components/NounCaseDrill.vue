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
      <button
        @click="startQuiz"
        class="drill-button-primary px-6 py-3"
      >
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
        <answer-field
          v-model="userAnswer"
          :disabled="showExplanation" />

        <!-- ACTION BUTTONS -->
        <div class="mt-4 flex gap-3">
          <button
            v-if="!showExplanation"
            @click="submitAnswer"
            class="drill-button-primary"
          >
            Submit
          </button>

          <button
            v-else
            @click="handleContinue"
            class="drill-button-secondary"
          >
            Continue
          </button>
        </div>

        <!-- EXPLANATION -->
        <div v-if="showExplanation" class="drill-explanation">
          <p class="text-lg">{{ explanationText }}</p>
        </div>
       <drill-progress    />

      </div>
      <history-list :history="history" />

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import { loadNouns } from './wordStore.js'
import {  history,  addToHistory,totalAttempts,streakCount,getRandomNoun} from './drillUtils.js'
import HistoryList from './HistoryList.vue'
import AnswerField from './AnswerField.vue'
import DrillProgress from './DrillProgress.vue'    
import { nounDeriver } from './derivations/CaseDerivation.js' 



const STREAK_TARGET = 20

onMounted(() => loadNouns())

const properties = defineProps(['caseName'])
const caseName = properties.caseName
const deriver = nounDeriver(caseName)

const caseTitle = computed(() => {
  return capitalizeFirstOnly(properties.caseName)
})

const capitalizeFirstOnly = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const hasStarted = ref(false)
const currentIsPlural = ref(false)
const currentNoun = ref({})
const userAnswer = ref('')
const showExplanation = ref(false)
const explanationText = ref('')



const startQuiz = () => {
  hasStarted.value = true
  streakCount.value = 0
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
  
  console.log(`submitAnswer: plural=${currentIsPlural}, noun=${noun.sk}, case=${caseName} `);
  const expectedValue =  currentIsPlural.value ? 
     deriver.plural(noun):
     deriver.singular(noun)
  
  const answer = userAnswer.value.trim().toLowerCase()
  const correct = answer === expectedValue.derived.toLowerCase()

  totalAttempts.value++
  addToHistory(noun.sk, answer, correct,expectedValue.derived)

  if (correct) {
    streakCount.value++
    nextQuestion()
  } else {
    streakCount.value = 0
    
    explanationText.value = `❗ "for ${noun.sk}" : explanation "${expectedValue.explanation}".`
       
    showExplanation.value = true
  }
}





const handleContinue = () => {
  nextQuestion()
}


</script>

<style scoped>
ul::-webkit-scrollbar {
  width: 6px;
}
ul::-webkit-scrollbar-thumb {
  background-color: rgba(100, 116, 139, 0.4);
  border-radius: 3px;
}
</style>