import { computed, ref } from 'vue';

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

export const randomBoolean = () => Math.random() < 0.5;

export const normalizeSpaces = (str: string) => {
  return str.trim().replace(/\s+/g, ' ');
};
