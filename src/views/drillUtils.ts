import { computed, ref } from "vue"
import { nouns, adjectives, propositions } from '@/utils/grammer/wordStore.js'
import type Noun from "@/utils/grammer/declinations/Noun"


export const STREAK_TARGET = 10              // Number to win streak

export const progressPercent = computed(() =>
  Math.min(100, (streakCount.value / STREAK_TARGET) * 100)
)

export const capitalizeFirstOnly = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const caseTitle = computed(() => {
  return capitalizeFirstOnly(properties.caseName)
})


export const history = ref([])  // Array of { word, answer, correct, expected }
export const streakCount = ref(0)
export const totalAttempts = ref(0)

export const resetStreak = () => {
  streakCount.value = 0
}


export const addToHistory = (word, answer, correct, expected,caseName,documentation) => {
  history.value.unshift({
    word,
    answer,
    correct,
    expected,
    caseName,
    documentation
  })
}

export const shuffleArray = (array) => {
  const a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const getRandomNoun = ():Noun => {
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


export const normalizeSpaces = (str) => {
  return str.trim().replace(/\s+/g, ' ');
}

