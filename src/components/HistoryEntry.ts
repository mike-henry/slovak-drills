import type DerivedWord from '@/utils/grammer/DerivedWord';
import { LocalStoragePersistance } from '@/utils/grammer/persistance/LocalStoragePersistance';
import { readPersistentState } from '@/utils/grammer/persistance/StateReader';
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

// readPersistentState<T extends object>({
//   key,
//   persistance,
//   create,
//   debounceMs = 50,
// }: {

const historyPersitance = new LocalStoragePersistance<HistoryEntry[]>();
export const globalHistory: Ref<HistoryEntry[]> = ref(
  readPersistentState({
    key: 'history',
    persistance: historyPersitance,
    create: () => [],
  }),
); // New history format

// export const globalHistory: Ref<HistoryEntry[]> = ref([]);
