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
          <span class="drill-plural" v-if="currentPlural"> in plural</span>
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
            @click="nextQuestion"
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


<script setup lang="ts">
import { ref, onMounted,  computed, type Ref } from 'vue'
import AnswerField from '@/components/AnswerField.vue'
import HistoryList from '@/components/HistoryList.vue'
import DrillProgress from '@/components/DrillProgress.vue'
import { loadVocabulary, nouns ,adjectives } from '@/utils/grammer/wordStore.js'
import { addToHistory,history, streakCount,totalAttempts, capitalizeFirstOnly,STREAK_TARGET,shuffleArray} from './drillUtils.js'
import type Noun from '@/utils/grammer/declinations/Noun.js'
import type Adjective from '@/utils/grammer/declinations/Adjective.js'




onMounted(() => loadVocabulary())

const properties = defineProps(['caseName'])
const caseName = properties.caseName

const caseTitle = computed(() => {
  return capitalizeFirstOnly(properties.caseName)
})

const started = ref(false)
const currentPlural = ref(false)
const currentNoun:Ref<Noun> = ref()
const currentAdjective:Ref<Adjective> = ref()
const userAnswer = ref('')
const showExplanation = ref(false)
const explanationText = ref('')

const answerInput = ref(null)


const currentGenderText = computed(()=>{
  if (currentNoun.value?.gender === 'M') return "Masculine"
  if (currentNoun.value?.gender === 'F') return "Femenine"
  return "Nuetral"
})


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
  const expected = adjective.declinate(caseName,noun,currentPlural.value)
  const answer = userAnswer.value.trim().toLowerCase()
  const correct = answer === expected.derived.toLowerCase()

  totalAttempts.value++
  addToHistory(adjective.sk, answer, correct,expected.derived,caseName,expected.documentation)

  if (correct) {
    streakCount.value++
    nextQuestion()
  } else {
    streakCount.value = 0
    explanationText.value = `❗ "${expected.explanation}`
    showExplanation.value = true
  }
}


</script>

