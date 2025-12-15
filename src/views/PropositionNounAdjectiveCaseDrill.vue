<template>
  <div class="drill-container">
    <h1 class="title">
      Slovak proposition adjective with noun Case Drill
    </h1>

    <p class="subtitle">
      Type the correct form of each adjective and noun
    </p>

    <div v-if="!started" class="text-center mt-8">
      <button @click="startQuiz" class="drill-button-primary">
        Start / Reset
      </button>
    </div>

    <div v-else>
      <div class="drill-panel">
        <div class="text-4xl font-bold mb-1">
          {{ currentProposition.sk }} {{ currentAdjective.sk }} {{ currentNoun.sk }}
          <span class="drill-plural" v-if="currentPlural"> in plural</span>
        </div>

        <div class="prompt-subtext">
          ( {{ currentProposition.en }} a {{ currentAdjective.en }} {{ currentNoun.en }})
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
import { ref, onMounted, computed, type Ref } from 'vue'
import { loadVocabulary } from '@/utils/grammer/wordStore.js'
import DrillProgress from '@/components/DrillProgress.vue'
import AnswerField from '@/components/AnswerField.vue'
import HistoryList from '@/components/HistoryList.vue'
import CaseHelp from '@/components/CaseHelp.vue'
import { addToHistory, history, getRandomAdjective, getRandomNoun, streakCount, totalAttempts, getRandomProposition } from '@/views/drillUtils'
import type Noun from '@/utils/grammer/declinations/Noun'
import type Adjective from '@/utils/grammer/declinations/Adjective'
import { declinateAdjectiveWithNoun } from '@/utils/grammer/declinations/DeclinationUtils'
import type Proposition from './Proposition'

onMounted(() => loadVocabulary())

const properties = defineProps(['caseName'])
const caseName = computed(() => {
  return currentProposition.value.caseType
})

const caseTitle = computed(() => {
  return capitalizeFirstOnly(properties.caseName)
})

const capitalizeFirstOnly = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const started = ref(false)
const currentPlural = ref(false)
const currentNoun: Ref<Noun> = ref()
const currentAdjective: Ref<Adjective> = ref()
const currentProposition:Ref<Proposition> = ref()
const userAnswer = ref('')
const showExplanation = ref(false)
const caseHelp = ref(null)
const caseHelpSection: Ref<string[]> = ref()
const caseHelpShow = ref(false)
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
  currentProposition.value = getRandomProposition()

  currentPlural.value = Math.random() < 0.5
  userAnswer.value = `${currentProposition.value.sk} ${currentAdjective.value.sk} ${currentNoun.value.sk}`
  showExplanation.value = false
  explanationText.value = ''
}

const normalizeSpaces = (str) => {
  return str.trim().replace(/\s+/g, ' ');
}

const submitAnswer = () => {
  const adjective = currentAdjective.value
  const noun = currentNoun.value
  const proposition = currentProposition.value
  const expectedAdjectiveNoun = declinateAdjectiveWithNoun(adjective, noun, proposition.caseType, currentPlural.value)
  const expected = `${proposition.sk} ${expectedAdjectiveNoun.derived}`
  const answer = normalizeSpaces(userAnswer.value).toLowerCase()
  const correct = answer === expected.toLowerCase()

  caseHelpSection.value = expectedAdjectiveNoun.documentation

  totalAttempts.value++
  addToHistory(`${proposition.sk} ${noun.sk} ${adjective.sk}`, answer, correct, expected,properties.caseName ,expectedAdjectiveNoun.documentation)

  if (correct) {
    streakCount.value++
    nextQuestion()
  } else {
    streakCount.value = 0
    explanationText.value = `❗ for ${proposition} - ${expectedAdjectiveNoun.explanation} `

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