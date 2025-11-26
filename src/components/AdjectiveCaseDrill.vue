<template>
  <div class="drill-container">
    
    <h1 class="text-2xl font-bold mb-2">
      Slovak {{ caseTitle }} adjective Case Drill
    </h1>

    <p class="text-slate-400 mb-6">
      Type the correct <b>{{ caseTitle }}</b> form of each adjective.
    </p>

    <div v-if="!started" class="text-center mt-8">
      <button @click="startQuiz" class="drill-button-primary px-6 py-3">
        Start / Reset
      </button>
    </div>

    <div v-else>
      <div class="drill-panel">

        <div class="text-4xl font-bold mb-1">
          {{ currentAdjective.sk }}:
          of <span v-if="currentNoun.animate">living </span>
          {{ currentGenderText }}
          <span v-if="currentPlural"> in plural</span>
        </div>

        <div class="text-slate-400 mb-4">({{ currentAdjective.en }})</div>
        <answer-field v-model="userAnswer" :disabled="showExplanation" />

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

        <div v-if="showExplanation" class="drill-explanation">
          <p class="text-lg">{{ explanationText }}</p>
        </div>
        <drill-progress    />
      </div>

      <div class="mt-6">
        <history-list :history="history" />
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import AnswerField from './AnswerField.vue'
import HistoryList from './HistoryList.vue'
import { loadVocabulary, nouns ,adjectives } from './wordStore.js'
import { deriveNounCaseForm, deriveAdjectiveCaseForm } from './caseDerivation.js'
import { addToHistory,history, streakCount,totalAttempts} from './drillUtils'
import DrillProgress from './DrillProgress.vue'




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

//const totalAttempts = ref(0)


const answerInput = ref(null)



 const  appendUserAnswer = (char) => {
    insertAtCursor(userAnswer,answerInput,char)
 }

const currentGenderText = computed(()=>{
  if (currentNoun.value?.gender === 'M') return "Masculine"
  if (currentNoun.value?.gender === 'F') return "Femenine"
  return "Nuetral"
})

const shuffleArray = (array) => {
  const a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const getRandomNoun = () => {
  const shuffled = shuffleArray(nouns.value)
  return shuffled[Math.floor(Math.random() * shuffled.length)]
}

const getRandomAdjective = () => {
  const shuffled = shuffleArray(adjectives.value)
  return shuffled[Math.floor(Math.random() * shuffled.length)]
}



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
  userAnswer.value = currentAdjective.value.sk
  showExplanation.value = false
  explanationText.value = ''
}

const submitAnswer = () => {
  const adjective = currentAdjective.value 
  const noun = currentNoun.value
  //(adj, caseName, gender, plural = false, animate = false)
  const expected = deriveAdjectiveCaseForm(adjective,caseName, noun.gender, currentPlural.value,noun.animate).form
  const answer = userAnswer.value.trim().toLowerCase()
  const correct = answer === expected.toLowerCase()

  totalAttempts.value++
  addToHistory(adjective.sk, answer, correct,expected)

  if (correct) {
    streakCount.value++
    nextQuestion()
  } else {
    streakCount.value = 0
    const derived = deriveNounCaseForm(noun, caseName, currentPlural.value)
    explanationText.value =
      expected !== derived.form
        ? `❗ "${adjective.sk}" is irregular — the correct form is "${expected}".`
        : `Rule: ${derived.explanation}`
    showExplanation.value = true
  }
}

const handleContinue = () => {
  nextQuestion()
}

const progressPercent = computed(() =>
  Math.min(100, (streakCount.value / STREAK_TARGET) * 100)
)
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