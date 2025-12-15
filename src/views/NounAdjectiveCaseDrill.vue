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

          <button v-else @click="nextQuestion" class="drill-button-secondary">
            Continue
          </button>
        </div>

        <div v-if="showExplanation" class="explanation-box">
          <p class="text-lg">{{ explanationText }}</p>
        </div>
        <drill-progress />
      </div>
      <congrats-modal v-model="showStreakDialog" title="Streak Level Accomplished!" @confirm="resetStreak">
        <p> for {{ caseName }} Nouns with adjectives you reached a streak of {{ streakCount }}!</p>
        <p>You should now try another  drill</p>
      </congrats-modal>
      <div class="mt-6">
        <history-list :history="history" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted,  computed, type Ref } from 'vue'
import { loadVocabulary } from '@/utils/grammer/wordStore.js'
import DrillProgress from "@/components/DrillProgress.vue"
import AnswerField from '@/components/AnswerField.vue'
import HistoryList from '@/components/HistoryList.vue'
import CongratsModal from '@/components/CongratsModal.vue'
import { addToHistory, history,  getRandomAdjective, getRandomNoun, streakCount, totalAttempts,STREAK_TARGET, capitalizeFirstOnly,resetStreak,normalizeSpaces} from './drillUtils.js'
import { declinateAdjectiveWithNoun } from '@/utils/grammer/declinations/DeclinationUtils.js'
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
const showStreakDialog = ref(false)



const startQuiz = () => {
  started.value = true
  resetStreak()
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



const submitAnswer = () => {
  const adjective = currentAdjective.value
  const noun = currentNoun.value

  const expected = declinateAdjectiveWithNoun(adjective, noun, caseName, currentPlural.value)

  const answer = normalizeSpaces(userAnswer.value).toLowerCase()
  const correct = answer === expected.derived.toLowerCase()

  totalAttempts.value++
  addToHistory(`${adjective.sk} ${noun.sk}`, answer, correct, expected.derived,caseName,expected.documentation)
  if (correct) {
    streakCount.value++
    if (streakCount.value >= STREAK_TARGET) showStreakDialog.value = true
    nextQuestion()
  } else {
    streakCount.value = 0
    explanationText.value = `❗"${expected.derived} ${expected.explanation}`
    showExplanation.value = true
  }
}

</script>
