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

      <case-Help
        ref="caseHelp"
        v-if="caseHelpShow"
        :case-name="caseName()"
        :sections="caseHelpSections"
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
import CaseHelp from './CaseHelp.vue';
import DrillProgress from './DrillProgress.vue';
import { computed, ref } from 'vue';
import HistoryList from '@/components/HistoryList.vue';
import {
  addToHistory,
  capitalizeFirstOnly,
  history,
  resetStreak,
  STREAK_TARGET,
  streakCount,
  totalAttempts,
  showStreakDialog,
} from '@/views/drillUtils';
import { loadVocabulary } from '@/utils/grammer/wordStore';
import { onMounted } from 'vue';
import type DerivedWord from '@/utils/grammer/DerivedWord';

onMounted(() => loadVocabulary());

interface DrillProps<T> {
  caseName: () => CASE_TYPE;
  drillTitle: string;
  drillSubtitle: string;

  sk: (item: T) => string;
  en: (item: T) => string;
  isPlural: (item: T) => boolean;
  buildNextItem: () => T;
  expectedAnswer: (item: T) => DerivedWord;
  question?: (item: T) => string;
}

type DrillItem = unknown;
const { caseName, drillTitle, drillSubtitle, sk, en, isPlural, buildNextItem, expectedAnswer, question } =
  defineProps<DrillProps<DrillItem>>();

const getQuestion = computed(() => {
  if (!currentItem.value) return '';
  if (question) return question(currentItem.value);
  else return sk(currentItem.value);
});

const {
  caseTitle,
  hasStarted,
  currentItem,
  userAnswer,
  showExplanation,
  explanationText,
  caseHelpSections,
  caseHelpShow,
  startQuiz,
  submitAnswer,
  handleContinue,
  openDocumentation,
} = useDrill({
  caseName: caseName,
  getNextItem: buildNextItem,
  getExpected: expectedAnswer,
  getInitialAnswer: sk, //TODO replace with sk
  getWordForHistory: sk, //TODO replace with sk
  en,
});

const skText = computed(() => (currentItem.value ? sk(currentItem.value) : ''));

const enText = computed(() => (currentItem.value ? en(currentItem.value) : ''));

const plural = computed(() => (currentItem.value ? isPlural(currentItem.value) : false));

// Composable for shared drill logic
function useDrill<I>(options: {
  caseName: () => CASE_TYPE;
  getNextItem: () => I; // e.g., { noun, isPlural } or { adjective, noun, isPlural } actually Noun or Adjective (Verb too coming)
  getExpected: (item: I) => { derived: string; explanation: string; documentation: string[] }; //DerivedWord
  getInitialAnswer: (item: I) => string;
  getWordForHistory: (item: I) => string;
  en: (item: I) => string;
}) {
  const { caseName, getNextItem, getExpected, getInitialAnswer, getWordForHistory, en } = options;

  const caseTitle = computed(() => capitalizeFirstOnly(caseName()));

  const hasStarted = ref(false);
  const currentItem = ref<I>();
  const userAnswer = ref('');
  const showExplanation = ref(false);
  const explanationText = ref('');
  const caseHelpSections = ref<string[]>([]);
  const caseHelpShow = ref(false);

  const openDocumentation = () => {
    caseHelpShow.value = true;
  };

  const startQuiz = () => {
    hasStarted.value = true;
    resetStreak();
    totalAttempts.value = 0;
    history.value = [];
    nextQuestion();
  };

  const nextQuestion = () => {
    currentItem.value = getNextItem();
    userAnswer.value = getInitialAnswer(currentItem.value);
    showExplanation.value = false;
    explanationText.value = '';
  };

  const submitAnswer = () => {
    const item = currentItem.value;
    const expected = getExpected(item);
    const answer = userAnswer.value.trim().toLowerCase();
    const correct = answer === expected.derived.toLowerCase();

    caseHelpSections.value = expected.documentation;

    totalAttempts.value++;
    addToHistory(
      getWordForHistory(item),
      en(item),
      answer,
      correct,
      expected.derived,
      caseName(),
      expected.documentation,
    );

    if (correct) {
      streakCount.value++;
      if (streakCount.value >= STREAK_TARGET) showStreakDialog.value = true;
      nextQuestion();
    } else {
      resetStreak();
      explanationText.value = `❗ "for ${getWordForHistory(item)}" : explanation "${expected.explanation}".`;
      showExplanation.value = true;
    }
  };

  const handleContinue = () => {
    nextQuestion();
  };

  return {
    caseTitle,
    hasStarted,
    currentItem,
    userAnswer,
    showExplanation,
    explanationText,
    showStreakDialog,
    caseHelpSections: caseHelpSections,
    caseHelpShow,
    startQuiz,
    nextQuestion,
    submitAnswer,
    handleContinue,
    openDocumentation,
  };
}
</script>
