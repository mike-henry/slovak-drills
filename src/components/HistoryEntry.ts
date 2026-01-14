import type DerivedWord from '@/utils/grammer/DerivedWord';
import { ref } from 'vue';
import type { Ref } from 'vue';

export default interface HistoryEntry {
  correctAnswer: DerivedWord;
  questionEn: string;
  questionSk: string;
  givenAnswer: string;
  correct: boolean;
  subject: string;
  drillPath?: string; // for later reference
}

export const globalHistory: Ref<HistoryEntry[]> = ref([]); // New history format
