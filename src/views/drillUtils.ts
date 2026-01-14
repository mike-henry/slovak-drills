import { computed, ref, type Ref } from 'vue';
import { nouns, adjectives, propositions, verbs } from '@/utils/grammer/wordStore.js';
import type Noun from '@/utils/grammer/declinations/Noun';

import type Verb from '@/utils/grammer/verbs/Verb';
import { Pronoun } from '@/utils/grammer/Pronoun';

export const STREAK_TARGET = 10; // Number to win streak

export const progressPercent = computed(() => Math.min(100, (streakCount.value / STREAK_TARGET) * 100));

export const capitalizeFirstOnly = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const streakCount = ref(0);
export const totalAttempts = ref(0);
export const showStreakDialog = ref(false);

export const resetStreak = () => {
  streakCount.value = 0;
};

const shuffleArray = (array: any[]) => {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const getRandomNoun = (): Noun => {
  const shuffled = shuffleArray(nouns.value);
  return shuffled[Math.floor(Math.random() * shuffled.length)];
};

export const getRandomAdjective = () => {
  const shuffled = shuffleArray(adjectives.value);
  return shuffled[Math.floor(Math.random() * shuffled.length)];
};

export const getRandomProposition = () => {
  const shuffled = shuffleArray(propositions.value);
  return shuffled[Math.floor(Math.random() * shuffled.length)];
};

export const getRandomVerb = (): Verb => {
  const shuffled = shuffleArray(verbs.value);
  return shuffled[Math.floor(Math.random() * shuffled.length)];
};

export function getRandomPronoun(): Pronoun {
  const values = Object.values(Pronoun);
  const index = Math.floor(Math.random() * values.length);
  return values[index];
}

export const randomBoolean = () => Math.random() < 0.5;

export const normalizeSpaces = (str: string) => {
  return str.trim().replace(/\s+/g, ' ');
};
