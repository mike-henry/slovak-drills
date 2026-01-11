<template>
  <div class="drill-container">
    <h1 class="title">{{ drillTitle }}</h1>
    <p class="subtitle">{{ drillSubtitle }}</p>

    <div v-if="!hasStarted" class="text-center mt-8">
      <button @click="startQuiz" class="drill-button-primary">Start / Reset</button>
    </div>

    <div v-else>
      <div class="drill-panel">
        <div class="text-4xl font-bold mb-1">
          <span>{{ getQuestion }}</span>
          <span class="drill-plural" v-if="plural"> in plural</span>
        </div>

        <div class="prompt-subtext">
          {{ enText }}
        </div>

        <answer-field v-model="userAnswer" :disabled="showExplanation" />

        <div class="mt-4 flex gap-3">
          <button v-if="!showExplanation" @click="submitAnswer" class="drill-button-primary">Submit</button>

          <div v-else>
            <button @click="handleContinue" class="drill-button-secondary">Continue</button>
            <button @click="openDocumentation" class="drill-button-secondary">Explanation</button>
          </div>
        </div>

        <div v-if="showExplanation" class="explanation-box">
          <p class="text-lg">{{ explanationText }}</p>
        </div>

        <drill-progress />
      </div>

      <congrats-modal v-model="showStreakDialog" title="Streak Level Accomplished!" @confirm="resetStreak">
        <p>You reached a streak of {{ streakCount }}!</p>
        <p>You should now try another drill</p>
      </congrats-modal>

      <drill-help
        ref="caseHelp"
        v-if="caseHelpShow"
        :subject="drillTitle"
        :derived-word="expectedAnswer(currentItem)"
        @confirm="caseHelpShow = false"
      />

      <div class="mt-6">
        <history-list :history="history" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CongratsModal from './CongratsModal.vue';
import type { CASE_TYPE } from '@/utils/grammer/WordTypes';
import AnswerField from './AnswerField.vue';

import DrillHelp from './DrillHelp.vue';
import DrillProgress from './DrillProgress.vue';
import { computed, ref } from 'vue';
import HistoryList from '@/components/HistoryList.vue';
import {
  resetStreak,
  STREAK_TARGET,
  streakCount,
  totalAttempts,
  showStreakDialog,
  appendToHistory,
  history,
} from '@/views/drillUtils';
import { loadVocabulary } from '@/utils/grammer/wordStore';
import { onMounted } from 'vue';
import type DerivedWord from '@/utils/grammer/DerivedWord';

onMounted(() => loadVocabulary());

interface DrillProps<T> {
  subjectArea: () => string | CASE_TYPE;
  drillTitle: string;
  drillSubtitle: string;

  sk: (item: T) => string;
  en: (item: T) => string;
  isPlural: (item: T) => boolean;
  buildNextItem: () => T;
  expectedAnswer: (item: T) => DerivedWord;
  question?: (item: T) => string;
}

const currentItem = ref<DrillItem>();

const userAnswer = ref('');
const showExplanation = ref(false);
const explanationText = ref('');
const caseHelpShow = ref(false);
const caseHelpSections = ref([]);

type DrillItem = unknown;
const {
  subjectArea: subjectArea,
  drillTitle,
  drillSubtitle,
  sk,
  en,
  isPlural,
  buildNextItem,
  expectedAnswer,
  question,
} = defineProps<DrillProps<DrillItem>>();

const getQuestion = computed(() => {
  if (!currentItem.value) return '';
  if (question) return question(currentItem.value);
  else return sk(currentItem.value);
});

const hasStarted = ref(false);

const openDocumentation = () => {
  caseHelpShow.value = true;
};

const nextQuestion = () => {
  currentItem.value = buildNextItem();
  userAnswer.value = sk(currentItem.value);
  showExplanation.value = false;
  explanationText.value = '';
};

const startQuiz = () => {
  hasStarted.value = true;
  resetStreak();
  totalAttempts.value = 0;
  nextQuestion();
};

const handleContinue = () => {
  nextQuestion();
};

const submitAnswer = () => {
  const item = currentItem.value;
  const correctAnswer = expectedAnswer(item);
  const givenAnswer = userAnswer.value.trim().toLowerCase();
  const correct = givenAnswer === correctAnswer.derived.toLowerCase();

  caseHelpSections.value = correctAnswer.documentation;

  totalAttempts.value++;

  appendToHistory({
    subject: subjectArea(), // for now TODO make generic
    correctAnswer,
    givenAnswer,
    correct,
    questionEn: en(item),
    questionSk: sk(item),
  });

  if (correct) {
    streakCount.value++;
    if (streakCount.value >= STREAK_TARGET) showStreakDialog.value = true;
    nextQuestion();
  } else {
    resetStreak();
    explanationText.value = `❗ "for ${sk(item)}" : explanation "${correctAnswer.explanation}".`;
    showExplanation.value = true;
  }
};

const skText = computed(() => (currentItem.value ? sk(currentItem.value) : ''));

const enText = computed(() => (currentItem.value ? en(currentItem.value) : ''));

const plural = computed(() => (currentItem.value ? isPlural(currentItem.value) : false));
</script>
