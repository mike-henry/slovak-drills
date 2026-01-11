<template>
  <div class="mt-6">
    <h2 class="text-lg font-semibold mb-2">History</h2>

    <ul class="history-list">
      <li v-for="(item, index) in history" :key="index">
        <span v-if="item.correct" class="text-emerald-500">✓</span>
        <span v-else class="text-rose-500">✗</span>
        {{ item.questionSk }} ({{ item.questionEn }}) → {{ item.givenAnswer }} : {{ item.correctAnswer.derived }}
        <span v-if="!item.correct" class="text-emerald-500" @click="openHelp(item.correctAnswer.documentation)"
          >🔍</span
        >
        <drill-Help
          v-if="isCaseHelpShow(item.correctAnswer.documentation, item)"
          subject="History Help"
          :derived-word="item.correctAnswer"
          @confirm="closeHelp()"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import DrillHelp from './DrillHelp.vue';
import type { HistoryEntry } from '@/views/drillUtils';
import DerivedWord from '@/utils/grammer/DerivedWord';

const { history } = defineProps({
  history: {
    type: Array as PropType<HistoryEntry[]>,
    required: true,
  },
});

const presentSection = ref();

function closeHelp() {
  presentSection.value = undefined;
}

function isCaseHelpShow(section, item) {
  return presentSection.value === section;
}

function openHelp(section) {
  presentSection.value = section;
}
</script>
