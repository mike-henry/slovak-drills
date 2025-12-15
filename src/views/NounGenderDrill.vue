<template>
  <div class="wrap">
    <header>
      <div>
        <h1>Slovak Noun Gender Drill — 20 in a row</h1>
        <p class="lead">Pick the correct gender for each noun.</p>
      </div>
    </header>

    <main class="card">
      <!-- START SCREEN -->
      <div v-if="!hasStarted">
        <button class="start-btn" @click="startQuiz">Start / Reset</button>
      </div>

      <!-- QUIZ AREA -->
      <div v-else>
        <div class="word-block">
          <div class="word">{{ currentQuestion?.word || '—' }}</div>
          <div class="english">{{ currentQuestion?.english || '—' }}</div>
        </div>

        <!-- CHOICE BUTTONS -->
        <div class="controls" v-if="!awaitingContinue">
          <button class="choice" @click="handleAnswer('M')">Masculine (M)</button>
          <button class="choice" @click="handleAnswer('F')">Feminine (F)</button>
          <button class="choice" @click="handleAnswer('N')">Neuter (N)</button>
        </div>

        <!-- FEEDBACK AREA -->
        <div class="feedback">
          <div>
            <div class="big">
              <span v-if="awaitingContinue && history[0] && !history[0].wasRight">
                Wrong — {{ history[0].word }} is {{ history[0].correct }}. {{ history[0].rule }}
              </span>
              <span v-else>
                Pick a gender to continue.
              </span>
            </div>

            <button
              v-if="awaitingContinue"
              class="start-btn mt-2"
              @click="continueQuiz"
            >
              Continue
            </button>
          </div>
        </div>

        <!-- STATS -->
        <div class="statrow">
          <div class="stat">
            <div class="small">Current streak</div>
            <div class="big">{{ streakCount }}</div>
          </div>
          <div class="stat">
            <div class="small">Total attempts</div>
            <div class="big">{{ totalAttempts }}</div>
          </div>
          <div class="stat">
            <div class="small">Correct</div>
            <div class="big">{{ totalCorrect }}</div>
          </div>
        </div>

        <!-- PROGRESS BAR -->
        <div class="progress">
          <i :style="{ width: progressPercent + '%' }"></i>
        </div>

        <!-- HISTORY -->
        <div class="history card" v-if="history.length">
          <div class="hist-row" v-for="(h, idx) in history" :key="idx">
            <span>{{ h.wasRight ? '✓' : '✕' }} {{ h.word }} ({{ h.english }}) — Chose: {{ h.selected }}</span>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
          <button class="reset" @click="startQuiz">Shuffle / Reset Quiz</button>
          <div class="small">Wrong answers show the correct gender.</div>
        </div>
      </div>
    </main>
  </div>

  <!-- CONGRATS MODAL -->
  <div class="congrats" v-if="showCongrats">
    <h2>🎉 Congrats!</h2>
    <div id="congratsMsg">You got {{ STREAK_TARGET }} correct in a row.</div>
    <button class="reset" @click="resetQuiz">Keep playing</button>
  </div>
</template>

<script setup>
/**
 * Slovak Noun Gender Quiz
 *
 * Features:
 * - Loads nouns dynamically from /public/slovak-nouns.json
 * - Checks answers against JSON
 * - Shows rules or exceptions for incorrect answers
 * - Tracks streaks, attempts, correct answers, and history
 * - Correct → immediately next question
 * - Wrong → explanation + Continue button
 */

import { ref, computed, onMounted } from 'vue'
import { createGenderQuestion, GENDER_RULES } from '../utils/grammer/nounGenderRules.js'
import { loadNouns, nouns } from '@/utils/grammer/wordStore.js'



// ============ STATE ============

const quizPool = ref([])              // Shuffled copy of nounList
const usedWords = ref(new Set())      // Track used words
const currentQuestion = ref(null)     // Current noun question
const hasStarted = ref(false)         // Quiz started flag
const showCongrats = ref(false)       // Show congrats modal
const streakCount = ref(0)            // Current streak
const totalAttempts = ref(0)          // Total attempts
const totalCorrect = ref(0)           // Total correct
const history = ref([])               // History of answers
const awaitingContinue = ref(false)   // True if user must click Continue after wrong

const STREAK_TARGET = 20              // Number to win streak


// ============ HELPERS ============
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}


onMounted(() => loadNouns())

// ============ QUIZ LOGIC ============

/** Start the quiz */
const startQuiz = () => {
 
  hasStarted.value = true
  showCongrats.value = false
  streakCount.value = 0
  totalAttempts.value = 0
  totalCorrect.value = 0
  history.value = []
  usedWords.value = new Set()
  quizPool.value = shuffle(nouns.value.slice())

  nextQuestion()
}

/** Select next question from pool */
const nextQuestion = () => {
  
  let next = quizPool.value.find(w => !usedWords.value.has(w.sk))
  if (!next) {
    usedWords.value.clear()
    next = quizPool.value[Math.floor(Math.random() * quizPool.value.length)]
  }

  usedWords.value.add(next.sk)
  currentQuestion.value = createGenderQuestion(next)
  awaitingContinue.value = false
}

/** Add an attempt to history with feedback */
const addToHistory = (isCorrect, selectedGender) => {
  if (!currentQuestion.value) return

  let feedbackRule = ''
  if (!isCorrect) {
    const matchedRule = GENDER_RULES.find(rule => rule.pattern.test(currentQuestion.value.word))
    feedbackRule = matchedRule
      ? matchedRule.text
      : 'This is an exception to the usual rules.'
  }

  history.value.unshift({
    word: currentQuestion.value.word,
    english: currentQuestion.value.english,
    selected: selectedGender,
    correct: currentQuestion.value.correctGender,
    wasRight: isCorrect,
    rule: feedbackRule
  })
}

/** Handle user answer */
const handleAnswer = (selectedGender) => {
  if (!currentQuestion.value) return
  if (awaitingContinue.value) return

  totalAttempts.value++
  const isCorrect = selectedGender === currentQuestion.value.correctGender

  if (isCorrect) {
    streakCount.value++
    totalCorrect.value++
    addToHistory(true, selectedGender)

    if (streakCount.value >= STREAK_TARGET) showCongrats.value = true
    nextQuestion() // immediate next if correct
  } else {
    streakCount.value = 0
    addToHistory(false, selectedGender)
    awaitingContinue.value = true
  }
}

/** Continue quiz after wrong answer */
const continueQuiz = () => nextQuestion()

/** Reset quiz completely */
const resetQuiz = () => {
  hasStarted.value = false
  showCongrats.value = false
  streakCount.value = 0
  totalAttempts.value = 0
  totalCorrect.value = 0
  history.value = []
  usedWords.value = new Set()
  currentQuestion.value = null
  awaitingContinue.value = false
}

// ============ COMPUTED ============
const progressPercent = computed(() =>
  Math.min(100, (streakCount.value / STREAK_TARGET) * 100)
)
</script>
