<template>
  <div class="drill-container">
    <h1 class="title">
      Slovak {{ caseTitle }} adjective with noun Case Drill
    </h1>

    <p class="subtitle">
      Type the correct <b>{{ caseTitle }}</b> form of each adjective.
    </p>

    <div v-if="!started" class="text-center mt-8">
      <button @click="startQuiz" class="drill-button-primary">
        Start / Reset
      </button>
    </div>

    <div v-else>
      <div class="drill-panel">
        <div class="text-4xl font-bold mb-1">
          {{ currentAdjective.sk }} {{ currentNoun.sk }}
          <span lass="drill-plural"  v-if="currentPlural"> in plural</span>
        </div>

        <div class="prompt-subtext">
          ({{ currentAdjective.en }} {{ currentNoun.en }})
        </div>
        <answer-field v-model="userAnswer" :disabled="showExplanation" />
        <div class="mt-4 flex gap-3">
          <button v-if="!showExplanation" @click="submitAnswer" class="drill-button-primary">
            Submit
          </button>

          <button v-else @click="handleContinue" class="drill-button-secondary">
            Continue
          </button>
        </div>

        <div v-if="showExplanation" class="explanation-box">
          <p class="text-lg">{{ explanationText }}</p>
        </div>
        <drill-progress />
      </div>
      <div class="mt-6">
        <history-list :history="history" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import { loadVocabulary } from './wordStore.js'
import { deriveAdjectiveNounCase } from './derivations/CaseDerivation.js'
import DrillProgress from './DrillProgress.vue'
import AnswerField from './AnswerField.vue'
import HistoryList from './HistoryList.vue'
import { addToHistory, history, progressPercent, getRandomAdjective, getRandomNoun, streakCount, totalAttempts } from './drillUtils.js'




const STREAK_TARGET = 20

onMounted(() => loadVocabulary())

const properties = defineProps(['caseName'])
const caseName = properties.caseName

const caseTitle = computed(() => {
  return capitalizeFirstOnly(properties.caseName)
})

const capitalizeFirstOnly = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const started = ref(false)
const currentPlural = ref(false)
const currentNoun = ref({})
const currentAdjective = ref({})
const userAnswer = ref('')
const showExplanation = ref(false)
const explanationText = ref('')



const startQuiz = () => {
  started.value = true
  streakCount.value = 0
  totalAttempts.value = 0
  history.value = []
  nextQuestion()
}

const nextQuestion = () => {
  currentNoun.value = getRandomNoun()
  currentAdjective.value = getRandomAdjective()

  currentPlural.value = Math.random() < 0.5
  userAnswer.value = currentAdjective.value.sk + ' ' + currentNoun.value.sk
  showExplanation.value = false
  explanationText.value = ''
}

const normalizeSpaces = (str) => {
  return str.trim().replace(/\s+/g, ' ');
}

const submitAnswer = () => {
  const adjective = currentAdjective.value
  const noun = currentNoun.value

  const expected = deriveAdjectiveNounCase(adjective, noun, caseName, currentPlural.value)
  const answer = normalizeSpaces(userAnswer.value).toLowerCase()
  const correct = answer === expected.derived.toLowerCase()

  totalAttempts.value++
  addToHistory(`${adjective.sk} ${noun.sk}`, answer, correct, expected.derived)

  if (correct) {
    streakCount.value++
    nextQuestion()
  } else {
    streakCount.value = 0
    const derived = deriveAdjectiveNounCase(adjective, noun, caseName, currentPlural.value)
    explanationText.value = `❗"${expected.derived} ${derived.explanation}`
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