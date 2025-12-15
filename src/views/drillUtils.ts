import { computed, ref, type Ref } from "vue"
import { nouns, adjectives, propositions } from '@/utils/grammer/wordStore.js'
import type Noun from "@/utils/grammer/declinations/Noun"
import { CASE_TYPE } from '@/utils/grammer/WordTypes'


export const STREAK_TARGET = 10              // Number to win streak

export const progressPercent = computed(() =>
  Math.min(100, (streakCount.value / STREAK_TARGET) * 100)
)

export const capitalizeFirstOnly = (str: string) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const history = ref([])  // Array of { word, answer, correct, expected, caseName, documentation }
export const streakCount = ref(0)
export const totalAttempts = ref(0)
export const showStreakDialog =ref(false)

export const resetStreak = () => {
  streakCount.value = 0
}


export const addToHistory = (word: string, answer: string, correct: boolean, expected: string, caseName: CASE_TYPE, documentation: string[]) => {
  history.value.unshift({
    word,
    answer,
    correct,
    expected,
    caseName,
    documentation
  })
}

export const shuffleArray = (array: any[]) => {
  const a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const getRandomNoun = (): Noun => {
  const shuffled = shuffleArray(nouns.value)
  return shuffled[Math.floor(Math.random() * shuffled.length)]
}

export const getRandomAdjective = () => {
  const shuffled = shuffleArray(adjectives.value)
  return shuffled[Math.floor(Math.random() * shuffled.length)]
}

export const getRandomProposition = () => {
  const shuffled = shuffleArray(propositions.value)
  return shuffled[Math.floor(Math.random() * shuffled.length)]
}


export const normalizeSpaces = (str: string) => {
  return str.trim().replace(/\s+/g, ' ');
}

// Composable for shared drill logic
export function useDrill(options: {
  caseName: string
  getNextItem: () => any // e.g., { noun, isPlural } or { adjective, noun, isPlural }
  getExpected: (item: any) => { derived: string, explanation: string, documentation: string[] }
  getInitialAnswer: (item: any) => string
  getWordForHistory: (item: any) => string
}) {
  const { caseName, getNextItem, getExpected, getInitialAnswer, getWordForHistory } = options

  const caseTitle = computed(() => capitalizeFirstOnly(caseName))

  const hasStarted = ref(false)
  const currentItem = ref<any>()
  const userAnswer = ref('')
  const showExplanation = ref(false)
  const explanationText = ref('')
  const caseHelpSection = ref<string[]>()
  const caseHelpShow = ref(false)

  const openDocumentation = () => {
    caseHelpShow.value = true
  }

  const startQuiz = () => {
    hasStarted.value = true
    resetStreak()
    totalAttempts.value = 0
    history.value = []
    nextQuestion()
  }

  const nextQuestion = () => {
    currentItem.value = getNextItem()
    userAnswer.value = getInitialAnswer(currentItem.value)
    showExplanation.value = false
    explanationText.value = ''
  }

  const submitAnswer = () => {
    const item = currentItem.value
    const expected = getExpected(item)
    const answer = userAnswer.value.trim().toLowerCase()
    const correct = answer === expected.derived.toLowerCase()

    caseHelpSection.value = expected.documentation

    totalAttempts.value++
    addToHistory(getWordForHistory(item), answer, correct, expected.derived, caseName as CASE_TYPE, expected.documentation)

    if (correct) {
      streakCount.value++
      if (streakCount.value >= STREAK_TARGET) showStreakDialog.value = true
      nextQuestion()
    } else {
      resetStreak()
      explanationText.value = `❗ "for ${getWordForHistory(item)}" : explanation "${expected.explanation}".`
      showExplanation.value = true
    }
  }

  const handleContinue = () => {
    nextQuestion()
  }

  return {
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
  }
}

